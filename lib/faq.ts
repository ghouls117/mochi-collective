export type FaqItem = {
  q: string;
  a: string;
};

/**
 * Homepage FAQ — question/answer content in the studio's voice.
 * The visible copy in components/faq.tsx MUST stay identical to the
 * FAQPage JSON-LD emitted from app/page.tsx (Google validates that the
 * schema and the on-page content agree).
 *
 * Two rules this content is held to:
 *  - Promise the proof, never the lift. Nothing here may guarantee an
 *    outcome Mochi doesn't control.
 *  - Name all five practices wherever the list appears. Omitting one (as
 *    this file did with hackathons) means the answer engines that quote
 *    these entries describe a smaller company than exists.
 */
export const FAQ: FaqItem[] = [
  {
    q: "What does Mochi Collective do?",
    a: "We're a brand-experience, program design and events agency in Singapore. Five practices — brand experiences, hackathons and developer programs, conferences and events, sponsor programs, community and membership — with one operating system underneath all of them: impact measurement, one metric agreed in writing before we design anything. The room has to move people and the report has to move a budget conversation. If it only does one of those, we haven't finished.",
  },
  {
    q: "Where are you based?",
    // Registered address and UEN deliberately not repeated here. They stay in
    // the PostalAddress node of the ProfessionalService schema (app/layout.tsx),
    // the footer, /privacy, /terms and llms.txt — which is where Google and the
    // answer engines actually read the entity from.
    a: "We are a Singapore-registered agency working across Singapore and Southeast Asia primarily.",
  },
  {
    q: "What kinds of events and programs do you run?",
    a: "Launches, brand activations, hackathons and developer programs, conferences and multi-stage summits, sponsor programs, and community and membership formats. Five kinds of room, one proof model underneath. If it puts people in a room — once or on repeat — we can make the room prove something.",
  },
  {
    // Reframed from "How do you measure ROI?" — that question is answered in
    // depth on /impact-measurement, and running near-identical questions in two
    // FAQPage blocks made the two surfaces compete for the same query. This
    // version states the guardrail instead, which nothing else on the site did.
    q: "What do you actually guarantee?",
    a: "Rigorous design and honest measurement — never a lift. We agree one primary number with you in writing before we design anything: the metric, the target and the window. Then we build a control into the design wherever the format allows — a held-back invite list, a comparison period, an unprogrammed night or site — so we can say something changed because of the event rather than merely that it changed. If the number doesn't move, you still get the truth about why, on time. Anyone guaranteeing you an uplift on a room of forty people is selling.",
  },
  {
    q: "How fast do you turn around a proposal?",
    a: "Inside 72 weekday hours of the discovery call. You answer four Concierge questions, we run the call, and what comes back is a program shape, a budget reality check, and a runway you can take to a sponsor or a board.",
  },
  {
    q: "What makes you different from other event agencies in Singapore?",
    a: "Most events end with a recap. Ours end with proof — measurement isn't bolted on at the end, the experience is designed around it, so the report writes itself. The other difference is who does the work. Two founders, twenty-five years of this: Justin spent five years at AngelHack running developer programs for corporate sponsors he had to renew; Marc has twenty-one years in talent and measurement including Nielsen. You get both of us on the work, not a pitch team.",
  },
  {
    q: "Who do you typically work with?",
    a: "Marketing, brand and events leaders. Platform and developer-relations teams. Corporate innovation and R&D groups. And founders building a brand from nothing. The developer-side buyer is a different person from the brand-marketing buyer — different room, different proof — which is why hackathons and developer programs run as their own practice. What everyone here has in common: you have to defend an event's impact or a program budget to someone who wasn't in the room.",
  },
  {
    q: "Do you handle production, or just strategy?",
    a: "Both, end to end. Concept and creative direction, spatial and scenic design, casting and hosting, content strategy, membership and curation design, sponsor coordination, production and technical, and delivery on the day. Strategy → Design → Proof, one team from the brief to the report.",
  },
  {
    q: "What budgets do you work with?",
    a: "Most engagements start between S$5,000 and S$10,000, depending on how much of it we run. That is our fee, not the cost of the event — venue, production, F&B and talent sit on top and are usually the larger number, which is why the Concierge asks for your total working budget separately. Tell us the real figure. If it doesn't buy the thing you're describing, you'll hear that on the discovery call rather than in month three, and if we're not the right call at your number we'll point you to someone who is.",
  },
  {
    q: "How do we start?",
    a: "Answer the four questions in the Concierge — that's the fastest way in. If you'd rather talk first, book a discovery call at zcal.co/mochicollective/consultation, or email hello@mochicollective.com. Either way you'll hear back inside 72 hours on weekdays.",
  },
];
