import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/business";

// Real last-modified dates. Update when a page's content changes.
const PAGES = [
  { path: "/", lastModified: "2026-11-12", priority: 1 },
  { path: "/contact", lastModified: "2026-11-12", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_LIVE) return []; // demo mode lists nothing
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "/" : p.path}`,
    lastModified: p.lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
