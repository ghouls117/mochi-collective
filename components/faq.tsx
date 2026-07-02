import { FAQ } from "@/lib/faq";

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
          <a href="mailto:hello@mochicollective.com">
            hello@mochicollective.com
          </a>{" "}
          — we typically reply inside 72 hours on weekdays.
        </p>

        <div className="faq-list">
          {FAQ.map((item, i) => (
            <div
              key={item.q}
              className="faq-item reveal"
              style={{
                transitionDelay: `${Math.min(i * 40, 200)}ms`,
              }}
            >
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
