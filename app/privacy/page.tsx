import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EMAIL } from "@/lib/constants";

const LAST_UPDATED = "21 July 2026";
const ENTITY = "Mochi Collective Pte. Ltd.";
const UEN = "202538712H";
const ADDRESS = "68 Circular Road, #02-01, Singapore 049422";

export const metadata: Metadata = {
  title: "Privacy Policy | Mochi Collective",
  description:
    "How Mochi Collective collects, uses, discloses, and protects personal data under Singapore's PDPA — what we collect, who we share it with, and your rights.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="subpage">
        <div className="wrap">
          <div className="eyebrow">Privacy</div>
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: {LAST_UPDATED}</p>
          <p className="lede">
            This policy explains how {ENTITY} (&ldquo;Mochi
            Collective&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects,
            uses, discloses, and protects personal data in connection with
            mochicollective.com (the &ldquo;Site&rdquo;) and our services.
            We are a Singapore company serving clients primarily in
            Singapore and the wider Asia-Pacific region, and we handle
            personal data in accordance with Singapore&rsquo;s Personal
            Data Protection Act 2012 (&ldquo;PDPA&rdquo;). We apply the
            same PDPA standards to every visitor, wherever you are.
          </p>

          <article className="prose">
            <h2>1. The short version</h2>
            <p>
              Four things happen automatically in the background when you
              visit the Site:
            </p>
            <ul>
              <li>
                Analytics. We measure which pages people read, how far they
                scroll, and where visitors come from, so we know which
                content works.
              </li>
              <li>
                Ad tracking. If a Meta or Google ad brought you here, we
                tell them you arrived. So we don&rsquo;t waste money on
                ads that don&rsquo;t work.
              </li>
              <li>
                Session replays. Microsoft Clarity records anonymous mouse
                movement and clicks on the homepage, so we can spot
                confusing parts of the page.
              </li>
              <li>
                Concierge submissions. If you complete the four-question
                Service Concierge, your answers are sent to our team
                Slack. If you book a call, your name and email come along
                too.
              </li>
            </ul>
            <p>
              We don&rsquo;t sell your data. We share it only with the
              third parties listed in this policy, and we keep only what
              the business needs. If we work with you at an event,
              additional collection may happen there (see section 3).
            </p>

            <h2>2. What we collect, specifically</h2>

            <h3>2.1 When you visit the Site</h3>
            <p>Collected automatically, without you doing anything:</p>
            <ul>
              <li>Pages visited and how you navigate between them;</li>
              <li>Time on page and scroll depth;</li>
              <li>
                Where you came from (a search engine, an ad, or direct);
              </li>
              <li>Browser and device type;</li>
              <li>
                Approximate location: country and city derived from your IP
                address, not GPS;
              </li>
              <li>
                Anonymous recordings of interactions on the page, with form
                inputs masked by default.
              </li>
            </ul>

            <h3>2.2 When you use the Service Concierge</h3>
            <p>
              If you complete the four-question concierge tool, we collect
              your four answers (event type, what&rsquo;s at stake for your
              organisation, timing, and budget range) and we return a
              recommended program.
            </p>

            <h3>2.3 When you book a discovery call</h3>
            <p>
              Clicking &ldquo;Book a discovery call&rdquo; takes you to our
              scheduling provider, zcal, which asks for your name, email,
              and an optional message. zcal handles this data per their own{" "}
              <a
                href="https://zcal.co/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>
              . When a booking is confirmed, the booking details and
              selected time are pushed to our team Slack so we can prepare.
            </p>

            <h3>2.4 When you email us</h3>
            <p>
              Anything you send to{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> stays in our inbox
              until you ask us to delete it.
            </p>

            <h2>3. Event and attendee data</h2>
            <p>
              Impact measurement is part of what we do: for client
              engagements, we may collect data before, during, and after an
              event, such as attendance, survey responses, sentiment, and
              behavioural signals. Events we design may also be photographed
              or filmed.
            </p>
            <p>Two things to know about that:</p>
            <ul>
              <li>
                When we measure on a client&rsquo;s behalf, we generally
                act as a data intermediary (processor) for that client
                under the PDPA. The client decides what is collected and
                why; we process it under their instructions and our
                agreement with them. Notices and consents for attendees
                are agreed with the client as part of the engagement, and
                wherever practicable we work with aggregated or
                de-identified data for reporting.
              </li>
              <li>
                If you attend an event we run and want to access, correct,
                or remove personal data collected there, including
                photographs, contact us at the address in section 10 and
                we will either handle it or route your request to the
                client who controls the data.
              </li>
            </ul>
            <p>
              This section describes our general approach; the specific
              terms for any engagement are set out in the applicable
              Statement of Work.
            </p>

            <h2>4. Consent and our legal bases</h2>
            <p>
              Where the PDPA requires consent, we rely on the consent you
              give when you submit a form, book a call, or email us; the
              purpose is evident from the interaction (using the concierge
              means you want a recommendation; booking a call means you
              want us to hold the slot and prepare). For background
              analytics and site improvement, we rely on the PDPA&rsquo;s
              deemed consent and legitimate interests provisions, applied
              narrowly and never to override your interests.
            </p>
            <p>
              You can withdraw consent at any time by emailing us (see
              section 10). We will stop the relevant collection, use, or
              disclosure within a reasonable time of your notice, though
              withdrawing consent may mean we can&rsquo;t continue a
              conversation or engagement that depends on it. Withdrawal
              does not require us to delete data we are entitled or
              required to retain.
            </p>
            <p>
              We only send marketing communications to people who have
              opted in or with whom we have an ongoing relationship, and
              every marketing email includes a working unsubscribe. We do
              not send telemarketing messages to Singapore numbers without
              checking the Do Not Call Registry or holding clear consent.
            </p>

            <h2>5. Who we share data with</h2>
            <table>
              <thead>
                <tr>
                  <th>Third party</th>
                  <th>What they do for us</th>
                  <th>How your data is handled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Meta (Facebook/Instagram)</td>
                  <td>
                    Ad tracking via the Meta Pixel and Conversions API
                  </td>
                  <td>
                    Name and email are hashed (one-way encrypted) before
                    transmission; Meta matches against its existing users
                    without seeing the actual values
                  </td>
                </tr>
                <tr>
                  <td>Google</td>
                  <td>
                    Google Analytics 4; email hosting via Google Workspace
                  </td>
                  <td>
                    Anonymous behavioural data; email infrastructure for{" "}
                    {EMAIL}
                  </td>
                </tr>
                <tr>
                  <td>Microsoft</td>
                  <td>Clarity session recordings and heatmaps</td>
                  <td>Anonymous interaction data</td>
                </tr>
                <tr>
                  <td>LinkedIn</td>
                  <td>Insight Tag for B2B analytics and retargeting</td>
                  <td>
                    Anonymous visit data; matched to your LinkedIn profile
                    via LinkedIn&rsquo;s cookie only if you&rsquo;re
                    logged in
                  </td>
                </tr>
                <tr>
                  <td>zcal</td>
                  <td>Booking and calendar</td>
                  <td>
                    Their privacy policy applies once you book a call
                  </td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>Website hosting</td>
                  <td>Infrastructure provider</td>
                </tr>
                <tr>
                  <td>Slack</td>
                  <td>Internal team communication</td>
                  <td>
                    Concierge submissions and booking notifications are
                    routed here
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              We don&rsquo;t sell your data to data brokers or anyone
              else. We may disclose personal data where required by law,
              or to professional advisers under confidentiality
              obligations.
            </p>
            <p>
              Cross-border transfers. Some of the providers above store
              data outside Singapore (typically in the United States or
              the European Union). Where personal data leaves Singapore,
              we take steps required under the PDPA to ensure it receives
              a comparable standard of protection, through the
              providers&rsquo; contractual commitments and data protection
              certifications.
            </p>

            <h2>6. Your rights</h2>
            <p>
              Your rights under this policy are those provided by
              Singapore&rsquo;s PDPA, and we extend the same treatment to
              visitors everywhere:
            </p>
            <ul>
              <li>
                Access. Email{" "}
                <a href={`mailto:${EMAIL}?subject=Data%20request`}>
                  {EMAIL}
                </a>{" "}
                with &ldquo;Data request&rdquo; in the subject and
                we&rsquo;ll tell you what personal data we hold about
                you, and how it has been used or disclosed within the
                past year. We respond within 30 days; if we need longer,
                we&rsquo;ll tell you when to expect an answer. We may
                charge a reasonable fee for access requests and may
                decline requests in the circumstances the PDPA permits
                (for example, requests that are frivolous, vexatious, or
                would reveal another person&rsquo;s data or our
                confidential commercial information).
              </li>
              <li>
                Correction. Same email. If something we hold about you is
                inaccurate, we&rsquo;ll correct it as soon as
                practicable.
              </li>
              <li>
                Withdrawal of consent. Same email (see section 4).
                We&rsquo;ll stop the relevant use of your data, subject
                to any retention we&rsquo;re entitled or required to
                keep.
              </li>
              <li>
                Deletion requests. Singapore law doesn&rsquo;t provide a
                general right to erasure, but in practice we hold very
                little, and if you ask us to delete your data we will do
                so where we have no continuing business or legal need
                for it. Data held by the third parties in section 5 is
                subject to their own processes.
              </li>
              <li>
                Ad tracking opt-out. Use a browser ad-blocker or extension
                (e.g. uBlock Origin), or account-level settings:{" "}
                <a
                  href="https://www.facebook.com/off_facebook_activity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta Off-Facebook Activity
                </a>{" "}
                or{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
                .
              </li>
            </ul>

            <h2>7. How long we keep things</h2>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Anonymous analytics (GA4, Clarity)</td>
                  <td>Up to 14 months (platform defaults)</td>
                </tr>
                <tr>
                  <td>Concierge submissions in Slack</td>
                  <td>
                    For as long as they&rsquo;re useful to us, or until
                    the channel is cleared
                  </td>
                </tr>
                <tr>
                  <td>Confirmed bookings in our calendar</td>
                  <td>
                    Until the booking has taken place, then archived
                  </td>
                </tr>
                <tr>
                  <td>Email correspondence</td>
                  <td>For as long as we need it for our records</td>
                </tr>
              </tbody>
            </table>
            <p>
              When data no longer serves a business or legal purpose, we
              delete or anonymise it.
            </p>

            <h2>8. Cookies</h2>
            <p>
              The tools listed in section 5 set first-party cookies; we
              don&rsquo;t set any of our own beyond that. They expire
              between 30 days and 2 years depending on the tool. You can
              clear them at any time in your browser settings. The only
              effect is that we won&rsquo;t recognise you on a repeat
              visit; the Site itself works fine without them. If
              you&rsquo;re visiting from a jurisdiction that requires
              consent for non-essential cookies, you can decline or clear
              them without losing any functionality.
            </p>

            <h2>9. Security, and if something goes wrong</h2>
            <p>
              We limit access to personal data to the people who need it,
              use reputable providers with strong security practices, and
              keep the amount of data we hold deliberately small. No
              method of internet transmission or storage is completely
              secure, but holding less data is itself a security measure.
            </p>
            <p>
              If a data breach occurs, we will assess it promptly and
              notify the Personal Data Protection Commission and affected
              individuals where and when the PDPA requires it.
            </p>

            <h2>10. Data protection officer and contact</h2>
            <p>
              Our Data Protection Officer oversees our compliance with the
              PDPA and is the right contact for anything in this policy:
            </p>
            <ul>
              <li>
                <strong>Data Protection Officer Email:</strong>{" "}
                <a href={`mailto:${EMAIL}?subject=Data%20request`}>
                  {EMAIL}
                </a>
                , with &ldquo;Data request&rdquo; or
                &ldquo;Privacy&rdquo; in the subject line
              </li>
              <li>
                <strong>{ENTITY}</strong>, {ADDRESS}
              </li>
            </ul>

            <h2>11. Updates to this policy</h2>
            <p>
              We may update this policy from time to time. When we do, we
              will revise the &ldquo;Last updated&rdquo; date at the top
              of this page.
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
