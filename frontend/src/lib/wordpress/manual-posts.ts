import fs from "node:fs";
import path from "node:path";
import type { WPPost, WPMedia, WPYoastMeta } from "@/types/wordpress";
import { SITE_URL } from "@/lib/site-config";

type DraftMeta = {
  title: string;
  slug: string;
  publish_date: string;
  updated_date?: string;
  status?: string;
  author?: string;
  category: string;
  meta_title?: string;
  meta_description?: string;
  cover_image_url?: string;
  cover_alt?: string;
  internal_links?: string[];
};

const DRAFTS_DIR_CANDIDATES = [
  path.join(process.cwd(), "..", "project", "documentation", "blog-drafts"),
  path.join(process.cwd(), "project", "documentation", "blog-drafts"),
];
const PREMIUM_COVERS_MANIFEST_CANDIDATES = [
  path.join(process.cwd(), "..", "project", "assets", "blog-covers-2026-premium", "manifest.json"),
  path.join(process.cwd(), "project", "assets", "blog-covers-2026-premium", "manifest.json"),
];
const DEFAULT_COVER = "/img/crea8iv-white-3d-logo.webp";

const coverBySlug: Record<string, string> = {
  "future-of-ai-search-2026":
    "/wp-content/uploads/2026/08/future-ai-search-2026-blog-thumbnail.webp",
  "google-business-profile-for-restaurants-in-islamabad-full-setup-guide":
    "/wp-content/uploads/2026/07/google-business-profile-for-restaurants-in-islamabad-full-setup-guide-premium-cover.webp",
  "google-ai-overviews-ads-in-pakistan-what-businesses-need-to-know":
    "/wp-content/uploads/2026/07/google-ai-overviews-ads-in-pakistan-cover.webp",
  "how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads":
    "/wp-content/uploads/2026/07/how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads-cover.webp",
  "google-search-console-social-platforms-pakistan-businesses":
    "/wp-content/uploads/2026/07/google-search-console-social-platforms-pakistan-cover.webp",
  "google-conversational-search-ads-pakistan-businesses":
    "/wp-content/uploads/2026/07/google-conversational-search-ads-pakistan-businesses-cover.webp",
  "who-founded-crea8iv-media-syed-qamar-abbas":
    "/wp-content/uploads/2026/07/who-founded-crea8iv-media-syed-qamar-abbas-cover.webp",
  "google-business-profile-optimization-checklist-for-restaurants-in-islamabad":
    "/wp-content/uploads/2026/07/google-business-profile-restaurants-islamabad-optimization-checklist-cover.webp",
  "how-restaurants-in-islamabad-can-get-more-google-reviews":
    "/wp-content/uploads/2026/07/google-reviews-for-restaurants-in-islamabad-cover.webp",
  "founder-pages-ai-search-entity-seo-business-trust":
    "/wp-content/uploads/2026/07/founder-pages-ai-search-entity-seo-business-trust-cover.webp",
  "crea8iv-media-founder-story-syed-qamar-abbas":
    "/wp-content/uploads/2026/06/digital-marketing-agency-rawalpindi-premium-cover.webp",
};

const premiumCoverSlugAliases: Record<string, string> = {
  "best-digital-marketing-agency-in-rawalpindi-how-to-choose-in-2026":
    "digital-marketing-agency-rawalpindi",
  "google-ads-cost-in-pakistan-for-doctors-clinics-and-aesthetic-brands":
    "google-ads-small-business-pakistan",
  "seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay":
    "seo-services-pakistan",
  "best-website-design-company-in-islamabad-what-to-look-for":
    "website-cost-pakistan",
  "how-dentists-in-rawalpindi-can-rank-on-google-maps":
    "rank-google-maps-rawalpindi-islamabad",
  "lead-generation-for-builders-and-architects-in-pakistan":
    "digital-marketing-cost-pakistan",
  "how-much-should-a-business-spend-on-meta-ads-in-pakistan":
    "facebook-ads-cost-pakistan",
  "whatsapp-automation-for-clinics-booking-follow-up-and-reminders":
    "whatsapp-business-marketing-pakistan",
  "local-seo-for-salons-and-aesthetic-clinics-in-pakistan":
    "local-seo-google-maps-pakistan-guide",
  "google-ads-vs-seo-for-small-businesses-in-pakistan-which-first":
    "google-ads-vs-facebook-ads-pakistan",
  "what-syed-qamar-abbas-builds-at-crea8iv-media":
    "the-ai-automation-blueprint-for-marketing-2026-guide",
};

type PremiumCoverManifestEntry = {
  slug?: string;
  new_media_url?: string;
};

let cachedPremiumCoverUrls: Map<string, string> | null = null;

function toRootRelativeAssetUrl(url: string) {
  return url.replace(/^https?:\/\/[^/]+/i, "");
}

function getPremiumCoverUrls() {
  if (cachedPremiumCoverUrls) return cachedPremiumCoverUrls;

  cachedPremiumCoverUrls = new Map<string, string>();
  const manifestPath = PREMIUM_COVERS_MANIFEST_CANDIDATES.find((candidate) => fs.existsSync(candidate));

  if (!manifestPath) {
    return cachedPremiumCoverUrls;
  }

  try {
    const manifest = JSON.parse(
      fs.readFileSync(manifestPath, "utf8")
    ) as PremiumCoverManifestEntry[];

    for (const entry of manifest) {
      if (!entry.slug || !entry.new_media_url) continue;
      cachedPremiumCoverUrls.set(entry.slug, toRootRelativeAssetUrl(entry.new_media_url));
    }
  } catch {
    cachedPremiumCoverUrls = new Map<string, string>();
  }

  return cachedPremiumCoverUrls;
}

function getDraftsDir() {
  return DRAFTS_DIR_CANDIDATES.find((candidate) => fs.existsSync(candidate)) || DRAFTS_DIR_CANDIDATES[0];
}

function normalizeCoverImageUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return toRootRelativeAssetUrl(trimmed.startsWith("/") ? trimmed : `/${trimmed}`);
}

function resolveCoverForMeta(meta: DraftMeta) {
  if (meta.cover_image_url) {
    const coverUrl = normalizeCoverImageUrl(meta.cover_image_url);
    if (coverUrl) return coverUrl;
  }

  if (coverBySlug[meta.slug]) return coverBySlug[meta.slug];

  const premiumSlug = premiumCoverSlugAliases[meta.slug] || meta.slug;
  return getPremiumCoverUrls().get(premiumSlug) || null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value: string) {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
      return `<a href="${escapeHtml(href)}">${label}</a>`;
    });
}

function isMarkdownTableRow(value: string) {
  return value.includes("|") && !/^\|?[\s:-]+(?:\|[\s:-]+)+\|?$/.test(value);
}

function isMarkdownTableDivider(value: string) {
  return /^\|?[\s:-]+(?:\|[\s:-]+)+\|?$/.test(value);
}

function parseMarkdownTableRow(value: string) {
  return value
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function markdownToHtml(markdown: string) {
  const lines = markdown
    .replace(/\n## Schema notes[\s\S]*$/i, "")
    .trim()
    .split(/\r?\n/);
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  };

  const flushTable = () => {
    if (!tableRows.length) return;
    const [header, ...body] = tableRows;
    const width = header.length;
    const normalizeCells = (cells: string[]) =>
      Array.from({ length: width }, (_, index) => cells[index] || "");
    blocks.push(
      `<table><thead><tr>${normalizeCells(header)
        .map((cell) => `<th>${inlineMarkdown(cell)}</th>`)
        .join("")}</tr></thead><tbody>${body
        .map(
          (row) =>
            `<tr>${normalizeCells(row)
              .map((cell) => `<td>${inlineMarkdown(cell)}</td>`)
              .join("")}</tr>`
        )
        .join("")}</tbody></table>`
    );
    tableRows = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    const nextTrimmed = lines[i + 1]?.trim() || "";

    if (!tableRows.length && isMarkdownTableRow(trimmed) && isMarkdownTableDivider(nextTrimmed)) {
      flushParagraph();
      flushList();
      tableRows = [parseMarkdownTableRow(trimmed)];
      i += 1;
      continue;
    }

    if (tableRows.length) {
      if (isMarkdownTableRow(trimmed)) {
        tableRows.push(parseMarkdownTableRow(trimmed));
        continue;
      }
      flushTable();
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushTable();
      const level = Math.min(heading[1].length, 3);
      blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = trimmed.match(/^-\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      flushTable();
      listItems.push(listItem[1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushTable();
  return blocks.join("\n");
}

function extractFaqs(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const faqs: Array<{ question: string; answer: string }> = [];
  let inFaqSection = false;

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();

    if (!inFaqSection) {
      if (/^##\s+FAQ\s*$/i.test(trimmed)) inFaqSection = true;
      continue;
    }

    if (!trimmed) continue;
    if (/^##\s+/i.test(trimmed)) break;
    if (!/^###\s+/.test(trimmed)) continue;

    const question = trimmed.replace(/^###\s+/, "").trim();
    const answerLines: string[] = [];

    for (i += 1; i < lines.length; i += 1) {
      const next = lines[i].trim();
      if (!next) {
        if (answerLines.length) answerLines.push("");
        continue;
      }
      if (/^(##|###)\s+/.test(next)) {
        i -= 1;
        break;
      }
      answerLines.push(next);
    }

    const answer = answerLines.join(" ").replace(/\s+/g, " ").trim();
    const cleanAnswer = answer.replace(/(?:\s*---\s*)+$/g, "").trim();
    if (question && cleanAnswer) {
      faqs.push({ question, answer: cleanAnswer });
    }
  }

  return faqs;
}

function parseFrontmatter(source: string): { meta: DraftMeta; body: string } | null {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter = match[1];
  const body = match[2].trim();
  const meta: Partial<DraftMeta> = {};
  let currentListKey: keyof DraftMeta | null = null;

  for (const line of frontmatter.split(/\r?\n/)) {
    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem && currentListKey === "internal_links") {
      const value = listItem[1].trim().replace(/^["']|["']$/g, "");
      meta.internal_links = [...(meta.internal_links || []), value];
      continue;
    }

    const field = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!field) {
      currentListKey = null;
      continue;
    }

    const key = field[1] as keyof DraftMeta;
    const rawValue = field[2].trim();

    if (key === "internal_links") {
      meta.internal_links = [];
      currentListKey = "internal_links";
      continue;
    }

    currentListKey = null;
    if (!rawValue || rawValue === "|") continue;
    meta[key] = rawValue.replace(/^["']|["']$/g, "");
  }

  if (!meta.title || !meta.slug || !meta.publish_date || !meta.category) {
    return null;
  }

  return { meta: meta as DraftMeta, body };
}

function toIsoDate(value: string) {
  const datePart = value.replace(/\s+PKT$/i, "").replace(" ", "T");
  return `${datePart}:00+05:00`;
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/^---[\s\S]*?---/g, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(meta: DraftMeta, body: string) {
  if (meta.meta_description) return meta.meta_description;
  return stripMarkdown(body).slice(0, 170);
}

function categoryId(category: string) {
  return category.toLowerCase() === "seo" ? 502 : 501;
}

function createMedia(id: number, sourceUrl: string, altText: string): WPMedia {
  return {
    id,
    source_url: sourceUrl,
    alt_text: altText,
    media_details: {
      width: 1280,
      height: 720,
      sizes: {
        full: { source_url: sourceUrl, width: 1280, height: 720 },
        large: { source_url: sourceUrl, width: 1280, height: 720 },
        medium_large: { source_url: sourceUrl, width: 1280, height: 720 },
      },
    },
  };
}

function createYoastMeta(meta: DraftMeta, image: string): WPYoastMeta {
  const title = meta.meta_title || meta.title;
  const description = meta.meta_description || "";
  const publishedAt = toIsoDate(meta.publish_date);
  const modifiedAt = toIsoDate(meta.updated_date || meta.publish_date);
  return {
    title,
    description,
    og_title: title,
    og_description: description,
    og_url: `${SITE_URL}/blog/${meta.slug}/`,
    og_site_name: "Crea8iv Media",
    og_image: [{ url: `${SITE_URL}${image}`, width: 1280, height: 720 }],
    twitter_card: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title,
      description,
      image: `${SITE_URL}${image}`,
      datePublished: publishedAt,
      dateModified: modifiedAt,
      mainEntityOfPage: `${SITE_URL}/blog/${meta.slug}/`,
    },
  };
}

function draftToPost(filePath: string, index: number): WPPost | null {
  const parsed = parseFrontmatter(fs.readFileSync(filePath, "utf8"));
  if (!parsed) return null;

  const { meta, body } = parsed;
  if (meta.status === "draft") {
    return null;
  }

  const image = resolveCoverForMeta(meta) || DEFAULT_COVER;
  if (image === DEFAULT_COVER && +new Date(toIsoDate(meta.publish_date)) >= +new Date("2026-08-07T00:00:00+05:00")) {
    throw new Error(
      `Missing professional branded cover image for ${meta.slug}. Add cover_image_url in draft frontmatter before publishing.`
    );
  }
  const id = 900001 + index;
  const mediaId = 700001 + index;
  const publishedAt = toIsoDate(meta.publish_date);
  const modifiedAt = toIsoDate(meta.updated_date || meta.publish_date);
  const excerpt = getExcerpt(meta, body);
  const category = categoryId(meta.category);

  return {
    id,
    slug: meta.slug,
    status: "publish",
    type: "post",
    link: `${SITE_URL}/blog/${meta.slug}/`,
    title: { rendered: meta.title },
    content: { rendered: markdownToHtml(body), protected: false },
    excerpt: { rendered: `<p>${escapeHtml(excerpt)}</p>`, protected: false },
    featured_media: mediaId,
    date: publishedAt,
    modified: modifiedAt,
    categories: [category],
    tags: [],
    author: 1,
    yoast_head_json: createYoastMeta(meta, image),
    _crea8ivFaqs: extractFaqs(body),
    _crea8ivCoverAlt: meta.cover_alt || `${meta.title} cover image`,
    _crea8ivInternalLinks: meta.internal_links || [],
    _crea8ivRawMarkdown: body,
    _embedded: {
      "wp:featuredmedia": [createMedia(mediaId, image, meta.cover_alt || `${meta.title} cover image`)],
      author: [{ name: meta.author || "Crea8iv Media Editorial Team", avatar_urls: {} }],
      "wp:term": [[{ id: category, name: meta.category, slug: meta.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") }]],
    },
  };
}

let cachedManualPosts: WPPost[] | null = null;
let cachedDraftMetaBySlug: Map<string, DraftMeta> | null = null;

function isPublishable(post: WPPost) {
  // A generated cover should never make a scheduled post publicly visible
  // before its actual publish date.
  return +new Date(post.date) <= Date.now();
}

function getDraftMetaMap() {
  if (cachedDraftMetaBySlug) return cachedDraftMetaBySlug;

  cachedDraftMetaBySlug = new Map<string, DraftMeta>();

  const draftsDir = getDraftsDir();
  if (!fs.existsSync(draftsDir)) {
    return cachedDraftMetaBySlug;
  }

  for (const file of fs.readdirSync(draftsDir).filter((entry) => entry.endsWith(".md")).sort()) {
    const parsed = parseFrontmatter(fs.readFileSync(path.join(draftsDir, file), "utf8"));
    if (!parsed) continue;
    cachedDraftMetaBySlug.set(parsed.meta.slug, parsed.meta);
  }

  return cachedDraftMetaBySlug;
}

export function getManualPosts() {
  if (cachedManualPosts) return cachedManualPosts;

  const draftsDir = getDraftsDir();
  if (!fs.existsSync(draftsDir)) {
    cachedManualPosts = [];
    return cachedManualPosts;
  }

  cachedManualPosts = fs
    .readdirSync(draftsDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file, index) => draftToPost(path.join(draftsDir, file), index))
    .filter((post): post is WPPost => Boolean(post))
    .filter(isPublishable)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return cachedManualPosts;
}

export function getManualDraftMetaBySlug(slug: string) {
  return getDraftMetaMap().get(slug) ?? null;
}

export function getDraftUpdatedIsoDate(slug: string) {
  const meta = getManualDraftMetaBySlug(slug);
  if (!meta?.updated_date) return null;
  return toIsoDate(meta.updated_date);
}
