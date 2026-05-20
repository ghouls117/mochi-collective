"use client";

import { useEffect, useState } from "react";
import { BOOKING_URL } from "@/lib/constants";
import { scrollToId } from "@/lib/scroll";
import { MiniCluster } from "./mini-cluster";

type AnchorLink = { href: `#${string}`; label: string };

const LINKS: AnchorLink[] = [
  { href: "#work", label: "What We Do" },
  { href: "#method", label: "The Methodology" },
  { href: "#concierge", label: "Service Concierge" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id, 60);
  };

  return (
    <header>
      <nav className={"nav" + (scrolled ? " scrolled" : "")} aria-label="Primary">
        <a href="#top" className="nav-brand" onClick={go("top")}>
          <MiniCluster size={42} />
          <div>
            <div className="wm">Mochi</div>
            <div className="sub">COLLECTIVE</div>
          </div>
        </a>
        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={go(link.href.slice(1))}>
              {link.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            Book a call
          </a>
        </div>
      </nav>
    </header>
  );
}
