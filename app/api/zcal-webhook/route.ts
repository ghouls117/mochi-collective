/**
 * POST /api/zcal-webhook
 *
 * Receives zcal's booking webhook (configured at zcal admin → Integrations
 * → Webhooks) and forwards a Slack notification to #website-leads.
 *
 * zcal's exact payload schema is not publicly documented as of build time,
 * so this handler is intentionally defensive:
 *   - Extracts known field names with multiple fallback paths.
 *   - Always parses the prefilled `notes` field (which we control) for
 *     reliable concierge data, regardless of payload shape.
 *   - For the first N bookings, includes the raw payload in the Slack
 *     message as a debugging attachment. After we see a real payload, we
 *     can tighten the parser and drop the raw-payload attachment.
 *
 * Env vars:
 *   SLACK_WEBHOOK_URL  — required. Set in Vercel project settings.
 *   ZCAL_WEBHOOK_SECRET — optional. If set, we require an `x-zcal-secret`
 *                         header that matches. (Configure the same secret
 *                         in zcal admin when adding the webhook.)
 *   ZCAL_DEBUG_PAYLOAD — optional. When "true" the Slack message includes
 *                        the full raw zcal payload as an attachment for
 *                        debugging the first few bookings.
 */

import { NextResponse } from "next/server";
import {
  buildBookingConfirmedPayload,
  parseConciergeNotes,
  postSlackMessage,
} from "@/lib/slack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Helper: walk a nested object via candidate paths until one resolves.
function pick<T = string>(
  obj: unknown,
  paths: string[]
): T | undefined {
  for (const path of paths) {
    const parts = path.split(".");
    let cur: unknown = obj;
    let ok = true;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        ok = false;
        break;
      }
    }
    if (ok && cur !== undefined && cur !== null && cur !== "") {
      return cur as T;
    }
  }
  return undefined;
}

// zcal sends one of these event types; we only act on the create event.
const CREATE_EVENTS = new Set([
  "event_scheduled",
  "event.scheduled",
  "scheduled",
  "booking_created",
  "booking.created",
  "created",
]);

export async function POST(request: Request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[zcal-webhook] SLACK_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { ok: false, error: "Slack webhook not configured" },
      { status: 200 } // 200 anyway so zcal doesn't retry-storm us
    );
  }

  // Optional shared-secret check.
  const expectedSecret = process.env.ZCAL_WEBHOOK_SECRET;
  if (expectedSecret) {
    const provided =
      request.headers.get("x-zcal-secret") ??
      request.headers.get("x-webhook-secret") ??
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (provided !== expectedSecret) {
      console.warn("[zcal-webhook] secret mismatch — refusing");
      return NextResponse.json({ ok: false }, { status: 401 });
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

  // Identify the event type. Some platforms send {type}, others {event_type}.
  const eventType =
    pick<string>(payload, [
      "event_type",
      "event",
      "type",
      "data.event_type",
      "data.type",
    ]) ?? "unknown";

  if (!CREATE_EVENTS.has(eventType)) {
    // Reschedule/cancel/other — acknowledge but don't notify (for now).
    return NextResponse.json({ ok: true, ignored: eventType });
  }

  // Booking time — try common shapes.
  const bookingTime =
    pick<string>(payload, [
      "booking.start_time",
      "booking.startTime",
      "booking.datetime",
      "event.start_time",
      "event.startTime",
      "data.start_time",
      "data.startTime",
      "start_time",
      "startTime",
      "datetime",
    ]) ?? undefined;

  const bookingTimeZone =
    pick<string>(payload, [
      "booking.timezone",
      "booking.time_zone",
      "event.timezone",
      "event.time_zone",
      "data.timezone",
      "timezone",
      "time_zone",
    ]) ?? undefined;

  const guestEmail =
    pick<string>(payload, [
      "guest.email",
      "booker.email",
      "attendee.email",
      "invitee.email",
      "data.email",
      "email",
    ]) ?? undefined;

  const guestName =
    pick<string>(payload, [
      "guest.name",
      "booker.name",
      "attendee.name",
      "invitee.name",
      "data.name",
      "name",
    ]) ?? undefined;

  // Notes — zcal stores prefilled `notes=` as the booking's notes/message.
  // Field is variously called "notes", "message", "additional_info", etc.
  const conciergeNotes =
    pick<string>(payload, [
      "booking.notes",
      "booking.message",
      "booking.additional_info",
      "event.notes",
      "event.message",
      "data.notes",
      "data.message",
      "notes",
      "message",
      "additional_info",
    ]) ?? undefined;

  const { programName, parsed } = parseConciergeNotes(conciergeNotes);

  const slackPayload = buildBookingConfirmedPayload({
    zcalEvent: eventType,
    bookingTime,
    bookingTimeZone,
    guestName,
    guestEmail,
    conciergeNotes,
    programName,
    parsed,
    rawPayload: payload,
    includeRawPayload: process.env.ZCAL_DEBUG_PAYLOAD === "true",
  });

  const result = await postSlackMessage(webhookUrl, slackPayload);
  if (!result.ok) {
    console.error("[zcal-webhook] Slack notify failed:", result.error);
  }

  // Always 200 to zcal — Slack failures are our problem, not theirs.
  return NextResponse.json({ ok: result.ok });
}

// Light GET handler so you can hit the URL in a browser to confirm it's
// reachable (returns 405 — fine, just lets us verify the route resolves).
export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: "POST only — this endpoint receives zcal webhooks.",
    },
    { status: 405 }
  );
}
