import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/thoughts";
import { PRACTICE_LIST } from "@/lib/practices";

/**
 * Regenerate the sitemap every 15 minutes so scheduled posts appear
 * (and get submitted to search engines) on their publish_date without
 * a manual redeploy. The content markdown is bundled into this route's
 * function via outputFileTracingIncludes (see next.config.ts) — without
 * that, getPublishedPosts() returns [] at revalidation and the articles
 * drop out of the sitemap.
 */
export const revalidate = 900;

const SITE_URL = "https://mochicollective.com";

/**
 * Content-modified dates for the static pages, in Asia/Singapore time.
 *
 * Deliberately hardcoded rather than read from source-file mtime: on Vercel
 * every file is checked out fresh at deploy, which resets all mtimes to the
 * build time — so an mtime-based lastmod collapses every URL onto one
 * identical build timestamp (SEO re-audit 2026-07-23, finding N12). Bump the
 * relevant date here when a page's content meaningfully changes.
 */
const PAGE_LASTMOD: Record<string, string> = {
  home: "2026-07-19",
  impact: "2026-07-19",
  privacy: "2026-07-22",
  terms: "2026-07-22",
  practices: "2026-08-03",
};

/** Local-midnight Date for a YYYY-MM-DD string in Asia/Singapore (+08:00). */
function sgDate(day: string): Date {
  return new Date(`${day}T00:00:00+08:00`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}${p.urlPath}`,
    lastModified: sgDate(p.publish_date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // The /thoughts index is as fresh as its newest published post.
  const newestPostDay = posts[0]?.publish_date;

  // The four practice pages (Impact Measurement has its own bespoke entry below).
  const practiceEntries: MetadataRoute.Sitemap = PRACTICE_LIST.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: sgDate(PAGE_LASTMOD.practices),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: sgDate(PAGE_LASTMOD.home),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/thoughts`,
      lastModified: newestPostDay ? sgDate(newestPostDay) : sgDate(PAGE_LASTMOD.home),
      changeFrequency: posts.length > 0 ? "weekly" : "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/impact-measurement`,
      lastModified: sgDate(PAGE_LASTMOD.impact),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...practiceEntries,
    ...postEntries,
    {
      url: `${SITE_URL}/privacy`,
      lastModified: sgDate(PAGE_LASTMOD.privacy),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: sgDate(PAGE_LASTMOD.terms),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
