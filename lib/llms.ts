import type { PracticeBlock } from "@/components/practice-page";
import {
  BOOKING_URL,
  DIRECTORY_PROFILES,
  EMAIL,
  MIN_ENGAGEMENT,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { FAQ } from "@/lib/faq";
import { FOUNDERS } from "@/lib/founders";
import {
  IMPACT_MEASUREMENT_FAQ,
  IMPACT_MEASUREMENT_SUMMARY,
} from "@/lib/impact-measurement";
import { METHOD } from "@/lib/method";
import { PRACTICE_LIST } from "@/lib/practices";
import { SERVICES } from "@/lib/services";
import { getPublishedPosts, type Post } from "@/lib/thoughts";

/**
 * Generators for /llms.txt and /llms-full.txt.
 *
 * Both files are BUILT FROM THE SAME SOURCES THE PAGES RENDER FROM
 * (lib/services, lib/method, lib/faq, lib/practices, content/thoughts/*.md).
 * They were previously a hand-maintained static file in public/, which went
 * stale within a month — it never gained the practice pages or any essay.
 * Nothing here should ever be hand-copied from a page.
 *
 * llms.txt   = the map (entity, practices, page index, essay index)
 * llms-full.txt = the territory (the full text of the site in one fetch)
 */

const SITE_URL = "https://mochicollective.com";

/**
 * Date the non-essay site content last changed materially. Essays carry their
 * own publish dates; the "Last updated" line takes whichever is later. Bump
 * this when the homepage, a practice page, or the entity copy changes.
 *
 * Deliberately a content date, not a build timestamp — a build stamp tells an
 * LLM (or a crawler) nothing about real freshness. Same rule as sitemap.ts.
 */
const CONTENT_LAST_UPDATED = "2026-08-03";

const ENTITY_SUMMARY =
  "Mochi Collective is a brand-experience, program design and events agency based in Singapore, working across Southeast Asia. We design brand activations, conferences, sponsor programs and community/membership initiatives with impact measurement baked in — every event and program ends with proof, not just a recap.";

const WHO_WE_SERVE =
  "Marketing, brand and events leaders, and new brand founders in Singapore and Southeast Asia who need their events and programs to prove their worth to a stakeholder, sponsor or board.";

/**
 * Entity disambiguation. Mochi Collective is routinely conflated in AI answers
 * with (a) mochi dessert brands and (b) a competitor's "Mochi" hiring/candidate
 * assessment AI. This note is the cheapest antidote to both and MUST survive
 * every regeneration of these files — see the SEO audit series.
 */
const DISAMBIGUATION =
  "Note: Mochi Collective (Singapore, brand-experience & events agency) is unrelated to mochi dessert brands, and unrelated to any hiring, recruitment or candidate-assessment product or AI tool of a similar name.";

/** Strip presentational inline HTML (accent/tint spans, <strong>) but keep the
 *  text, so generated markdown reads clean to a model. */
function stripInlineHtml(s: string): string {
  return s
    .replace(/<\/?(?:span|em|strong)\b[^>]*>/gi, "")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Push markdown headings down `by` levels. Essay bodies are written with `##`
 * as their top heading; inside llms-full.txt that would sit at the same level
 * as the page sections ("## Home"), making the document hierarchy ambiguous
 * for anything that parses or chunks it. Demote so each essay's headings nest
 * under its own `### <title>`.
 */
function demoteHeadings(md: string, by: number): string {
  const pad = "#".repeat(by);
  return md.replace(/^(#{1,4})(\s)/gm, (_m, hashes: string, ws: string) => `${pad}${hashes}${ws}`);
}

function latestDate(dates: string[]): string {
  return dates.filter(Boolean).sort().at(-1) ?? CONTENT_LAST_UPDATED;
}

/** Absolute URL for a practice page. */
function practiceUrl(slug: string): string {
  return `${SITE_URL}/${slug}`;
}

/** The shared header both files open with. */
function entityBlock(posts: Post[]): string {
  const lastUpdated = latestDate([
    CONTENT_LAST_UPDATED,
    ...posts.map((p) => p.publish_date),
  ]);
  return [
    "# Mochi Collective",
    "",
    `> ${ENTITY_SUMMARY}`,
    "",
    "Legal entity: Mochi Collective Pte. Ltd. (Singapore, UEN 202538712H)",
    "Founded: 2025",
    "Registered office: 68 Circular Road, #02-01, Singapore 049422",
    "Service area: Singapore and Southeast Asia",
    `Minimum engagement: from ${MIN_ENGAGEMENT}`,
    "Team size: 2-9",
    "Tagline: Make it worth talking about.",
    `Contact: ${EMAIL} (typically replies inside 72 hours on weekdays)`,
    `Book a discovery call: ${BOOKING_URL}`,
    `Last updated: ${lastUpdated}`,
  ].join("\n");
}

/**
 * Founders. The single largest gap in the site's machine-readable story was
 * that nothing connected Mochi to the two people behind it — an engine could
 * read what the company charges but not that a founder ran the world's largest
 * hackathon organisation.
 */
function foundersSection(): string {
  const lines = FOUNDERS.flatMap((f) => [
    `- ${f.name} — ${f.jobTitle}. ${f.bio}`,
    `  Previously: ${f.alumniOf.join(", ")}. LinkedIn: ${f.linkedin}`,
  ]);
  return ["## Who's behind this", "", ...lines].join("\n");
}

function practicesSection(): string {
  const lines = SERVICES.map((s) => {
    const url = s.deepLink ? `${SITE_URL}${s.deepLink.href}` : null;
    return `- ${s.label}${url ? ` (${url})` : ""}: ${s.body}`;
  });
  return ["## What we do (five practices, one operating system)", "", ...lines].join(
    "\n"
  );
}

function methodSection(): string {
  const steps = METHOD.map((m) => `${m.n}. ${m.h} — ${stripInlineHtml(m.body)}`);
  return ["## How we work", "", ...steps].join("\n");
}

/* ─── /llms.txt — the map ──────────────────────────────────────────── */

export function buildLlmsTxt(): string {
  const posts = getPublishedPosts();

  const pages = [
    `- Home: ${SITE_URL} — positioning, five practices, methodology, Service Concierge, FAQ`,
    `- Mochi Thoughts: ${SITE_URL}/thoughts — essays on brand experience, program design, and running events in Southeast Asia`,
    `- Impact Measurement (the operating system, applied across all five practices): ${SITE_URL}/impact-measurement — how we design measurement into every event and program (pre / during / post), and what the stakeholder-facing impact report looks like`,
    ...PRACTICE_LIST.map(
      (p) => `- ${p.label}: ${practiceUrl(p.slug)} — ${p.metaDescription}`
    ),
    `- Privacy Policy: ${SITE_URL}/privacy`,
    `- Terms of Use: ${SITE_URL}/terms`,
  ];

  const essays = posts.map(
    (p) =>
      `- ${p.title} (${p.publish_date}, ${p.category}): ${SITE_URL}${p.urlPath} — ${
        p.deck ?? p.meta_description
      }`
  );

  const profiles = [
    `- LinkedIn: ${SOCIAL_LINKS.linkedin}`,
    `- Instagram: ${SOCIAL_LINKS.instagram}`,
    `- TikTok: ${SOCIAL_LINKS.tiktok}`,
    // Directory citations, same three the ProfessionalService `sameAs` graph
    // asserts. All 403 to automated fetchers (Clutch does too, while being
    // verifiably live), so a 403 here is bot protection, not a dead link.
    `- Clutch: ${DIRECTORY_PROFILES.clutch}`,
    `- Sortlist: ${DIRECTORY_PROFILES.sortlist}`,
    `- GoodFirms: ${DIRECTORY_PROFILES.goodfirms}`,
  ];

  return [
    entityBlock(posts),
    `Full site content (one file, for agents): ${SITE_URL}/llms-full.txt`,
    "",
    practicesSection(),
    "",
    methodSection(),
    "",
    foundersSection(),
    "",
    "## Who we serve",
    "",
    WHO_WE_SERVE,
    "",
    "## Pages",
    "",
    ...pages,
    "",
    "## Essays",
    "",
    ...essays,
    "",
    "## Profiles",
    "",
    ...profiles,
    "",
    "---",
    "",
    DISAMBIGUATION,
    "",
  ].join("\n");
}

/* ─── /llms-full.txt — the territory ───────────────────────────────── */

function blockToMarkdown(b: PracticeBlock): string {
  switch (b.type) {
    case "h2":
      return `### ${stripInlineHtml(b.text)}`;
    case "h3":
      return `#### ${stripInlineHtml(b.text)}`;
    case "p":
      return stripInlineHtml(b.html);
    case "ul":
      return b.items.map((i) => `- ${stripInlineHtml(i)}`).join("\n");
  }
}

function faqToMarkdown(items: { q: string; a: string }[]): string {
  return items.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
}

export function buildLlmsFullTxt(): string {
  const posts = getPublishedPosts();
  const out: string[] = [];

  out.push(entityBlock(posts));
  out.push("");
  out.push(
    "This file is the full text of mochicollective.com in one document, generated at build time from the same sources the pages render from. The map version is at " +
      `${SITE_URL}/llms.txt.`
  );
  out.push("");
  out.push("---");
  out.push("");

  /* Home */
  out.push(`## Home (${SITE_URL})`);
  out.push("");
  out.push(ENTITY_SUMMARY);
  out.push("");
  out.push("### The five practices");
  out.push("");
  for (const s of SERVICES) {
    const url = s.deepLink ? ` — ${SITE_URL}${s.deepLink.href}` : "";
    out.push(`#### ${s.label}: ${s.title}${url}`);
    out.push("");
    out.push(stripInlineHtml(s.body));
    out.push("");
    out.push(s.list.map((i) => `- ${i}`).join("\n"));
    out.push("");
  }
  out.push("### How we work");
  out.push("");
  out.push(METHOD.map((m) => `${m.n}. **${m.h}** — ${stripInlineHtml(m.body)}`).join("\n"));
  out.push("");
  out.push("### Who we serve");
  out.push("");
  out.push(WHO_WE_SERVE);
  out.push("");
  out.push("### Who's behind this");
  out.push("");
  for (const f of FOUNDERS) {
    out.push(`**${f.name} — ${f.jobTitle}**`);
    out.push(f.bio);
    out.push(`Previously: ${f.alumniOf.join(", ")}. LinkedIn: ${f.linkedin}`);
    out.push("");
  }
  out.push("### Frequently asked questions");
  out.push("");
  out.push(faqToMarkdown(FAQ));
  out.push("");

  /* Impact Measurement */
  out.push(`## Impact Measurement (${SITE_URL}/impact-measurement)`);
  out.push("");
  out.push(IMPACT_MEASUREMENT_SUMMARY);
  out.push("");
  out.push("### Common questions");
  out.push("");
  out.push(faqToMarkdown(IMPACT_MEASUREMENT_FAQ));
  out.push("");

  /* The four practice pages */
  for (const p of PRACTICE_LIST) {
    out.push(`## ${p.label} (${practiceUrl(p.slug)})`);
    out.push("");
    out.push(stripInlineHtml(p.ledeHtml));
    out.push("");
    for (const b of p.blocks) {
      out.push(blockToMarkdown(b));
      out.push("");
    }
    out.push("### Common questions");
    out.push("");
    out.push(faqToMarkdown(p.faq));
    out.push("");
  }

  /* Essays — published only; scheduled posts are noindex and excluded. */
  out.push(`## Essays (${SITE_URL}/thoughts)`);
  out.push("");
  for (const post of posts) {
    out.push(`### ${post.title} (${SITE_URL}${post.urlPath})`);
    out.push("");
    out.push(
      `Published: ${post.publish_date} · Category: ${post.category} · ${post.readingTimeMinutes} min read`
    );
    out.push("");
    if (post.deck) {
      out.push(post.deck);
      out.push("");
    }
    // Body headings start at `##`; demote by 2 so they nest under the essay's
    // own `### <title>` rather than colliding with the page-level sections.
    out.push(demoteHeadings(stripInlineHtml(post.contentMarkdown), 2));
    out.push("");
  }

  /* Legal — link only; the full legal text is noise for this purpose. */
  out.push("## Legal");
  out.push("");
  out.push(`- Privacy Policy: ${SITE_URL}/privacy`);
  out.push(`- Terms of Use: ${SITE_URL}/terms`);
  out.push("");
  out.push("---");
  out.push("");
  out.push(DISAMBIGUATION);
  out.push("");

  return out.join("\n");
}
