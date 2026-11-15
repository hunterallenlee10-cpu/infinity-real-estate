import type { MetadataRoute } from "next";
import { IS_LIVE, SITE_URL } from "@/lib/business";

// AI training and answer crawlers. Kept out of the concept preview by name.
const AI_BOTS = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Bytespider",
  "Amazonbot", "meta-externalagent", "cohere-ai", "Diffbot",
];

// Demo mode: search engines may crawl (so they can read the noindex tag and header), AI crawlers are
// disallowed by name, and no sitemap is listed. Live mode: everything allowed, sitemap listed.
export default function robots(): MetadataRoute.Robots {
  if (IS_LIVE) {
    return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS, disallow: "/" },
    ],
  };
}
