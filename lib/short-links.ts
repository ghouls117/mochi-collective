/**
 * Self-hosted link-shortener registry.
 *
 * URL scheme: `https://mochicollective.com/l/<slug>` → 302 to `url`.
 * Add an entry below to mint a new short link. No admin UI — the file
 * is the single source of truth, and edits ship via git push.
 *
 * The `utm` block on each entry stamps parameters onto the destination
 * URL at request time. If the destination URL already has query params
 * (e.g. zcal booking links), they're preserved; UTM keys are merged in
 * without clobbering, and an existing param wins over a UTM default —
 * so a slug can override the default for one placement without editing
 * the destination.
 *
 * Why this exists: keeps every share-click on mochicollective.com (helps
 * entity signals + LinkedIn trust) and lets you segment referrer data
 * per placement without polluting the naked share URL.
 */

export type ShortLinkUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export type ShortLink = {
  /** Kebab-case slug that appears in the URL. Case-sensitive. */
  slug: string;
  /** Full destination URL. Can be internal (mochicollective.com/…) or
   *  external (zcal, LinkedIn, etc.). */
  url: string;
  /** Internal note so future-you (or a teammate) remembers what this
   *  slug is for and where it's printed / shared. Not shown to visitors. */
  note?: string;
  /** UTM values stamped onto the destination when this slug is hit. */
  utm?: ShortLinkUtm;
};

export const SHORT_LINKS: Record<string, ShortLink> = {
  /* ─── Example: a print / QR link to the homepage ──────────────────
   * Uncomment or replace when a real short link is needed. Keep at
   * least one entry seeded so the pattern stays obvious. */
  card: {
    slug: "card",
    url: "https://mochicollective.com/",
    note: "Business card QR / physical print landing.",
    utm: { source: "print", medium: "qr", campaign: "business-card" },
  },
  "Villa-Finder": {
    slug: "Villa-Finder",
    url: "https://claude.ai/code/artifact/933390a1-b3c3-44be-b3e3-c6c9906717e2",
    note: "Sketches for Villa Finder",
  },
  "6questions": {
    slug: "6questions",
    url: "https://mochicollective.com/thoughts/thought-leadership/6-questions-every-brief",
    note: "6 Questions post — Instagram organic push, July 2026 W3.",
    utm: {
      source: "instagram",
      medium: "organic-social",
      campaign: "july-2026-w3",
    },
  },
  "6q-fb": {
    slug: "6q-fb",
    url: "https://mochicollective.com/thoughts/thought-leadership/6-questions-every-brief",
    note: "6 Questions — Facebook repost aug",
    utm: {
      source: "facebook",
      medium: "organic-social",
      campaign: "august-2026-reposting",
    },
  },
  "ai-impact-ig": {
    slug: "ai-impact-ig",
    url: "https://mochicollective.com/thoughts/thought-leadership/how-we-use-ai-to-measure-impact",
    note: "How We Use AI to Measure Impact — Instagram aug w3",
    utm: {
      source: "instagram",
      medium: "organic-social",
      campaign: "august-2026-w3",
    },
  },
  "ai-impact-fb": {
    slug: "ai-impact-fb",
    url: "https://mochicollective.com/thoughts/thought-leadership/how-we-use-ai-to-measure-impact",
    note: "How We Use AI to Measure Impact — Facebook repost aug",
    utm: {
      source: "facebook",
      medium: "organic-social",
      campaign: "august-2026-reposting",
    },
  },
  "ai-impact-li": {
    slug: "ai-impact-li",
    url: "https://mochicollective.com/thoughts/thought-leadership/how-we-use-ai-to-measure-impact",
    note: "How We Use AI to Measure Impact — LinkedIn aug w3",
    utm: {
      source: "linkedin",
      medium: "organic-social",
      campaign: "august-2026-w3",
    },
  },
  "community-ig": {
    slug: "community-ig",
    url: "https://mochicollective.com/thoughts/events-craft/how-community-programs-compound",
    note: "How Community Programs Compound — Instagram aug w4",
    utm: {
      source: "instagram",
      medium: "organic-social",
      campaign: "august-2026-w4",
    },
  },
  "community-li": {
    slug: "community-li",
    url: "https://mochicollective.com/thoughts/events-craft/how-community-programs-compound",
    note: "How Community Programs Compound — LinkedIn aug w4",
    utm: {
      source: "linkedin",
      medium: "organic-social",
      campaign: "august-2026-w4",
    },
  },
  "community-fb": {
    slug: "community-fb",
    url: "https://mochicollective.com/thoughts/events-craft/how-community-programs-compound",
    note: "How Community Programs Compound — Facebook aug w4",
    utm: {
      source: "facebook",
      medium: "organic-social",
      campaign: "august-2026-w4",
    },
  },
  "brandroom-li-ann": {
    slug: "brandroom-li-ann",
    url: "https://mochicollective.com/thoughts/brand-strategy/when-your-brand-becomes-a-room",
    note: "When Your Brand Becomes a Room — LinkedIn announce sep",
    utm: {
      source: "linkedin",
      medium: "organic-social",
      campaign: "september-2026",
      content: "brand-room-announce",
    },
  },
  "brandroom-li-amp": {
    slug: "brandroom-li-amp",
    url: "https://mochicollective.com/thoughts/brand-strategy/when-your-brand-becomes-a-room",
    note: "When Your Brand Becomes a Room — LinkedIn amplifier sep",
    utm: {
      source: "linkedin",
      medium: "organic-social",
      campaign: "september-2026",
      content: "brand-room-amplifier",
    },
  },
  "brandroom-ig": {
    slug: "brandroom-ig",
    url: "https://mochicollective.com/thoughts/brand-strategy/when-your-brand-becomes-a-room",
    note: "When Your Brand Becomes a Room — Instagram amplifier sep",
    utm: {
      source: "instagram",
      medium: "organic-social",
      campaign: "september-2026",
      content: "brand-room-amplifier",
    },
  },
  "brandroom-fb": {
    slug: "brandroom-fb",
    url: "https://mochicollective.com/thoughts/brand-strategy/when-your-brand-becomes-a-room",
    note: "When Your Brand Becomes a Room — Facebook amplifier sep",
    utm: {
      source: "facebook",
      medium: "organic-social",
      campaign: "september-2026",
      content: "brand-room-amplifier",
    },
  },
  "hack-li-buildup1": {
    slug: "hack-li-buildup1",
    url: "https://mochicollective.com/hackathons",
    note: "Hackathons page — LinkedIn buildup 1 sep",
    utm: {
      source: "linkedin",
      medium: "organic-social",
      campaign: "september-2026",
      content: "hackathons-buildup-1",
    },
  },
  "hack-ig-w2": {
    slug: "hack-ig-w2",
    url: "https://mochicollective.com/hackathons",
    note: "Hackathons page — Instagram sep w2",
    utm: {
      source: "instagram",
      medium: "organic-social",
      campaign: "september-2026-w2",
    },
  },
  "hack-ig-w1": {
    slug: "hack-ig-w1",
    url: "https://mochicollective.com/hackathons",
    note: "Hackathons page — Instagram sep w1",
    utm: {
      source: "instagram",
      medium: "organic-social",
      campaign: "september-2026-w1",
    },
  },
  "hack-li-w1": {
    slug: "hack-li-w1",
    url: "https://mochicollective.com/hackathons",
    note: "Hackathons page — LinkedIn sep w1",
    utm: {
      source: "linkedin",
      medium: "organic-social",
      campaign: "september-2026-w1",
    },
  },
  "hack-fb-w1": {
    slug: "hack-fb-w1",
    url: "https://mochicollective.com/hackathons",
    note: "Hackathons page — Facebook sep w1",
    utm: {
      source: "facebook",
      medium: "organic-social",
      campaign: "september-2026-w1",
    },
  },
};

/**
 * Build the redirect target for a slug — appends the entry's UTMs to
 * `url`, preserving any params already on the destination. Existing
 * params always win, so a URL like `zcal.co/…?utm_campaign=x` is not
 * overwritten by a UTM default here.
 */
export function resolveShortLink(entry: ShortLink): string {
  const target = new URL(entry.url);
  const stampIfAbsent = (key: string, value: string | undefined) => {
    if (!value) return;
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  };
  if (entry.utm) {
    stampIfAbsent("utm_source", entry.utm.source);
    stampIfAbsent("utm_medium", entry.utm.medium);
    stampIfAbsent("utm_campaign", entry.utm.campaign);
    stampIfAbsent("utm_content", entry.utm.content);
    stampIfAbsent("utm_term", entry.utm.term);
  }
  return target.toString();
}

export function findShortLink(slug: string): ShortLink | null {
  return SHORT_LINKS[slug] ?? null;
}
