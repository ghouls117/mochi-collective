/**
 * GET /l/<slug>
 *
 * Self-hosted link shortener. Looks the slug up in lib/short-links.ts,
 * resolves the destination URL (with UTMs stamped), and returns a 302
 * redirect. Unknown slugs fall through to a 404 so mistyped links don't
 * silently leak users onto the homepage.
 *
 * All destinations are set at build time from a single registry file —
 * no runtime state, no database, no admin UI. Adding a link is a git
 * push. See lib/short-links.ts.
 *
 * Marked `dynamic` so the redirect is evaluated per request rather than
 * cached — cheap, and it means the redirect responds instantly to
 * registry edits after a redeploy.
 */

import { notFound, redirect } from "next/navigation";
import { findShortLink, resolveShortLink } from "@/lib/short-links";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = findShortLink(slug);
  if (!entry) notFound();
  redirect(resolveShortLink(entry));
}
