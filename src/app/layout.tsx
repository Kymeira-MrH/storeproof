import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RegisterSW } from "./register-sw";
import { Analytics } from "@vercel/analytics/next";

const DESCRIPTION =
  "Automated WCAG 2.2 AA scanning and source-level remediation for EU-selling Shopify stores, with the evidence pack your lawyer needs. Not an overlay.";

export const metadata: Metadata = {
  metadataBase: new URL("https://storeproof.co.uk"),
  title: {
    default: "StoreProof — Shopify accessibility, done and documented",
    template: "%s · StoreProof",
  },
  description: DESCRIPTION,
  applicationName: "StoreProof",
  keywords: [
    "Shopify accessibility",
    "EAA compliance",
    "European Accessibility Act",
    "WCAG 2.2 AA",
    "accessibility statement",
    "ADA demand letter",
    "accessibility overlay alternative",
    "ecommerce accessibility",
  ],
  authors: [{ name: "VantagePoint Networks", url: "https://vpnetworks.co.uk" }],
  creator: "VantagePoint Networks",
  publisher: "VantagePoint Networks",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "StoreProof",
    url: "https://storeproof.co.uk",
    title: "StoreProof — Shopify accessibility, done and documented",
    description: DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoreProof — Shopify accessibility, done and documented",
    description: DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: "StoreProof",
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#1f6b4a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://storeproof.co.uk/#org",
      name: "StoreProof",
      url: "https://storeproof.co.uk",
      email: "info@vpnetworks.co.uk",
      parentOrganization: {
        "@type": "Organization",
        name: "VantagePoint Networks",
        url: "https://vpnetworks.co.uk",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://storeproof.co.uk/#site",
      url: "https://storeproof.co.uk",
      name: "StoreProof",
      publisher: { "@id": "https://storeproof.co.uk/#org" },
    },
    {
      "@type": "SoftwareApplication",
      name: "StoreProof",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://storeproof.co.uk",
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "29",
        priceCurrency: "GBP",
        description: "Monthly accessibility monitoring and evidence.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="ap">
        {children}
        <RegisterSW />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
