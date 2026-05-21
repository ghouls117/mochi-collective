"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based animated 5-orb cluster for the hero.
 *
 * Faithful port of the design prototype (`source/orb.jsx`):
 *   - 5 orbs arranged at pentagon vertices around the centre.
 *   - Continuous sin/cos wobble per orb (different phase + frequency each).
 *   - Mouse repulsion — orbs gently push away from the cursor.
 *   - Per-orb radial glow underneath + inner highlight on top.
 *   - Per-frame depth sort so lower orbs render on top.
 *   - DPR-aware sizing for crisp rendering on retina displays.
 *
 * Accessibility: honours `prefers-reduced-motion: reduce` by drawing a
 * single static frame and not subscribing to mousemove. The animation
 * loop is cancelled on unmount.
 */

const ORB_COLORS = ["#F6BEC9", "#7ECADF", "#BFDEA3", "#F9C84A", "#93ADBF"] as const;

/** Pentagon vertices starting at top, then clockwise (-90° + 72° steps). */
const BASE_ANGLES = [-90, -18, 54, 126, 198] as const;

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function OrbCluster() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x =
        (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseRef.current.y =
        (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }

    const t0 = performance.now();
    const smoothed = { x: 0, y: 0 }; // exponentially-smoothed mouse position

    const frame = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const t = (now - t0) / 1000;

      const targetX = mouseRef.current.active ? mouseRef.current.x : 0;
      const targetY = mouseRef.current.active ? mouseRef.current.y : 0;
      smoothed.x += (targetX - smoothed.x) * 0.06;
      smoothed.y += (targetY - smoothed.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const R = Math.min(w, h) * 0.18; // pentagon radius
      const orbR = Math.min(w, h) * 0.16; // each orb's radius

      const points = BASE_ANGLES.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        let px = cx + R * Math.cos(rad);
        let py = cy + R * Math.sin(rad);

        if (!reducedMotion) {
          // Per-orb wobble — different frequency and phase for each so the
          // cluster never reads as a single rigid rotation.
          const wob = Math.sin(t * 0.6 + i * 1.3) * (orbR * 0.08);
          const wob2 = Math.cos(t * 0.5 + i * 0.7) * (orbR * 0.1);
          px += Math.cos(rad) * wob + wob2 * 0.3;
          py += Math.sin(rad) * wob + wob2 * 0.4;

          // Mouse repulsion — each orb pushes away with a slightly different
          // strength so the cluster doesn't shift as one rigid body.
          const repel = orbR * 0.55;
          px += -smoothed.x * repel * (0.55 + (i % 3) * 0.15);
          py += -smoothed.y * repel * (0.55 + ((i + 1) % 3) * 0.18);
        }

        return { x: px, y: py, color: ORB_COLORS[i] };
      });

      // Bottom orbs render on top → subtle parallax / depth cue.
      const sorted = [...points].sort((a, b) => a.y - b.y);

      for (const p of sorted) {
        // Soft glow underneath.
        const glow = ctx.createRadialGradient(
          p.x,
          p.y,
          orbR * 0.2,
          p.x,
          p.y,
          orbR * 1.5
        );
        glow.addColorStop(0, hexAlpha(p.color, 0.55));
        glow.addColorStop(1, hexAlpha(p.color, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, orbR * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Main orb fill.
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, orbR, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight (top-left specular).
        const highlight = ctx.createRadialGradient(
          p.x - orbR * 0.35,
          p.y - orbR * 0.4,
          0,
          p.x,
          p.y,
          orbR
        );
        highlight.addColorStop(0, "rgba(255,255,255,0.55)");
        highlight.addColorStop(0.4, "rgba(255,255,255,0.08)");
        highlight.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = highlight;
        ctx.beginPath();
        ctx.arc(p.x, p.y, orbR, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    if (reducedMotion) {
      frame(performance.now()); // draw once, no loop
    } else {
      rafRef.current = requestAnimationFrame(frame);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="orb-stage" aria-hidden="true">
      <div className="pulse" />
      <canvas ref={canvasRef} className="orb-cluster" />
    </div>
  );
}
