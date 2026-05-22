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

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function Analytics() {
  return (
    <>
      {META_PIXEL_ID && <MetaPixel pixelId={META_PIXEL_ID} />}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {CLARITY_ID && <MicrosoftClarity projectId={CLARITY_ID} />}
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
fbq('track', 'PageView');
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
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
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
