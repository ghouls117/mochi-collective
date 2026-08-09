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
    // This is the page that should own the ROI query. It previously ran a
    // thinner answer than the homepage did on the same question, so the
    // specialist page lost to the homepage on its own topic.
    q: "How do you measure the ROI of an event?",
    a: "We agree one metric before the moodboard — a primary number, a target and a window, in writing — then instrument the experience before, during and after, with a control built in wherever the format allows: a held-back invite list, a comparison period, an unprogrammed night. The control is what lets us say something changed because of the event rather than merely that it changed. We're straight about the limits: at forty guests there is no statistical significance, and anyone telling you otherwise is selling. What you get is decision-grade evidence — enough to know whether to run it again, change it, or stop.",
  },
  {
    q: "Can you measure an event another agency is producing?",
    a: "Yes — we design the proof model around a program someone else is running and deliver the stakeholder-facing report. Impact measurement isn't a practice we sell alongside the other five; it's the operating system underneath all of them. But it travels: the metric gets agreed before the room is designed, whoever is designing the room.",
  },
  {
    q: "What's in the impact report?",
    a: "Pre/during/post movement on the metric agreed at brief stage, plus the four signals we test every time — a moment people recall unprompted, a phrase that gets reused, an artefact still on their desk three weeks later, an introduction that continued. Eight to twelve pages, organised around the decision the event was designed to set up rather than the run of show, in language a CFO, sponsor or board can read without a glossary. It includes the parts that didn't move.",
  },
];

/** One-paragraph summary of the practice, for llms.txt / llms-full.txt. */
export const IMPACT_MEASUREMENT_SUMMARY =
  "Every engagement ships with an event-ROI report designed to survive scrutiny from a CFO, a sponsor, or a board. The measurement frame is a design decision made at brief stage, not after the venue lights come down. We test four durable signal categories every time — Moment (something specific people recall unprompted), Framing (a phrase or reframe that lands and gets reused), Artefact (a physical or digital thing still on their desk three weeks later), and Introduction (conversations that continue after the room empties). The model runs pre-event (feeling target + the Monday sentence), during (in-experience prompts and structured observation), 72 hours out (a two-question follow-up — the primary instrument), and six weeks out (the behaviour test: did the decision the event was designed to set up actually happen). The report is eight to twelve pages, organised around that decision rather than the run of show, and designed to be forwarded.";
