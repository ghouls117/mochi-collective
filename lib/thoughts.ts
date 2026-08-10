/**
 * Content loader for /thoughts posts.
 *
 * Posts live in content/thoughts/*.md with YAML frontmatter:
 *   title, slug, meta_title, meta_description, publish_date (YYYY-MM-DD),
 *   category, tags, canonical_url, deck.
 *
 * Categories are stored as human-readable names ("Thought Leadership") and
 * slugified for URLs ("thought-leadership"). URL scheme is
 * `/thoughts/<category-slug>/<slug>`.
 *
 * Publish gating: posts with publish_date in the future are hidden from
 * getPublishedPosts(), the index page, and the sitemap. They remain
 * accessible via direct URL for preview.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { BOOKING_URL } from "@/lib/constants";

export type PostFrontmatter = {
  title: string;
  /**
   * Optional HTML-enhanced title for the post-page display. Falls back to
   * `title` when absent. Used to inject accent styling (e.g. gradient
   * `<em class="accent">`) on part of the headline. Meta/OG/JSON-LD always
   * use the plain `title` field.
   */
  title_display?: string;
  slug: string;
  meta_title?: string;
  meta_description: string;
  publish_date: string;
  category: string;
  tags: string[];
  featured_image?: string;
  canonical_url?: string;
  deck?: string;
  featured?: boolean;
  reading_time_override?: number;
};

export type Post = PostFrontmatter & {
  contentHtml: string;
  /** Raw markdown body (frontmatter stripped). Used to build llms-full.txt
   *  from the same source the page renders, so the two can't drift. */
  contentMarkdown: string;
  readingTimeMinutes: number;
  categorySlug: string;
  urlPath: string;
  utmCampaign: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "thoughts");

export function slugifyCategory(cat: string): string {
  return cat
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function utmCampaignFromCategory(cat: string): string {
  return cat.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function computeReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * gray-matter's YAML parser auto-converts `YYYY-MM-DD` values into Date
 * objects. We always want the string form so downstream date-string
 * comparisons and template formatting stay predictable.
 */
function normalizePublishDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  return String(raw ?? "");
}

function loadPostFromFile(filename: string): Post {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const front = data as PostFrontmatter;
  const publish_date = normalizePublishDate(front.publish_date);
  const html = marked.parse(content, { async: false }) as string;
  const categorySlug = slugifyCategory(front.category);
  return {
    ...front,
    publish_date,
    tags: front.tags ?? [],
    contentHtml: html,
    contentMarkdown: content.trim(),
    readingTimeMinutes:
      front.reading_time_override ?? computeReadingTime(content),
    categorySlug,
    urlPath: `/thoughts/${categorySlug}/${front.slug}`,
    utmCampaign: utmCampaignFromCategory(front.category),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(loadPostFromFile)
    .sort((a, b) => b.publish_date.localeCompare(a.publish_date));
}

export function getPublishedPosts(): Post[] {
  const today = new Date().toISOString().slice(0, 10);
  return getAllPosts().filter((p) => p.publish_date <= today);
}

export function getPost(categorySlug: string, slug: string): Post | null {
  const all = getAllPosts();
  return (
    all.find((p) => p.categorySlug === categorySlug && p.slug === slug) ?? null
  );
}

export type CategoryFacet = { name: string; slug: string; count: number };

export function getPublishedCategories(): CategoryFacet[] {
  const posts = getPublishedPosts();
  const facets = new Map<string, CategoryFacet>();
  for (const p of posts) {
    const existing = facets.get(p.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      facets.set(p.categorySlug, {
        name: p.category,
        slug: p.categorySlug,
        count: 1,
      });
    }
  }
  return [...facets.values()].sort((a, b) => b.count - a.count);
}

/**
 * Continue-reading logic for the individual post page.
 *
 * Progression of behaviour as categories grow:
 *   - 4+ same-category siblings (mature category) →
 *     show the two most-recent same-category posts.
 *   - 1–3 same-category siblings (still-emerging category) →
 *     surface the earliest (flagship) same-category post + the
 *     earliest anchor post from another category so readers still
 *     get cross-category discovery until the category is deep.
 *   - 0 same-category siblings (unique post in its category) →
 *     fall back to the two most-recent Thought Leadership posts as
 *     the site's anchor category; if TL doesn't yet have 2, take
 *     whatever's published.
 *
 * Only counts posts that have already published (publish_date ≤ today).
 */
export function buildRelatedPosts(post: Post): Post[] {
  const publishedOthers = getPublishedPosts().filter(
    (p) => p.slug !== post.slug
  );
  const sameCategory = publishedOthers.filter(
    (p) => p.categorySlug === post.categorySlug
  );

  if (sameCategory.length >= 4) {
    return sameCategory.slice(0, 2);
  }

  const oldestFirst = [...publishedOthers].sort((a, b) =>
    a.publish_date.localeCompare(b.publish_date)
  );

  if (sameCategory.length >= 1) {
    const oldestSame = oldestFirst.find(
      (p) => p.categorySlug === post.categorySlug
    );
    const oldestOther = oldestFirst.find(
      (p) => p.categorySlug !== post.categorySlug
    );
    return [oldestSame, oldestOther].filter((p): p is Post => Boolean(p));
  }

  // 0 same-category siblings — anchor on Thought Leadership if enough
  // posts live there, otherwise take whatever the site has to show.
  const tl = publishedOthers.filter(
    (p) => p.categorySlug === "thought-leadership"
  );
  if (tl.length >= 2) return tl.slice(0, 2);
  return publishedOthers.slice(0, 2);
}

/**
 * Build the four UTM-tagged share URLs used by the post page. Each medium
 * has a distinct tag so referrer reporting stays clean.
 */
export function buildShareUrls(post: Post) {
  const baseUrl = `https://mochicollective.com${post.urlPath}`;
  const campaign = post.utmCampaign;
  const withUtm = (medium: string) =>
    `${baseUrl}?utm_source=website&utm_medium=${medium}&utm_campaign=${campaign}`;

  const linkedinTarget = withUtm("sharelinkedin");
  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkedinTarget)}`,
    copyLink: withUtm("sharelink"),
    email: withUtm("shareemail"),
    bookDiscovery: `${BOOKING_URL}?utm_source=website&utm_medium=postinterest&utm_campaign=${campaign}`,
  };
}
