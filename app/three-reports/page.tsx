import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BOOKING_URL } from "@/lib/constants";

const SITE_URL = "https://mochicollective.com";
const PAGE_PATH = "/three-reports";

/**
 * Resource page, deliberately top-level rather than under /thoughts/.
 *
 * It is the destination for post 4 of the August LinkedIn pillar campaign
 * (25 Aug), which is that month's conversion post — so the URL has to be short
 * enough to quote in a post, and the page has to be indexed before the post
 * runs. Company voice throughout, not Justin's first person: the post is his
 * voice, this page is Mochi's.
 */
export const metadata: Metadata = {
  title:
    "The Three Reports — What Leadership, Sponsors, and GTM Each Need After an Event | Mochi Collective",
  description:
    "Three people will ask whether your event worked. They are asking three different questions. Here's the reporting structure that answers all three — and an honest account of what event measurement cannot claim.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: true, follow: true },
  keywords: [
    "impact measurement",
    "event ROI",
    "sponsorship measurement",
    "event reporting",
    "experience design",
    "Singapore",
  ],
  openGraph: {
    title:
      "The Three Reports — what leadership, sponsors and GTM each need after an event",
    description:
      "Most post-event reporting fails because it is addressed to nobody in particular. Three readers, three questions, three reports — plus the things we will not claim.",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "Mochi Collective",
    type: "article",
    locale: "en_SG",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Mochi Collective — The Three Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Three Reports — leadership, sponsors, GTM",
    description:
      "Three people will ask whether your event worked. They are asking three different questions.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const BOOKING_HREF = `${BOOKING_URL}?utm_source=website&utm_medium=threereports&utm_campaign=threereports`;

const JSON_LD_ARTICLE = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Three Reports",
  description:
    "What leadership, sponsors and go-to-market each need after an event, the reporting structure that answers all three, and an honest account of what event measurement cannot claim.",
  // Company voice, not a bylined essay — author is the org, unlike
  // /thoughts/* posts which carry Justin's byline.
  author: { "@id": `${SITE_URL}/#org` },
  publisher: { "@id": `${SITE_URL}/#org` },
  inLanguage: "en-SG",
  isAccessibleForFree: true,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PAGE_PATH}` },
  url: `${SITE_URL}${PAGE_PATH}`,
  about: [
    { "@type": "Thing", name: "Event impact measurement" },
    { "@type": "Thing", name: "Sponsorship measurement" },
  ],
};

export default function ThreeReportsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="subpage">
        <div className="wrap">
          <div className="eyebrow">Resource · Impact Measurement</div>
          <h1>
            Three people will ask whether your event worked. They are asking{" "}
            <span className="accent">three different questions</span>.
          </h1>
          <p className="lede">
            Most post-event reporting fails not because the data is bad but
            because it is addressed to nobody in particular. One deck goes to
            everyone. Leadership skims it for a number that justifies the
            spend. The sponsor looks for evidence worth renewing against. The
            GTM lead looks for accounts. None of them finds what they came
            for, because the report was built to describe the event rather
            than to answer a question.
          </p>

          <article className="prose">
            <p>Here is the structure we use instead.</p>

            <h2>
              Report 1 — <span className="accent">Leadership</span> wants
              worth-proofing
            </h2>
            <p>
              The question leadership is actually asking is never{" "}
              <em>&ldquo;was it good.&rdquo;</em> It is:
            </p>
            <blockquote>
              <p>
                <strong>
                  &ldquo;Was this better than what else that budget could have
                  bought?&rdquo;
                </strong>
              </p>
            </blockquote>
            <p>
              That is a comparative question, and it can only be answered
              comparatively. A report that says the event was excellent, on
              budget, and well attended does not answer it. A report that says
              what the outcome cost, measured against the alternative you did
              not fund, does.
            </p>
            <p>
              <strong>What goes in this report:</strong>
            </p>
            <ul>
              <li>
                <strong>Cost per outcome</strong>, where the outcome was
                defined at brief stage — not attendance, not satisfaction. If
                the brief said &ldquo;forty target accounts leave with a
                reason to take our next call,&rdquo; the number is cost per
                account that did.
              </li>
              <li>
                <strong>The unfunded alternative, named.</strong> What else
                was on the table for this budget — a campaign, a series of
                smaller dinners, nothing at all — and how the outcome
                compares.
              </li>
              <li>
                <strong>What you would cut</strong> if the same budget came
                again at 70%. Leadership trusts a report that tells them where
                the fat is far more than one that says everything was
                essential.
              </li>
            </ul>
            <p>
              <strong>What to leave out:</strong> production quality,
              run-of-show adherence, photo counts, same-day satisfaction
              scores. These are craft measures. They tell you the event was
              well made. They do not tell you it was worth making.
            </p>

            <h2>
              Report 2 — The <span className="accent">sponsor</span> wants a
              reason to renew
            </h2>
            <p>
              A sponsor is not asking whether the event was good either. They
              are asking whether they can justify the line item internally
              next year. That justification usually has to survive someone who
              was not in the room.
            </p>
            <p>
              <strong>What goes in this report:</strong>
            </p>
            <ul>
              <li>
                <strong>
                  The quality and volume of high-intent interaction they
                  actually received.
                </strong>{" "}
                Not impressions. Not footfall past a booth. The interactions
                where someone in their target audience engaged with intent —
                and how many, and of what kind.
              </li>
              <li>
                <strong>The metric agreed at partnership kick-off</strong>,
                reported against directly. If the metric was agreed at the
                start, this report writes itself. If it was not, this is the
                moment the relationship starts to wobble.
              </li>
              <li>
                <strong>What is repeatable.</strong> Which activations
                produced the interaction and which did not, so next
                year&rsquo;s package can be redesigned rather than renewed on
                faith.
              </li>
            </ul>
            <p>
              The{" "}
              <Link href="/sponsor-programs">sponsor programs</Link> that renew
              for five years running are the ones where the measurement was
              designed into the program at kick-off, aligned to what the
              sponsor&rsquo;s marketing lead needs to justify the spend
              internally. The ones that fail follow a pattern: packages
              designed around what could be sold, not what could be measured.
              By year two the sponsor has warm feelings, no measurable
              outcome, and quiet doubts. By year three, they walk.
            </p>
            <p>
              IEG&rsquo;s guidance on sponsorship measurement makes the
              underlying point plainly: most sponsorship reporting captures{" "}
              <strong>outputs</strong> rather than <strong>outcomes</strong>.
              That 200,000 people attended tells you an event was popular. It
              tells you nothing about whether it worked.
            </p>

            <h2>
              Report 3 — <span className="accent">GTM</span> wants to know
              whether named accounts moved
            </h2>
            <p>
              This is the hardest of the three to evidence, and the most
              valuable when you can.
            </p>
            <p>The question is:</p>
            <blockquote>
              <p>
                <strong>
                  &ldquo;Did the accounts we care about show up, engage, and
                  move?&rdquo;
                </strong>
              </p>
            </blockquote>
            <p>
              <strong>What goes in this report:</strong>
            </p>
            <ul>
              <li>
                <strong>
                  The named target account list, agreed before the event
                </strong>{" "}
                — not assembled afterwards from whoever happened to attend. A
                list built after the fact will always look flattering and
                prove nothing.
              </li>
              <li>
                <strong>Attendance against that list.</strong> Who came, at
                what seniority, from which accounts.
              </li>
              <li>
                <strong>Engagement depth, not presence.</strong> A logged
                conversation with a decision-maker is a different signal from
                a badge scan.
              </li>
              <li>
                <strong>Subsequent movement</strong>, tracked in the CRM over
                an agreed window — a meeting accepted, a stage change, a
                stalled account reopening.
              </li>
            </ul>
            <p>
              The discipline that makes this possible is entirely upstream. If
              the account list, the window, and the definition of
              &ldquo;moved&rdquo; are agreed at brief stage, the report is
              straightforward. If they are not, no amount of post-event
              analysis will manufacture them.
            </p>

            <h2>
              What we <span className="accent">will not</span> claim
            </h2>
            <p>Here is the part most agencies leave out.</p>
            <p>
              <strong>
                We cannot draw a clean line from a room to a closed deal.
              </strong>{" "}
              Nobody honestly can. B2B purchases involve many people, many
              touches, and long windows. Any agency showing you a tidy
              attribution path from an experience to signed revenue is usually
              showing you a last-touch model wearing a suit.
            </p>
            <p>We also will not tell you:</p>
            <ul>
              <li>
                That an engagement score derived from cameras pointed at
                people&rsquo;s faces means anything. It does not — facial
                detection cannot distinguish interest from a sore back.
              </li>
              <li>
                Which individual attendee &ldquo;mattered most.&rdquo; The
                person who mattered most is almost never the one who moved
                most, and ranking participants creates a false hierarchy that
                clients then act on.
              </li>
              <li>
                That a same-day satisfaction score predicts anything durable.
                Same-day NPS is a mood reading, not a memory.
              </li>
            </ul>
            <p>
              What we will claim is{" "}
              <strong>
                the part we control, measured properly, and reported to the
                person actually asking the question.
              </strong>
            </p>
            <p>
              That is a narrower promise than the industry usually makes. It
              is also one that survives contact with a CFO.
            </p>

            <h2>
              Where this <span className="accent">starts</span>
            </h2>
            <p>
              None of these three reports can be written after the fact. All
              three depend on decisions made at brief stage: what outcome was
              named, which accounts were listed, what metric the sponsor
              agreed to.{" "}
              <Link href="/impact-measurement">Measurement</Link> is a design
              decision, not a reporting exercise — which is why we spend the
              first part of every engagement on the brief rather than the
              run-of-show.
            </p>
            <p>
              If you are planning something in the next two quarters and want
              an honest read on whether the brief is ready to build — and
              whether the outcome you have named is one that can actually be
              measured — the Brief Diagnostic is free, thirty minutes, and has
              no pitch attached.
            </p>
          </article>

          {/* Layout lives in globals.css (.impact-cta) so it can stack on
              mobile — an inline grid can't carry a media query. */}
          <div className="impact-cta">
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
                Book a Brief Diagnostic.
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
                Bring the brief you are working on. We&rsquo;ll work through
                who will ask whether it worked, and what each of them would
                need to see.
              </p>
            </div>
            <a
              href={BOOKING_HREF}
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
              Book a Brief Diagnostic →
            </a>
          </div>

          <aside style={{ marginTop: 48 }}>
            <div className="eyebrow">Related reading</div>
            <ul className="related-reading">
              <li>
                <Link href="/thoughts/thought-leadership/impact-measurement-for-events">
                  Impact Measurement for Events
                </Link>{" "}
                — the underlying framework
              </li>
              <li>
                <Link href="/thoughts/thought-leadership/6-questions-every-brief">
                  6 Questions That Should Live At The Top Of Every Brief
                </Link>{" "}
                — the brief-stage discipline this depends on
              </li>
              <li>
                {/* Brand Strategy, not Thought Leadership — the marketing brief
                    had this pointed at a URL that 404s. */}
                <Link href="/thoughts/brand-strategy/how-we-use-ai-to-measure-impact">
                  How We Use AI to Measure Impact
                </Link>{" "}
                — where AI helps and where we refuse it
              </li>
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }}
      />
    </>
  );
}
