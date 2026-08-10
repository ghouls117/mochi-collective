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
      params?: Record<string, unknown>,
      /** `{ eventID }` — the deduplication key paired with the CAPI event. */
      options?: { eventID?: string }
    ) => void;
    gtag?: (
      command: "event" | "config" | "consent" | "set",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    clarity?: (...args: unknown[]) => void;
    /** LinkedIn Insight Tag — `window.lintrk('track', { conversion_id })`. */
    lintrk?: (action: "track", params?: { conversion_id?: number }) => void;
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

/* ────────────────────────────────────────────────────────────── */
/* Meta Pixel + Conversions API                                     */
/* ────────────────────────────────────────────────────────────── */

/** Meta event names we fire from the browser and mirror server-side. */
type MetaBrowserEvent = "PageView" | "ViewContent" | "Lead" | "Contact";

/** Random per-event ID. Meta deduplicates on (event_name, event_id). */
function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Fire a Meta event on BOTH the browser Pixel and the Conversions API using
 * one shared event ID.
 *
 * Meta merges the pair into a single conversion. When the browser call is
 * lost — ad blocker, ITP, a beacon dropped on tab close — the server copy
 * still lands, which is the entire point of running CAPI alongside the Pixel.
 *
 * The server call is fire-and-forget with `keepalive` so it survives the page
 * unloading (the "Book a discovery call" click opens zcal in a new tab and
 * can tear this one down mid-flight).
 */
function fireMetaEvent(
  eventName: MetaBrowserEvent,
  params: Record<string, unknown> = {}
) {
  if (!isTrackingHost()) return;
  const eventId = newEventId();

  try {
    window.fbq?.("track", eventName, params, { eventID: eventId });
  } catch {
    /* swallow */
  }

  try {
    void fetch("/api/meta-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        sourceUrl: window.location.href,
        customData: params,
      }),
      keepalive: true,
    }).catch(() => {
      /* analytics must never surface an error to the user */
    });
  } catch {
    /* swallow */
  }
}

/**
 * Page view, deduplicated across Pixel + CAPI.
 *
 * Fired from <MetaPageView> on every route change. The base Pixel snippet
 * only fires PageView once per hard load, so before this, soft navigations
 * between App Router pages were invisible to Meta.
 */
export function trackPageView() {
  fireMetaEvent("PageView");
}

/** Content page viewed (essay, practice page). */
export function trackViewContent(contentName: string, contentCategory?: string) {
  fireMetaEvent("ViewContent", {
    content_name: contentName,
    ...(contentCategory ? { content_category: contentCategory } : {}),
  });
}

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

  fireMetaEvent("Lead", {
    content_name: program.name,
    content_category: "concierge_engaged",
    value: 0,
    currency: "SGD",
  });

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

  fireMetaEvent("Contact", {
    content_name: program.name,
    content_category: "booking_intent",
    value: 0,
    currency: "SGD",
  });

  try {
    window.gtag?.("event", "booking_clicked", params);
  } catch {
    /* swallow */
  }

  // No separate Google Ads conversion call here on purpose.
  //
  // The Ads conversion actions are keyed on the gtag event NAME
  // ("booking_clicked" above, "concierge_completed" in trackConciergeEngaged),
  // and the AW account is configured on every page in components/analytics.tsx.
  // That is all Google Ads needs — the event it counts is the one already
  // fired above.
  //
  // A second gtag('event','conversion',{send_to: AW-…/label}) used to live here,
  // aimed at an earlier "Page view" conversion action. With event-keyed actions
  // in place that call would let one click register against two conversion
  // actions, so it was removed.
  //
  // Still worth knowing: this counts click-through to zcal, not a confirmed
  // booking, so it over-reports. The accurate version is offline conversion
  // import — capture the GCLID on landing, carry it through the concierge, and
  // report from the zcal webhook that already fires Meta's CAPI event.

  try {
    window.clarity?.("set", "concierge_stage", "intent");
  } catch {
    /* swallow */
  }
}
