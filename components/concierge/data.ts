import { BOOKING_URL } from "@/lib/constants";

export type StepKey = "kind" | "pressure" | "when" | "budget";

export type QuizOption = {
  value: string;
  label: string;
  sub: string;
  dot: string;
};

export type QuizStep = {
  key: StepKey;
  q: string;
  helper: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    key: "kind",
    q: "What are you planning?",
    helper: "We work across every format. Tell us what shape this one takes.",
    options: [
      {
        value: "launch",
        label: "Framework integration, small scale programs",
        sub: "Dinners, salons, popups, ongoing formats",
        dot: "#F6BEC9",
      },
      {
        value: "conference",
        label: "Activations & larger scale programs",
        sub: "Launches, conferences, multi-stage moments",
        dot: "#7ECADF",
      },
      {
        value: "community",
        label: "Community or membership",
        sub: "Salons, dinners, recurring formats",
        dot: "#BFDEA3",
      },
      {
        value: "internal",
        label: "Internal program or reporting",
        sub: "Offsites, board events, partner days",
        dot: "#F9C84A",
      },
    ],
  },
  {
    key: "pressure",
    q: "What’s the pressure point?",
    helper: "Be honest — this is the thing keeping someone awake.",
    options: [
      {
        value: "budget",
        label: "Budget survival",
        sub: "Same outcome, less money. Or prove it was worth it.",
        dot: "#F9C84A",
      },
      {
        value: "sponsor",
        label: "Sponsor retention",
        sub: "Renewals are tight. Need measurable proof.",
        dot: "#7ECADF",
      },
      {
        value: "audience",
        label: "Right room & right people",
        sub: "Audience design and curation matters most.",
        dot: "#F6BEC9",
      },
      {
        value: "impact",
        label: "Proving impact",
        sub: "What changed because the event happened?",
        dot: "#BFDEA3",
      },
    ],
  },
  {
    key: "when",
    q: "When are you in market?",
    helper: "Rough timing is fine. We’ll build the runway around it.",
    options: [
      {
        value: "q-soon",
        label: "Inside 12 weeks",
        sub: "Sprint mode. Strategy + production in parallel.",
        dot: "#F6BEC9",
      },
      {
        value: "q-3to6",
        label: "3 to 6 months",
        sub: "Healthy runway. Strategy-led.",
        dot: "#7ECADF",
      },
      {
        value: "q-6plus",
        label: "6 months or more",
        sub: "Deep design from the ground up.",
        dot: "#BFDEA3",
      },
      {
        value: "q-open",
        label: "Open / exploring",
        sub: "Not committed to a date yet.",
        dot: "#93ADBF",
      },
    ],
  },
  {
    key: "budget",
    q: "And the working budget?",
    helper:
      "Order of magnitude, in Singapore dollars — the total working budget for the event, not our fee. We design to it, and tell you when it doesn’t add up.",
    options: [
      {
        value: "b-s",
        label: "Under S$50k",
        sub: "Lean, sharp, one beautiful idea.",
        dot: "#F9C84A",
      },
      {
        value: "b-m",
        label: "S$50k – S$250k",
        sub: "Most of our community + activation work.",
        dot: "#BFDEA3",
      },
      {
        value: "b-l",
        label: "S$250k – S$1M",
        sub: "Full conference and multi-touch programs.",
        dot: "#7ECADF",
      },
      {
        value: "b-xl",
        label: "S$1M+",
        sub: "Flagship, multi-city, season-long.",
        dot: "#F6BEC9",
      },
    ],
  },
];

export const STEP_LABELS = ["Type", "Pressure", "Timing", "Budget"] as const;

export type Answers = {
  kind?: string;
  pressure?: string[];
  when?: string;
  budget?: string;
};

export type Program = {
  name: string;
  accent: string;
  blurb: string;
};

const PROGRAM_BASE: Record<string, Omit<Program, "blurb">> = {
  launch: { name: "Signal Series", accent: "#F6BEC9" },
  conference: { name: "Stage Program", accent: "#7ECADF" },
  community: { name: "Inner Circle", accent: "#BFDEA3" },
  internal: { name: "Closed Doors", accent: "#F9C84A" },
};

const BLURBS: Record<string, string> = {
  "launch.budget":
    "A single, magnetic moment engineered to over-index on press, social and word of mouth — designed so we can prove what the room actually did next.",
  "launch.sponsor":
    "A launch built like a sponsor case study from day one: defined KPIs, witnessable proof, post-event report you can hand straight to the partner.",
  "launch.audience":
    "Curated invite design, audience shaping and a room that does the talking. The activation is the supporting act; the people are the headline.",
  "launch.impact":
    "A launch with impact measurement baked into the experience — so the report writes itself and the next round funds itself.",
  "conference.budget":
    "Programming and production engineered to spend where the audience sees it, not where the spreadsheet does. We cut the parts no one remembers.",
  "conference.sponsor":
    "Sponsor-led summit design. Activations that align to the partner’s real metric, ROI baked into the experience, retention-grade reporting.",
  "conference.audience":
    "Audience-first conference design — track curation, room logic and rituals that make the right people meet on purpose, not by accident.",
  "conference.impact":
    "A summit that ships proof: pre/during/post measurement, behavioural change tracked, narrative we can defend to a board.",
  "community.budget":
    "A recurring format with high ritual, low overhead. Designed to compound: each gathering earns the next one.",
  "community.sponsor":
    "Members-first community programming with partner integrations that feel native, not bolted on — and that renewals survive.",
  "community.audience":
    "Membership design, host briefing, and curation systems so every dinner stays on-tone three years in.",
  "community.impact":
    "A community measured on the conversations it starts, the doors it opens, and the retention it earns — not RSVP count.",
  "internal.budget":
    "An internal program that earns its budget by changing one specific behaviour, measured before and after.",
  "internal.sponsor":
    "Stakeholder programming engineered for the meeting after the meeting — when the partner decides what they think.",
  "internal.audience":
    "Offsite and partner-day design that engineers the right exchanges, in the right pairs, at the right time.",
  "internal.impact":
    "Closed-door programming with a measurement frame the leadership team will actually trust.",
};

export function pickProgram(answers: Answers): Program {
  const kind = answers.kind ?? "launch";
  const pressure = answers.pressure?.[0];
  const base = PROGRAM_BASE[kind] ?? PROGRAM_BASE.launch;
  const blurb =
    (pressure && BLURBS[`${kind}.${pressure}`]) ??
    "A tailored program. We’ll come back inside 48 hours with a shape, a runway and a proof model.";
  return { ...base, blurb };
}

function labelFor(stepIdx: number, value: string | undefined): string {
  if (!value) return "";
  return (
    QUIZ_STEPS[stepIdx].options.find((o) => o.value === value)?.label ?? ""
  );
}

export function pressureLabels(answers: Answers): string {
  return (answers.pressure ?? [])
    .map((v) => labelFor(1, v))
    .filter(Boolean)
    .join(", ");
}

export function buildSummary(answers: Answers, program: Program): string {
  return [
    "Mochi Concierge — booking request",
    `Suggested program: ${program.name}`,
    `Type: ${labelFor(0, answers.kind) || "—"}`,
    `Pressure points: ${pressureLabels(answers) || "—"}`,
    `Timing: ${labelFor(2, answers.when) || "—"}`,
    `Budget: ${labelFor(3, answers.budget) || "—"}`,
    "—",
    program.blurb,
  ].join("\n");
}

/**
 * zcal prefill conventions:
 *   a0 = Type, a1 = Pressure (checkbox, literal commas), a2 = Timing,
 *   a3 = Budget, a4 = Program + blurb, notes = full summary.
 */
export function calendarUrl(answers: Answers, program: Program): string {
  const params = new URLSearchParams();
  const kindLabel = labelFor(0, answers.kind);
  const whenLabel = labelFor(2, answers.when);
  const budgetLabel = labelFor(3, answers.budget);

  if (kindLabel) params.set("a0", kindLabel);
  if (whenLabel) params.set("a2", whenLabel);
  if (budgetLabel) params.set("a3", budgetLabel);
  params.set("a4", `${program.name} — ${program.blurb}`);
  params.set("notes", buildSummary(answers, program));

  let qs = params.toString();
  const pressures = (answers.pressure ?? [])
    .map((v) => labelFor(1, v))
    .filter(Boolean);
  if (pressures.length > 0) {
    const a1 = pressures
      .map((s) => encodeURIComponent(s).replace(/%20/g, "+"))
      .join(",");
    qs += (qs ? "&" : "") + "a1=" + a1;
  }
  return qs ? `${BOOKING_URL}?${qs}` : BOOKING_URL;
}
