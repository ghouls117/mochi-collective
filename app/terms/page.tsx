import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EMAIL } from "@/lib/constants";

const LAST_UPDATED = "25 May 2026";
const ENTITY = "Mochi Collective Pte. Ltd.";
const UEN = "202538712H";
const ADDRESS = "68 Circular Road, #02-01, Singapore 049422";

export const metadata: Metadata = {
  title: "Terms of Use — Mochi Collective",
  description:
    "Ground rules for using mochicollective.com — intellectual property, acceptable use, liability, governing law.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="subpage">
        <div className="wrap">
          <div className="eyebrow">Terms</div>
          <h1>Terms of Use</h1>
          <p className="updated">Last updated: {LAST_UPDATED}</p>
          <p className="lede">
            The short version: by using <strong>mochicollective.com</strong>{" "}
            you agree to a handful of basic ground rules. We&rsquo;re
            plainspoken about them &mdash; no clauses written to trap anyone.
            If something here looks off, email{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we&rsquo;ll talk.
          </p>

          <article className="prose">
            <h2>What this website is, and what it isn&rsquo;t</h2>
            <p>
              <strong>mochicollective.com</strong> is the public marketing
              site for {ENTITY} &mdash; a Singapore-registered
              experience-design studio. It exists to:
            </p>
            <ul>
              <li>
                Describe what we do (brand experiences, conferences, community
                programs, sponsor activations, impact measurement)
              </li>
              <li>
                Let you book a discovery call with us via our zcal scheduling
                link
              </li>
              <li>Share thinking, work, and updates from the studio</li>
            </ul>
            <p>The site is <strong>not</strong>:</p>
            <ul>
              <li>
                A binding offer of services. Engagement happens through a
                separate written agreement after we&rsquo;ve spoken.
              </li>
              <li>
                Professional, legal, financial, or medical advice. The
                concierge tool gives you a directional recommendation &mdash;
                it is <strong>not a contract</strong> and creates no
                obligation on either side.
              </li>
              <li>
                A storefront. Nothing on the site can be purchased directly;
                bookings are calendar holds, not payments.
              </li>
            </ul>

            <h2>Who can use the site</h2>
            <p>
              Anyone who has reached the age of majority in their
              jurisdiction (18 in most places). The concierge tool and
              booking page are intended for people exploring an engagement
              with Mochi Collective on behalf of their organisation. Personal
              use is fine; resale or scraping is not.
            </p>

            <h2>What you may not do</h2>
            <p>These are the boring-but-necessary protections:</p>
            <ul>
              <li>
                <strong>
                  Reverse-engineer, copy, mirror, or systematically scrape
                </strong>{" "}
                the site or its assets. We do not allow automated harvesting
                of our copy, design, or visitor data.
              </li>
              <li>
                <strong>Impersonate Mochi Collective</strong> or any of our
                hosts, partners, or clients.
              </li>
              <li>
                <strong>Submit false information</strong> in the concierge or
                booking flow. We screen leads and will decline calls we
                suspect are submitted in bad faith.
              </li>
              <li>
                <strong>Interfere with the site&rsquo;s operation</strong>{" "}
                &mdash; no DoS, no probing, no injection. If you spot a
                genuine security issue, email{" "}
                <a href={`mailto:${EMAIL}?subject=Security`}>{EMAIL}</a> with
                &ldquo;Security&rdquo; in the subject and we&rsquo;ll
                respond.
              </li>
              <li>
                <strong>Use the site to facilitate anything illegal</strong>{" "}
                under Singapore law or the law of your own jurisdiction.
              </li>
            </ul>

            <h2>Intellectual property</h2>
            <p>
              Everything on mochicollective.com &mdash; copy, design, logo,
              the 5-orb brand mark, photography, the concierge logic, the
              program names (&ldquo;Signal Series&rdquo;, &ldquo;Stage
              Program&rdquo;, &ldquo;Inner Circle&rdquo;, &ldquo;Closed
              Doors&rdquo;) &mdash; is owned by {ENTITY} or licensed to us.
            </p>
            <p>
              <strong>You may:</strong>
            </p>
            <ul>
              <li>
                View the site, share links to it, and quote short excerpts
                for editorial purposes with attribution
              </li>
              <li>
                Reference us in articles, press, or social posts as long as
                you don&rsquo;t claim affiliation we haven&rsquo;t given
              </li>
            </ul>
            <p>
              <strong>You may not:</strong>
            </p>
            <ul>
              <li>
                Use our brand mark or copy in your own marketing materials
                without written permission
              </li>
              <li>
                Train an AI model on our content without written permission
              </li>
            </ul>

            <h2>Bookings and engagements</h2>
            <p>
              When you click &ldquo;Book a Discovery&rdquo; or &ldquo;Secure
              a Consultation&rdquo;:
            </p>
            <ul>
              <li>
                You&rsquo;re scheduling a free 30-minute discovery call. No
                payment is taken at this stage.
              </li>
              <li>
                The booking is governed by zcal&rsquo;s terms (your name,
                email, and scheduling preferences flow to them). See our{" "}
                <Link href="/privacy">Privacy Policy</Link> for what data we
                collect.
              </li>
              <li>
                If we proceed to engagement after the call, we&rsquo;ll send
                a separate Statement of Work covering scope, fee, IP
                ownership of deliverables, and a confidentiality clause.{" "}
                <strong>
                  That document &mdash; not these Terms &mdash; governs paid
                  work.
                </strong>
              </li>
            </ul>
            <p>
              Cancelling a discovery call: no fee, no questions. Just decline
              the calendar invite or email us.
            </p>

            <h2>Disclaimers</h2>
            <p>
              The site is provided &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo;. We make reasonable efforts to keep it correct
              and online but:
            </p>
            <ul>
              <li>
                We can&rsquo;t guarantee continuous uptime &mdash; third-party
                providers (Vercel, zcal, Google Workspace) sometimes have
                outages.
              </li>
              <li>
                Information on case studies, sample programs, or methodology
                is descriptive of past work and approach, not a guarantee of
                future results.
              </li>
              <li>
                The concierge recommendation is a starting point for
                conversation.{" "}
                <strong>
                  The right shape for your event always emerges from the
                  discovery call, not the quiz.
                </strong>
              </li>
            </ul>

            <h2>Liability</h2>
            <p>
              To the maximum extent permitted by Singapore law, {ENTITY} is
              not liable for:
            </p>
            <ul>
              <li>
                Indirect, consequential, or punitive damages arising from
                your use of the site
              </li>
              <li>
                Loss of profits, data, or business opportunity attributed to
                information on the site
              </li>
              <li>
                Third-party actions (e.g. if zcal loses your booking data,
                our liability is limited to what we can practically recover)
              </li>
            </ul>
            <p>
              If you do suffer harm directly caused by an issue we&rsquo;re
              responsible for, our total liability is capped at the amount
              paid by you to Mochi Collective in the 12 months preceding the
              incident (which, for visitors who haven&rsquo;t engaged us, is
              SGD&nbsp;$0).
            </p>

            <h2>Indemnity</h2>
            <p>
              If something you do via the site (e.g. submitting infringing
              content in the concierge open-text field, or misusing a brand
              asset) causes a third party to come after us, you&rsquo;ll
              cover our reasonable legal costs and damages from that.
            </p>

            <h2>Changes to these Terms</h2>
            <p>
              We may update these Terms as the business grows &mdash; for
              instance, if we add new services, change processors, or refine
              our IP policy. When we do:
            </p>
            <ul>
              <li>We update the &ldquo;Last updated&rdquo; date at the top</li>
              <li>
                For material changes (e.g. a new processor that handles your
                data), we&rsquo;ll notify anyone with a recent booking by
                email
              </li>
              <li>
                Continuing to use the site after a change means you accept
                the updated Terms
              </li>
            </ul>

            <h2>Governing law and dispute resolution</h2>
            <ul>
              <li>
                These Terms are governed by the laws of Singapore.
              </li>
              <li>
                Disputes that can&rsquo;t be resolved informally are subject
                to the exclusive jurisdiction of the courts of Singapore.
              </li>
              <li>
                We strongly prefer to talk things through before escalating.
                Email first.
              </li>
            </ul>

            <h2>Contact</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              <strong>Subject prefix for legal matters:</strong>{" "}
              &ldquo;Legal&rdquo; or &ldquo;Terms&rdquo;
            </p>

            <p className="footnote">
              {ENTITY} (UEN {UEN}) is a private limited company registered
              in Singapore.
              <br />
              Registered office: {ADDRESS}.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
