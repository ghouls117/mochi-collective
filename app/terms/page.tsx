import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EMAIL } from "@/lib/constants";
import { PROGRAM_NAMES } from "@/components/concierge/data";

const LAST_UPDATED = "21 July 2026";
const ENTITY = "Mochi Collective Pte. Ltd.";
const UEN = "202538712H";
const ADDRESS = "68 Circular Road, #02-01, Singapore 049422";

export const metadata: Metadata = {
  title: "Terms of Use — Mochi Collective",
  description:
    "Ground rules for using mochicollective.com — intellectual property, acceptable use, bookings, liability, and governing law under Singapore jurisdiction.",
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
            These Terms of Use (&ldquo;Terms&rdquo;) govern your use of
            mochicollective.com (the &ldquo;Site&rdquo;), operated by{" "}
            {ENTITY} (&ldquo;Mochi Collective&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;). By using the Site, you agree to these Terms.
            If you do not agree, please do not use the Site.
          </p>

          <article className="prose">
            <h2>1. What this website is, and what it isn&rsquo;t</h2>
            <p>
              The Site exists to describe our services (brand experiences,
              conferences and events, community and membership programs,
              sponsor activations, and impact measurement), to let you book a
              discovery call through our scheduling provider, zcal, and to
              share our thinking, work, and updates.
            </p>
            <p>The Site is not:</p>
            <ul>
              <li>
                A binding offer of services. Nothing on the Site constitutes
                an offer capable of acceptance. Any actual engagement with
                Mochi Collective happens under a separate written agreement
                after a consultation.
              </li>
              <li>
                Professional advice. Content on the Site, including any
                output of the Service Concierge tool, is directional and
                informational only. It is not legal, financial, or medical
                advice, and it creates no contractual obligation on either
                side.
              </li>
              <li>
                A storefront. Nothing on the Site can be purchased directly.
                Placing a hold on our calendar is not a payment and does not
                create a paid engagement.
              </li>
            </ul>

            <h2>2. Who can use the Site</h2>
            <p>
              The Site is intended for individuals who have reached the age
              of majority in their jurisdiction (18 years old in most
              places). The Service Concierge and booking pages are designed
              for people exploring an engagement with Mochi Collective on
              behalf of an organisation. You may use the Site for personal,
              non-commercial reference; you may not resell access to it or
              systematically harvest anything from it.
            </p>

            <h2>3. What you may not do</h2>
            <p>When using the Site, you agree not to:</p>
            <ul>
              <li>
                Reverse-engineer, copy, mirror, or systematically scrape the
                Site or its assets, including automated harvesting of our
                copy, design, or visitor data;
              </li>
              <li>
                Impersonate Mochi Collective, our hosts, partners, or
                clients;
              </li>
              <li>
                Submit false or misleading information through the Service
                Concierge or booking workflows. We screen leads and may
                decline submissions we suspect are made in bad faith;
              </li>
              <li>
                Interfere with the operation of the Site, including
                denial-of-service attacks, security probing, or injection
                attacks. If you find a genuine security issue, we would like
                to hear about it: email{" "}
                <a href={`mailto:${EMAIL}?subject=Security`}>{EMAIL}</a> with
                &ldquo;Security&rdquo; in the subject line;
              </li>
              <li>
                Use the Site to facilitate anything illegal under the laws of
                Singapore or of your home jurisdiction.
              </li>
            </ul>

            <h2>4. Intellectual property</h2>
            <p>
              Everything on the Site belongs to {ENTITY} unless otherwise
              indicated. This includes the copy, the design, our logo, the
              five-orb brand mark, photography, the Service Concierge logic,
              and our program names (including{" "}
              {PROGRAM_NAMES.map((name, i) => (
                <span key={name}>
                  {i > 0 && (i === PROGRAM_NAMES.length - 1 ? " and " : ", ")}
                  &ldquo;{name}&rdquo;
                </span>
              ))}
              ).
            </p>
            <ul>
              <li>
                You may: view the Site, share links to it, and quote brief
                excerpts for editorial purposes with attribution. You may
                reference Mochi Collective in articles, press, or social
                media, provided you do not claim an affiliation that
                doesn&rsquo;t exist.
              </li>
              <li>
                You may not: use our brand mark or copy in your own
                marketing materials without our written permission, or use
                any content on the Site to train artificial intelligence
                models without our written permission.
              </li>
            </ul>

            <h2>5. Your submissions</h2>
            <p>
              When you submit information through the Service Concierge, a
              booking form, or by email, you grant us a non-exclusive licence
              to use that information to respond to you, prepare for a
              discovery call, and improve our services. Any ideas,
              suggestions, or feedback you volunteer about our services or
              the Site may be used by us without restriction or compensation.
              You remain responsible for what you submit, and you confirm
              that your submissions do not infringe anyone else&rsquo;s
              rights.
            </p>
            <p>
              Please do not send us confidential or commercially sensitive
              information through the Site. Until a mutual confidentiality
              agreement or Statement of Work is in place, treat anything you
              submit as a business enquiry, not a confidential disclosure.
            </p>

            <h2>6. Bookings and engagements</h2>
            <p>
              Clicking &ldquo;Book a Discovery&rdquo; or &ldquo;Secure a
              Consultation&rdquo; starts the scheduling of a free 30-minute
              discovery call. No payment is collected at the booking stage.
              Scheduling is handled by zcal and is subject to zcal&rsquo;s
              own terms; your name, email address, and scheduling preferences
              are transmitted to zcal as described in our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
            <p>
              If we agree to work together after a discovery call, that
              engagement will be governed by a separate Statement of Work
              covering scope, fees, ownership of deliverable IP, and
              confidentiality. That document, not these Terms, controls any
              paid work.
            </p>
            <p>
              You can cancel a discovery call at any time, with no fee and no
              questions asked: decline the calendar invite or email us
              directly.
            </p>

            <h2>7. Third-party services and links</h2>
            <p>
              The Site relies on third-party providers (including Vercel for
              hosting, zcal for scheduling, and Google Workspace for email)
              and links out to third-party platforms such as Instagram,
              LinkedIn, and TikTok. We do not control those services, and
              your use of them is governed by their own terms and privacy
              policies. We are not responsible for the availability, content,
              or data practices of third-party services.
            </p>

            <h2>8. Disclaimers</h2>
            <p>
              The Site is provided &ldquo;as is&rdquo; and &ldquo;as
              available.&rdquo; We make reasonable efforts to keep it up, but
              we do not guarantee uninterrupted availability; among other
              things, outages at our third-party providers may affect the
              Site. We may change, suspend, or discontinue any part of the
              Site, and may restrict or deny access to it, at any time, at
              our discretion and without notice.
            </p>
            <p>
              Case studies, sample programs, and descriptions of our
              methodology reflect past work and our general approach. They
              are not guarantees of future results, and you should not rely
              on anything on the Site as a substitute for your own enquiries.
              The Service Concierge recommendation is a starting point for a
              conversation; the right shape for your event always emerges
              from the discovery call, not the quiz.
            </p>

            <h2>9. Liability</h2>
            <p>
              To the maximum extent permitted by Singapore law, {ENTITY} is
              not liable for:
            </p>
            <ul>
              <li>
                Indirect, consequential, or punitive damages arising from
                your use of the Site;
              </li>
              <li>
                Loss of profits, data, or business opportunity arising from
                information on the Site;
              </li>
              <li>
                The acts or omissions of third-party providers (for example,
                a loss of data held by zcal), beyond what we can practically
                recover on your behalf.
              </li>
            </ul>
            <p>
              Our total liability to you in connection with the Site is
              capped at the amount you have paid to Mochi Collective in the
              twelve months preceding the claim. If you have not paid us
              anything, which is true of every visitor without a paid
              engagement, that cap is SGD&nbsp;$0.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot
              be excluded or limited under applicable law, including
              liability for fraud.
            </p>

            <h2>10. Indemnity</h2>
            <p>
              You agree to indemnify Mochi Collective against third-party
              claims, and the reasonable legal costs and damages arising from
              them, caused by your breach of these Terms or your conduct on
              or through the Site, for example by submitting infringing
              content through the Service Concierge or misusing our brand
              assets.
            </p>

            <h2>11. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time at our discretion.
              When we do, we will revise the &ldquo;Last updated&rdquo; date
              at the top of this page. Continuing to use the Site after an
              update means you accept the revised Terms.
            </p>

            <h2>12. Governing law and dispute resolution</h2>
            <p>
              These Terms are governed by the laws of Singapore, and any
              dispute is subject to the exclusive jurisdiction of the
              Singapore courts. That said, we would much rather resolve
              things informally. If something is wrong, email us first.
            </p>

            <h2>13. General</h2>
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions continue in full force.
              Our not enforcing a provision is not a waiver of our right to
              enforce it later. You may not assign your rights under these
              Terms; we may assign ours as part of a corporate reorganisation,
              merger, or sale. These Terms, together with our{" "}
              <Link href="/privacy">Privacy Policy</Link>, are the entire
              agreement between you and us regarding use of the Site (they
              do not replace any Statement of Work or other written agreement
              for paid engagements).
            </p>

            <h2>14. Contact</h2>
            <p>
              Questions about these Terms:{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, with
              &ldquo;Legal&rdquo; or &ldquo;Terms&rdquo; in the subject line.
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
