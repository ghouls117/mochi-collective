/**
 * Browser tab favicon — 32×32 PNG with the 5-orb mark on transparent.
 * Next.js auto-detects this file and serves it at /icon (and adds the
 * appropriate <link rel="icon"> tag).
 */

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg width={32} height={32} viewBox="-7 -20 114 114">
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
