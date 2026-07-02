import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { SOCIAL_LINKS } from "@/lib/constants";

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
const ORG_JSON_LD = {
  "@context": "https://schema.org",
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
  ],
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.tiktok,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-SG" data-theme="dark">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
      </body>
    </html>
  );
}
