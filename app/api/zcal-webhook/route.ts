/**
 * POST /api/zcal-webhook
 *
 * Receives zcal's booking webhook (configured at zcal admin → Integrations
 * → Webhooks) and forwards a Slack notification to #website-leads.
 *
 * Schema verified against a real zcal booking (May 2026):
 *   {
 *     type: "event.created",
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
 * Future: zcal sends an x-zcal-webhook-signature header (visible in our
 * logs) — once they publish a signing secret in their UI we can verify
 * HMAC properly. Until then we rely on the URL being secret-ish.
 *
 * Env vars:
 *   SLACK_WEBHOOK_URL  — required.
 *   ZCAL_DEBUG_PAYLOAD — optional ("true" to include raw payload in Slack).
 */

import { NextResponse } from "next/server";
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

  // Optional shared-secret check. zcal's webhook UI doesn't currently
  // expose a way to set this — they DO send x-zcal-webhook-signature
  // (HMAC-style) but without a known signing key we can't verify it yet.
  const expectedSecret = process.env.ZCAL_WEBHOOK_SECRET;
  if (expectedSecret) {
    const provided =
      request.headers.get("x-zcal-secret") ??
      request.headers.get("x-webhook-secret") ??
      request.headers.get("x-zcal-signature") ??
      request.headers.get("x-zcal-webhook-signature") ??
      request.headers.get("x-signature") ??
      request.headers.get("zcal-signature") ??
      request.headers.get("webhook-signature") ??
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (provided !== expectedSecret) {
      const headerNames = Array.from(request.headers.keys()).join(", ");
      console.warn(
        `[zcal-webhook] secret mismatch — refusing. Headers: ${headerNames}`
      );
      return NextResponse.json(
        { ok: false, error: "auth_failed" },
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
