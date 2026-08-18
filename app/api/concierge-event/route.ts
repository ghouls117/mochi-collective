/**
 * POST /api/concierge-event
 *
 * Receives concierge-funnel events from the client and forwards them as
 * Slack notifications to #website-leads.
 *
 * Two event stages are accepted:
 *   - "engaged" : the user finished the 4-question concierge and saw a
 *                 recommendation. 👀
 *   - "intent"  : the user clicked "Book a Brief Diagnostic" — zcal opens
 *                 in a new tab. 💭
 *
 * (The third stage, "confirmed" ✅, fires from /api/zcal-webhook — not
 * here, because that signal originates server-to-server from zcal.)
 *
 * The body shape mirrors the concierge state machine so we don't have to
 * reconstruct it server-side. We trust the client because the only data
 * sent is the user's own selections — there's no privileged action.
 *
 * Env vars:
 *   SLACK_WEBHOOK_URL — required.
 */

import { NextResponse } from "next/server";
import {
  buildBookingIntentPayload,
  buildConciergeEngagedPayload,
  postSlackMessage,
} from "@/lib/slack";
import type { Answers, Program } from "@/components/concierge/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EventBody = {
  stage: "engaged" | "intent";
  answers: Answers;
  program: Program;
};

function isValidStage(s: unknown): s is "engaged" | "intent" {
  return s === "engaged" || s === "intent";
}

function isValidBody(b: unknown): b is EventBody {
  if (!b || typeof b !== "object") return false;
  const x = b as Record<string, unknown>;
  if (!isValidStage(x.stage)) return false;
  if (!x.answers || typeof x.answers !== "object") return false;
  if (!x.program || typeof x.program !== "object") return false;
  const program = x.program as Record<string, unknown>;
  if (typeof program.name !== "string") return false;
  if (typeof program.blurb !== "string") return false;
  return true;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[concierge-event] SLACK_WEBHOOK_URL is not configured");
    // Return ok to client — failure to notify shouldn't block the UX.
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid JSON" },
      { status: 400 }
    );
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      { ok: false, error: "invalid body shape" },
      { status: 400 }
    );
  }

  const slackPayload =
    body.stage === "engaged"
      ? buildConciergeEngagedPayload({
          answers: body.answers,
          program: body.program,
        })
      : buildBookingIntentPayload({
          answers: body.answers,
          program: body.program,
        });

  const result = await postSlackMessage(webhookUrl, slackPayload);
  if (!result.ok) {
    console.error("[concierge-event] Slack notify failed:", result.error);
  }

  return NextResponse.json({ ok: result.ok });
}
