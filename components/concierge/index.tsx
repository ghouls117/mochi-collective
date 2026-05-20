"use client";

import { useState } from "react";
import { type Answers, QUIZ_STEPS, type StepKey, pickProgram } from "./data";
import { QuizSide } from "./quiz-side";
import { QuizQuestion } from "./quiz-question";
import { QuizResult } from "./quiz-result";

export function Concierge() {
  const total = QUIZ_STEPS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const isResult = step >= total;
  const current = isResult ? null : QUIZ_STEPS[step];

  const pick = (key: StepKey, value: string) => {
    if (key === "pressure") {
      setAnswers((prev) => {
        const arr = prev.pressure ?? [];
        const next = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, pressure: next };
      });
      return;
    }
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // brief pause so the user sees the selected state before advancing
    setTimeout(() => setStep((s) => Math.min(total, s + 1)), 280);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const jump = (i: number) => setStep(Math.max(0, Math.min(total, i)));
  const reset = () => {
    setAnswers({});
    setStep(0);
  };
  const advance = () => setStep((s) => Math.min(total, s + 1));

  return (
    <div className="quiz">
      <QuizSide step={step} onJump={jump} />
      <div className="quiz-main">
        {current && (
          <QuizQuestion
            step={step}
            total={total}
            current={current}
            answers={answers}
            onPick={pick}
            onBack={back}
            onContinue={advance}
          />
        )}
        {isResult && (
          <QuizResult
            answers={answers}
            program={pickProgram(answers)}
            onRestart={reset}
          />
        )}
      </div>
    </div>
  );
}
