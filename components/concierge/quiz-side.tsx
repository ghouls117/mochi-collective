import { QUIZ_STEPS, STEP_LABELS } from "./data";

type Props = {
  step: number;
  onJump: (i: number) => void;
};

export function QuizSide({ step, onJump }: Props) {
  return (
    <div className="quiz-side">
      <div className="pill">Mochi Concierge</div>
      <h3>Tell us what you’re planning. We’ll come back with a shape for it.</h3>
      <div className="steps">
        {QUIZ_STEPS.map((s, i) => {
          const cls =
            i < step ? "stp done" : i === step ? "stp cur" : "stp";
          return (
            <button
              key={s.key}
              className={cls}
              onClick={() => onJump(i)}
              type="button"
            >
              <span className="b">{i < step ? "✓" : i + 1}</span>
              <span>{STEP_LABELS[i]}</span>
            </button>
          );
        })}
        <button
          className={step >= QUIZ_STEPS.length ? "stp cur" : "stp"}
          onClick={() => onJump(QUIZ_STEPS.length)}
          type="button"
        >
          <span className="b">{step >= QUIZ_STEPS.length ? "✓" : "★"}</span>
          <span>Recommendation</span>
        </button>
      </div>
    </div>
  );
}
