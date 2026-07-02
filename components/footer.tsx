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
      <div className="footer-entity">
        <p className="footer-entity-paragraph">
          Mochi Collective is a brand-experience, program design and events
          agency based in Singapore, working across Southeast Asia. We design
          brand activations, conferences, sponsor programs and
          community/membership initiatives for teams that need events and
          programs to prove their worth &mdash; with impact measurement built
          into the experience, so it ends with a report your stakeholder,
          sponsor or board can actually read. Mochi Collective Pte. Ltd. is
          registered in Singapore. Reach us at{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>; we typically reply inside
          72 hours on weekdays.
        </p>
        <p className="footer-entity-line">
          Mochi Collective Pte. Ltd. · Singapore · Brand-experience, program
          design &amp; events agency serving Southeast Asia
        </p>
      </div>
      <div className="footer-row">
        <div>© 2026 Mochi Collective. Make it worth talking about.</div>
        <div className="links">
          <SocialIcons />
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <a href="#top" onClick={backToTop}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
