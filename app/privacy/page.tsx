import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EMAIL } from "@/lib/constants";

const LAST_UPDATED = "21 May 2026";
const ENTITY = "Mochi Collective Pte. Ltd.";
const UEN = "202538712H";
const ADDRESS = "68 Circular Road, #02-01, Singapore 049422";

export const metadata: Metadata = {
  title: "Privacy at Mochi Collective",
  description:
    "What data Mochi Collective collects, who we share it with, and how to access or delete yours.",
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
          <h1>Privacy at Mochi Collective</h1>
          <p className="updated">Last updated: {LAST_UPDATED}</p>
          <p className="lede">
            We keep this short on purpose. If there&rsquo;s a question we
            haven&rsquo;t answered, email{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> &mdash; we read those.
          </p>

          <article className="prose">
            <h2>The short version</h2>
            <p>
              When you visit <strong>mochicollective.com</strong>, four kinds
              of things happen behind the scenes:
            </p>
            <ol>
              <li>
                <strong>Analytics</strong> &mdash; we measure which pages
                people read, how far they scroll, where they came from. So we
                know what&rsquo;s landing.
              </li>
              <li>
                <strong>Ad tracking</strong> &mdash; if Meta or Google sent
                you here via an ad, we tell them you arrived. So we
                don&rsquo;t waste money on ads that don&rsquo;t work.
              </li>
              <li>
                <strong>Session replays</strong> &mdash; Microsoft Clarity
                records anonymous mouse movement and clicks on the homepage.
                So we can see what&rsquo;s confusing.
              </li>
              <li>
                <strong>Concierge submissions</strong> &mdash; if you fill
                out our 4-question concierge, your answers and (if you book a
                call) your email + name land in our team Slack channel and
                our calendar.
              </li>
            </ol>
            <p>
              We don&rsquo;t sell your data. We don&rsquo;t share it with
              anyone outside the third parties listed below. We keep the
              minimum we need to run the business.
            </p>

            <h2>What we collect, specifically</h2>

            <h3>Automatically, just by visiting the site</h3>
            <ul>
              <li>Pages you visited (e.g. you reached the Concierge section)</li>
              <li>How long you spent, how far you scrolled</li>
              <li>Where you came from (search engine, Meta ad, direct, etc.)</li>
              <li>Browser + device type (Chrome on Mac, Safari on iPhone, etc.)</li>
              <li>Approximate location (country / city &mdash; from IP address, not GPS)</li>
              <li>
                Anonymous interaction recordings &mdash; mouse moves, clicks,
                scrolls. Form inputs are masked by default.
              </li>
            </ul>

            <h3>If you complete the Concierge</h3>
            <ul>
              <li>
                The four answers you give (type of event, pressure points,
                timing, budget)
              </li>
              <li>The program we recommended back to you</li>
            </ul>

            <h3>If you click &ldquo;Book a discovery call&rdquo;</h3>
            <ul>
              <li>
                Whatever zcal asks for at booking time (your name, email,
                optional message). zcal handles this data per their own{" "}
                <a
                  href="https://zcal.co/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </a>
                .
              </li>
              <li>
                Once you confirm a booking, the above plus the time you
                picked lands in our team Slack so we can prep for the call.
              </li>
            </ul>

            <h3>If you email us</h3>
            <ul>
              <li>Whatever you sent us, retained in our inbox.</li>
            </ul>

            <h2>Who we share data with</h2>
            <ul>
              <li>
                <strong>Meta</strong> (Facebook / Instagram) &mdash; for ad
                tracking via Meta Pixel + Conversions API. Your name and
                email are hashed (one-way encrypted) before being sent so
                Meta can match you to existing Facebook users without seeing
                the actual values.
              </li>
              <li>
                <strong>Google</strong> &mdash; Google Analytics 4
                (anonymous behavioural data) and email hosting (Google
                Workspace, for {EMAIL}).
              </li>
              <li>
                <strong>Microsoft</strong> &mdash; Microsoft Clarity (session
                recordings, heatmaps).
              </li>
              <li>
                <strong>zcal</strong> &mdash; our booking provider. Their
                privacy policy applies the moment you click &ldquo;Book a
                discovery call&rdquo;.
              </li>
              <li>
                <strong>Vercel</strong> &mdash; our website hosting provider.
              </li>
              <li>
                <strong>Slack</strong> &mdash; our team uses it; concierge
                submissions land here.
              </li>
            </ul>
            <p>
              We don&rsquo;t sell your data to data brokers or anyone else.
              We don&rsquo;t share it with third parties outside this list.
            </p>

            <h2>Your rights</h2>
            <p>
              Whichever jurisdiction you&rsquo;re in, you have the right to:
            </p>
            <ul>
              <li>
                <strong>Ask what data we have on you.</strong> Email{" "}
                <a href={`mailto:${EMAIL}?subject=Data%20request`}>{EMAIL}</a>{" "}
                with &ldquo;Data request&rdquo; in the subject. We&rsquo;ll
                respond within 30 days.
              </li>
              <li>
                <strong>Ask us to delete it.</strong> Same email, same
                subject prefix. We&rsquo;ll remove what we hold internally;
                data held by third parties (Meta, Google, zcal) goes through
                their own deletion processes which we&rsquo;ll link you to.
              </li>
              <li>
                <strong>Opt out of ad tracking.</strong> Use your
                browser&rsquo;s built-in ad-blocker, install an extension
                like uBlock Origin, or use account-level opt-outs:{" "}
                <a
                  href="https://www.facebook.com/off_facebook_activity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meta off-Facebook activity
                </a>
                {" "}or{" "}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads settings
                </a>
                .
              </li>
            </ul>
            <p>
              <strong>EU / UK visitors (GDPR):</strong> you have the
              additional rights to data portability, objection to
              processing, and to lodge a complaint with your local data
              protection authority.
            </p>
            <p>
              <strong>California residents (CCPA):</strong> you have the
              right to know what categories of personal data we collect, to
              opt out of any sale (we don&rsquo;t sell, but you can
              confirm), and to non-discriminatory treatment if you exercise
              these rights.
            </p>
            <p>
              <strong>Singapore residents (PDPA):</strong> Mochi Collective
              is registered in Singapore. You can withdraw consent to data
              collection at any time by emailing us. We comply with the
              Personal Data Protection Act 2012.
            </p>

            <h2>How long we keep things</h2>
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
                  <td>Until you ask us to delete, or the channel is cleared</td>
                </tr>
                <tr>
                  <td>Confirmed bookings in our calendar</td>
                  <td>Until the booking happens, then archived</td>
                </tr>
                <tr>
                  <td>Email correspondence</td>
                  <td>Until you ask us to delete</td>
                </tr>
              </tbody>
            </table>

            <h2>Cookies</h2>
            <p>
              We use a handful of first-party cookies (set by the tools
              above, not us directly). They expire between 30 days and 2
              years depending on the tool. You can clear them via your
              browser settings; doing so means we can&rsquo;t recognise
              repeat visits but the site still works.
            </p>

            <h2>Updates to this policy</h2>
            <p>
              When we change something material, we update the &ldquo;Last
              updated&rdquo; date at the top and (if the change affects you
              specifically &mdash; e.g. a new third-party processor) email
              anyone with a recent booking. Minor wording fixes go in
              silently.
            </p>

            <h2>Contact</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              <strong>Subject prefix for privacy requests:</strong>{" "}
              &ldquo;Data request&rdquo; or &ldquo;Privacy&rdquo;
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
