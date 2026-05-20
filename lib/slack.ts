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

const BOOKING_URL = "https://zcal.co/mochicollective/consultation";

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
 *
 * Structured parsing uses zcal's customQuestionAnswers (Q/A pairs) as the
 * canonical source — more reliable than parsing our prefilled `notes`
 * field. The notes are still included verbatim as a final block for
 * operator-side context.
 * ───────────────────────────────────────────────────────────────── */

export type ParsedBooking = {
  bookingTimeISO?: string;
  bookingTimeZone?: string;
  durationMinutes?: number;
  guestName?: string;
  guestEmail?: string;
  meetingUrl?: string;
  programName?: string;
  programBlurb?: string;
  type?: string;
  timing?: string;
  budget?: string;
  pressurePoints?: string;
  additionalContext?: string;
  /** Verbatim concierge notes (our prefilled `notes=` field). */
  notes?: string;
};

export type BookingConfirmedInput = {
  zcalEvent?: string;
  parsed: ParsedBooking;
  rawPayload?: unknown;
  includeRawPayload?: boolean;
};

function formatBookingTime(iso: string, tz: string | undefined): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz ?? "UTC",
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(d);
  } catch {
    return iso;
  }
}

export function buildBookingConfirmedPayload(
  input: BookingConfirmedInput
): unknown {
  const {
    parsed,
    rawPayload,
    includeRawPayload = false,
  } = input;

  const fields: { type: "mrkdwn"; text: string }[] = [];

  if (parsed.bookingTimeISO) {
    const formatted = formatBookingTime(
      parsed.bookingTimeISO,
      parsed.bookingTimeZone
    );
    const duration = parsed.durationMinutes
      ? ` · ${parsed.durationMinutes} min`
      : "";
    fields.push({
      type: "mrkdwn",
      text: `*Booked time*\n${formatted}${duration}`,
    });
  }

  if (parsed.guestName || parsed.guestEmail) {
    const who = [parsed.guestName, parsed.guestEmail].filter(Boolean).join(" · ");
    fields.push({ type: "mrkdwn", text: `*Guest*\n${who}` });
  }

  if (parsed.type) {
    fields.push({ type: "mrkdwn", text: `*Type*\n${parsed.type}` });
  }
  if (parsed.timing) {
    fields.push({ type: "mrkdwn", text: `*Timing*\n${parsed.timing}` });
  }
  if (parsed.budget) {
    fields.push({ type: "mrkdwn", text: `*Budget*\n${parsed.budget}` });
  }
  if (parsed.pressurePoints) {
    fields.push({
      type: "mrkdwn",
      text: `*Pressure points*\n${parsed.pressurePoints}`,
    });
  }

  const blocks: unknown[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: ":white_check_mark: *Discovery call booked via Mochi Concierge*",
      },
    },
  ];

  if (parsed.programName) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: parsed.programBlurb
          ? `*Suggested program:* ${parsed.programName}\n> ${parsed.programBlurb}`
          : `*Suggested program:* ${parsed.programName}`,
      },
    });
  }

  if (parsed.meetingUrl) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:movie_camera: *Meeting link:* <${parsed.meetingUrl}|${parsed.meetingUrl}>`,
      },
    });
  }

  if (fields.length > 0) {
    blocks.push({ type: "section", fields: fields.slice(0, 10) });
  }

  if (parsed.additionalContext) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Additional context from guest:*\n> ${parsed.additionalContext}`,
      },
    });
  }

  blocks.push({ type: "divider" });

  if (parsed.notes) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Concierge submission (raw notes)*\n```" + parsed.notes + "```",
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
      fallback: `Discovery call booked${parsed.programName ? ` — ${parsed.programName}` : ""}`,
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
    text: `Discovery call booked${parsed.programName ? ` — ${parsed.programName}` : ""}`,
    blocks,
    attachments,
  };
}

/* ─────────────────────────────────────────────────────────────────
 * Parsers
 * ───────────────────────────────────────────────────────────────── */

type RawCustomAnswer = {
  question: string;
  answer: string | string[];
};

/**
 * Parse the structured customQuestionAnswers array from zcal's payload.
 * Field matching is done by case-insensitive substring on the question
 * text, so minor edits to question labels in zcal admin won't break this.
 */
export function parseCustomAnswers(
  answers: RawCustomAnswer[] | undefined
): {
  type?: string;
  timing?: string;
  budget?: string;
  pressurePoints?: string;
  suggestedProgramRaw?: string;
  additionalContext?: string;
} {
  if (!Array.isArray(answers)) return {};
  const result: ReturnType<typeof parseCustomAnswers> = {};

  for (const item of answers) {
    if (!item?.question || item?.answer == null) continue;
    const q = item.question.toLowerCase();
    const a = Array.isArray(item.answer)
      ? item.answer.join(", ")
      : String(item.answer);

    if (q.includes("type of program") || q === "type") {
      result.type = a;
    } else if (q.includes("pressure")) {
      result.pressurePoints = a;
    } else if (q.includes("timing")) {
      result.timing = a;
    } else if (q.includes("budget")) {
      result.budget = a;
    } else if (
      q.includes("suggested") ||
      q.includes("mochi-suggested") ||
      q.includes("program + notes")
    ) {
      result.suggestedProgramRaw = a;
    } else if (
      q.includes("additional context") ||
      q.includes("additonal context") || // [sic] — matches zcal's existing typo if present
      q.includes("anything else")
    ) {
      result.additionalContext = a;
    }
  }
  return result;
}

/**
 * The "Mochi-suggested program + notes" answer is formatted as
 *   "<ProgramName> — <Blurb>"
 * (em-dash with single spaces). Split on the first occurrence to recover
 * the program name and blurb cleanly.
 */
export function splitSuggestedProgram(
  raw: string | undefined
): { programName?: string; programBlurb?: string } {
  if (!raw) return {};
  // Prefer the em-dash separator since that's what we use.
  const emDashSplit = raw.split(/\s+—\s+/);
  if (emDashSplit.length >= 2) {
    return {
      programName: emDashSplit[0].trim(),
      programBlurb: emDashSplit.slice(1).join(" — ").trim(),
    };
  }
  // Fall back to a colon-or-hyphen separator if format ever drifts.
  const altSplit = raw.split(/\s+[-:]\s+/);
  if (altSplit.length >= 2) {
    return {
      programName: altSplit[0].trim(),
      programBlurb: altSplit.slice(1).join(" — ").trim(),
    };
  }
  return { programName: raw.trim() };
}

/* Re-export for any future server-side caller that needs the human summary. */
export { buildSummary };
