export type Service = {
  label: string;
  title: string;
  color: string;
  body: string;
  list: [string, string, string, string];
};

export const SERVICES: Service[] = [
  {
    label: "Brand Experiences",
    title: "Launches, activations, immersive moments.",
    color: "#F6BEC9",
    body:
      "A single magnetic moment, engineered to over-index where it matters — press, social, word of mouth, the room behind the room. Designed so we can measure what changes after the doors close.",
    list: [
      "Concept + creative direction",
      "Spatial + scenic design",
      "Casting, talent, hosting",
      "Social + content strategy",
    ],
  },
  {
    label: "Impact Measurement",
    title: "The proof model is the brief.",
    color: "#93ADBF",
    body:
      "A measurement frame your stakeholders, your sponsor / target accounts or pipeline, and your team that will all trust. We design measurement in — not bolt it on at the end — so the report is a by-product of the experience itself.",
    list: [
      "Pre / post structure design",
      "Pre, during, and post engagement",
      "Stakeholder-facing reporting",
      "Social + content strategy",
    ],
  },
  {
    label: "Conferences & Events",
    title: "End-to-end stage programs that pay for themselves.",
    color: "#7ECADF",
    body:
      "Multi-day, multi-stage programs built around sponsor outcomes from day one. We design the curation, the room logic and the throughline so the value lasts past Friday afternoon.",
    list: [
      "Membership design",
      "Sponsor coordination",
      "Production + technical",
      "Pre / during / post measurement",
    ],
  },
  {
    label: "Sponsor Programs",
    title: "ROI-first design for the people writing the cheque.",
    color: "#F9C84A",
    body:
      "Sponsor-grade activations engineered for renewal. We align the experience to the partner’s real metric and ship a report they can hand straight to their reporting stakeholders.",
    list: [
      "Sponsor KPI to experience design",
      "Native partner integrations",
      "Renewal-grade reporting",
      "Outcome conversion + relationship depth report",
    ],
  },
  {
    label: "Community & Membership",
    title: "Programs that compound. Rooms people protect.",
    color: "#BFDEA3",
    body:
      "Members-first programming designed to compound. Each gathering earns the next, each format makes the brand more defensible, each host stays on-tone three years in.",
    list: [
      "Concept + creative direction",
      "Native partner integrations",
      "Members integration + retention frameworks",
      "Curation systems",
    ],
  },
];
