import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/thoughts";

/**
 * Regenerate the sitemap every 15 minutes so scheduled posts appear
 * (and get submitted to search engines) on their publish_date without
 * a manual redeploy.
 */
export const revalidate = 900;

const SITE_URL = "https://mochicollective.com";

/** Read a source file's real mtime so legal-page lastmod reflects the
 * last content change (nav additions, sameAs growth) rather than a
 * hand-pinned date that drifts stale. */
function fileLastModified(relPath: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), relPath)).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}${p.urlPath}`,
    lastModified: new Date(`${p.publish_date}T00:00:00+08:00`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/thoughts`,
      lastModified: new Date(),
      changeFrequency: posts.length > 0 ? "weekly" : "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/impact-measurement`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...postEntries,
    {
      url: `${SITE_URL}/privacy`,
      lastModified: fileLastModified("app/privacy/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: fileLastModified("app/terms/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
