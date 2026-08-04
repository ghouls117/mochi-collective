import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Bundle the Thoughts markdown into every route that reads it.
   *
   * sitemap.ts, /thoughts and the post pages all call getPublishedPosts(),
   * which reads content/thoughts/*.md at request time via a dynamic
   * readdirSync(process.cwd() + "/content/thoughts"). Next's file tracer
   * can't follow that dynamic path, and for the sitemap MetadataRoute it
   * omitted the markdown entirely — so at Vercel's 15-minute ISR
   * revalidation getPublishedPosts() returned [] and every article silently
   * dropped out of sitemap.xml (SEO re-audit 2026-07-23, finding N11).
   *
   * The page routes happened to get the markdown traced anyway; the sitemap
   * did not. Declaring the include for all three makes the content a
   * guaranteed part of each function bundle so this can't regress again.
   */
  outputFileTracingIncludes: {
    "/sitemap.xml": ["./content/**/*"],
    "/thoughts": ["./content/**/*"],
    "/thoughts/[category]/[slug]": ["./content/**/*"],
    // llms.txt lists every published essay and llms-full.txt inlines their
    // full bodies — both call getPublishedPosts(), so they need the markdown
    // bundled for the same reason the sitemap does.
    "/llms.txt": ["./content/**/*"],
    "/llms-full.txt": ["./content/**/*"],
  },
};

export default nextConfig;
