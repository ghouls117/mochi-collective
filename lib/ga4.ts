/**
 * GA4 Measurement Protocol — server-side event sender.
 *
 * Used by /api/zcal-webhook to report `zcal_invite_submit` when a booking is
 * actually CONFIRMED, rather than when someone clicks through to zcal. Click
 * tracking over-reports: people open the scheduler and abandon at the
 * time-slot step often enough that the two numbers diverge badly.
 *
 * ── The attribution caveat, read this before trusting the report ──
 *
 * GA4 ties an event to a user through `client_id`, which lives in the
 * visitor's `_ga` cookie in their browser. zcal posts to us server-to-server
 * and has no access to that cookie, so a webhook-fired event cannot carry the
 * real client_id unless we deliberately smuggle it through the booking form.
 *
 * We don't (yet). So today:
 *   - the CONVERSION COUNT is accurate — one event per confirmed booking
 *   - the ATTRIBUTION is not — GA4 sees a brand-new user with no prior
 *     session, so source/medium reads as (direct)/(none), and the booking
 *     will NOT be credited to the LinkedIn campaign or the UTM that drove it
 *
 * If campaign-level credit matters, the fix is to carry the client_id into
 * zcal as a prefill field and read it back off the webhook payload — see
 * `clientId` below, which already accepts a real one. Confirming that zcal
 * echoes custom params back needs exactly one test booking with
 * ZCAL_DEBUG_PAYLOAD=true, which dumps the full payload to the logs.
 *
 * Required env:
 *   NEXT_PUBLIC_GA_ID  — already set (the G-XXXXXXX measurement ID)
 *   GA4_API_SECRET     — create in GA4: Admin → Data Streams → [stream] →
 *                        Measurement Protocol API secrets → Create
 *
 * Missing env is a no-op, not a throw: analytics must never break a booking.
 */

const MP_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const MP_DEBUG_ENDPOINT = "https://www.google-analytics.com/debug/mp/collect";

export type Ga4Result = { ok: true } | { ok: false; error: string };

export type Ga4EventParams = {
  /** Event name as it appears in GA4. Must match the key event exactly. */
  name: string;
  /**
   * The visitor's real GA4 client_id (`_ga` cookie) when we have one.
   * When absent, a stable synthetic id is derived from `fallbackSeed` so
   * retries of the same booking collapse onto one user rather than inflating
   * the user count.
   */
  clientId?: string;
  /** Stable per-booking string (the zcal booking id) used for the synthetic id. */
  fallbackSeed: string;
  /** Event-scoped parameters. Registered as custom dimensions in GA4 to report on. */
  params?: Record<string, string | number | undefined>;
};

/**
 * Deterministic synthetic client_id in GA4's conventional
 * `<random>.<timestamp>` shape.
 *
 * Derived from the booking id, so a webhook retry produces the same id and
 * GA4 treats it as the same user instead of a second one.
 */
function syntheticClientId(seed: string): string {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const left = (h >>> 0).toString();
  // Second component is conventionally a unix timestamp; a second hash keeps
  // the whole id a pure function of the seed.
  let h2 = 5381;
  for (let i = 0; i < seed.length; i += 1) {
    h2 = (Math.imul(h2, 33) + seed.charCodeAt(i)) | 0;
  }
  const right = Math.abs(h2).toString();
  return `${left}.${right}`;
}

export async function sendGa4Event(event: Ga4EventParams): Promise<Ga4Result> {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId) return { ok: false, error: "NEXT_PUBLIC_GA_ID is not set" };
  if (!apiSecret) return { ok: false, error: "GA4_API_SECRET is not set" };

  const clientId = event.clientId || syntheticClientId(event.fallbackSeed);

  // Strip undefined — GA4 rejects null-valued params outright.
  const params: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(event.params ?? {})) {
    if (v !== undefined && v !== "") params[k] = v;
  }

  // Without engagement_time_msec the event lands but doesn't register user
  // engagement, which suppresses it in several standard reports.
  params.engagement_time_msec = 1;
  // Pins the event to one session rather than letting GA4 invent one per hit.
  params.session_id = clientId.split(".")[1] ?? "1";

  const body = {
    client_id: clientId,
    // Server-side hits carry no user agent or timezone; without this GA4
    // resolves geography from OUR server's IP, not the visitor's.
    non_personalized_ads: false,
    events: [{ name: event.name, params }],
  };

  const debug = process.env.GA4_DEBUG === "true";
  const url = `${debug ? MP_DEBUG_ENDPOINT : MP_ENDPOINT}?measurement_id=${encodeURIComponent(
    measurementId
  )}&api_secret=${encodeURIComponent(apiSecret)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // The production endpoint answers 204 with an empty body and validates
    // NOTHING — a malformed event is silently dropped. GA4_DEBUG=true swaps in
    // the validation endpoint, which returns the actual complaints.
    if (debug) {
      const text = await res.text();
      console.log(`[ga4] debug validation response: ${text}`);
    }

    if (!res.ok) {
      return { ok: false, error: `GA4 MP returned HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "unknown GA4 MP error",
    };
  }
}
