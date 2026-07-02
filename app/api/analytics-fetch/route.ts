/**
 * GET /api/analytics-fetch?token=<ANALYTICS_FETCH_URL_TOKEN>
 *
 * Server-side proxy to the Microsoft Clarity Data Export API. Called
 * weekly by the digest generator to pull Clarity metrics for the site.
 *
 * We use a proxy (rather than calling Clarity directly from the client
 * or the scheduled task) so the CLARITY_API_TOKEN never leaves Vercel's
 * env. The scheduled task only ever sees the URL token, which is
 * cheap to rotate.
 *
 * Clarity API constraints (as of 2026):
 *   - numOfDays param supports 1, 2, or 3 only. No arbitrary date ranges.
 *   - Rate limit: 10 requests per day per project.
 *   - Auth: Bearer <token> in Authorization header.
 *   - Response: array of metric objects, one per {metricName, information[]}.
 *
 * Env vars:
 *   CLARITY_API_TOKEN          — required. Bearer token from Clarity project.
 *   ANALYTICS_FETCH_URL_TOKEN  — required. Auth for callers of this route.
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CLARITY_ENDPOINT =
  "https://www.clarity.ms/export-data/api/v1/project-live-insights";

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

/**
 * Fetch a single Clarity insights window. Optionally scoped by one
 * dimension so the caller can build slices (e.g. by URL, by Device).
 */
async function fetchClarity(
  token: string,
  numOfDays: 1 | 2 | 3,
  dimension1?: string
): Promise<unknown> {
  const params = new URLSearchParams({ numOfDays: String(numOfDays) });
  if (dimension1) params.set("dimension1", dimension1);

  const res = await fetch(`${CLARITY_ENDPOINT}?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Clarity API returned ${res.status} ${res.statusText}: ${body.slice(0, 200)}`
    );
  }

  return res.json();
}

export async function GET(request: Request) {
  const clarityToken = process.env.CLARITY_API_TOKEN;
  const expectedUrlToken = process.env.ANALYTICS_FETCH_URL_TOKEN;

  if (!clarityToken) {
    console.error("[analytics-fetch] CLARITY_API_TOKEN is not configured");
    return NextResponse.json(
      { ok: false, error: "clarity_token_missing" },
      { status: 500 }
    );
  }

  if (!expectedUrlToken) {
    console.error(
      "[analytics-fetch] ANALYTICS_FETCH_URL_TOKEN is not configured — refusing"
    );
    return NextResponse.json(
      { ok: false, error: "url_token_not_configured" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const providedToken = url.searchParams.get("token") ?? "";
  if (!providedToken || !safeEqual(providedToken, expectedUrlToken)) {
    return NextResponse.json(
      { ok: false, error: "auth_failed" },
      { status: 401 }
    );
  }

  // Optional overrides for testing. Defaults to 3-day window with no dim.
  const numOfDaysRaw = Number(url.searchParams.get("days") ?? "3");
  const numOfDays: 1 | 2 | 3 =
    numOfDaysRaw === 1 || numOfDaysRaw === 2 ? numOfDaysRaw : 3;

  // The Clarity API returns different information depending on dimension1.
  // We issue up to 4 calls to build a rounded picture: overall metrics +
  // slices by URL, Device, and Source. Each call counts toward the daily
  // 10-request quota, so we cap here to leave headroom.
  const [overall, byUrl, byDevice, bySource] = await Promise.all([
    fetchClarity(clarityToken, numOfDays).catch((e) => ({
      error: String(e.message ?? e),
    })),
    fetchClarity(clarityToken, numOfDays, "URL").catch((e) => ({
      error: String(e.message ?? e),
    })),
    fetchClarity(clarityToken, numOfDays, "Device").catch((e) => ({
      error: String(e.message ?? e),
    })),
    fetchClarity(clarityToken, numOfDays, "Source").catch((e) => ({
      error: String(e.message ?? e),
    })),
  ]);

  return NextResponse.json({
    ok: true,
    fetchedAt: new Date().toISOString(),
    window: { numOfDays },
    clarity: {
      overall,
      byUrl,
      byDevice,
      bySource,
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
