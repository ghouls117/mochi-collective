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
      "Pre, during and post. Behaviour, follow-ups, sentiment, impact. A report you can hand to any of your or a partner’s stakeholder without a single flinch.",
  },
];
