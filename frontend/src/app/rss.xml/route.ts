import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/wordpress";
import { generateRssXml } from "@/lib/rss";
import { SITE_URL } from "@/lib/site-config";

// Static export ('output: export') requires route handlers to be
// build-time-only: no request-dependent APIs, no runtime data fetching.
// `getAllPosts()` resolves from build-time markdown drafts (manual-posts.ts)
// with a live-WordPress upgrade path baked in — see lib/wordpress/index.ts.
export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts().catch(() => []);

  const xml = generateRssXml(posts, {
    title: "Crea8iv Media Blog",
    description:
      "Digital marketing, SEO, Meta Ads, Google Ads, and AI automation insights from Crea8iv Media — Rawalpindi & Islamabad, Pakistan.",
    link: `${SITE_URL}/blog/`,
    feedPath: "/rss.xml",
  });

  // Note: under `output: export` these headers only apply to `next dev`/
  // `next start`. The deployed static file's Content-Type is actually
  // determined by the host (Hostinger/LiteSpeed) — see public/.htaccess for
  // the ForceType rule that makes the live response match this header.
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
