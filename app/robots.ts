import type { MetadataRoute } from "next";

const SITE_URL = "https://mochicollective.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Vercel preview URLs auto-serve a separate robots.txt that blocks
        // crawling, so no per-environment logic is needed here.
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
