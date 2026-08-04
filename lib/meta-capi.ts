/**
 * Meta Conversions API (CAPI) helper.
 *
 * Sends server-side conversion events to Meta's Graph API so we can attribute
 * off-site conversions (e.g., a zcal booking confirmation that happens on
 * zcal's domain) to the Meta ad campaign that drove the original visit.
 *
 * Per Meta's spec, all user identifiers (email, name, country) must be
 * normalised (lowercase, trimmed) and SHA-256 hashed before sending.
 *
 * Env vars:
 *   META_CAPI_ACCESS_TOKEN — required, secret (Vercel env var, Sensitive ON).
 *   NEXT_PUBLIC_META_PIXEL_ID — the dataset/pixel ID (already set for client pixel).
 *   META_TEST_EVENT_CODE — optional. When set, events fire as test events
 *                          (visible in Events Manager → Test Events, but
 *                          don't pollute real ad-attribution data).
 */

import { createHash } from "node:crypto";

const META_API_VERSION = "v20.0";

export type MetaUserData = {
  email?: string;
  firstName?: string;
  lastName?: string;
  /** IANA timezone, e.g. "Asia/Singapore". Used to derive country code. */
  timezone?: string;
  /**
   * Browser identifiers, read server-side from the request. These are the
   * single biggest lever on Meta's Event Match Quality score — a CAPI event
   * without them is close to unattributable, and can't be matched against the
   * browser event it's meant to deduplicate with.
   *
   * Per Meta's spec these are sent RAW, never hashed (unlike email/name).
   */
  /** `_fbp` cookie — the Meta browser ID set by the Pixel. */
  fbp?: string;
  /** `_fbc` cookie, or derived from an `fbclid` query param — click ID. */
  fbc?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
};

/**
 * Event names we send. Must match the browser Pixel's event names exactly —
 * Meta deduplicates on the (event_name, event_id) pair, so a mismatch on
 * either side means the event is counted twice instead of merged.
 */
export type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Contact"
  | "Schedule"
  | "Purchase"
  | "CompleteRegistration";

export type MetaEventParams = {
  /** Standard Meta event name. */
  eventName: MetaEventName;
  /** Stable identifier for this event — used by Meta to dedupe with the
   *  client-side Pixel if both fire the same event. */
  eventId: string;
  /** Time of the underlying user action. Defaults to "now". */
  eventTime?: Date;
  /** URL where the event originated. Defaults to https://mochicollective.com */
  sourceUrl?: string;
  userData: MetaUserData;
  /** Arbitrary key/value metadata about the event (program name, value, etc). */
  customData?: Record<string, unknown>;
};

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

/** Lowercase, trim, then SHA-256 hash. Returns undefined for empty input. */
function normalizeAndHash(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const trimmed = input.trim().toLowerCase();
  return trimmed ? sha256(trimmed) : undefined;
}

/**
 * Map a common IANA timezone to an ISO 3166-1 alpha-2 country code.
 * Covers the regions Mochi Collective is most likely to see; falls back to
 * undefined for anything unmapped (Meta accepts missing country fine).
 */
function timezoneToCountryCode(tz?: string): string | undefined {
  if (!tz) return undefined;
  const map: Record<string, string> = {
    "asia/singapore": "sg",
    "asia/hong_kong": "hk",
    "asia/tokyo": "jp",
    "asia/seoul": "kr",
    "asia/bangkok": "th",
    "asia/jakarta": "id",
    "asia/kuala_lumpur": "my",
    "asia/manila": "ph",
    "asia/dubai": "ae",
    "asia/kolkata": "in",
    "asia/shanghai": "cn",
    "asia/taipei": "tw",
    "australia/sydney": "au",
    "australia/melbourne": "au",
    "europe/london": "gb",
    "europe/paris": "fr",
    "europe/berlin": "de",
    "europe/amsterdam": "nl",
    "europe/madrid": "es",
    "europe/rome": "it",
    "america/new_york": "us",
    "america/los_angeles": "us",
    "america/chicago": "us",
    "america/denver": "us",
    "america/toronto": "ca",
    "america/vancouver": "ca",
  };
  return map[tz.toLowerCase()];
}

/**
 * Send a single event to Meta's Conversions API. Returns ok/error without
 * throwing — CAPI failures should never bubble up and block the webhook
 * response (which would cause zcal to retry).
 */
export async function sendCapiEvent(
  params: MetaEventParams
): Promise<{ ok: true } | { ok: false; error: string }> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!accessToken) {
    return { ok: false, error: "META_CAPI_ACCESS_TOKEN is not set" };
  }
  if (!pixelId) {
    return { ok: false, error: "NEXT_PUBLIC_META_PIXEL_ID is not set" };
  }

  const userData: Record<string, string> = {};
  const emHash = normalizeAndHash(params.userData.email);
  if (emHash) userData.em = emHash;
  const fnHash = normalizeAndHash(params.userData.firstName);
  if (fnHash) userData.fn = fnHash;
  const lnHash = normalizeAndHash(params.userData.lastName);
  if (lnHash) userData.ln = lnHash;
  const countryCode = timezoneToCountryCode(params.userData.timezone);
  if (countryCode) userData.country = sha256(countryCode);

  // Browser/network identifiers go RAW — Meta hashes nothing here, and
  // hashing them would break matching entirely.
  if (params.userData.fbp) userData.fbp = params.userData.fbp;
  if (params.userData.fbc) userData.fbc = params.userData.fbc;
  if (params.userData.clientIpAddress)
    userData.client_ip_address = params.userData.clientIpAddress;
  if (params.userData.clientUserAgent)
    userData.client_user_agent = params.userData.clientUserAgent;

  const event = {
    event_name: params.eventName,
    event_time: Math.floor(
      (params.eventTime?.getTime() ?? Date.now()) / 1000
    ),
    event_id: params.eventId,
    event_source_url: params.sourceUrl ?? "https://mochicollective.com",
    action_source: "website",
    user_data: userData,
    custom_data: params.customData ?? {},
  };

  const body: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };
  const testCode = process.env.META_TEST_EVENT_CODE;
  if (testCode) {
    body.test_event_code = testCode;
  }

  try {
    const url = `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        error: `Meta returned ${res.status}: ${text.slice(0, 300)}`,
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
