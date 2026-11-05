import "server-only";

import { SITE_URL } from "@/lib/site-config";
import { getAdminStore } from "@/lib/admin/store";
import type { BlogPostRecord } from "@/lib/admin/types";
import type { WPPost, WPMedia, WPYoastMeta } from "@/types/wordpress";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function inlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function stripContentPackagePreamble(text: string): string {
  // Strip the "## Published article snapshot" header
  let clean = text.replace(/^##\s*Published article snapshot\s*/i, "").trim();

  // Strip the full content-package summary table/block that appears before the real article.
  // The metadata remains editable in the admin fields, but it should never read as article copy.
  clean = clean.replace(
    /^#\s+.+\n+/,
    ""
  ).trim();
  clean = clean.replace(
    /^##\s*Content Package Summary\s*\n[\s\S]*?(?=\n##\s*(?:Opening Hook|Introduction|Quick Answer|The Short Answer|Table of Contents|Key Takeaways)\b)/i,
    ""
  ).trim();
  clean = clean.replace(
    /^(?:AI \w+.*?)?Content Package Summary[\s\S]*?(?=\n\n(?:Opening Hook|Introduction|Quick Answer|The Short Answer|\#|[A-Z][a-z]{2,}))/m,
    ""
  ).trim();

  // Keep the actual intro prose, but remove editor-only section labels that
  // make the live article look like a worksheet.
  clean = clean.replace(/^##\s*Opening Hook\s*/i, "").trim();
  clean = clean.replace(/^Opening Hook\s+/i, "").trim();
  clean = clean.replace(
    /\n+##\s*Table of Contents\s*\n(?:[-*]\s+.+\n?|\d+\.\s+.+\n?)+/i,
    "\n"
  ).trim();

  // Strip any remaining metadata label lines at the start
  clean = clean.replace(
    /^(?:SEO Title|H1|URL Slug|Meta Description|Focus Keyword|Secondary Keywords|Search Intent|AI Search Intent|Target Audience|Suggested CTA|Featured Image Concept|Opening Hook)[^\n]*/gm,
    ""
  ).trim();

  // Strip "Suggested Internal Links" and everything after it (CMS metadata tail)
  clean = clean.replace(/\n+Suggested Internal Links[\s\S]*?(?=\n+Suggested External References|\n+Conclusion|\n*$)/m, "\n");
  // Strip "Suggested External References" block
  clean = clean.replace(/\n+Suggested External References[\s\S]*?(?=\n+Conclusion|\n*$)/m, "\n");
  // Strip raw "CTA" heading block (e.g., "## CTA\n\nIf you want your brand...") — rendered as article section
  clean = clean.replace(/\n+##\s*CTA\s*\n[\s\S]*?$/m, "\n").trim();
  // Strip "Actionable Takeaways" label line if it appears inline (not as a heading)
  clean = clean.replace(/^Actionable Takeaways\s*$/gm, "");

  // Collapse excessive blank lines
  clean = clean.replace(/\n{3,}/g, "\n\n").trim();

  return clean;
}


function formatRawSnapshotMarkdown(raw: string): string {
  if (!raw) return "";

  // First strip any CMS content-package preamble / metadata
  let clean = stripContentPackagePreamble(raw);

  // If the content is stored as one monolithic block (lacks double newlines)
  if (!clean.includes("\n\n") && clean.length > 250) {
    const headingPatterns = [
      "What a boosted post actually does",
      "Why boosted posts fail to generate leads",
      "What a real ad strategy looks like",
      "When boosting a post is okay",
      "Final takeaway",
      "FAQ",
      "Are boosted posts useless for businesses in Pakistan?",
      "What works better than boosting a post?",
      "Should local businesses use WhatsApp with Facebook ads?",
      "The short answer",
      "The Short Answer",
      "What AI Citation Optimization Actually Means",
      "How AI Systems Decide What to Cite",
      "The Signals That Increase Citation Likelihood",
      "What Citation-Ready Pages Look Like",
      "A Content Architecture for AI Citations",
      "Examples for Local Businesses and Service Brands",
      "A 30-Day AI Citation Optimization Workflow",
      "Common Mistakes That Kill Citation Potential",
      "AI Citation Optimization Checklist",
      "Mentioned vs Cited vs Ranked",
      "How ChatGPT Can Discover Business Information",
      "The Signals That Make a Business Easier to Mention",
      "What OpenAI's Public Guidance Implies for Businesses",
      "The Practical System for Improving ChatGPT Mentions",
      "A 30-60-90 Day Action Plan",
      "Mistakes That Reduce Mention Potential",
      "ChatGPT Mention Checklist",
      "Suggested Internal Links",
      "Suggested External References",
      "Conclusion",
      "Actionable Takeaways",
      "CTA"
    ];

    for (const pattern of headingPatterns) {
      const reg = new RegExp(`\\b(${pattern.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})\\b`, "g");
      clean = clean.replace(reg, "\n\n## $1\n\n");
    }

    // Convert numbered items like "1. No strong offer" or "2. Weak targeting" into H3 subheadings
    clean = clean.replace(/\b(\d+\.\s+[A-Z][A-Za-z0-9\s—–-]{3,40})(?=\s+[A-Z])/g, "\n\n### $1\n\n");

    // Break paragraphs at sentence boundaries (every 2-3 sentences)
    clean = clean.replace(/(\.|\?|\!)\s+([A-Z][a-z])/g, "$1\n\n$2");
    clean = clean.replace(/\n{3,}/g, "\n\n");
  }

  return clean;
}

function parseMarkdownTable(tableLines: string[]): string {
  if (tableLines.length === 0) return "";
  const rows = tableLines.map((line) =>
    line
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim())
  );

  if (rows.length === 0) return "";

  let headerRow: string[] | null = null;
  const bodyRows: string[][] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const isSeparator = row.every((cell) => /^:?-+:?$/.test(cell));
    if (isSeparator) {
      if (i > 0 && !headerRow) {
        headerRow = rows[i - 1];
      }
      continue;
    }
    if (i === 0 && rows.length > 1 && rows[1].every((cell) => /^:?-+:?$/.test(cell))) {
      headerRow = row;
    } else if (headerRow && row === headerRow) {
      continue;
    } else {
      bodyRows.push(row);
    }
  }

  const formatCell = (cell: string, isHead: boolean) => {
    const formatted = inlineMarkdown(cell);
    if (!isHead && /^<strong>[A-Z0-9\s/–-]{2,12}<\/strong>$/.test(formatted.trim())) {
      const acronym = formatted.replace(/<\/?strong>/g, "");
      return `<span class="luxury-acronym-badge">${acronym}</span>`;
    }
    return formatted;
  };

  let html = "<table>";
  if (headerRow) {
    html += '<thead><tr>';
    headerRow.forEach((cell) => {
      html += `<th>${inlineMarkdown(cell)}</th>`;
    });
    html += '</tr></thead>';
  }

  if (bodyRows.length > 0) {
    html += '<tbody>';
    bodyRows.forEach((row) => {
      html += '<tr>';
      row.forEach((cell) => {
        html += `<td>${formatCell(cell, false)}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody>';
  }
  html += "</table>";
  return html;
}

function markdownToHtml(markdown: string) {
  if (/<(?:h[1-6]|p|ul|ol|li|table|blockquote|figure|img|div|section)\b/i.test(markdown)) {
    return markdown;
  }

  const formattedMarkdown = formatRawSnapshotMarkdown(markdown);
  const lines = formattedMarkdown.split(/\r?\n/);
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let tableLines: string[] = [];
  let blockquoteLines: string[] = [];

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
    if (!tableLines.length) return;
    blocks.push(parseMarkdownTable(tableLines));
    tableLines = [];
  };

  const flushBlockquote = () => {
    if (!blockquoteLines.length) return;
    blocks.push(`<blockquote><p>${inlineMarkdown(blockquoteLines.join(" "))}</p></blockquote>`);
    blockquoteLines = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      flushTable();
      flushBlockquote();
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      tableLines.push(trimmed);
      continue;
    } else if (tableLines.length > 0) {
      flushTable();
    }

    const bqMatch = trimmed.match(/^>\s*(.+)$/);
    if (bqMatch) {
      flushParagraph();
      flushList();
      flushTable();
      blockquoteLines.push(bqMatch[1]);
      continue;
    } else if (blockquoteLines.length > 0) {
      flushBlockquote();
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushTable();
      flushBlockquote();
      const level = Math.min(4, heading[1].length);
      blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const list = trimmed.match(/^[-*]\s+(.+)$/);
    if (list) {
      flushParagraph();
      flushTable();
      flushBlockquote();
      listItems.push(list[1]);
      continue;
    } else if (listItems.length > 0) {
      flushList();
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushTable();
  flushBlockquote();
  return blocks.join("\n");
}

function absolute(url: string) {
  if (!url) return `${SITE_URL}/img/crea8iv-search-preview.png`;
  return url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
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

function createYoastMeta(post: BlogPostRecord, image: string): WPYoastMeta {
  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    og_title: post.ogTitle || post.seoTitle || post.title,
    og_description: post.ogDescription || post.metaDescription || post.excerpt,
    og_url: `${SITE_URL}/blog/${post.slug}/`,
    og_site_name: "Crea8iv Media",
    og_image: [{ url: absolute(image), width: 1280, height: 720 }],
    twitter_card: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: absolute(image),
      datePublished: post.publishedAt || post.scheduledAt || post.createdAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
    },
  };
}

function categoryId(category: string) {
  return category.toLowerCase().includes("seo") ? 502 : 501;
}

export async function getCmsPublishedPosts(): Promise<WPPost[]> {
  const store = await getAdminStore().catch(() => null);
  if (!store) return [];
  const now = Date.now();
  return store.blogs
    .filter((post) => {
      if (post.status === "published") return true;
      if (post.status !== "scheduled" || !post.scheduledAt) return false;
      return +new Date(post.scheduledAt) <= now;
    })
    .map((post, index) => {
      const id = 950001 + index;
      const mediaId = 850001 + index;
      const image = post.thumbnailUrl || post.ogImage || "/img/crea8iv-search-preview.png";
      const category = categoryId(post.category);
      return {
        id,
        slug: post.slug,
        status: "publish",
        type: "post",
        link: `${SITE_URL}/blog/${post.slug}/`,
        title: { rendered: post.title },
        content: { rendered: markdownToHtml(post.markdown), protected: false },
        excerpt: { rendered: `<p>${escapeHtml(post.excerpt || post.metaDescription)}</p>`, protected: false },
        featured_media: mediaId,
        date: post.publishedAt || post.scheduledAt || post.createdAt,
        modified: post.updatedAt,
        categories: [category],
        tags: [],
        author: 1,
        yoast_head_json: createYoastMeta(post, image),
        _crea8ivFaqs: post.faqs,
        _crea8ivCoverAlt: post.thumbnailAlt || `${post.title} blog thumbnail`,
        _crea8ivInternalLinks: post.internalLinks,
        _embedded: {
          "wp:featuredmedia": [createMedia(mediaId, image, post.thumbnailAlt || `${post.title} blog thumbnail`)],
          author: [{ name: post.author || "Crea8iv Media Editorial Team", avatar_urls: {} }],
          "wp:term": [[{ id: category, name: post.category, slug: post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") }]],
        },
      };
    });
}
