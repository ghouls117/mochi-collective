import { Fragment } from "react";
import { EMAIL } from "@/lib/constants";
import { FAQ } from "@/lib/faq";
import { SectionEyebrow } from "./section-eyebrow";

const ZCAL_PATH = "zcal.co/mochicollective/consultation";
const ZCAL_URL = `https://${ZCAL_PATH}`;

/** Spell small counts, so the lede reads as prose rather than "The 10". */
const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve",
];
function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/**
 * Render a plain-text answer with the primary contact email and the zcal
 * booking URL turned into links. Source data in lib/faq.ts stays as plain
 * strings so it can be serialised verbatim into FAQPage JSON-LD (Schema.org
 * expects text, not HTML).
 */
function renderAnswer(text: string) {
  const emailPattern = EMAIL.replace(/\./g, "\\.");
  const zcalPattern = ZCAL_PATH.replace(/\./g, "\\.").replace(/\//g, "\\/");
  const pattern = new RegExp(`(${emailPattern}|${zcalPattern})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (part === EMAIL) {
      return (
        <a key={i} href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      );
    }
    if (part === ZCAL_PATH) {
      return (
        <a key={i} href={ZCAL_URL}>
          {ZCAL_PATH}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <SectionEyebrow id="faq" label="Answers" />
        <h2
          className="h1 reveal reveal-d1"
          style={{ marginTop: 22, maxWidth: "18ch" }}
        >
          Questions before the <span className="accent">call</span>.
        </h2>
        <p className="lede reveal reveal-d2">
          {/* Counted from the array, not typed. This line read "The nine" above
              ten questions for two deploys — on the section of the site that
              argues hardest for getting numbers right. */}
          The {numberWord(FAQ.length)} we get asked most. If yours isn&rsquo;t
          here, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> &mdash; we
          typically reply inside 72 hours on weekdays.
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
