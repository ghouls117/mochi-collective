import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BOOKING_URL } from "@/lib/constants";

const SITE_URL = "https://mochicollective.com";
const PAGE_PATH = "/impact-measurement";

export const metadata: Metadata = {
  title: "Impact Measurement for Events | Mochi Collective",
  description:
    "How we measure whether an event, program, or brand activation actually worked — a pre/during/post model that produces a report your stakeholder, sponsor or board can defend.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Impact Measurement — the version that survives contact with a CFO",
    description:
      "A measurement frame designed into the experience, not bolted on afterwards. Pre, during, post. Built for Southeast Asia events, programmes and brand activations.",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Mochi Collective",
    type: "website",
  },
};

const JSON_LD_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Impact Measurement",
  serviceType: "Event impact measurement and reporting",
  provider: { "@id": `${SITE_URL}/#org` },
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Place", name: "Southeast Asia" },
  ],
  description:
    "A pre/during/post measurement model for events, programs and brand activations. Every engagement ships with a stakeholder-facing impact report designed to survive scrutiny from CFO, sponsor, or board.",
  url: `${SITE_URL}${PAGE_PATH}`,
};

export default function ImpactMeasurementPage() {
  return (
    <>
      <Nav />
      <main id="main" className="subpage">
        <div className="wrap">
          <div className="eyebrow">Practice · Impact Measurement</div>
          <h1>
            Impact measurement, built into the experience —{" "}
            <span className="accent">not bolted on</span> at the end.
          </h1>
          <p className="lede">
            Every engagement we take on ships with a proof report designed to
            survive scrutiny from a CFO, a sponsor, or a board. That means the
            measurement frame is a design decision — one we make at brief
            stage, not after the venue lights come down.
          </p>

          <article className="prose">
            <h2>The problem with the wrap deck</h2>
            <p>
              Most post-event reports don&rsquo;t survive contact with the
              people who signed the invoice. The photos are good. The
              testimonials are warm. The behaviour change (or the pipeline,
              the retention, the renewal) is nowhere to be found — because
              nobody designed a way to measure it before the event started.
            </p>
            <p>
              We fix that at the brief. Every event we take on ladders to a
              specific downstream decision — a deal, a hire, a campaign, a
              renewal, a retention — and the measurement frame is built
              backwards from that decision. If we can&rsquo;t name the
              decision, we won&rsquo;t take the brief. It&rsquo;s the fastest
              honesty test we know.
            </p>

            <h2>What we measure — the four categories</h2>
            <p>
              Across the events, community programmes, and brand activations
              we&rsquo;ve run, the answers cluster into four durable
              categories. We test all four, every time.
            </p>
            <ul>
              <li>
                <strong>Moment.</strong> Was there something specific — a
                reveal, a moment on stage, a shared surprise — that people
                remember without prompting?
              </li>
              <li>
                <strong>Framing.</strong> Did a phrase or reframe land? Are
                people using it, unprompted, three days later?
              </li>
              <li>
                <strong>Artefact.</strong> Is there a physical or digital
                thing they left with that&rsquo;s still on their desk in
                three weeks?
              </li>
              <li>
                <strong>Introduction.</strong> Are people continuing
                conversations they started at the event — messaging, meeting,
                referring?
              </li>
            </ul>

            <h2>How the model runs</h2>
            <h3>Pre-event</h3>
            <p>
              We sit with the brief before design begins and write down two
              things. First, the feeling target — what attendees should walk
              out with, emotionally. Second, the Monday sentence — the exact
              wording, unprompted, we want people saying to each other three
              days later. Those two artefacts anchor every design decision
              downstream.
            </p>
            <h3>During the event</h3>
            <p>
              We don&rsquo;t rely on surveys sent at the door. Instead we run
              short in-experience prompts — targeted moments where we check
              whether the design is landing while there&rsquo;s still time to
              adjust. Structured observation of who&rsquo;s talking to whom,
              which sessions cluster attention, and which formats surface the
              introductions we planned for.
            </p>
            <h3>Post-event · 72 hours out</h3>
            <p>
              The primary instrument. A two-question follow-up sent to a
              targeted subset of attendees, seventy-two hours after the
              experience ends. We ask whether they&rsquo;ve talked to someone
              about it, and if so, what they specifically talked about. The
              second answer is the useful one. It clusters cleanly into the
              four categories above, and when it doesn&rsquo;t cluster,
              that&rsquo;s the signal the design didn&rsquo;t land.
            </p>
            <h3>Post-event · six weeks out</h3>
            <p>
              The behaviour test. Did the decision the event was designed to
              set up actually happen? A pipeline moved, a renewal closed, a
              hire signed, a public statement made. This is where the
              measurement frame either pays for itself or exposes what
              didn&rsquo;t work — either outcome is useful.
            </p>

            <h2>What the report looks like</h2>
            <p>
              A short, opinionated document — usually eight to twelve pages —
              organised around the decision the event was designed to enable,
              not around the run of show. It leads with what happened against
              the four categories, then translates that into the language of
              the stakeholder holding the budget: sponsor, board, CFO, or
              category head. Photos and social embeds live in an appendix.
              The report is designed to be forwarded.
            </p>

            <h2>When to bring us in</h2>
            <p>
              The earlier the better. If we sit with the measurement question
              at brief stage — before venue, before agenda, before creative —
              we design the experience around the proof model rather than
              retrofitting a report into whatever happened. If we come in
              later than that, we can still measure — but the frame gets
              tighter, and some of the four categories become harder to
              engineer for.
            </p>
            <p>
              As a rule of thumb: eight weeks out is comfortable. Six weeks
              is workable. Anything inside four weeks and we&rsquo;re
              triaging — we&rsquo;ll still take it on if the fit is right,
              but the measurement plan narrows to what&rsquo;s still
              achievable.
            </p>

            <h2>Reading on how we think about this</h2>
            <ul>
              <li>
                <Link href="/thoughts/thought-leadership/6-questions-every-brief">
                  6 Questions Every Event Brief Must Answer
                </Link>{" "}
                — the filter we put at the top of every brief before
                measurement can be designed against it.
              </li>
              <li>
                <Link href="/thoughts/thought-leadership/first-10-minutes-brief">
                  How We Read Event Briefs During Discovery
                </Link>{" "}
                — the four passes that tell us whether measurement can hold.
              </li>
              <li>
                <Link href="/thoughts/thought-leadership/5-brief-red-flags">
                  5 Event Brief Red Flags (and How to Fix Them)
                </Link>{" "}
                — the signals that a brief will fight measurement.
              </li>
              <li>
                <Link href="/thoughts/brand-strategy/make-it-worth-talking-about">
                  What we mean when we say &ldquo;make it worth talking
                  about&rdquo;
                </Link>{" "}
                — the positioning wedge that makes measurement operational.
              </li>
            </ul>
          </article>

          <div
            className="impact-cta"
            style={{
              marginTop: 48,
              padding: 32,
              border: "1px solid var(--line)",
              background: "var(--card)",
              borderRadius: 4,
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  maxWidth: "30ch",
                }}
              >
                Bring us in at brief stage.
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.55,
                  marginTop: 8,
                  maxWidth: "46ch",
                }}
              >
                30-minute discovery call. We&rsquo;ll ask what the event
                needs to make easier to decide, and tell you whether we can
                measure that.
              </p>
            </div>
            <a
              href={`${BOOKING_URL}?utm_source=website&utm_medium=impactmeasurement&utm_campaign=impactmeasurement`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--color-charcoal)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              Book a Discovery →
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SERVICE) }}
      />
    </>
  );
}
