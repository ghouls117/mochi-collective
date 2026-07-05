import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/thoughts";

const SITE_URL = "https://mochicollective.com";

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
      lastModified: new Date("2026-05-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2026-05-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
