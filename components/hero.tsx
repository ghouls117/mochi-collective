"use client";

import { scrollToId } from "@/lib/scroll";
import { OrbCluster } from "./orb-cluster";

export function Hero() {
  const go = (id: string, offset = 40) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id, offset);
  };

  return (
    <section id="top" className="hero">
      <div className="wrap" style={{ width: "100%" }}>
        <div className="hero-inner">
          <div>
            <div className="eyebrow reveal">
              Experience design · Strategy · Proof
            </div>
            <h1
              className="display hero-title reveal reveal-d1"
              style={{ marginTop: 26 }}
            >
              Make it
              <br />
              worth <em>talking</em>
              <br />
              about.
            </h1>
            <div className="hero-sub reveal reveal-d2">
              <p>
                Singapore&rsquo;s brand-experience, program design and events
                agency. We build the moments people are still talking about
                months later, and we can show you in numbers that they are.
                Brand activations, conferences and community programs, with the
                proof built in from the brief.
              </p>
            </div>
            <div className="hero-actions reveal reveal-d3">
              <a
                href="#concierge"
                className="btn btn-primary"
                onClick={go("concierge")}
              >
                Start with the Concierge <span className="arr">→</span>
              </a>
              <a href="#work" className="btn btn-ghost" onClick={go("work")}>
                See what we do
              </a>
            </div>
          </div>
          <OrbCluster />
        </div>
      </div>
    </section>
  );
}
