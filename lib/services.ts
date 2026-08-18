export type Service = {
  label: string;
  /** Marketing headline shown on the panel — voicey, not a schema category. */
  title: string;
  /**
   * schema.org `serviceType` — a canonical category string, distinct from
   * `title`. Fed into the Service JSON-LD graph on the homepage. Must read
   * as a category (e.g. "Event impact measurement and reporting"), never
   * as a tagline, or Google flags the schema mismatch.
   */
  serviceType: string;
  color: string;
  body: string;
  list: [string, string, string, string];
  /** Optional deep-link to the dedicated service page (renders as a
   * "How we … — the full model →" CTA under the panel body). */
  deepLink?: { href: string; label: string };
};

/**
 * Formats strip under the five practice panels — a plain-language restatement
 * of the practices for people who scan past the tab interaction. Deliberately
 * mirrors the five rather than introducing new categories.
 */
export const FORMATS: { label: string; href: string }[] = [
  { label: "Brand experience & launch moments", href: "/brand-experience" },
  { label: "Hackathons & developer programs", href: "/hackathons" },
  { label: "Conferences & events", href: "/conferences-and-events" },
  { label: "Sponsor programs", href: "/sponsor-programs" },
  { label: "Community & membership programs", href: "/community-and-membership" },
];

export const SERVICES: Service[] = [
  {
    label: "Brand Experiences",
    title: "Launches, activations, immersive moments.",
    serviceType: "Brand activation and experiential marketing",
    color: "#F6BEC9",
    body:
      "A single magnetic moment, engineered to over-index where it matters — press, social, word of mouth, the room behind the room. Designed so we can measure what changes after the doors close.",
    list: [
      "Concept + creative direction",
      "Spatial + scenic design",
      "Casting, talent, hosting",
      "Social + content strategy",
    ],
    deepLink: { href: "/brand-experience", label: "How we design brand experiences — the full model" },
  },
  {
    label: "Hackathons & Developer Programs",
    title: "The most measurable event we run.",
    serviceType: "Hackathon and developer program design",
    color: "#93ADBF",
    // Carries the argument of the 8 Sep essay, "Your Hackathon Has Two
    // Clients": the budget comes from marketing, the verdict comes from
    // engineers, and the second audience reads your docs and your rate limits.
    // The list still maps to the three principles on /hackathons — recruit to
    // the outcome, judge on what you want next, measure at ninety days — with
    // the sponsor line reframed the way the essay argues it: your engineers on
    // the floor ARE the sponsorship deliverable, not booth cover.
    body:
      "A hackathon is commissioned by marketing and graded by engineers — and the second audience reads your documentation, your error messages and your rate limits. We design for both: a brief with a real constraint, a rubric published alongside it, and output that runs from a clean clone. What comes back is artefacts, not impressions.",
    list: [
      "Recruit to your ICP, not to the room",
      "Rubric published with the brief",
      "Engineers on the floor, not a booth",
      "Time to first call + 90-day retention",
    ],
    deepLink: {
      href: "/hackathons",
      label: "How we run hackathons — the full model",
    },
  },
  {
    label: "Conferences & Events",
    title: "End-to-end stage programs that pay for themselves.",
    serviceType: "Conference and event production",
    color: "#7ECADF",
    body:
      "Multi-day, multi-stage programs built around sponsor outcomes from day one. We design the curation, the room logic and the throughline so the value lasts past Friday afternoon.",
    list: [
      "Membership design",
      "Sponsor coordination",
      "Production + technical",
      "Pre / during / post measurement",
    ],
    deepLink: { href: "/conferences-and-events", label: "How we produce conferences — the full model" },
  },
  {
    label: "Sponsor Programs",
    title: "ROI-first design for the people writing the cheque.",
    serviceType: "Sponsorship program design",
    color: "#F9C84A",
    body:
      "Sponsor-grade activations engineered for renewal. We align the experience to the partner’s real metric and ship a report they can hand straight to their reporting stakeholders.",
    list: [
      "Sponsor KPI to experience design",
      "Native partner integrations",
      "Renewal-grade reporting",
      "Outcome conversion + relationship depth report",
    ],
    deepLink: { href: "/sponsor-programs", label: "How we design sponsor programs — the full model" },
  },
  {
    label: "Community & Membership",
    title: "Programs that compound. Rooms people protect.",
    serviceType: "Community and membership program design",
    color: "#BFDEA3",
    body:
      "Members-first programming designed to compound. Each gathering earns the next, each format makes the brand more defensible, each host stays on-tone three years in.",
    list: [
      "Concept + creative direction",
      "Salon + dinner formats",
      "Members integration + retention frameworks",
      "Curation systems",
    ],
    deepLink: { href: "/community-and-membership", label: "How we build community — the full model" },
  },
];
