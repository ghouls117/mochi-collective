/**
 * Founder records — one source for the Section 04 copy, the Person entities in
 * the JSON-LD graph, and the founders block in llms.txt.
 *
 * Why this matters beyond tidiness: the whole point of adding founders is to
 * let an answer engine connect Mochi to two real track records. That only works
 * if the visible copy, the schema and llms.txt agree on the same names, titles
 * and profile URLs — a mismatch reads as two different people.
 */

export type Founder = {
  name: string;
  /** Used verbatim as schema.org `jobTitle`. */
  jobTitle: string;
  bio: string;
  /** Profile URL — becomes `sameAs` on the Person entity. */
  linkedin: string;
  /** Prior organisations — becomes `alumniOf`. */
  alumniOf: string[];
};

export const FOUNDERS: Founder[] = [
  {
    name: "Justin Ng",
    jobTitle: "Co-founder, Sales & Operations",
    bio: "Five years at AngelHack, most of them running programs that create impact — the world's largest hackathon organisation, with a global developer community over 500,000 strong. Before that, he led B2B conference and executive roundtable programs across Asia Pacific at IDC. He has delivered programs for corporate sponsors around the world and been accountable for whether they renewed.",
    linkedin: "https://www.linkedin.com/in/justinngbr/",
    alumniOf: ["AngelHack", "International Data Corporation (IDC)"],
  },
  {
    name: "Marc Lester Yu",
    jobTitle: "Co-founder, Strategy",
    bio: "Twenty-one years in talent and measurement, including Nielsen — a company whose entire business is proving whether something moved. He now leads talent acquisition across Asia Pacific for the B2B arm of a global travel platform, and builds the reporting, capacity models and AI agents his global team runs on. He builds the proof model behind every Mochi engagement.",
    linkedin: "https://www.linkedin.com/in/marclesteryu/",
    alumniOf: ["Nielsen"],
  },
];

/** Stable JSON-LD `@id` for a founder, so the company entity, the Person block
 *  and every BlogPosting all reference one node instead of duplicating it. */
export function founderId(siteUrl: string, name: string): string {
  return `${siteUrl}/#person-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;
}

/** The founder credited as author on the essays. */
export const AUTHOR_FOUNDER = FOUNDERS[0];

export const FOUNDERS_HEADLINE_LEAD = "Two operators.";
export const FOUNDERS_HEADLINE_ACCENT = "Twenty-five years";
export const FOUNDERS_HEADLINE_TAIL = "of this.";

export const FOUNDERS_INTRO =
  "Mochi is small on purpose. You get the founders on the work, not a pitch team who hand you to someone else after you sign.";

/**
 * Closing lines. Rendered below a rule, deliberately separated from the last
 * bio so they read as a joint statement rather than a continuation of Marc's.
 * The second line is the payoff for Section 01 ending on the motto unattributed.
 */
export const FOUNDERS_CLOSING = [
  "We have both spent our careers on the client side of this table. We know exactly which slide gets questioned.",
  "And that line about leaving a place better than you found it isn't agency copy. It has been Marc's personal motto for twenty years. We built a company around it.",
];
