/**
 * Mounts the three tracking scripts:
 *   - Meta Pixel (fbq)             — ad targeting + custom events
 *   - Google Analytics 4 (gtag)    — funnel + traffic via @next/third-parties
 *   - Microsoft Clarity (clarity)  — heatmaps + session recordings
 *
 * All three are server-rendered into the HTML and loaded with the
 * `afterInteractive` strategy so they don't block first paint. Tracking
 * IDs are read from `NEXT_PUBLIC_*` env vars at build time, so each script
 * only renders if its corresponding env var is set.
 *
 * On Vercel preview deployments and `npm run dev` the scripts still render
 * (their IDs are public anyway), but `lib/analytics.ts` gates custom event
 * firing on the production hostname so they don't pollute prod dashboards.
 *
 * No-script fallbacks: Meta Pixel ships a 1×1 tracking <img> for users who
 * block JS. GA4 and Clarity are useless without JS so we don't add fallbacks.
 */

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MetaPageView } from "@/components/meta-page-view";
import { GOOGLE_ADS_ID } from "@/lib/constants";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
/**
 * LinkedIn Insight Tag Partner ID for Mochi Collective's LinkedIn Ads account.
 * Hardcoded intentionally — the pixel is single-tenant, and we've been burned
 * by a stale value in Vercel's env config drifting away from the real Campaign
 * Manager ID. If this ever needs to change, do it here AND in Campaign Manager
 * at the same time.
 */
const LINKEDIN_PARTNER_ID = "9648620";

export function Analytics() {
  return (
    <>
      {META_PIXEL_ID && <MetaPixel pixelId={META_PIXEL_ID} />}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {GA_ID && <GoogleAdsTag />}
      {CLARITY_ID && <MicrosoftClarity projectId={CLARITY_ID} />}
      {LINKEDIN_PARTNER_ID && (
        <LinkedInInsightTag partnerId={LINKEDIN_PARTNER_ID} />
      )}
    </>
  );
}

function MetaPixel({ pixelId }: { pixelId: string }) {
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
          `,
        }}
      />
      {/* PageView is fired by <MetaPageView> instead of inline here, so it can
          carry an eventID for Pixel/CAPI deduplication and so client-side route
          changes are tracked too. fbq queues calls made before the script
          finishes loading, so nothing is lost by moving it. */}
      <MetaPageView />
      {/* No-script tracking pixel for users who block JS. */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

/**
 * Google Ads conversion tracking.
 *
 * Deliberately does NOT load gtag.js — GA4 already loads it on every page, and
 * Google's instructions for that case are to add only the extra `config`
 * command for the Ads account. Loading the library twice would be redundant.
 *
 * Pushing straight to dataLayer is safe regardless of script order: gtag.js
 * drains whatever is already queued when it initialises. Gated on GA_ID
 * because that's what puts gtag.js on the page in the first place.
 */
function GoogleAdsTag() {
  return (
    <Script
      id="google-ads-config"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('config', '${GOOGLE_ADS_ID}');
        `,
      }}
    />
  );
}

function MicrosoftClarity({ projectId }: { projectId: string }) {
  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${projectId}");
        `,
      }}
    />
  );
}

function LinkedInInsightTag({ partnerId }: { partnerId: string }) {
  return (
    <>
      <Script
        id="linkedin-insight-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
_linkedin_partner_id = "${partnerId}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
      />
      <Script
        id="linkedin-insight-tag-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(l) {
  if (!l) {
    window.lintrk = function(a, b) { window.lintrk.q.push([a, b]) };
    window.lintrk.q = [];
  }
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript"; b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);
})(window.lintrk);
          `,
        }}
      />
      {/* No-script tracking pixel for users who block JS. */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`}
        />
      </noscript>
    </>
  );
}
