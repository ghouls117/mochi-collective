import type { FaqItem } from "@/lib/faq";

/**
 * Page-level FAQ for /impact-measurement.
 *
 * Lives here rather than inside the page so the page, the FAQPage JSON-LD,
 * and llms-full.txt all read from one source — the visible copy and the
 * schema must agree (Google validates the schema against rendered copy).
 */
export const IMPACT_MEASUREMENT_FAQ: FaqItem[] = [
  {
    q: "How do you measure the ROI of an event?",
    a: "We agree the metric before the moodboard, instrument the experience before, during and after — behaviour, follow-ups, sentiment, impact — and report against the number your sponsor or CFO actually cares about.",
  },
  {
    q: "Can you measure an event another agency is producing?",
    a: "Yes. Impact Measurement runs as a standalone practice: we design the proof model around your existing program and deliver the stakeholder-facing report.",
  },
  {
    q: "What's in the impact report?",
    a: "Pre/during/post movement on the agreed metric, engagement and follow-up behaviour, sentiment shift, and a plain-language readout your CFO, sponsor or board can read without a glossary.",
  },
];

/** One-paragraph summary of the practice, for llms.txt / llms-full.txt. */
export const IMPACT_MEASUREMENT_SUMMARY =
  "Every engagement ships with an event-ROI report designed to survive scrutiny from a CFO, a sponsor, or a board. The measurement frame is a design decision made at brief stage, not after the venue lights come down. We test four durable signal categories every time — Moment (something specific people recall unprompted), Framing (a phrase or reframe that lands and gets reused), Artefact (a physical or digital thing still on their desk three weeks later), and Introduction (conversations that continue after the room empties). The model runs pre-event (feeling target + the Monday sentence), during (in-experience prompts and structured observation), 72 hours out (a two-question follow-up — the primary instrument), and six weeks out (the behaviour test: did the decision the event was designed to set up actually happen). The report is eight to twelve pages, organised around that decision rather than the run of show, and designed to be forwarded.";
