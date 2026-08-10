import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Cache fonts hard.
   *
   * Files under public/ aren't content-hashed by Next, so they inherit a
   * conservative default — the fonts were being served
   * `max-age=0, must-revalidate`, meaning every repeat visit spent a
   * round-trip revalidating each font before text could render.
   *
   * They're immutable in practice: if a face ever changes, change the
   * FILENAME too (that's the price of the long max-age).
   */
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  /**
   * Catch links published against URL shapes the site never served (or no
   * longer serves). All permanent — these are address changes, not A/B tests.
   *
   * The /blog/* set is defensive: marketing's CMS Fix Brief (10 Aug 2026)
   * states these were the `canonical_url` values on five articles, but no
   * canonical in this repo has ever contained "/blog/" (checked with
   * `git log --all -S"/blog/"` over content/thoughts). The redirects cost
   * nothing and cover links published from the marketing side.
   */
  async redirects() {
    return [
      // ── Legacy /blog/<slug> → /thoughts/<category>/<slug> ──────────
      // Explicit, not a wildcard: the category segment differs per article.
      {
        source: "/blog/6-questions-every-brief",
        destination: "/thoughts/thought-leadership/6-questions-every-brief",
        permanent: true,
      },
      {
        source: "/blog/5-brief-red-flags",
        destination: "/thoughts/thought-leadership/5-brief-red-flags",
        permanent: true,
      },
      {
        source: "/blog/first-10-minutes-brief",
        destination: "/thoughts/thought-leadership/first-10-minutes-brief",
        permanent: true,
      },
      {
        source: "/blog/impact-measurement-for-events",
        destination:
          "/thoughts/thought-leadership/impact-measurement-for-events",
        permanent: true,
      },
      {
        source: "/blog/anatomy-of-a-memorable-moment",
        destination: "/thoughts/events-craft/anatomy-of-a-memorable-moment",
        permanent: true,
      },
      // Anything else under /blog/ lands on the index rather than a 404.
      { source: "/blog", destination: "/thoughts", permanent: true },
      { source: "/blog/:path*", destination: "/thoughts", permanent: true },

      // ── Wrong-category links published in the wild ─────────────────
      // "Anatomy of a Memorable Moment" is filed under Events Craft; some
      // published links point at thought-leadership.
      {
        source: "/thoughts/thought-leadership/anatomy-of-a-memorable-moment",
        destination: "/thoughts/events-craft/anatomy-of-a-memorable-moment",
        permanent: true,
      },
      // "How We Use AI to Measure Impact" is filed under Brand Strategy.
      //
      // NOTE: this is the REVERSE of what the CMS Fix Brief asks for. That
      // brief says thought-leadership is canonical "because it is the value
      // in the article's own frontmatter" — it is not; the frontmatter reads
      // `category: Brand Strategy`. Only one URL has ever served this article
      // (the site generates exactly one URL per post from its single category
      // field), and it is the brand-strategy one. Following the brief as
      // written would 301 the live article into a 404.
      {
        source: "/thoughts/thought-leadership/how-we-use-ai-to-measure-impact",
        destination: "/thoughts/brand-strategy/how-we-use-ai-to-measure-impact",
        permanent: true,
      },
    ];
  },
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
    // The OG image renderer reads these TTFs from disk at render time.
    "/opengraph-image": ["./assets/fonts/**/*"],
  },
};

export default nextConfig;
