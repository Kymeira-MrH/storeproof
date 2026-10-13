import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "StoreProof — Shopify accessibility compliance",
    short_name: "StoreProof",
    description:
      "Automated WCAG 2.2 AA scanning, source-level fixes and evidence packs for Shopify stores. Not an overlay.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ece3d0",
    theme_color: "#1f6b4a",
    categories: ["business", "productivity", "shopping"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/512?p=maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
