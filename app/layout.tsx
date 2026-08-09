import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { DIRECTORY_PROFILES, SOCIAL_LINKS } from "@/lib/constants";
import { FOUNDERS, founderId } from "@/lib/founders";

const SITE_URL = "https://mochicollective.com";
const SITE_NAME = "Mochi Collective";
const TITLE =
  "Brand Experience, Program Design & Events Agency in Singapore | Mochi Collective";
const DESCRIPTION =
  "Singapore-based agency: Mochi Collective designs brand experiences, conferences and community programs with impact measurement baked in — so the report writes itself and the next one funds itself.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#2A2A2A" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

/**
 * ProfessionalService JSON-LD applied to every page. Establishes the entity
 * (name, legal name, category, location, sameAs targets) so AI engines can
 * disambiguate "Mochi Collective" from mochi dessert brands and unrelated
 * products, and so structured data appears on legal + future service pages.
 */
/**
 * Person entities for the two founders.
 *
 * Without these, an answer engine can read what Mochi does and charges but has
 * no machine-readable way to know that a founder ran the world's largest
 * hackathon organisation. `sameAs` is what ties each Person to the LinkedIn
 * profile carrying the actual track record, and `@id` lets the company entity
 * and every BlogPosting reference the same person rather than duplicating them.
 */
const FOUNDER_JSON_LD = FOUNDERS.map((f) => ({
  "@type": "Person",
  "@id": founderId(SITE_URL, f.name),
  name: f.name,
  jobTitle: f.jobTitle,
  worksFor: { "@id": `${SITE_URL}/#org` },
  alumniOf: f.alumniOf.map((org) => ({ "@type": "Organization", name: org })),
  sameAs: [f.linkedin],
}));

const ORG_JSON_LD = {
  // @context lives on ORG_GRAPH, which wraps this node.
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  legalName: "Mochi Collective Pte. Ltd.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Mochi Collective is a brand-experience, program design and events agency based in Singapore, working across Southeast Asia. We design brand activations, conferences, sponsor programs and community/membership initiatives with impact measurement built into the experience.",
  slogan: "Make it worth talking about.",
  email: "hello@mochicollective.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "68 Circular Road, #02-01",
    postalCode: "049422",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Place", name: "Southeast Asia" },
  ],
  knowsAbout: [
    "brand activation",
    "experiential marketing",
    "corporate events",
    "conference production",
    "event ROI measurement",
    "sponsorship programs",
    "community programs",
    "membership program design",
    "hackathons",
    "developer programs",
    "developer relations",
  ],
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.tiktok,
    // Agency-directory citations — help Google's Knowledge Graph
    // consolidate the entity across the web (entity disambiguation).
    // Shared with llms.txt so the two can't drift apart.
    DIRECTORY_PROFILES.sortlist,
    DIRECTORY_PROFILES.goodfirms,
    DIRECTORY_PROFILES.clutch,
  ],
  founder: FOUNDER_JSON_LD.map((p) => ({ "@id": p["@id"] })),
};

/** Company + both founders as one graph, so the Person nodes resolve. */
const ORG_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [ORG_JSON_LD, ...FOUNDER_JSON_LD],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-SG" data-theme="dark">
      <head>
        {/*
          Preload the two faces used above the fold — Inter for body copy and
          Poppins Bold for the hero headline. Without this the browser can't
          discover them until the stylesheet has parsed; measured on
          production, the later Poppins weights were arriving ~370ms after
          the fonts that were requested first.

          crossOrigin is required on font preloads even for same-origin
          requests — fonts are fetched in CORS mode, and omitting it makes
          the browser download the file a second time.
        */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Poppins-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_GRAPH) }}
        />
      </body>
    </html>
  );
}
