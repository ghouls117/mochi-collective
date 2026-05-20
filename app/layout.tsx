import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mochi Collective — Make it worth talking about.",
  description:
    "Mochi Collective designs brand experiences, conferences and community programs with impact measurement baked in — so the report writes itself and the next one funds itself.",
  icons: {
    icon: "/mochi-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2A2A2A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
