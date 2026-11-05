import fs from "node:fs";
import path from "node:path";
import {
  getOpenGraphImage,
  getSeoDescription,
  normalizeWpUrl,
  stripHtml,
} from "@/lib/wordpress";
import { SITE_URL } from "@/lib/site-config";
import type { WPPost } from "@/types/wordpress";

/**
 * RSS 2.0 feed generator for Pinterest auto-publish + generic feed readers.
 *
 * Built entirely from build-time data (the same `getAllPosts()` pipeline the
 * blog listing/detail pages use — see lib/wordpress/index.ts and
 * lib/wordpress/manual-posts.ts). No runtime database/API calls: under
 * `output: 'export'` this module only ever runs once, at `next build` time,
 * producing a static `rss.xml` / `feed.xml` file that the host serves as-is.
 */

export type RssChannelMeta = {
  title: string;
  description: string;
  /** Canonical page the feed represents (e.g. the blog index), not the feed's own URL. */
  link: string;
  /** Absolute-root path of this feed, e.g. "/rss.xml". Used for the atom:link self-reference. */
  feedPath: string;
};

// Pinterest processes up to ~200 pins/day and feed readers generally expect a
// bounded, recent window rather than a full archive. 50 keeps the feed light
// (current live post count is well under this) while leaving headroom.
const RSS_ITEM_LIMIT = 50;

const MIME_BY_EXT: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// CDATA lets us embed raw HTML/entities (descriptions, full content) without
// escaping every character; the only illegal sequence inside CDATA is "]]>",
// which we split across two CDATA sections.
function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_match, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function toAbsoluteUrl(url: string): string {
  if (!url) return `${SITE_URL}/img/crea8iv-white-3d-logo.webp`;
  if (/^https?:\/\//i.test(url)) {
    return url.replace("https://darkgray-eland-964548.hostingersite.com", SITE_URL);
  }
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function mimeTypeForUrl(url: string): string {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    return MIME_BY_EXT[ext] || "image/webp";
  } catch {
    return "image/webp";
  }
}

// Best-effort REAL file size for same-origin images that ship inside
// public/ (all current covers do) — used for <enclosure length>. Falls back
// to "0" (RSS-legal; many feeds use this when size is unknown/unmeasurable,
// e.g. a legacy /wp-content/uploads path that only exists on the live
// WordPress origin, not in this build's public/ folder).
function fileLengthForUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== new URL(SITE_URL).hostname) return "0";
    const localPath = path.join(process.cwd(), "public", decodeURIComponent(parsed.pathname));
    return String(fs.statSync(localPath).size);
  } catch {
    return "0";
  }
}

function resolveAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || "Syed Qamar Abbas";
}

function resolvePostLink(post: WPPost): string {
  if (post.link?.startsWith("http")) return post.link;
  return `${SITE_URL}/blog/${post.slug}/`;
}

function resolvePostImage(post: WPPost): string {
  return toAbsoluteUrl(normalizeWpUrl(getOpenGraphImage(post.yoast_head_json)));
}

// WordPress's `_embedded['wp:term']` groups terms by taxonomy in the same
// order as the post's registered taxonomies — index 0 is categories, index 1
// is tags for a standard `post` type. Manual/draft posts only populate index
// 0 (see manual-posts.ts); real WP posts (if the API is restored) populate
// both, matching the "Category" + "Tags" requirement automatically.
function resolveTerms(post: WPPost): { name: string; isTag: boolean }[] {
  const groups = post._embedded?.["wp:term"] ?? [];
  const categories = (groups[0] ?? []).map((term) => ({ name: term.name, isTag: false }));
  const tags = (groups[1] ?? []).map((term) => ({ name: term.name, isTag: true }));
  return [...categories, ...tags];
}

export function buildRssItemXml(post: WPPost): string {
  const title = decodeEntities(stripHtml(post.title.rendered));
  const link = resolvePostLink(post);
  const description = getSeoDescription(post);
  const image = resolvePostImage(post);
  const pubDate = new Date(post.date).toUTCString(); // RFC-822, e.g. "Tue, 21 Jul 2026 08:00:00 GMT"
  const author = resolveAuthorName(post);
  const terms = resolveTerms(post);
  const mimeType = mimeTypeForUrl(image);
  const length = fileLengthForUrl(image);
  const content = post.content?.rendered ? decodeEntities(post.content.rendered) : "";

  const categoryLines = terms
    .map(({ name, isTag }) =>
      isTag
        ? `      <category domain="post_tag">${escapeXml(name)}</category>`
        : `      <category>${escapeXml(name)}</category>`
    )
    .join("\n");

  return [
    "    <item>",
    `      <title>${escapeXml(title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <pubDate>${pubDate}</pubDate>`,
    `      <dc:creator>${cdata(author)}</dc:creator>`,
    categoryLines || null,
    `      <description>${cdata(description)}</description>`,
    content ? `      <content:encoded>${cdata(content)}</content:encoded>` : null,
    // Pinterest's crawler has historically been inconsistent about which
    // element it reads the Pin image from, so the image is deliberately
    // repeated across three tags (image / media:content / enclosure) — all
    // absolute URLs pointing at the same featured image.
    `      <image>${escapeXml(image)}</image>`,
    `      <media:content url="${escapeXml(image)}" medium="image" />`,
    `      <enclosure url="${escapeXml(image)}" length="${length}" type="${mimeType}" />`,
    "    </item>",
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

export function generateRssXml(posts: WPPost[], channel: RssChannelMeta): string {
  const items = posts.slice(0, RSS_ITEM_LIMIT).map(buildRssItemXml).join("\n");
  const lastBuildDate = new Date().toUTCString();
  const feedUrl = `${SITE_URL}${channel.feedPath}`;
  const channelImage = `${SITE_URL}/img/crea8iv-white-3d-logo.webp`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.link)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Crea8iv Media RSS Generator (Next.js static export)</generator>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(channelImage)}</url>
      <title>${escapeXml(channel.title)}</title>
      <link>${escapeXml(channel.link)}</link>
    </image>
${items}
  </channel>
</rss>
`;
}
