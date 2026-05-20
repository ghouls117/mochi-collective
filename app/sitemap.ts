import type { MetadataRoute } from "next";

const SITE_URL = "https://mochicollective.com";

/**
 * Single-page marketing site for now. The named in-page anchors aren't
 * separate URLs from a search-engine standpoint, so we only emit the root.
 * Add real routes here as they're built (e.g. /case-studies, /journal).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
