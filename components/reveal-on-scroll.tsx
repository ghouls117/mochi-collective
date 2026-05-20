"use client";

import { useEffect } from "react";

/**
 * Mount once at the page root. Finds every `.reveal:not(.in)` element on the
 * page and adds `.in` when it crosses into view (threshold 0.12, -8% bottom
 * rootMargin). Re-observes after route changes by re-running on every render.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.in)")
        .forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  return null;
}
