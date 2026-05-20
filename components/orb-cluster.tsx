/**
 * Static SVG 5-orb cluster for the hero. Per-orb CSS keyframes do subtle drift
 * (see `.orb-cluster circle.orb-*` in globals.css). Honors prefers-reduced-motion.
 *
 * Pentagon geometry matches the brand icon (`-7 -20 114 114` viewBox, r=18.6).
 * Here the orbs are drawn larger (r=22) and we add a soft glow per orb via
 * SVG radial gradients so the shapes don't read as flat stickers.
 */
export function OrbCluster() {
  return (
    <div className="orb-stage" aria-hidden="true">
      <div className="pulse" />
      <svg
        viewBox="-30 -30 160 160"
        className="orb-cluster"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {ORBS.map((o) => (
            <radialGradient
              key={o.id}
              id={`orb-grad-${o.id}`}
              cx={o.cx - o.r * 0.35}
              cy={o.cy - o.r * 0.4}
              r={o.r * 1.4}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          ))}
          {ORBS.map((o) => (
            <radialGradient
              key={`glow-${o.id}`}
              id={`orb-glow-${o.id}`}
              cx={o.cx}
              cy={o.cy}
              r={o.r * 1.6}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={o.color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={o.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* glow layer */}
        {ORBS.map((o) => (
          <circle
            key={`g-${o.id}`}
            className={`orb-${o.id}`}
            cx={o.cx}
            cy={o.cy}
            r={o.r * 1.6}
            fill={`url(#orb-glow-${o.id})`}
          />
        ))}

        {/* solid fill + inner highlight */}
        {ORBS.map((o) => (
          <g key={`s-${o.id}`} className={`orb-${o.id}`}>
            <circle cx={o.cx} cy={o.cy} r={o.r} fill={o.color} />
            <circle
              cx={o.cx}
              cy={o.cy}
              r={o.r}
              fill={`url(#orb-grad-${o.id})`}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

const ORBS = [
  { id: "pink", cx: 50, cy: 10, r: 22, color: "#F6BEC9" },
  { id: "blue", cx: 78.53, cy: 30.73, r: 22, color: "#7ECADF" },
  { id: "sage", cx: 67.63, cy: 64.27, r: 22, color: "#BFDEA3" },
  { id: "honey", cx: 32.37, cy: 64.27, r: 22, color: "#F9C84A" },
  { id: "slate", cx: 21.47, cy: 30.73, r: 22, color: "#93ADBF" },
] as const;
