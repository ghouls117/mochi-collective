import { SectionEyebrow } from "./section-eyebrow";

export function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <div className="wrap">
        <div className="manifesto-grid">
          <div>
            <SectionEyebrow id="manifesto" label="Position" />
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              We don’t report what <span className="accent">happened</span>.
              <br />
              We report what <span className="accent">changed</span>.
            </h2>
          </div>
          <div className="manifesto-body reveal reveal-d2">
            <p>
              Most events end with a recap deck and a feeling. Ours end with a
              measurable answer to the question that paid for them.
            </p>
            <p>
              We design experiences that co-exist with your events —
              conferences, community programs, and evergreen initiatives — and
              run them the way a good operator runs a P&amp;L:{" "}
              <strong>impact baked into the experience</strong>, ROI tracked
              against the metric your sponsor or your CFO actually cares about,
              and proof you can hand over without a flinch.
            </p>
            <p>
              The events do the talking. We make sure they say something worth
              repeating.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
