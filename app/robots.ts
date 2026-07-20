import type { MetadataRoute } from "next";

const SITE_URL = "https://mochicollective.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /l/* is the internal link shortener — every URL under it is
        // a 302 redirect, not real content. Disallow so crawlers don't
        // treat short-link URLs as canonical duplicates of their
        // destinations and don't waste crawl budget on redirects.
        disallow: "/l/",
        // Vercel preview URLs auto-serve a separate robots.txt that blocks
        // crawling, so no per-environment logic is needed here.
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
