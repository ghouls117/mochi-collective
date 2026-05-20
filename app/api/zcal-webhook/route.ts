/**
 * POST /api/zcal-webhook?token=<ZCAL_URL_TOKEN>
 *
 * Receives zcal's booking webhook (configured at zcal admin → Integrations
 * → Webhooks) and forwards a Slack notification to #website-leads.
 *
 * Schema verified against a real zcal booking (May 2026):
 *   {
 *     type: "event.created" | "event.rescheduled" | "event.cancelled",
 *     created_at: "...",
 *     data: {
 *       id, startDate, duration, cancelled, eventName,
 *       location: { locationType, onlineMeeting: { url } },
 *       hosts: [...],
 *       attendees: [{
 *         name, email, timezone, type,
 *         customQuestionAnswers: [{ question, answer }, ...],
 *       }],
 *       invite: { id, name, inviteType },
 *       tracking: { a0..a4, a1, notes },
 *     }
 *   }
 *
 * Authentication:
 *   - Primary: URL bearer token. The webhook URL configured in zcal admin
 *     includes ?token=<value>. We compare the query param against
 *     ZCAL_URL_TOKEN with constant-time comparison. If the env var is unset
 *     the check is bypassed (useful for local development).
 *   - Future: zcal sends x-zcal-webhook-signature (HMAC-shaped) on every
 *     request. Their UI doesn't expose the signing key yet — once it does
 *     we add proper HMAC verification on top of the URL token.
 *
 * Env vars:
 *   SLACK_WEBHOOK_URL  — required.
 *   ZCAL_URL_TOKEN     — recommended. Disables anonymous POSTs.
 *   ZCAL_WEBHOOK_SECRET — kept as a hook for future HMAC support. Unused
 *                        unless set; if set, treated as a shared secret in
 *                        the x-zcal-webhook-signature header.
 *   ZCAL_DEBUG_PAYLOAD — optional ("true" to include raw payload in Slack).
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import {
  buildBookingCancelledPayload,
  buildBookingConfirmedPayload,
  buildBookingRescheduledPayload,
  parseCustomAnswers,
  postSlackMessage,
  splitSuggestedProgram,
  type ParsedBooking,
} from "@/lib/slack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Constant-time string equality. Prevents timing attacks on the URL token
 * (an attacker who can measure response latency could otherwise brute the
 * token byte by byte).
 */
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

type EventStage = "created" | "rescheduled" | "cancelled";

const CREATE_EVENTS = new Set([
  "event.created",
  "event_created",
  "event_scheduled",
  "event.scheduled",
  "scheduled",
  "booking_created",
  "booking.created",
  "created",
]);

const RESCHEDULE_EVENTS = new Set([
  "event.rescheduled",
  "event_rescheduled",
  "rescheduled",
  "booking.rescheduled",
  "booking_rescheduled",
]);

const CANCEL_EVENTS = new Set([
  "event.cancelled",
  "event.canceled",
  "event_cancelled",
  "event_canceled",
  "cancelled",
  "canceled",
  "booking.cancelled",
  "booking.canceled",
  "booking_cancelled",
  "booking_canceled",
]);

function classifyEvent(eventType: string): EventStage | null {
  if (CREATE_EVENTS.has(eventType)) return "created";
  if (RESCHEDULE_EVENTS.has(eventType)) return "rescheduled";
  if (CANCEL_EVENTS.has(eventType)) return "cancelled";
  return null;
}

/* ──────────────────────────────────────────────
 * Defensive nested-getter — returns undefined
 * for any missing leg so callers don't need
 * deeply chained optional-chaining.
 * ────────────────────────────────────────────── */
function get<T = unknown>(obj: unknown, path: string): T | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return cur as T | undefined;
}

/* ──────────────────────────────────────────────
 * Extract booking metadata from zcal's payload.
 * Pulls the primary invitee (or first attendee)
 * for guest details and customQuestionAnswers.
 * ────────────────────────────────────────────── */
function parseZcalPayload(payload: unknown): ParsedBooking {
  const data = get(payload, "data");

  const startDate =
    get<string>(data, "startDate") ??
    get<string>(data, "start_time") ??
    get<string>(data, "startTime") ??
    get<string>(data, "datetime");

  const duration = get<number>(data, "duration");

  const meetingUrl =
    get<string>(data, "location.onlineMeeting.url") ??
    get<string>(data, "location.url") ??
    get<string>(data, "meetUrl");

  // Notes — our prefilled `notes=` ends up at data.tracking.notes
  const notes =
    get<string>(data, "tracking.notes") ??
    get<string>(data, "notes") ??
    get<string>(data, "message");

  // Find the invitee in the attendees array (zcal uses type: "invitee").
  const attendees = get<unknown[]>(data, "attendees");
  let guestName: string | undefined;
  let guestEmail: string | undefined;
  let timezone: string | undefined;
  let customQuestionAnswers: { question: string; answer: string | string[] }[] | undefined;

  if (Array.isArray(attendees) && attendees.length > 0) {
    const invitee =
      attendees.find(
        (a) => (a as Record<string, unknown>)?.type === "invitee"
      ) ?? attendees[0];
    if (invitee && typeof invitee === "object") {
      const inv = invitee as Record<string, unknown>;
      guestName = typeof inv.name === "string" ? inv.name : undefined;
      guestEmail = typeof inv.email === "string" ? inv.email : undefined;
      timezone = typeof inv.timezone === "string" ? inv.timezone : undefined;
      const cqa = inv.customQuestionAnswers;
      if (Array.isArray(cqa)) {
        customQuestionAnswers = cqa as {
          question: string;
          answer: string | string[];
        }[];
      }
    }
  }

  const customParsed = parseCustomAnswers(customQuestionAnswers);
  const { programName, programBlurb } = splitSuggestedProgram(
    customParsed.suggestedProgramRaw
  );

  // Reschedule-specific: zcal may include the previous time under various
  // field names. We probe a handful of plausible paths.
  const previousBookingTimeISO =
    get<string>(data, "previousStartDate") ??
    get<string>(data, "previous_start_date") ??
    get<string>(data, "rescheduledFrom.startDate") ??
    get<string>(data, "rescheduled_from.startDate") ??
    get<string>(data, "original.startDate") ??
    get<string>(data, "from.startDate");

  // Cancel-specific: cancellation metadata if zcal sends it.
  const cancelledBy =
    get<string>(data, "cancelledBy") ??
    get<string>(data, "cancelled_by") ??
    get<string>(data, "cancellation.cancelledBy");

  const cancellationReason =
    get<string>(data, "cancellationReason") ??
    get<string>(data, "cancellation_reason") ??
    get<string>(data, "cancellation.reason") ??
    get<string>(data, "reason");

  return {
    bookingTimeISO: startDate,
    bookingTimeZone: timezone,
    durationMinutes: typeof duration === "number" ? duration : undefined,
    guestName,
    guestEmail,
    meetingUrl,
    programName,
    programBlurb,
    type: customParsed.type,
    timing: customParsed.timing,
    budget: customParsed.budget,
    pressurePoints: customParsed.pressurePoints,
    additionalContext: customParsed.additionalContext,
    notes,
    previousBookingTimeISO,
    cancelledBy,
    cancellationReason,
  };
}

export async function POST(request: Request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[zcal-webhook] SLACK_WEBHOOK_URL is not configured");
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  // ── Auth: URL bearer token ──────────────────────────────────────
  // Primary auth path. zcal's webhook URL is configured with
  // ?token=<ZCAL_URL_TOKEN>; we compare against the env var with a
  // constant-time check. If the env var is unset, auth is bypassed —
  // useful for local development but flagged in logs as a warning.
  const expectedToken = process.env.ZCAL_URL_TOKEN;
  if (expectedToken) {
    const url = new URL(request.url);
    const providedToken = url.searchParams.get("token") ?? "";
    if (!providedToken) {
      console.warn("[zcal-webhook] missing ?token query param — refusing");
      return NextResponse.json(
        { ok: false, error: "auth_failed_missing_token" },
        { status: 401 }
      );
    }
    if (!safeEqual(providedToken, expectedToken)) {
      console.warn("[zcal-webhook] token mismatch — refusing");
      return NextResponse.json(
        { ok: false, error: "auth_failed_bad_token" },
        { status: 401 }
      );
    }
  } else {
    console.warn(
      "[zcal-webhook] ZCAL_URL_TOKEN is not configured — accepting unauthenticated POSTs"
    );
  }

  // ── Auth: optional HMAC / shared-secret header ──────────────────
  // Currently unused — zcal sends x-zcal-webhook-signature on every
  // request, but their UI doesn't expose the signing key. This block
  // remains as a hook: once a key is known, set ZCAL_WEBHOOK_SECRET and
  // (later) swap this from string equality to HMAC verification.
  const expectedSecret = process.env.ZCAL_WEBHOOK_SECRET;
  if (expectedSecret) {
    const provided =
      request.headers.get("x-zcal-webhook-signature") ??
      request.headers.get("x-zcal-signature") ??
      request.headers.get("x-zcal-secret") ??
      request.headers.get("x-signature") ??
      request.headers.get("webhook-signature") ??
      "";
    if (!provided || !safeEqual(provided, expectedSecret)) {
      console.warn("[zcal-webhook] secret header mismatch — refusing");
      return NextResponse.json(
        { ok: false, error: "auth_failed_bad_secret" },
        { status: 401 }
      );
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid JSON" },
      { status: 400 }
    );
  }

  // Log top-level keys for ongoing schema-drift detection (no PII).
  if (payload && typeof payload === "object") {
    const topKeys = Object.keys(payload as Record<string, unknown>).join(", ");
    console.log(`[zcal-webhook] payload top-level keys: ${topKeys}`);
  }

  // Identify the event type.
  const eventType =
    (get<string>(payload, "type") ||
      get<string>(payload, "event_type") ||
      get<string>(payload, "event") ||
      get<string>(payload, "data.type") ||
      "unknown") as string;

  const stage = classifyEvent(eventType);
  if (stage === null) {
    console.warn(
      `[zcal-webhook] event_type "${eventType}" not handled — ignoring`
    );
    return NextResponse.json({ ok: true, ignored: eventType });
  }

  const parsed = parseZcalPayload(payload);

  // Quick log of what we extracted (for sanity-checking, no PII).
  console.log(
    `[zcal-webhook] stage=${stage} program=${parsed.programName ?? "?"} start=${parsed.bookingTimeISO ?? "?"} type=${parsed.type ?? "?"}`
  );

  const debug = process.env.ZCAL_DEBUG_PAYLOAD === "true";

  const slackPayload =
    stage === "created"
      ? buildBookingConfirmedPayload({
          zcalEvent: eventType,
          parsed,
          rawPayload: payload,
          includeRawPayload: debug,
        })
      : stage === "rescheduled"
        ? buildBookingRescheduledPayload({
            parsed,
            rawPayload: payload,
            includeRawPayload: debug,
          })
        : buildBookingCancelledPayload({
            parsed,
            rawPayload: payload,
            includeRawPayload: debug,
          });

  const result = await postSlackMessage(webhookUrl, slackPayload);
  if (!result.ok) {
    console.error("[zcal-webhook] Slack notify failed:", result.error);
  }

  return NextResponse.json({ ok: result.ok });
}

// Healthcheck — zcal's "Test Endpoint" button does a GET first.
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "zcal-webhook-receiver",
    note: "POST a zcal booking payload here to forward to Slack.",
  });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
