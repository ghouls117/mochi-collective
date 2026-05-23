"use client";

import Link from "next/link";
import { EMAIL } from "@/lib/constants";

export function Footer() {
  const backToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div>© 2026 Mochi Collective. Make it worth talking about.</div>
      <div className="links">
        <Link href="/privacy">Privacy</Link>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a href="#top" onClick={backToTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
