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
    // Sales-forward rewrite. The previous version spent sixty of its
    // sixty-eight words on programs delivered and eight on anything
    // commercial, which read as a programme director under a title that says
    // Sales & Operations. Every claim here is drawn from the role as held:
    // pipeline was the bulk of the week, the team was six, cost management sat
    // with the same role as revenue.
    //
    // "Leading", not "largest": AngelHack's own site calls itself "The World's
    // Leading Hackathon Agency" and never claims largest. Sourcing a
    // superlative we can't support would be a poor look on a site built on
    // refusing those. The 500,000-developer figure (angelhack.com) is dropped
    // here on purpose to keep length parity with Marc's bio — it still appears
    // twice on /hackathons, so the proof is not lost from the site.
    bio: "Five years at AngelHack as Director of Ecosystem Development, where most of his week was pipeline — discovery calls, sales data, and programs designed around what the market could actually spend. He led the developer ecosystem at the world's leading hackathon agency, ran a team of six, and was accountable for whether corporate sponsors renewed. Before that, B2B conference and executive roundtable programs across Asia Pacific at IDC.",
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
 * Closing statement, rendered under the founders grid at the same width.
 *
 * One paragraph, not two: the motto payoff reads as the continuation of the
 * "client side of this table" thought rather than a separate remark. The
 * dividing rule above it was removed for the same reason. It remains the
 * payoff for Section 01 ending on the motto unattributed.
 */
export const FOUNDERS_CLOSING =
  "We have both spent our careers on the client side of this table. We know exactly which slide gets questioned. And that line about leaving a place better than you found it isn't agency copy. It has been Marc's personal motto for twenty years. We built a company around it.";
