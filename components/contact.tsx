import { BOOKING_URL, EMAIL } from "@/lib/constants";

export function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <div className="cta-grid">
          <div>
            <div className="eyebrow reveal">05 — Get in</div>
            <h2 className="h1 reveal reveal-d1" style={{ marginTop: 22 }}>
              Let’s make
              <br />
              the next one
              <br />
              <span className="accent">worth talking about</span>.
            </h2>
          </div>
          <div className="cta-side reveal reveal-d2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              Book a discovery call <span className="arr">→</span>
            </a>
            <div className="row">
              <div className="lab">Email</div>
              <div className="val">
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="row">
              <div className="lab">Response time</div>
              <div className="val">Inside 72 hours, on weekdays</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
