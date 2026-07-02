import { Fragment } from "react";
import { EMAIL } from "@/lib/constants";
import { FAQ } from "@/lib/faq";

/**
 * Render a plain-text answer with any occurrence of the primary contact
 * email turned into a `mailto:` link. Keeps the source data in lib/faq.ts
 * as plain strings so it can still be serialised verbatim into FAQPage
 * JSON-LD (Schema.org expects text, not HTML).
 */
function renderAnswer(text: string) {
  const pattern = new RegExp(`(${EMAIL.replace(/\./g, "\\.")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    part === EMAIL ? (
      <a key={i} href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="eyebrow reveal">Answers</div>
        <h2
          className="h1 reveal reveal-d1"
          style={{ marginTop: 22, maxWidth: "18ch" }}
        >
          Questions before the <span className="accent">call</span>.
        </h2>
        <p className="lede reveal reveal-d2">
          The nine we get asked most. If yours isn&rsquo;t here, email{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> &mdash; we typically reply
          inside 72 hours on weekdays.
        </p>

        <div className="faq-list">
          {FAQ.map((item) => (
            <details key={item.q} className="faq-item reveal">
              <summary>
                <span className="faq-q">{item.q}</span>
                <span className="faq-chevron" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="faq-a">
                <p>{renderAnswer(item.a)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
