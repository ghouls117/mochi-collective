/**
 * POST /api/meta-event
 *
 * Server-side mirror of a browser Pixel event, for Meta's Conversions API.
 *
 * Why this exists: Events Manager reported the server sending ~129 fewer
 * events than the browser, plus weak deduplication keys. Both had the same
 * root cause — the browser fired `fbq('track', …)` with no eventID, and the
 * only CAPI call in the codebase was the zcal booking webhook. So there was
 * nothing to deduplicate against and almost nothing server-side to count.
 *
 * The client now generates one event ID per event, passes it to fbq as
 * `{eventID}`, and posts the same ID here. Meta merges the pair on
 * (event_name, event_id) and counts one conversion instead of two — or
 * recovers the event entirely when the browser call is lost to an ad
 * blocker, ITP, or a dropped beacon.
 *
 * This route adds what only the server can see: the `_fbp` / `_fbc` cookies,
 * the real client IP, and the user agent. Those drive Meta's Event Match
 * Quality score, and without them a CAPI event is largely unattributable.
 *
 * Never throws and never blocks the UI — analytics failures are always
 * swallowed and reported as ok:false.
 */

import { NextResponse } from "next/server";
import { sendCapiEvent, type MetaEventName } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Only mirror events the browser Pixel actually fires. */
const ALLOWED_EVENTS: MetaEventName[] = [
  "PageView",
  "ViewContent",
  "Lead",
  "Contact",
];

const PRODUCTION_HOST = "mochicollective.com";

type Body = {
  eventName: MetaEventName;
  eventId: string;
  sourceUrl?: string;
  customData?: Record<string, unknown>;
};

function isValidBody(b: unknown): b is Body {
  if (!b || typeof b !== "object") return false;
  const x = b as Record<string, unknown>;
  if (typeof x.eventId !== "string" || !x.eventId) return false;
  if (typeof x.eventName !== "string") return false;
  return ALLOWED_EVENTS.includes(x.eventName as MetaEventName);
}

function readCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("=")) || undefined;
  }
  return undefined;
}

/** First entry of x-forwarded-for is the originating client on Vercel. */
function clientIp(request: Request): string | undefined {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

/**
 * Meta's click ID. Normally the Pixel writes it to the `_fbc` cookie, but on
 * the very first pageview of an ad click the cookie may not exist yet while
 * `fbclid` is still in the URL — so synthesise it in Meta's documented
 * `fb.1.<creation_time_ms>.<fbclid>` format.
 */
function resolveFbc(cookieHeader: string | null, sourceUrl?: string): string | undefined {
  const cookie = readCookie(cookieHeader, "_fbc");
  if (cookie) return cookie;
  if (!sourceUrl) return undefined;
  try {
    const fbclid = new URL(sourceUrl).searchParams.get("fbclid");
    if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  } catch {
    /* malformed URL — no fbc */
  }
  return undefined;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  // Mirror the client-side production guard so preview deployments and local
  // dev can't pollute real ad-attribution data.
  let sourceHost: string | undefined;
  try {
    sourceHost = body.sourceUrl ? new URL(body.sourceUrl).hostname : undefined;
  } catch {
    sourceHost = undefined;
  }
  if (sourceHost !== PRODUCTION_HOST) {
    return NextResponse.json({ ok: false, reason: "non_production" });
  }

  const cookieHeader = request.headers.get("cookie");

  const result = await sendCapiEvent({
    eventName: body.eventName,
    eventId: body.eventId,
    sourceUrl: body.sourceUrl,
    userData: {
      fbp: readCookie(cookieHeader, "_fbp"),
      fbc: resolveFbc(cookieHeader, body.sourceUrl),
      clientIpAddress: clientIp(request),
      clientUserAgent: request.headers.get("user-agent") ?? undefined,
    },
    customData: body.customData,
  });

  if (!result.ok) {
    console.error("[meta-event] CAPI send failed:", result.error);
  }
  return NextResponse.json({ ok: result.ok });
}
