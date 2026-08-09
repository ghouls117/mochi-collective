export type FaqItem = {
  q: string;
  a: string;
};

/**
 * Homepage FAQ — question/answer content in the studio's voice.
 * The visible copy in components/faq.tsx MUST stay identical to the
 * FAQPage JSON-LD emitted from app/page.tsx (Google validates that the
 * schema and the on-page content agree).
 */
export const FAQ: FaqItem[] = [
  {
    q: "What does Mochi Collective do?",
    a: "We're a brand-experience, program design and events agency in Singapore. Activations, conferences, sponsor programs, community and membership formats — all designed with impact measurement baked in, so what we run ends with a measurable answer, not a recap deck and a feeling.",
  },
  {
    q: "Where are you based?",
    a: "Mochi Collective Pte. Ltd. is a Singapore-registered agency at 68 Circular Road, #02-01, Singapore 049422 (UEN 202538712H). We work across Singapore and Southeast Asia — most of the events, conferences and community programs we design run in-region.",
  },
  {
    q: "What kinds of events and programs do you run?",
    a: "New launches (brand or program), brand activations, conferences and multi-stage summits, membership programs, etc. If it puts people in a room — once or on repeat — we can make the room prove something.",
  },
  {
    q: "How do you measure ROI?",
    a: "We agree the metric with you before we design anything, and we put it in writing: one primary number, a target, and the window. Then we build a control into the design wherever the format allows. A held-back invite list, a comparison period, an unprogrammed night or site. That's what lets us say something changed because of the event, rather than merely that it changed. We're straight about the limits. At forty guests you don't get statistical significance, and anyone telling you otherwise is selling. What you get is decision-grade evidence, enough to know whether to run it again, change it, or stop. We report the ones that didn't move too. And we always ask people what they remember. It's the question that tells you the most and gets asked the least.",
  },
  {
    q: "How fast do you turn around a proposal?",
    a: "Four Concierge questions from you, and a discovery call. We typically will come back with a proposal inside 72 weekday hours containing a program shape, a budget reality check, and a runway you can take to a sponsor or a board.",
  },
  {
    q: "What makes you different from other event agencies in Singapore?",
    a: "Most events end with a recap. Ours end with proof. Measurement isn't bolted on at the end — the experience is designed around it, so the report writes itself and the next one funds itself. And because we have had experience designing programs professionally, we're set up for the work that is needed to ensure success.",
  },
  {
    q: "Who do you typically work with?",
    a: "Marketing, brand and events leaders, or even new brand founders. If you have to defend an event's impact or program budget, you've come to the right place.",
  },
  {
    q: "Do you handle production, or just strategy?",
    a: "Both. Concept and creative direction, spatial and scenic design, hosting, content strategy, delivery on the day. Strategy → Design → Proof, all by one team.",
  },
  {
    q: "What budgets do you work with?",
    a: "From intimate formats to multi-stage moments, most components dictate the cost required. However, tell the Concierge your number — we'll tell you honestly what shape it buys during the discovery call and through our proposal.",
  },
  {
    q: "How do we start?",
    a: "The most straight-forward method is to answer the four questions in the Concierge. If not, you can book a discovery call with us at zcal.co/mochicollective/consultation. Else, you may email us at hello@mochicollective.com. We will typically reply inside 72 hours on weekdays.",
  },
];
