import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Services } from "@/components/services";
import { Method } from "@/components/method";
import { ConciergeSection } from "@/components/concierge-section";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { RevealOnScroll } from "@/components/reveal-on-scroll";

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
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  );
}
