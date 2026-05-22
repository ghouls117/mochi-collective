/**
 * Client-side analytics tracking helpers.
 *
 * Fires events on three third-party platforms when called:
 *   - Meta Pixel (fbq)             — for ad-targeting + retargeting
 *   - Google Analytics 4 (gtag)    — for funnel + traffic analysis
 *   - Microsoft Clarity (clarity)  — for heatmap session tagging
 *
 * Tracking only runs on the production host (mochicollective.com). Vercel
 * preview deployments and `npm run dev` are silent so they don't pollute
 * the production dashboards.
 *
 * If a tracking script hasn't loaded yet (env var missing, ad-blocker,
 * before-hydration), the call is silently dropped — analytics must never
 * throw and break the actual user-facing flow.
 */

import type { Answers, Program } from "@/components/concierge/data";
import {
  QUIZ_STEPS,
  pressureLabels,
} from "@/components/concierge/data";

/* ────────────────────────────────────────────────────────────── */
/* Window typings — these globals are added by the tracking scripts. */
/* ────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom" | "init",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    gtag?: (
      command: "event" | "config" | "consent" | "set",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

/* ────────────────────────────────────────────────────────────── */
/* Production-host guard                                            */
/* ────────────────────────────────────────────────────────────── */

/**
 * Whether tracking should run. True only when we're on the production
 * domain. Vercel preview URLs, local dev, and any other host are silent.
 */
export function isTrackingHost(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "mochicollective.com";
}

/* ────────────────────────────────────────────────────────────── */
/* Helpers                                                          */
/* ────────────────────────────────────────────────────────────── */

function labelFor(stepIdx: number, value: string | undefined): string | undefined {
  if (!value) return undefined;
  return QUIZ_STEPS[stepIdx].options.find((o) => o.value === value)?.label;
}

function paramsFromAnswers(answers: Answers, program: Program) {
  return {
    program_name: program.name,
    program_accent: program.accent,
    concierge_type: labelFor(0, answers.kind),
    concierge_timing: labelFor(2, answers.when),
    concierge_budget: labelFor(3, answers.budget),
    concierge_pressure: pressureLabels(answers) || undefined,
  };
}

/* ────────────────────────────────────────────────────────────── */
/* Public API                                                       */
/* ────────────────────────────────────────────────────────────── */

/**
 * Fires when a user reaches the concierge result page (👀 stage).
 * Meta event: `Lead` — flags this person as a qualified visitor.
 * GA4 event: `concierge_completed`.
 */
export function trackConciergeEngaged(answers: Answers, program: Program) {
  if (!isTrackingHost()) return;
  const params = paramsFromAnswers(answers, program);

  try {
    window.fbq?.("track", "Lead", {
      content_name: program.name,
      content_category: "concierge_engaged",
      value: 0,
      currency: "SGD",
    });
  } catch {
    /* swallow */
  }

  try {
    window.gtag?.("event", "concierge_completed", params);
  } catch {
    /* swallow */
  }

  // Tag the Clarity session so the heatmap dashboard can filter by stage.
  try {
    window.clarity?.("set", "concierge_stage", "engaged");
    window.clarity?.("set", "concierge_program", program.name);
  } catch {
    /* swallow */
  }
}

/**
 * Fires when a user clicks "Book a discovery call" (💭 stage).
 * Meta event: `Contact` — "person initiated contact with the business".
 * We use `Contact` (not `Schedule`) here so this client-side intent event
 * doesn't collide with the server-side `Schedule` event fired from
 * /api/zcal-webhook on actual booking confirmation.
 * GA4 event: `booking_clicked`.
 */
export function trackBookingIntent(answers: Answers, program: Program) {
  if (!isTrackingHost()) return;
  const params = paramsFromAnswers(answers, program);

  try {
    window.fbq?.("track", "Contact", {
      content_name: program.name,
      content_category: "booking_intent",
      value: 0,
      currency: "SGD",
    });
  } catch {
    /* swallow */
  }

  try {
    window.gtag?.("event", "booking_clicked", params);
  } catch {
    /* swallow */
  }

  try {
    window.clarity?.("set", "concierge_stage", "intent");
  } catch {
    /* swallow */
  }
}
