import { SectionEyebrow } from "./section-eyebrow";
import {
  FOUNDERS,
  FOUNDERS_CLOSING,
  FOUNDERS_HEADLINE_ACCENT,
  FOUNDERS_HEADLINE_LEAD,
  FOUNDERS_HEADLINE_TAIL,
  FOUNDERS_INTRO,
} from "@/lib/founders";

/**
 * Section 04 — Who's behind this.
 *
 * The site asks visitors to trust a proof-based claim from a company that is
 * months old; the credibility that backs it is the two founders' track records,
 * and until now neither appeared anywhere on the site.
 *
 * The closing lines sit below a rule so they read as a joint statement rather
 * than as a continuation of the last bio.
 */
export function Founders() {
  return (
    <section className="founders" id="founders">
      <div className="wrap">
        <div className="founders-head">
          <div>
            <SectionEyebrow id="founders" label="Who's behind this" />
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              {FOUNDERS_HEADLINE_LEAD}
              <br />
              <span className="accent">{FOUNDERS_HEADLINE_ACCENT}</span>{" "}
              {FOUNDERS_HEADLINE_TAIL}
            </h2>
          </div>
          <p className="lede reveal reveal-d2" style={{ maxWidth: "42ch" }}>
            {FOUNDERS_INTRO}
          </p>
        </div>

        <div className="founders-grid">
          {FOUNDERS.map((f, i) => (
            <div
              className="founder-cell reveal"
              key={f.name}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="founder-name">{f.name}</h3>
              <div className="founder-role">{f.jobTitle}</div>
              <p className="founder-bio">{f.bio}</p>
              <a
                className="founder-link"
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>

        <div className="founders-close reveal">
          {FOUNDERS_CLOSING.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
