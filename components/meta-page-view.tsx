"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView, trackViewContent } from "@/lib/analytics";

/**
 * Fires Meta PageView (and ViewContent on content pages) on every route
 * change, with a deduplication ID shared by the Pixel and the Conversions API.
 *
 * Two things this fixes:
 *
 * 1. The base Pixel snippet calls `fbq('track','PageView')` once, inline, on
 *    hard load. In the App Router every subsequent navigation is client-side,
 *    so those page views were never recorded at all.
 * 2. That inline call carried no eventID, so it could not be deduplicated
 *    against a server event. PageView is the highest-volume event on the site
 *    and was the bulk of the browser-vs-server gap Events Manager flagged.
 */

/** Pages that count as "content" for ViewContent. `/thoughts/` keeps the
 *  trailing slash so the index itself stays a plain PageView. */
const CONTENT_PREFIXES = [
  "/thoughts/",
  "/impact-measurement",
  "/brand-experience",
  "/conferences-and-events",
  "/sponsor-programs",
  "/community-and-membership",
];

/** "6 Questions … | Mochi Collective" → "6 Questions …" */
function cleanTitle(): string {
  if (typeof document === "undefined") return "";
  return document.title.replace(/\s*[|—]\s*Mochi Collective\s*$/, "").trim();
}

export function MetaPageView() {
  const pathname = usePathname();
  // React 18 StrictMode double-invokes effects in dev; this also stops a
  // re-render from re-firing the same page.
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;

    trackPageView();

    if (CONTENT_PREFIXES.some((p) => pathname.startsWith(p))) {
      const section = pathname.split("/").filter(Boolean)[0] ?? "content";
      trackViewContent(cleanTitle() || pathname, section);
    }
  }, [pathname]);

  return null;
}
