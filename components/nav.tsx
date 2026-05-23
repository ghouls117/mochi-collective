"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/constants";
import { scrollToId } from "@/lib/scroll";
import { MiniCluster } from "./mini-cluster";

type AnchorLink = { id: string; label: string };

const LINKS: AnchorLink[] = [
  { id: "work", label: "What We Do" },
  { id: "method", label: "The Methodology" },
  { id: "concierge", label: "Service Concierge" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When on the home page, intercept anchor clicks and smooth-scroll.
  // When on a sub-page (e.g. /privacy), let the browser navigate to /#id
  // and the home page renders fresh.
  const go = (id: string) => (e: React.MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    scrollToId(id, 60);
  };

  // Use absolute href ("/#id") so links work correctly from any page.
  // On the home page, the `go` handler intercepts before navigation
  // and smooth-scrolls instead.
  const hrefFor = (id: string) => (id === "top" ? "/" : `/#${id}`);

  return (
    <header>
      <nav className={"nav" + (scrolled ? " scrolled" : "")} aria-label="Primary">
        <a href={hrefFor("top")} className="nav-brand" onClick={go("top")}>
          <MiniCluster size={42} />
          <div>
            <div className="wm">Mochi</div>
            <div className="sub">COLLECTIVE</div>
          </div>
        </a>
        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link.id} href={hrefFor(link.id)} onClick={go(link.id)}>
              {link.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Book a Discovery
          </a>
        </div>
      </nav>
    </header>
  );
}
