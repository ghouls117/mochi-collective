"use client";

import { useState } from "react";
import {
  type Answers,
  type Program,
  QUIZ_STEPS,
  buildSummary,
  calendarUrl,
  pressureLabels,
} from "./data";

type Props = {
  answers: Answers;
  program: Program;
  onRestart: () => void;
};

function findLabel(stepIdx: number, value: string | undefined): string {
  if (!value) return "—";
  return (
    QUIZ_STEPS[stepIdx].options.find((o) => o.value === value)?.label ?? "—"
  );
}

export function QuizResult({ answers, program, onRestart }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary(answers, program));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="quiz-result">
      <div className="rec-tag">
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: program.accent,
            display: "inline-block",
            marginRight: 10,
          }}
        />
        Suggested program
      </div>
      <h4>
        The <span style={{ color: program.accent }}>{program.name}</span>
      </h4>
      <p>{program.blurb}</p>
      <div className="rec-row">
        <div>
          <div className="lab">Type</div>
          <div className="val">{findLabel(0, answers.kind)}</div>
        </div>
        <div>
          <div className="lab">Pressure points</div>
          <div className="val">{pressureLabels(answers) || "—"}</div>
        </div>
        <div>
          <div className="lab">Timing</div>
          <div className="val">{findLabel(2, answers.when)}</div>
        </div>
        <div>
          <div className="lab">Budget</div>
          <div className="val">{findLabel(3, answers.budget)}</div>
        </div>
      </div>
      <div className="res-actions">
        <a
          className="qb primary"
          href={calendarUrl(answers, program)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a discovery call →
        </a>
        <button type="button" className="qb" onClick={copy}>
          {copied ? "Copied ✓" : "Copy summary"}
        </button>
        <button type="button" className="qb" onClick={onRestart}>
          Start over
        </button>
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,.45)",
          marginTop: 4,
          lineHeight: 1.5,
          maxWidth: "60ch",
        }}
      >
        We pre-fill your summary into the calendar invite note. If it doesn’t
        carry across automatically, paste it from clipboard.
      </div>
    </div>
  );
}
