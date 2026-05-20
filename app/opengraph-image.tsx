/**
 * Dynamic Open Graph image — used for link unfurling in iMessage, Slack,
 * LinkedIn, Twitter/X, etc. Generated at request time by Vercel's edge.
 *
 * Renders at the standard OG size (1200×630) with the 5-orb mark and the
 * brand tagline in Poppins on the charcoal surface.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mochi Collective — Make it worth talking about.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ORBS = [
  { cx: 50, cy: 10, color: "#F6BEC9" },
  { cx: 78.53, cy: 30.73, color: "#7ECADF" },
  { cx: 67.63, cy: 64.27, color: "#BFDEA3" },
  { cx: 32.37, cy: 64.27, color: "#F9C84A" },
  { cx: 21.47, cy: 30.73, color: "#93ADBF" },
];

export default async function OpenGraphImage() {
  const [poppinsBold, poppinsRegular] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Poppins-Bold.ttf")),
    readFile(join(process.cwd(), "public/fonts/Poppins-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#2A2A2A",
          color: "#F4F0E8",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          fontFamily: "Poppins",
          position: "relative",
        }}
      >
        {/* 5-orb cluster */}
        <svg
          width={108}
          height={108}
          viewBox="-7 -20 114 114"
          style={{ display: "block" }}
        >
          {ORBS.map((o, i) => (
            <circle
              key={i}
              cx={o.cx}
              cy={o.cy}
              r={18.6}
              fill={o.color}
            />
          ))}
        </svg>

        {/* Headline */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            marginTop: 64,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Make it worth</span>
          <span
            style={{
              background:
                "linear-gradient(90deg, #F6BEC9 0%, #7ECADF 35%, #BFDEA3 60%, #F9C84A 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            talking about.
          </span>
        </div>

        {/* Sub line */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.4,
            color: "#C8C2B5",
            marginTop: 40,
            maxWidth: 820,
          }}
        >
          Brand experiences, conferences and community programs — with impact
          measurement baked in.
        </div>

        {/* Footer wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 96,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#888377",
          }}
        >
          mochicollective.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: poppinsBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Poppins",
          data: poppinsRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
