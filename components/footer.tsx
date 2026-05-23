"use client";

import Link from "next/link";
import { EMAIL } from "@/lib/constants";
import { SocialIcons } from "./social-icons";

export function Footer() {
  const backToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-left">
        <div>© 2026 Mochi Collective. Make it worth talking about.</div>
        <div className="footer-email">
          <span className="footer-email-label">Enquiry Email:</span>{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
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
