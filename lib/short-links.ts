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
