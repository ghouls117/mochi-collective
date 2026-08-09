export type MethodStep = {
  n: number;
  h: string;
  tone: string;
  body: string;
};

export const METHOD: MethodStep[] = [
  {
    n: 1,
    h: "Strategy",
    tone: "#F6BEC9",
    body:
      "We start with the metric, not the moodboard. What needs to change, and who has to see it? We come back with a brief that survives the boardroom.",
  },
  {
    n: 2,
    h: "Design",
    tone: "#BFDEA3",
    body:
      "Concept, format, program, room. We design the experience around the proof model so the measurement is a by-product of the thing itself, not bolted on at the end.",
  },
  {
    n: 3,
    h: "Proof",
    tone: "#F9C84A",
    body:
      "Pre, during and post, against the number we agreed at the start. Where the format allows it we build in a control: a held-back invite list, a comparison period, an unprogrammed night. That’s what separates this worked from this happened at the same time as something else. You get a report you can hand to any stakeholder without a flinch, including the parts that didn’t move.",
  },
];
