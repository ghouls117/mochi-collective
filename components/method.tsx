import { METHOD } from "@/lib/method";
import { SectionEyebrow } from "./section-eyebrow";

export function Method() {
  return (
    <section className="method" id="method">
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 30,
            flexWrap: "wrap",
          }}
        >
          <div>
            <SectionEyebrow id="method" label="The Methodology" />
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              <span className="accent">Three</span> steps.
              <br />
              Same operating model.
            </h2>
          </div>
          <p className="lede reveal reveal-d2" style={{ maxWidth: "38ch" }}>
            Every engagement runs the same shape — from a single dinner to a
            four-day summit.
          </p>
        </div>

        <div className="method-grid">
          {METHOD.map((step, i) => (
            <div
              className="method-cell reveal"
              key={step.h}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="step">
                <span className="n" style={{ background: step.tone }}>
                  {step.n}
                </span>
                {`Step 0${step.n}`}
              </div>
              <h3>{step.h}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
