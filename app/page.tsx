import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Services } from "@/components/services";
import { Method } from "@/components/method";
import { ConciergeSection } from "@/components/concierge-section";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SERVICES } from "@/lib/services";
import { FAQ } from "@/lib/faq";

const SITE_URL = "https://mochicollective.com";
const ORG_ID = `${SITE_URL}/#org`;

/**
 * Services JSON-LD — mirrors the five practices in the Services section.
 * The visible copy in components/services.tsx must match these descriptions
 * (Google flags schemas whose content differs from the rendered page).
 */
const SERVICES_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((s) => ({
    "@type": "Service",
    name: s.label,
    serviceType: s.title,
    description: s.body,
    provider: { "@id": ORG_ID },
    areaServed: "Singapore",
  })),
};

/**
 * FAQPage JSON-LD — mainEntity entries must exactly match the visible Q&A
 * text in components/faq.tsx (which reads from lib/faq.ts).
 */
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <Services />
        <Method />
        <ConciergeSection />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <RevealOnScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </>
  );
}
