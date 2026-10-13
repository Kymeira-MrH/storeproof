import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog/posts";

const BASE = "https://storeproof.co.uk";
// Bump when page content changes materially — used by search engines as a recrawl hint.
const LAST_MODIFIED = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ path: string; priority: number; freq: "weekly" | "monthly" }> = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/how-it-works", priority: 0.8, freq: "monthly" },
    { path: "/proof", priority: 0.8, freq: "monthly" },
    { path: "/overlays", priority: 0.8, freq: "monthly" },
    { path: "/pricing", priority: 0.9, freq: "monthly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
    { path: "/accessibility", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "monthly" },
    { path: "/terms", priority: 0.3, freq: "monthly" },
  ];
  const staticRoutes = routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
  const postRoutes = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...postRoutes];
}
