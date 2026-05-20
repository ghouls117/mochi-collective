"use client";

import { Fragment, useState } from "react";
import { SERVICES } from "@/lib/services";

export function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <section className="services" id="work">
      <div className="wrap">
        <div className="services-head">
          <div>
            <div className="eyebrow reveal">02 — What we do</div>
            <h2
              className="h1 reveal reveal-d1"
              style={{ marginTop: 22, maxWidth: "14ch" }}
            >
              <span className="accent">Five</span> practices.
              <br />
              <span className="accent">One</span> operating system.
            </h2>
          </div>
          <p className="lede reveal reveal-d2">
            Held together by the same proof model, Mochi’s experiential concept
            can be applied to any type and scale of initiative.
          </p>
        </div>

        <div className="services-tabs reveal">
          <div className="tab-list" role="tablist" aria-label="Mochi practices">
            {SERVICES.map((service, i) => {
              const isActive = i === active;
              return (
                <button
                  key={service.label}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="service-detail-panel"
                  id={`service-tab-${i}`}
                  className={"tab-item" + (isActive ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="label">{service.label}</div>
                  <div
                    className="dot"
                    style={{ background: service.color }}
                  />
                  <div className="arr">→</div>
                </button>
              );
            })}
          </div>

          <div
            className="tab-panel"
            key={active}
            id="service-detail-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
          >
            <div className="pnl-head">
              <div
                className="pnl-orb"
                style={{ background: current.color }}
              />
              <div className="pnl-title">
                {splitSentences(current.title).map((line, i, arr) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </div>
            </div>
            <div>
              <p className="pnl-body">{current.body}</p>
              <ul className="pnl-list" style={{ marginTop: 20 }}>
                {current.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="pnl-foot">
              <div>Practice / {String(active + 1).padStart(2, "0")}</div>
              <div className="x">
                <span>Strategy</span>
                <span>Design</span>
                <span>Proof</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Split a title on sentence boundaries (". " or end). */
function splitSentences(title: string): string[] {
  return title.split(/(?<=\.)\s+/);
}
