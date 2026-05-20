/**
 * Slack notification helpers.
 *
 * Three Block Kit message types are emitted to the #website-leads channel:
 *
 *   👀 engaged   — the user finished the 4-question concierge and saw a
 *                  recommendation, but hasn't clicked "Book a discovery
 *                  call" yet. Fired client-side from QuizResult on mount.
 *
 *   💭 intent    — the user clicked "Book a discovery call" — zcal opens
 *                  in a new tab. They may or may not actually book. Fired
 *                  client-side from QuizResult on click.
 *
 *   ✅ confirmed — zcal posted its booking webhook. They picked a time
 *                  and confirmed. Fired server-side from /api/zcal-webhook.
 *
 * The Slack webhook URL lives in SLACK_WEBHOOK_URL (Vercel env var) and
 * is server-side only — never imported into a client bundle.
 */

import type { Answers, Program } from "@/components/concierge/data";
import {
  QUIZ_STEPS,
  buildSummary,
  pressureLabels,
} from "@/components/concierge/data";

/* Brand accents used as Slack attachment stripe colours. */
const COLOR_ENGAGED = "#93ADBF"; // slate — soft signal
const COLOR_INTENT = "#F9C84A"; // honey — pending
const COLOR_CONFIRMED = "#BFDEA3"; // sage — success

/* ─────────────────────────────────────────────────────────────────
 * Posting
 * ───────────────────────────────────────────────────────────────── */

export async function postSlackMessage(
  webhookUrl: string,
  payload: unknown
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!webhookUrl) {
    return { ok: false, error: "SLACK_WEBHOOK_URL is not configured" };
  }
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Slack returned ${res.status}: ${body.slice(0, 200)}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/* ─────────────────────────────────────────────────────────────────
 * Shared helpers
 * ───────────────────────────────────────────────────────────────── */

function labelFor(stepIdx: number, value: string | undefined): string {
  if (!value) return "—";
  return (
    QUIZ_STEPS[stepIdx].options.find((o) => o.value === value)?.label ?? "—"
  );
}

function conciergeFields(answers: Answers): { type: "mrkdwn"; text: string }[] {
  return [
    { type: "mrkdwn", text: `*Type*\n${labelFor(0, answers.kind)}` },
    { type: "mrkdwn", text: `*Timing*\n${labelFor(2, answers.when)}` },
    { type: "mrkdwn", text: `*Budget*\n${labelFor(3, answers.budget)}` },
    {
      type: "mrkdwn",
      text: `*Pressure points*\n${pressureLabels(answers) || "—"}`,
    },
  ];
}

const BOOKING_URL = "https://zcal.co/mochicollective/consultation";

/* ─────────────────────────────────────────────────────────────────
 * 👀 Concierge engaged (completed, hasn't clicked Book yet)
 * ───────────────────────────────────────────────────────────────── */

export function buildConciergeEngagedPayload(input: {
  answers: Answers;
  program: Program;
}): unknown {
  const { answers, program } = input;
  return {
    text: `Concierge completed — ${program.name}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":eyes: *Concierge completed — no booking click yet*",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Suggested program:* ${program.name}\n> ${program.blurb}`,
        },
      },
      { type: "section", fields: conciergeFields(answers) },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "_Soft signal — they saw the recommendation. Reach out warmly if no booking lands in the next 24h._",
          },
        ],
      },
    ],
    attachments: [
      {
        color: COLOR_ENGAGED,
        fallback: `Concierge completed — ${program.name}`,
      },
    ],
  };
}

/* ─────────────────────────────────────────────────────────────────
 * 💭 Booking intent (clicked Book, zcal form open)
 * ───────────────────────────────────────────────────────────────── */

export function buildBookingIntentPayload(input: {
  answers: Answers;
  program: Program;
}): unknown {
  const { answers, program } = input;
  return {
    text: `Booking form opened — ${program.name}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: ":thought_balloon: *Booking form opened (not yet confirmed)*",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Suggested program:* ${program.name}\n> ${program.blurb}`,
        },
      },
      { type: "section", fields: conciergeFields(answers) },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `_If no ✅ confirmation arrives in 5–10 minutes, they likely abandoned at the time-slot step._  ↗︎ ${BOOKING_URL}`,
          },
        ],
      },
    ],
    attachments: [
      {
        color: COLOR_INTENT,
        fallback: `Booking form opened — ${program.name}`,
      },
    ],
  };
}

/* ─────────────────────────────────────────────────────────────────
 * ✅ Booking confirmed (zcal webhook)
 * ───────────────────────────────────────────────────────────────── */

export type BookingConfirmedInput = {
  zcalEvent?: string;
  bookingTime?: string;
  bookingTimeZone?: string;
  guestName?: string;
  guestEmail?: string;
  /** Full prefilled notes text — guaranteed to contain all concierge answers. */
  conciergeNotes?: string;
  /** Parsed program name if extractable. */
  programName?: string;
  /** Parsed concierge selections, when notes can be parsed. */
  parsed?: {
    type?: string;
    pressurePoints?: string;
    timing?: string;
    budget?: string;
  };
  /** Raw zcal payload — for debugging the first few bookings. */
  rawPayload?: unknown;
  includeRawPayload?: boolean;
};

export function buildBookingConfirmedPayload(
  input: BookingConfirmedInput
): unknown {
  const {
    bookingTime,
    bookingTimeZone,
    guestName,
    guestEmail,
    conciergeNotes,
    programName,
    parsed,
    rawPayload,
    includeRawPayload = false,
  } = input;

  const fields: { type: "mrkdwn"; text: string }[] = [];

  if (parsed?.type) {
    fields.push({ type: "mrkdwn", text: `*Type*\n${parsed.type}` });
  }
  if (parsed?.timing) {
    fields.push({ type: "mrkdwn", text: `*Timing*\n${parsed.timing}` });
  }
  if (parsed?.budget) {
    fields.push({ type: "mrkdwn", text: `*Budget*\n${parsed.budget}` });
  }
  if (parsed?.pressurePoints) {
    fields.push({
      type: "mrkdwn",
      text: `*Pressure points*\n${parsed.pressurePoints}`,
    });
  }
  if (bookingTime) {
    const tz = bookingTimeZone ? ` ${bookingTimeZone}` : "";
    fields.push({
      type: "mrkdwn",
      text: `*Booked time*\n${bookingTime}${tz}`,
    });
  }
  const who = [guestName, guestEmail].filter(Boolean).join(" · ");
  if (who) {
    fields.push({ type: "mrkdwn", text: `*Guest*\n${who}` });
  }

  const blocks: unknown[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":white_check_mark: *Discovery call booked via Mochi Concierge*",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: programName
          ? `*Suggested program:* ${programName}`
          : "*Suggested program:* — _(could not parse from notes)_",
      },
    },
  ];

  if (fields.length > 0) {
    blocks.push({ type: "section", fields: fields.slice(0, 10) });
  }

  blocks.push({ type: "divider" });

  if (conciergeNotes) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Concierge submission (raw notes)*\n```" + conciergeNotes + "```",
      },
    });
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `↗︎ Booking page: ${BOOKING_URL}`,
      },
    ],
  });

  const attachments: unknown[] = [
    {
      color: COLOR_CONFIRMED,
      fallback: `Discovery call booked${programName ? ` — ${programName}` : ""}`,
    },
  ];

  if (includeRawPayload && rawPayload) {
    attachments.push({
      color: COLOR_INTENT,
      title: "Raw zcal payload (debugging)",
      text:
        "```" +
        JSON.stringify(rawPayload, null, 2).slice(0, 2500) +
        "```",
    });
  }

  return {
    text: `Discovery call booked${programName ? ` — ${programName}` : ""}`,
    blocks,
    attachments,
  };
}

/* ─────────────────────────────────────────────────────────────────
 * Notes parser — extract structured concierge data from prefilled
 * notes (which we control). Used by the confirmed-booking path so we
 * can show typed fields even when zcal's payload schema surprises us.
 * ───────────────────────────────────────────────────────────────── */

const FIELD_MAP: Record<string, keyof NonNullable<BookingConfirmedInput["parsed"]>> = {
  type: "type",
  "pressure points": "pressurePoints",
  timing: "timing",
  budget: "budget",
};

export function parseConciergeNotes(notes: string | undefined): {
  programName?: string;
  parsed: NonNullable<BookingConfirmedInput["parsed"]>;
} {
  const parsed: NonNullable<BookingConfirmedInput["parsed"]> = {};
  let programName: string | undefined;

  if (!notes) return { programName, parsed };

  for (const rawLine of notes.split(/\r?\n/)) {
    const line = rawLine.trim();
    const m = line.match(/^([^:]+):\s*(.+)$/);
    if (!m) continue;
    const key = m[1].toLowerCase().trim();
    const value = m[2].trim();
    if (key === "suggested program") {
      programName = value;
      continue;
    }
    const target = FIELD_MAP[key];
    if (target) parsed[target] = value;
  }

  return { programName, parsed };
}

/* Re-export for any future server-side caller that needs the human summary. */
export { buildSummary };
