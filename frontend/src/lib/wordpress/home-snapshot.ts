import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { WPPage } from "@/types/wordpress";

/**
 * Offline fallback for the homepage content.
 *
 * The WordPress backend stopped serving this domain (REST API 404s since
 * ≤2026-07-06), so builds can no longer fetch the homepage content live.
 * content-snapshot/home.json holds the content region extracted from the last
 * WordPress-rendered build (the July 3 static export); regenerate it with
 * scripts/extract-home-snapshot.mjs if the content ever changes. The snapshot
 * already went through the homepage transforms once — they are idempotent, so
 * re-applying them is a no-op.
 *
 * Server-only (node:fs): import from server components/pages, never from
 * client components — lib/wordpress/index.ts is shared with the client and
 * must not depend on this module.
 */
export function loadHomeSnapshot(): WPPage | null {
  try {
    const raw = readFileSync(join(process.cwd(), "content-snapshot", "home.json"), "utf8");
    const snap = JSON.parse(raw) as {
      link: string;
      title: string;
      description: string;
      ogImage?: string;
      contentHtml: string;
    };
    if (!snap.contentHtml) return null;
    const page = {
      id: 2206,
      slug: "home",
      link: snap.link,
      title: { rendered: snap.title },
      content: { rendered: snap.contentHtml },
      excerpt: { rendered: snap.description },
      yoast_head_json: {
        title: snap.title,
        description: snap.description,
        og_image: snap.ogImage ? [{ url: snap.ogImage }] : undefined,
      },
    };
    return page as unknown as WPPage;
  } catch {
    return null;
  }
}
