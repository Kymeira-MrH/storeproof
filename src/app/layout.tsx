import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AccessProof — Shopify accessibility, done and documented",
  description:
    "Automated WCAG 2.2 AA scanning and remediation for EU-selling Shopify stores, with the evidence pack your lawyer needs. Not an overlay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="ap">{children}</body>
    </html>
  );
}
