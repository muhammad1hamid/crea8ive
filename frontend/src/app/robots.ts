import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/wp-admin/",
          "/search/",
          "/feed/",
          "/*/feed/",
          "/comments/feed/",
        ],
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Bingbot",
        ],
        allow: "/",
      },
    ],
    sitemap: [`${SITE_URL}/sitemap-index.xml`, `${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
