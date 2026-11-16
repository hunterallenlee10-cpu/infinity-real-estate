import type { MetadataRoute } from "next";
import { agentsWithPages } from "@/lib/agents";
import { IS_LIVE, SITE_URL } from "@/lib/business";
import { markets } from "@/lib/markets";

// Real last-modified date. Update when a page's content changes.
const LAST_MODIFIED = "2026-11-15";

export const sitePaths = (): { path: string; priority: number }[] => [
  { path: "/", priority: 1 },
  { path: "/agents", priority: 0.9 },
  { path: "/markets", priority: 0.8 },
  ...markets.map((m) => ({ path: `/markets/${m.slug}`, priority: 0.9 })),
  { path: "/buy", priority: 0.8 },
  { path: "/sell", priority: 0.8 },
  { path: "/search", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  ...agentsWithPages.map((a) => ({ path: `/agents/${a.slug}`, priority: 0.7 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_LIVE) return []; // demo mode lists nothing
  return sitePaths().map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "/" : p.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
