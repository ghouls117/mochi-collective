"use client";

import { Fragment, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES, FORMATS } from "@/lib/services";
import { SectionEyebrow } from "./section-eyebrow";

export function Services() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  /**
   * On narrow viewports the tab list and detail panel stack vertically, so
   * tapping a tab leaves the user staring at the same tab list (the panel
   * is well below the fold). Auto-scroll the active panel into view on click —
   * but only on mobile, so desktop hover-switching stays static and snappy.
   */
  const handleTabClick = (index: number) => {
    setActive(index);
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;
    requestAnimationFrame(() => {
      panelRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section className="services" id="work">
      <div className="wrap">
        <div className="services-head">
          <div>
            <SectionEyebrow id="work" label="What we do" />
            <h2
              className="h1 services-headline reveal reveal-d1"
              style={{ marginTop: 22 }}
            >
              <span className="accent">Five</span> practices.
              <br />
              <span className="accent">One</span> operating system.
            </h2>
          </div>
          {/* The operating system IS impact measurement — this lede is where
              that practice now lives, and it links out to the page so the
              claim has somewhere to prove itself. */}
          <p className="lede reveal reveal-d2">
            The operating system is{" "}
            <Link href="/impact-measurement" className="lede-link">
              impact measurement
            </Link>
            . One metric, agreed in writing before we design anything, then
            instrumented before, during and after — with a control built in
            wherever the format allows. Five different rooms; the same proof
            model underneath every one.
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
                  aria-controls={`service-detail-panel-${i}`}
                  id={`service-tab-${i}`}
                  className={"tab-item" + (isActive ? " active" : "")}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => handleTabClick(i)}
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

          {/*
            All 5 panels are rendered server-side into the DOM so AI crawlers
            (GPTBot, ClaudeBot, PerplexityBot etc.) that don't execute JS can
            read every practice's copy. Only the active panel is visible; the
            rest are `display: none` via the `.hidden` class. Same UX as
            before, but the full service story is now machine-readable on the
            first HTML load.
          */}
          <div className="tab-panels">
            {SERVICES.map((service, i) => {
              const isActive = i === active;
              return (
                <div
                  key={service.label}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className={"tab-panel" + (isActive ? "" : " hidden")}
                  id={`service-detail-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${i}`}
                  aria-hidden={!isActive}
                  hidden={!isActive}
                >
                  <div className="pnl-head">
                    <div
                      className="pnl-orb"
                      style={{ background: service.color }}
                    />
                    <div className="pnl-title">
                      {splitSentences(service.title).map((line, li, arr) => (
                        <Fragment key={li}>
                          {line}
                          {li < arr.length - 1 && <br />}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="pnl-body">{service.body}</p>
                    <ul className="pnl-list" style={{ marginTop: 20 }}>
                      {service.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {service.deepLink && (
                      <a
                        href={service.deepLink.href}
                        className="pnl-link"
                      >
                        {service.deepLink.label} <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                  <div className="pnl-foot">
                    <div>Practice / {String(i + 1).padStart(2, "0")}</div>
                    <div className="x">
                      <span>Strategy</span>
                      <span>Design</span>
                      <span>Proof</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plain-language restatement of the five, for people who scan past
            the tab interaction without opening a panel. */}
        <div className="formats reveal">
          <span className="formats-label">Formats we&rsquo;re known for</span>
          <ul className="formats-list">
            {FORMATS.map((f) => (
              <li key={f.href}>
                <Link href={f.href}>{f.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Split a title on sentence boundaries (". " or end). */
function splitSentences(title: string): string[] {
  return title.split(/(?<=\.)\s+/);
}
