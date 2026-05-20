import type { Answers, QuizStep, StepKey } from "./data";

type Props = {
  step: number;
  total: number;
  current: QuizStep;
  answers: Answers;
  onPick: (key: StepKey, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function QuizQuestion({
  step,
  total,
  current,
  answers,
  onPick,
  onBack,
  onContinue,
}: Props) {
  const isMulti = current.key === "pressure";
  const currentValue = answers[current.key];

  const pressureCount = Array.isArray(answers.pressure)
    ? answers.pressure.length
    : 0;
  const canContinue = !isMulti || pressureCount > 0;

  return (
    <>
      <div>
        <div className="eyebrow" style={{ color: "rgba(255,255,255,.5)" }}>
          Question {step + 1} of {total}
        </div>
        <div className="quiz-q" style={{ marginTop: 14 }}>
          {current.q}
        </div>
        <div className="quiz-helper" style={{ marginTop: 10 }}>
          {current.helper}
        </div>
      </div>

      <div className="quiz-opts">
        {current.options.map((opt) => {
          const selected = isMulti
            ? Array.isArray(currentValue) && currentValue.includes(opt.value)
            : currentValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              className={"quiz-opt" + (selected ? " sel" : "")}
              onClick={() => onPick(current.key, opt.value)}
              aria-pressed={isMulti ? selected : undefined}
            >
              <div className="qo-h">
                <span className="dt" style={{ background: opt.dot }} />
                {opt.label}
              </div>
              <div className="qo-sub">{opt.sub}</div>
            </button>
          );
        })}
      </div>

      <div className="quiz-foot">
        <div>
          {isMulti
            ? "Pick one or more — we tune the recommendation to whichever you flag."
            : `Step ${step + 1} / ${total}`}
        </div>
        <div className="nav-btns">
          <button
            type="button"
            className="qb"
            onClick={onBack}
            disabled={step === 0}
          >
            Back
          </button>
          {isMulti && (
            <button
              type="button"
              className="qb primary"
              disabled={!canContinue}
              onClick={onContinue}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </>
  );
}
