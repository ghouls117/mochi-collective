import { Concierge } from "./concierge";
import { SectionEyebrow } from "./section-eyebrow";
import { PRICE_BAND_MAX, PRICE_BAND_MIN } from "@/lib/constants";

export function ConciergeSection() {
  return (
    <section className="concierge" id="concierge">
      <div className="wrap">
        <SectionEyebrow id="concierge" label="Service Concierge" />
        <h2
          className="h1 reveal reveal-d1"
          style={{ marginTop: 22, maxWidth: "18ch" }}
        >
          Four questions.
          <br />A <span className="accent">shape</span> for your event by Friday.
        </h2>
        <p className="concierge-lede reveal reveal-d2">
          Tell us what you’re planning. We come back inside 72 hours with a
          program shape, a budget reality check, and a runway you can take to a
          sponsor or a board.
        </p>
        <div className="reveal reveal-d3">
          <Concierge />
        </div>
        {/* A price floor filters inbound before it costs an hour. It was
            already declared in llms.txt, so machines knew it and humans
            didn't — this puts the same number where people can see it. */}
        <p className="concierge-price reveal">
          Most engagements start between{" "}
          <strong>
            {PRICE_BAND_MIN}&ndash;{PRICE_BAND_MAX}
          </strong>
          , depending on how much of it we run. If you&rsquo;re not there yet, say
          so in the form &mdash; we&rsquo;ll tell you honestly whether we&rsquo;re
          the right call, or point you to someone who is.
        </p>
      </div>
    </section>
  );
}
