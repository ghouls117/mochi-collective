import { buildLlmsFullTxt } from "@/lib/llms";

/**
 * /llms-full.txt — the territory: the full text of the site flattened into one
 * markdown document so an agent can ingest everything in a single fetch.
 * Generated at request time from the page content sources; never hand-written.
 *
 * Published essays only — scheduled posts are noindex and excluded until their
 * publish date, at which point the 15-minute revalidate picks them up.
 */
export const revalidate = 900;

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}
