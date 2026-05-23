"use client";

import Link from "next/link";
import { SocialIcons } from "./social-icons";

export function Footer() {
  const backToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div>© 2026 Mochi Collective. Make it worth talking about.</div>
      <div className="links">
        <SocialIcons />
        <Link href="/privacy">Privacy Policy</Link>
        <a href="#top" onClick={backToTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
