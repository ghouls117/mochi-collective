import { Concierge } from "./concierge";

export function ConciergeSection() {
  return (
    <section className="concierge" id="concierge">
      <div className="wrap">
        <div className="eyebrow reveal">04 — Service Concierge</div>
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
      </div>
    </section>
  );
}
