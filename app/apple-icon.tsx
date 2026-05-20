/**
 * Apple touch icon — 180×180 PNG used when someone adds the site to their
 * iOS home screen. Filled charcoal tile with the 5-orb mark, since iOS
 * doesn't honor transparency on home-screen icons.
 */

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2A2A2A",
        }}
      >
        <svg width={130} height={130} viewBox="-7 -20 114 114">
          <circle cx={50} cy={10} r={18.6} fill="#F6BEC9" />
          <circle cx={78.53} cy={30.73} r={18.6} fill="#7ECADF" />
          <circle cx={67.63} cy={64.27} r={18.6} fill="#BFDEA3" />
          <circle cx={32.37} cy={64.27} r={18.6} fill="#F9C84A" />
          <circle cx={21.47} cy={30.73} r={18.6} fill="#93ADBF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
