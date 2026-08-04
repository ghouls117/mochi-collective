import { buildLlmsTxt } from "@/lib/llms";

/**
 * /llms.txt — the map: entity facts, the five practices, a page index and an
 * essay index. Generated from the same sources the pages render from, so it
 * can't go stale the way the old hand-maintained public/llms.txt did.
 *
 * Revalidates on the same 15-minute cadence as the sitemap and /thoughts, so
 * a scheduled essay appears here on its publish date without a redeploy.
 */
export const revalidate = 900;

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}
