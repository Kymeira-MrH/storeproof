import type { MetadataRoute } from "next";

const BASE = "https://storeproof.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; freq: "weekly" | "monthly" }> = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/how-it-works", priority: 0.8, freq: "monthly" },
    { path: "/proof", priority: 0.8, freq: "monthly" },
    { path: "/overlays", priority: 0.7, freq: "monthly" },
    { path: "/pricing", priority: 0.9, freq: "monthly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/login", priority: 0.4, freq: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
