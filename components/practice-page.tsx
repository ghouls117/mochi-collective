import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BOOKING_URL } from "@/lib/constants";

const SITE_URL = "https://mochicollective.com";

const CATEGORY_COLOR: Record<string, string> = {
  "thought-leadership": "var(--color-pink)",
  "brand-strategy": "var(--color-blue)",
  "events-craft": "var(--color-sage)",
};

/** Colour a reading-list link by the category of the post it points to, so
 *  each reference reads as its category at a glance — pink = Thought
 *  Leadership, blue = Brand Strategy, sage = Events Craft, slate = the
 *  Impact Measurement practice. Undefined (default link colour) otherwise. */
function readingLinkColor(href: string): string | undefined {
  const m = href.match(/^\/thoughts\/([^/]+)\//);
  if (m) return CATEGORY_COLOR[m[1]];
  if (href === "/impact-measurement") return "var(--color-slate-orb)";
  return undefined;
}

/**
 * A single block of prose in a practice page's body. Mirrors the flow of the
 * hand-built /impact-measurement page (h2/h3/p/ul) but rendered from data so
 * the four practice pages stay structurally identical. `html` values may
 * contain inline markup (<strong>, <em>, <a href="/…">).
 */
export type PracticeBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] };

export type PracticeContent = {
  /** URL slug, e.g. "brand-experience". Path is `/${slug}`. */
  slug: string;
  /** Human label, e.g. "Brand Experiences". */
  label: string;
  /** SEO <title>. */
  metaTitle: string;
  /** SEO meta description + og:description fallback. */
  metaDescription: string;
  /** og:title (can be punchier than metaTitle). */
  ogTitle: string;
  ogDescription: string;
  /** H1 markup — must contain exactly one <span class="accent">…</span>. */
  h1Html: string;
  /** Standfirst paragraph markup. */
  ledeHtml: string;
  /** schema.org Service.serviceType — a category string, never a tagline. */
  serviceType: string;
  /** Plain-language Service.description for JSON-LD. */
  jsonldDescription: string;
  /** Body prose. */
  blocks: PracticeBlock[];
  /** Internal links rendered under a "How we think about this" heading. */
  reading: { href: string; label: string; note: string }[];
  /** Exactly three Q&A. Visible copy MUST match the FAQPage schema (Google
   *  validates the schema against the rendered text). */
  faq: { q: string; a: string }[];
  ctaHeadline: string;
  ctaSub: string;
  /** utm_medium + utm_campaign value for the CTA booking link. */
  utm: string;
};

export function practicePath(c: Pick<PracticeContent, "slug">): string {
  return `/${c.slug}`;
}

/** Metadata builder so each thin route file stays a one-liner. */
export function buildPracticeMetadata(c: PracticeContent) {
  const path = practicePath(c);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `${SITE_URL}${path}`,
      siteName: "Mochi Collective",
      type: "website" as const,
      locale: "en_SG",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Mochi Collective — ${c.label}`,
        },
      ],
    },
  };
}

function ProseBlock({ block }: { block: PracticeBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
  }
}

export function PracticePage({ content: c }: { content: PracticeContent }) {
  const path = practicePath(c);
  const bookingHref = `${BOOKING_URL}?utm_source=website&utm_medium=${c.utm}&utm_campaign=${c.utm}`;

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.label,
    serviceType: c.serviceType,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: [
      { "@type": "Country", name: "Singapore" },
      { "@type": "Place", name: "Southeast Asia" },
    ],
    description: c.jsonldDescription,
    url: `${SITE_URL}${path}`,
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Nav />
      <main id="main" className="subpage">
        <div className="wrap">
          <div className="eyebrow">Practice · {c.label}</div>
          <h1 dangerouslySetInnerHTML={{ __html: c.h1Html }} />
          <p className="lede" dangerouslySetInnerHTML={{ __html: c.ledeHtml }} />

          <article className="prose">
            {c.blocks.map((block, i) => (
              <ProseBlock key={i} block={block} />
            ))}

            <h2>Reading on how we think about this</h2>
            <ul>
              {c.reading.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} style={{ color: readingLinkColor(r.href) }}>
                    {r.label}
                  </Link>{" "}
                  — {r.note}
                </li>
              ))}
            </ul>

            <h2>
              <span className="accent">Common questions</span>
            </h2>
            {c.faq.map((item) => (
              <div key={item.q} className="impact-faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </article>

          <div
            className="impact-cta"
            style={{
              marginTop: 48,
              padding: 32,
              border: "1px solid var(--line)",
              background: "var(--card)",
              borderRadius: 4,
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  maxWidth: "30ch",
                }}
              >
                {c.ctaHeadline}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.55,
                  marginTop: 8,
                  maxWidth: "46ch",
                }}
              >
                {c.ctaSub}
              </p>
            </div>
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--color-charcoal)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              Book a Discovery →
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
    </>
  );
}
