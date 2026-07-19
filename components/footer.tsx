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
      <div className="footer-copy">
        <div>
          © 2026 Mochi Collective Pte. Ltd. Make it worth talking about.
        </div>
        <div className="footer-entity-line">
          Singapore · Brand-experience, program design &amp; events agency
          serving Southeast Asia
        </div>
        <div className="footer-nap-line">
          Mochi Collective Pte. Ltd. · 68 Circular Road, #02-01, Singapore
          049422 · UEN 202538712H
        </div>
      </div>
      <div className="links">
        <SocialIcons />
        <Link href="/impact-measurement">Impact Measurement</Link>
        <Link href="/terms">Terms of Use</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <a href="#top" onClick={backToTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
