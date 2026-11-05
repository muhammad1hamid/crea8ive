import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentShell from "@/components/wordpress/ContentShell";
import ReadingProgressBar from "@/components/wordpress/ReadingProgressBar";
import WordPressContent from "@/components/wordpress/WordPressContent";
import readerStyles from "@/components/wordpress/article-reader.module.css";
import {
  formatWpDate,
  getAllPosts,
  getOpenGraphImage,
  getPostBySlug,
  getSeoDescription,
  getSeoTitle,
  normalizeWpUrl,
  stripHtml,
} from "@/lib/wordpress";
import { ArticleConsultingContext } from "@/components/ConsultingContext";
import { articleCredit, ARTICLE_TREATMENTS, EDITORIAL_UPDATED } from "@/lib/consulting-editorial";
import { SITE_URL } from "@/lib/site-config";
import legacyRedirects from "@/data/legacy-redirects.json";
import type { WPPost } from "@/types/wordpress";

export const revalidate = 3600;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};


// ─── SOP #20 Internal Linking Standard ───────────────────────────────────────
// Maps keyword signals → the most relevant Crea8iv Media service page.
// Used by getTopicServiceMatch() to auto-assign service links + CTA for every
// blog without a manually configured _crea8ivInternalLinks field.
// ─────────────────────────────────────────────────────────────────────────────
type TopicServiceEntry = {
  href: string;
  label: string;
  ctaCopy: string;
  ctaButton: string;
  supportLinks: { href: string; label: string }[];
  keywords: string[];
};

const TOPIC_SERVICE_MAP: TopicServiceEntry[] = [
  {
    href: "/ai-search-optimization/",
    label: "AI Search Optimization",
    ctaCopy:
      "Crea8iv Media helps businesses in Rawalpindi, Islamabad, and across Pakistan build structured, citation-ready content that earns mentions in ChatGPT, Google AI Overviews, and other answer engines.",
    ctaButton: "Explore AI Search Optimization",
    keywords: [
      "ai search", "ai citation", "aeo", "geo", "llmo", "sxo", "answer engine",
      "generative engine", "ai overview", "chatgpt", "gemini", "perplexity",
      "entity seo", "knowledge graph", "ai visibility", "llm", "ai marketing",
      "ai optimization", "pso", "vso", "veo",
    ],
    supportLinks: [
      { href: "/ai-search-optimization/", label: "AI Search Optimization service" },
      { href: "/blog/ai-citation-optimization-guide/", label: "AI Citation Optimization Guide" },
      { href: "/syed-qamar-abbas/", label: "About our founder" },
    ],
  },
  {
    href: "/google-ads/",
    label: "Google Ads Management",
    ctaCopy:
      "Crea8iv Media plans and manages Google Ads campaigns for businesses in Rawalpindi, Islamabad, and across Pakistan — tracking leads, calls, and bookings rather than just clicks.",
    ctaButton: "Explore Google Ads Management",
    keywords: [
      "google ads", "ppc", "pay per click", "search ads", "display ads",
      "google campaign", "adwords", "smart campaign", "performance max",
      "search advertising", "google advertising",
    ],
    supportLinks: [
      { href: "/google-ads/", label: "Google Ads management" },
      { href: "/meta-ads/", label: "Meta Ads management" },
      { href: "/pricing/", label: "Pricing and retainers" },
    ],
  },
  {
    href: "/meta-ads/",
    label: "Meta Ads Management",
    ctaCopy:
      "Crea8iv Media builds Meta Ads systems for businesses in Pakistan — including audience targeting, creative strategy, and conversion tracking so your ad spend turns into measurable leads.",
    ctaButton: "Explore Meta Ads Management",
    keywords: [
      "meta ads", "facebook ads", "instagram ads", "boosted post", "boosting",
      "facebook advertising", "instagram advertising", "social media ads",
      "paid social", "lead ads", "retargeting", "audience targeting",
      "whatsapp ads",
    ],
    supportLinks: [
      { href: "/meta-ads/", label: "Meta Ads management" },
      { href: "/google-ads/", label: "Google Ads management" },
      { href: "/pricing/", label: "Ad management pricing" },
    ],
  },
  {
    href: "/google-business-profile-growth/",
    label: "Local SEO and Google Business Profile",
    ctaCopy:
      "Crea8iv Media optimizes Google Business Profiles and local SEO for businesses in Rawalpindi, Islamabad, and across Pakistan so the right local customers find you first.",
    ctaButton: "Explore Local SEO",
    keywords: [
      "local seo", "google business profile", "gbp", "local search",
      "google maps", "near me", "local ranking", "google listing",
      "local citations", "nap consistency", "local pack",
      "clinic seo", "salon seo", "restaurant seo",
    ],
    supportLinks: [
      { href: "/google-business-profile-growth/", label: "Local SEO and GBP growth" },
      { href: "/google-ads/", label: "Google Ads for local businesses" },
      { href: "/results/health-clinics/", label: "Clinic results" },
    ],
  },
  {
    href: "/marketing-automation/",
    label: "Marketing Automation",
    ctaCopy:
      "Crea8iv Media builds WhatsApp automation, CRM workflows, and AI-enabled follow-up systems for businesses in Pakistan so no enquiry falls through the cracks.",
    ctaButton: "Explore Marketing Automation",
    keywords: [
      "whatsapp automation", "crm", "marketing automation", "lead nurturing",
      "follow-up", "chatbot", "workflow", "drip campaign", "autoresponder",
      "lead management", "customer journey", "ai agent",
    ],
    supportLinks: [
      { href: "/marketing-automation/", label: "Marketing automation systems" },
      { href: "/software-products/", label: "Business software products" },
      { href: "/contact/", label: "Request a proposal" },
    ],
  },
  {
    href: "/website-development/",
    label: "Website Development",
    ctaCopy:
      "Crea8iv Media designs and develops conversion-focused websites for businesses in Rawalpindi, Islamabad, and across Pakistan — built for speed, SEO, and measurable leads.",
    ctaButton: "Explore Website Development",
    keywords: [
      "website design", "web development", "website", "landing page",
      "web design", "website development", "wordpress", "next.js",
      "website redesign", "web agency", "website company",
    ],
    supportLinks: [
      { href: "/website-development/", label: "Website development" },
      { href: "/results/", label: "Case studies and results" },
      { href: "/contact/", label: "Start your project" },
    ],
  },
  {
    href: "/software-development/",
    label: "Software Development",
    ctaCopy:
      "Crea8iv Media builds custom SaaS, CRM, ERP, and AI-enabled software for businesses in Pakistan — from clinics to agencies to growth-stage startups.",
    ctaButton: "Explore Software Development",
    keywords: [
      "software", "saas", "erp", "custom software", "app development",
      "mobile app", "api", "dashboard", "patientflow", "crm software",
      "software development",
    ],
    supportLinks: [
      { href: "/software-development/", label: "Custom software development" },
      { href: "/software-products/", label: "Ready-made software products" },
      { href: "/contact/", label: "Discuss your project" },
    ],
  },
  {
    href: "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/",
    label: "SEO Pricing and Strategy",
    ctaCopy:
      "Crea8iv Media helps businesses in Pakistan understand what SEO actually costs, what results are realistic, and which strategy fits their budget and goals.",
    ctaButton: "Explore Our SEO Services",
    keywords: [
      "seo", "search engine optimization", "seo strategy", "seo cost",
      "seo pricing", "on-page seo", "technical seo", "link building",
      "keyword research", "seo audit", "organic traffic",
    ],
    supportLinks: [
      { href: "/ai-search-optimization/", label: "AI Search Optimization" },
      { href: "/google-business-profile-growth/", label: "Local SEO and GBP" },
      { href: "/pricing/", label: "SEO and marketing pricing" },
    ],
  },
];

// Default fallback when no topic signal matches
const DEFAULT_SERVICE_ENTRY: TopicServiceEntry = {
  href: "/consultation/",
  label: "Consultation",
  ctaCopy:
    "Crea8iv Media builds SEO, paid ads, content, and automation systems for businesses in Rawalpindi, Islamabad, and across Pakistan.",
  ctaButton: "Book Consultation",
  keywords: [],
  supportLinks: [
    { href: "/google-ads/", label: "Google Ads management" },
    { href: "/meta-ads/", label: "Meta Ads growth systems" },
    { href: "/google-business-profile-growth/", label: "Local SEO and GBP" },
  ],
};

// SOP #3 & #8 — social/platform profile links used in Schema "sameAs" for entity signals

const DEFAULT_INTERNAL_LINKS = [
  { label: "Google Ads management", href: "/google-ads/" },
  { label: "Meta Ads growth systems", href: "/meta-ads/" },
  { label: "Local SEO and Google Business Profile", href: "/google-business-profile-growth/" },
];

const SERVICE_LINK_PATHS = new Set([
  "/ai-search-optimization",
  "/google-ads",
  "/google-business-profile-growth",
  "/marketing-automation",
  "/meta-ads",
  "/software-development",
  "/website-development",
]);

const INTERNAL_LINK_LABELS: Record<string, string> = {
  "/": "Crea8iv Media",
  "/blog/google-ads-cost-in-pakistan-for-doctors-clinics-and-aesthetic-brands":
    "Google Ads Cost for Clinics",
  "/blog/how-much-should-a-business-spend-on-meta-ads-in-pakistan": "Meta Ads Budget in Pakistan",
  "/blog/local-seo-for-salons-and-aesthetic-clinics-in-pakistan": "Local SEO for Clinics",
  "/blog/lead-generation-for-builders-and-architects-in-pakistan": "Lead Generation for Builders",
  "/blog/best-website-design-company-in-islamabad-what-to-look-for":
    "Website Design Company Guide",
  "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay": "SEO Cost in Pakistan",
  "/blog/whatsapp-automation-for-clinics-booking-follow-up-and-reminders":
    "WhatsApp Automation for Clinics",
  "/contact": "Request Proposal",
  "/consultation": "Book Consultation",
  "/google-ads": "Google Ads management",
  "/google-business-profile-growth": "Local SEO and GBP growth",
  "/marketing-automation": "Marketing automation systems",
  "/meta-ads": "Meta Ads management",
  "/pricing": "Pricing and retainers",
  "/software-development": "Software development systems",
  "/website-development": "Website development",
};

// ─────────────────────────────────────────────────────────────────────────────
// Returns the best-matching service entry for this article based on title +
// category keyword signals — used for CTA copy, service link, and auto links.
// ─────────────────────────────────────────────────────────────────────────────
function getTopicServiceMatch(title: string, category: string, slug: string): TopicServiceEntry {
  const haystack = `${title} ${category} ${slug}`.toLowerCase();
  let bestMatch: TopicServiceEntry | null = null;
  let bestScore = 0;

  for (const entry of TOPIC_SERVICE_MAP) {
    const score = entry.keywords.reduce((acc, kw) => (haystack.includes(kw) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch || DEFAULT_SERVICE_ENTRY;
}


function postUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}/`;
}

function decodeEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function toAbsoluteUrl(url: string) {
  if (!url) return `${SITE_URL}/img/crea8iv-white-3d-logo.webp`;
  if (url.startsWith("http")) {
    return url.replace("https://darkgray-eland-964548.hostingersite.com", SITE_URL);
  }
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function getPlainTitle(post: WPPost) {
  return decodeEntities(stripHtml(post.title.rendered));
}

function getPrimaryKeyword(title: string) {
  return title
    .replace(/\([^)]*\)/g, "")
    .split(/[:|]/)[0]
    .replace(/\b(complete guide|guide|beginner's guide|strategy guide|data & benchmarks)\b/gi, "")
    .trim();
}

function normalizeInternalHref(href: string) {
  const trimmed = href.trim();
  if (!trimmed) return "/";
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withLeadingSlash === "/") return withLeadingSlash;
  const normalized = withLeadingSlash.replace(/\/+$/, "");
  const destination = (legacyRedirects as Record<string, string>)[`${normalized}/`];
  return destination ? destination.replace(/\/+$/, "") || "/" : normalized;
}

function humanizePathSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildUsefulLinks(post: WPPost) {
  const configuredLinks = post._crea8ivInternalLinks?.length
    ? post._crea8ivInternalLinks
    : DEFAULT_INTERNAL_LINKS.map((link) => link.href);
  const seen = new Set<string>();

  return configuredLinks
    .map((href) => normalizeInternalHref(href))
    .filter((href) => {
      if (!href || seen.has(href)) return false;
      seen.add(href);
      return true;
    })
    .map((href) => {
      const label =
        INTERNAL_LINK_LABELS[href] ||
        INTERNAL_LINK_LABELS[`${href}/`] ||
        humanizePathSegment(href.split("/").filter(Boolean).pop() || "Related resource");
      return { href, label };
    });
}

function getPrimaryServiceLink(post: WPPost) {
  // Only use author-configured links here. A generic post should retain the
  // consultation CTA instead of inheriting an unrelated default service.
  if (!post._crea8ivInternalLinks?.length) return null;

  return buildUsefulLinks(post).find((link) => SERVICE_LINK_PATHS.has(link.href)) || null;
}

function getPrimaryCategory(post: WPPost) {
  return post._embedded?.["wp:term"]?.flat()?.find((term) => term?.name)?.name || "Digital Marketing";
}

function getBlogSlugFromHref(href: string) {
  const normalized = normalizeInternalHref(href);
  const match = normalized.match(/^\/blog\/([^/]+)$/);
  return match?.[1] || null;
}

function buildRelatedPosts(post: WPPost, allPosts: WPPost[], limit = 3) {
  const currentCategory = getPrimaryCategory(post);
  const postBySlug = new Map(allPosts.map((item) => [item.slug, item]));
  const selected: WPPost[] = [];
  const seenIds = new Set<number>([post.id]);

  const addPost = (candidate: WPPost | null | undefined) => {
    if (!candidate || seenIds.has(candidate.id)) return;
    seenIds.add(candidate.id);
    selected.push(candidate);
  };

  for (const href of post._crea8ivInternalLinks || []) {
    const slug = getBlogSlugFromHref(href);
    if (!slug) continue;
    addPost(postBySlug.get(slug));
    if (selected.length >= limit) return selected;
  }

  for (const candidate of allPosts) {
    if (getPrimaryCategory(candidate) !== currentCategory) continue;
    addPost(candidate);
    if (selected.length >= limit) return selected;
  }

  for (const candidate of allPosts) {
    addPost(candidate);
    if (selected.length >= limit) return selected;
  }

  return selected;
}

function fitToSerpLength(value: string, min: number, max: number, fallbackSuffix: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length > max) {
    const clipped = normalized.slice(0, max + 1);
    return clipped.slice(0, Math.max(clipped.lastIndexOf(" "), min)).replace(/[,:;-]$/, "");
  }
  if (normalized.length < min) {
    return `${normalized} ${fallbackSuffix}`.slice(0, max).trim();
  }
  return normalized;
}

const TRAILING_SERP_STOPWORDS =
  /\s+(?:and|or|the|a|an|to|for|in|of|with|your|you|their|our|into|before|after|from|on|at|by|vs)$/i;
const SERP_DESCRIPTION_MIN = 140;
const SERP_DESCRIPTION_MAX = 160;
const SERP_DESCRIPTION_SOFT_MAX = 170;
const SERP_TITLE_SOFT_MAX = 70;

function finalizeMetaDescription(value: string) {
  let trimmed = value.trim();
  let previous = "";

  while (trimmed && trimmed !== previous) {
    previous = trimmed;
    trimmed = trimmed
      .replace(/[\s,:;|&/–-]+$/u, "")
      .replace(TRAILING_SERP_STOPWORDS, "")
      .trim();
  }

  if (!trimmed) return trimmed;
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function trimMetaDescription(
  value: string,
  min = SERP_DESCRIPTION_MIN,
  max = SERP_DESCRIPTION_MAX,
  softMax = SERP_DESCRIPTION_SOFT_MAX
) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= softMax) {
    return finalizeMetaDescription(normalized);
  }

  const clipped = normalized.slice(0, max + 1);
  const sentenceBreak = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("? "), clipped.lastIndexOf("! "));
  const clauseBreak = Math.max(clipped.lastIndexOf("; "), clipped.lastIndexOf(": "));
  const commaBreak = clipped.lastIndexOf(", ");
  const wordBreak = clipped.lastIndexOf(" ");

  if (sentenceBreak >= min - 1) {
    return finalizeMetaDescription(clipped.slice(0, sentenceBreak + 1));
  }

  if (clauseBreak >= min - 1) {
    return finalizeMetaDescription(clipped.slice(0, clauseBreak + 1));
  }

  if (commaBreak >= min + 8) {
    return finalizeMetaDescription(clipped.slice(0, commaBreak));
  }

  if (wordBreak >= min) {
    return finalizeMetaDescription(clipped.slice(0, wordBreak));
  }

  return finalizeMetaDescription(clipped.slice(0, max));
}

function trimSerpTitle(value: string, max: number) {
  let clipped = value.slice(0, max + 1);
  const lastSpace = clipped.lastIndexOf(" ");
  if (lastSpace > 30) clipped = clipped.slice(0, lastSpace);
  return clipped
    .replace(/[\s,:;|&/–-]+$/u, "")
    .replace(/\s+(?:and|or|the|a|an|to|for|in|of|with|your|&|what|how|why|when|where|which)$/i, "")
    .trim();
}

function buildPostSeoTitle(title: string, yoastTitle?: string) {
  const candidate = decodeEntities(stripHtml(yoastTitle || title))
    .replace(/\s*[|–-]\s*Crea8iv Media\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  const primarySegment = candidate.split(/[:|]/)[0].trim();

  if (candidate.length >= 35 && candidate.length <= SERP_TITLE_SOFT_MAX) return candidate;
  if (candidate.length > 65) {
    if (primarySegment.length >= 35 && primarySegment.length <= 60) {
      if (/20\d\d/.test(candidate) && !/20\d\d/.test(primarySegment) && primarySegment.length <= 55) {
        return `${primarySegment} 2026`;
      }
      return primarySegment;
    }
    return trimSerpTitle(candidate, 60);
  }
  const keyword = getPrimaryKeyword(candidate || title);
  const suffix = /20\d\d/.test(candidate) ? "Complete Guide" : "2026 Guide";
  return fitToSerpLength(`${candidate}: ${suffix}`, 50, 65, `${keyword} | Crea8iv`);
}

function buildPostMetaDescription(title: string, excerpt: string) {
  const real = decodeEntities(stripHtml(excerpt || "")).replace(/\s+/g, " ").trim();
  if (real.length >= SERP_DESCRIPTION_MIN && real.length <= SERP_DESCRIPTION_SOFT_MAX) {
    return finalizeMetaDescription(real);
  }
  if (real.length > SERP_DESCRIPTION_SOFT_MAX) return trimMetaDescription(real);
  if (real.length >= 110) return trimMetaDescription(`${real} Crea8iv Media, Rawalpindi.`);

  const keyword = getPrimaryKeyword(title);
  const context = real.toLowerCase().includes("pakistan") ? "Pakistan-specific" : "practical";
  const variants = [
    `${keyword}: get ${context} costs, real examples, FAQs, and steps to win more leads. Plan smarter with Crea8iv Media.`,
    `${keyword}: costs, examples, FAQs, and lead-growth steps from Crea8iv Media, Rawalpindi.`,
  ];
  return variants.find((variant) => variant.length <= 155) || `${keyword}: practical guide from Crea8iv Media.`;
}

function getPostImage(post: WPPost) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return normalizeWpUrl(
    media?.media_details?.sizes?.large?.source_url ||
      media?.media_details?.sizes?.medium_large?.source_url ||
      media?.source_url ||
      `${SITE_URL}/img/crea8iv-white-3d-logo.webp`
  );
}

function getReadingTimeFromHtml(html: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}

function slugify(value: string) {
  return decodeEntities(stripHtml(value))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function normalizeText(value: string) {
  return decodeEntities(stripHtml(value))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function enhanceArticleHtml(html: string, imageAlt: string, plainTitle: string) {
  const toc: TocItem[] = [];
  let headingIndex = 0;
  let removedDuplicateTitle = false;

  const enhanced = html
    .replace(/<h([12])([^>]*)>([\s\S]*?)<\/h\1>/i, (match, _level, _attrs, inner) => {
      if (!removedDuplicateTitle && normalizeText(inner) === normalizeText(plainTitle)) {
        removedDuplicateTitle = true;
        return "";
      }
      return match;
    })
    .replace(/<h1\b([^>]*)>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>")
    .replace(/<img\b([^>]*?)\balt=["']\s*["']([^>]*)>/gi, `<img$1alt="${imageAlt}"$2>`)
    .replace(/<img\b(?![^>]*\balt=)([^>]*)>/gi, `<img alt="${imageAlt}"$1>`)
    .replace(/<img\b(?![^>]*\bloading=)([^>]*)>/gi, '<img loading="lazy"$1>')
    .replace(/<a\b([^>]*href=["']https?:\/\/(?![^"']*crea8ivmedia\.com)[^"']+["'][^>]*)>/gi, (tag, attrs) => {
      const target = /\btarget=/.test(attrs) ? "" : ' target="_blank"';
      const rel = /\brel=/.test(attrs) ? "" : ' rel="noopener noreferrer"';
      return `<a${attrs}${target}${rel}>`;
    })
    .replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
      const existingId = attrs.match(/\sid=["']([^"']+)["']/i)?.[1];
      const text = decodeEntities(stripHtml(inner));
      const id = existingId || `${slugify(text) || "section"}-${headingIndex++}`;
      toc.push({ id, text, level: Number(level) as 2 | 3 });
      return existingId ? match : `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    });

  return { html: enhanced, toc };
}

function buildArticleBrief(title: string, excerpt: string, category: string) {
  const cleanExcerpt = decodeEntities(stripHtml(excerpt)).replace(/\s+/g, " ").trim();
  if (cleanExcerpt.length > 80) {
    return `${cleanExcerpt} This article explains the practical impact for businesses in Pakistan and the decisions to review before investing more budget into ${category.toLowerCase()} or paid growth.`;
  }
  return `${title} is a practical ${category.toLowerCase()} guide for businesses in Pakistan. It explains what changed, why it matters for visibility and lead generation, and what steps business owners should review before changing their marketing budget or content strategy.`;
}

function buildFaqs(title: string, category: string) {
  return [
    {
      question: "What is this article about?",
      answer: `This article explains ${title.toLowerCase()} in the context of ${category.toLowerCase()}, lead generation, and business visibility in Pakistan.`,
    },
    {
      question: "Why does this matter for businesses in Pakistan?",
      answer:
        "Search, social platforms, and AI-assisted discovery are changing how customers compare businesses. Companies need clearer content, stronger tracking, and better follow-up systems so visibility turns into real enquiries.",
    },
    {
      question: "What should a business do after reading this guide?",
      answer:
        "Audit the relevant search results, review your landing pages and tracking, check whether your content answers buyer questions clearly, and prioritize improvements that can be measured through leads, calls, WhatsApp chats, or bookings.",
    },
    {
      question: "Can Crea8iv Media help with this?",
      answer:
        "Yes. Crea8iv Media helps businesses in Rawalpindi, Islamabad, and across Pakistan connect SEO, paid ads, content, websites, and automation into measurable growth systems.",
    },
  ];
}

function getPostFaqs(post: WPPost, title: string, category: string) {
  if (post._crea8ivFaqs?.length) return post._crea8ivFaqs;
  return buildFaqs(title, category);
}

// Headings that are structural page sections, not meaningful takeaway statements
const STRUCTURAL_HEADINGS = new Set([
  "cta",
  "faq",
  "conclusion",
  "introduction",
  "table of contents",
  "the short answer",
  "actionable takeaways",
  "opening hook",
  "content package summary",
  "quick answer",
  "key takeaways",
  "suggested internal links",
  "suggested external references",
  "checklist",
  "summary",
  "overview",
]);

function buildTakeaways(toc: TocItem[], category: string) {
  const headingTakeaways = toc
    .filter(
      (item) =>
        item.level === 2 &&
        !STRUCTURAL_HEADINGS.has(item.text.toLowerCase().trim())
    )
    .slice(0, 4)
    .map((item) => item.text);

  if (headingTakeaways.length >= 3) return headingTakeaways;

  return [
    `What changed in ${category.toLowerCase()} and why it matters now`,
    "How to turn search visibility into measurable leads",
    "Which actions to prioritize before spending more budget",
    "How Crea8iv Media connects content, tracking, and conversion",
  ];
}


function buildActionPath(primaryServiceLink: { href: string; label: string } | null) {
  return [
    {
      label: "Audit",
      title: "Check the current page, search result, and conversion path.",
      body: "Find the exact gaps before changing budgets, copy, design, or publishing frequency.",
    },
    {
      label: "Fix",
      title: "Upgrade the offer, structure, tracking, and trust signals.",
      body: "Make the page easier to understand, cite, compare, and act on from mobile.",
    },
    {
      label: "Scale",
      title: primaryServiceLink
        ? `Connect the article to ${primaryServiceLink.label}.`
        : "Connect the article to consultation and lead follow-up.",
      body: "Use the content as a practical entry point into a service, tool, or booked conversation.",
    },
  ];
}

export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => [] as WPPost[]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};

  const plainTitle = getPlainTitle(post);
  const rawDescription = decodeEntities(getSeoDescription(post));
  const title = buildPostSeoTitle(plainTitle, getSeoTitle(post));
  const description = buildPostMetaDescription(plainTitle, rawDescription);
  const ogImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    ? toAbsoluteUrl(normalizeWpUrl(post._embedded["wp:featuredmedia"][0].source_url))
    : getOpenGraphImage(post.yoast_head_json);
  const canonical = postUrl(post.slug);

  return {
    title: { absolute: title },
    description,
    robots: { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: plainTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    ? normalizeWpUrl(post._embedded["wp:featuredmedia"][0].source_url)
    : null;
  const plainTitle = getPlainTitle(post);
  const plainExcerpt = decodeEntities(stripHtml(post.excerpt.rendered || "")).trim();
  const category = getPrimaryCategory(post);
  const articleBrief = buildArticleBrief(plainTitle, plainExcerpt, category);
  const faqs = getPostFaqs(post, plainTitle, category);
  const enhanced = enhanceArticleHtml(
    post.content.rendered,
    post._crea8ivCoverAlt || `${plainTitle} article image`,
    plainTitle
  );
  const contentHtml = enhanced.html;
  const toc = enhanced.toc.slice(0, 8);
  const usefulLinks = buildUsefulLinks(post).slice(0, 5);
  const primaryServiceLink = getPrimaryServiceLink(post);

  // SOP #20 — auto-assign the best service match from topic signals.
  // If the post has explicit _crea8ivInternalLinks pointing to a service page,
  // respect that; otherwise fall back to the keyword-matched topic service.
  const topicService = getTopicServiceMatch(plainTitle, category, post.slug);
  const ctaServiceHref = primaryServiceLink?.href || topicService.href;
  const ctaServiceButton = primaryServiceLink
    ? `Explore ${primaryServiceLink.label}`
    : topicService.ctaButton;
  const ctaBodyCopy = topicService.ctaCopy;

  // Auto support links: use topic-matched links when post has no manual links
  const autoSupportLinks = !post._crea8ivInternalLinks?.length
    ? topicService.supportLinks
    : usefulLinks;

  const allPosts = await getAllPosts().catch(() => [] as WPPost[]);
  const relatedPosts = buildRelatedPosts(post, allPosts, 3);
  const canonical = postUrl(post.slug);
  const takeaways = buildTakeaways(toc, category);
  const actionPath = buildActionPath(primaryServiceLink);
  const wordCount = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
  const readingMins = getReadingTimeFromHtml(contentHtml);
  const credit = articleCredit(post);
  const modified = ARTICLE_TREATMENTS[post.slug] && post.modified < EDITORIAL_UPDATED ? EDITORIAL_UPDATED : post.modified;

  // SOP #5/#8/#20 — derive article keywords from title + category + topic map
  const articleKeywords = [
    category,
    "Crea8iv Media",
    "Rawalpindi",
    "Pakistan",
    "digital marketing Pakistan",
    ...topicService.keywords.slice(0, 6),
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: plainTitle,
        description: buildPostMetaDescription(plainTitle, plainExcerpt),
        image: featuredImage ? [toAbsoluteUrl(featuredImage)] : [`${SITE_URL}/img/crea8iv-white-3d-logo.webp`],
        datePublished: post.date,
        dateModified: modified,
        author: credit.schema,
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${canonical}#webpage` },
        articleSection: category,
        // SOP #20 — mentions: service pages the article links to (entity signals)
        mentions: [
          { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Crea8iv Media", url: SITE_URL },
          ...(primaryServiceLink ? [{ "@type": "Service", name: primaryServiceLink.label, url: `${SITE_URL}${primaryServiceLink.href}` }] : []),
        ],
        keywords: articleKeywords.join(", "),
        wordCount,
        timeRequired: `PT${readingMins}M`,
        inLanguage: "en-PK",
        isAccessibleForFree: true,
        // SOP #5 — speakable: mark intro + takeaways sections as speakable for voice/AI
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#article-introduction", ".blog-takeaways"],
        },
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: plainTitle,
        description: buildPostMetaDescription(plainTitle, plainExcerpt),
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        primaryImageOfPage: featuredImage ? { "@type": "ImageObject", url: toAbsoluteUrl(featuredImage) } : { "@id": `${SITE_URL}/#logo` },
        datePublished: post.date,
        dateModified: modified,
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          { "@type": "ListItem", position: 3, name: category, item: `${SITE_URL}/blog/` },
          { "@type": "ListItem", position: 4, name: plainTitle, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };


  return (
    <>
      <ReadingProgressBar />
      <ContentShell>
        <article className="mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pt-40">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <nav className="mx-auto mb-7 flex max-w-[920px] flex-wrap items-center justify-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45 sm:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-300">Home</Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-brand-300">Blog</Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-brand-300">{category}</Link>
            <span className="hidden sm:inline">/</span>
            <span className="hidden max-w-[520px] truncate text-white/70 sm:inline-block">{plainTitle}</span>
          </nav>

          <header className="mx-auto max-w-[920px] text-center">
            <p className="mx-auto mb-5 w-fit rounded-full border border-brand-500/50 bg-brand-500/10 px-4 py-1.5 font-orbitron text-[10px] uppercase tracking-[0.22em] text-brand-300">
              {category}
            </p>
            <h1 className="mx-auto max-w-[1000px] font-syne text-[clamp(2.05rem,5.1vw,4.35rem)] font-bold leading-[1.03] text-white">
              {plainTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-base leading-8 text-white/64 sm:text-lg">
              {plainExcerpt || buildPostMetaDescription(plainTitle, "")}
            </p>
            <div className="mx-auto mt-8 flex max-w-[760px] flex-wrap items-center justify-center gap-2 text-sm text-white/58 sm:gap-3">
              <Link href={credit.href} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-2.5 py-2 text-white/72 transition hover:border-brand-500/40 hover:text-white">
                <span className="font-semibold text-white">{credit.name}</span>
              </Link>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">{formatWpDate(post.date)}</span>
              {modified !== post.date ? (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">Updated {formatWpDate(modified)}</span>
              ) : null}
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">{getReadingTimeFromHtml(contentHtml)} min read</span>
            </div>
          </header>

          {featuredImage ? (
            <div className="relative mx-auto mb-14 mt-10 aspect-video max-w-[980px] overflow-hidden rounded-[18px] border border-white/12 bg-[#111] shadow-[0_28px_100px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage}
                alt={post._crea8ivCoverAlt || `${plainTitle} - ${category} guide by Crea8iv Media`}
                width={1200}
                height={630}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-white/[0.03]" />
            </div>
          ) : null}

          <section className="blog-reader-overview mx-auto mb-12 max-w-[980px]" aria-label="Article overview">
            <div className="blog-reader-metric">
              <span>Intent</span>
              <strong>{category}</strong>
            </div>
            <div className="blog-reader-metric">
              <span>Reading Time</span>
              <strong>{getReadingTimeFromHtml(contentHtml)} min</strong>
            </div>
            <div className="blog-reader-metric">
              <span>Best For</span>
              <strong>Pakistan businesses</strong>
            </div>
            <div className="blog-reader-metric">
              <span>Next Step</span>
              <strong>{primaryServiceLink ? primaryServiceLink.label : "Consultation"}</strong>
            </div>
          </section>

          <div className={`${readerStyles.reader} blog-reader-layout grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[250px_minmax(0,860px)] lg:items-start`}>
            <aside className="hidden lg:block">
              <div className="blog-reader-sidebar sticky top-28">
                <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Contents</p>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-white/62">
                  {toc.length ? toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
                      <a href={`#${item.id}`} className="hover:text-white">{item.text}</a>
                    </li>
                  )) : (
                    <li><a href="#article-introduction" className="hover:text-white">Introduction</a></li>
                  )}
                </ol>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/42">Useful links</p>
                  <div className="mt-3 space-y-2 text-sm">
                    {usefulLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block text-white/62 hover:text-brand-300">{link.label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="blog-reader-main min-w-0">
              <details className="blog-mobile-toc mb-8 lg:hidden">
                <summary>Table of contents</summary>
                <ol>
                  {toc.length ? toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "is-child" : undefined}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  )) : <li><a href="#article-introduction">Introduction</a></li>}
                </ol>
              </details>

              <section id="article-introduction" className="blog-quick-answer">
                <p className="blog-section-eyebrow">Quick answer</p>
                <p>{articleBrief}</p>
              </section>

              <section className="blog-takeaways" aria-labelledby="key-takeaways-heading">
                <div>
                  <p className="blog-section-eyebrow">Key takeaways</p>
                  <h2 id="key-takeaways-heading">What you should know before acting</h2>
                </div>
                <div className="blog-takeaway-grid">
                  {takeaways.map((takeaway, index) => (
                    <div className="blog-takeaway-card" key={takeaway}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{takeaway}</p>
                    </div>
                  ))}
                </div>
              </section>

              <WordPressContent html={contentHtml} className="tx-blogDetails-box__wrapper post-details-content" />

              <section className="blog-action-path" aria-labelledby="action-path-heading">
                <div>
                  <p className="blog-section-eyebrow">Execution path</p>
                  <h2 id="action-path-heading">How to use this guide</h2>
                </div>
                <div className="blog-action-grid">
                  {actionPath.map((step, index) => (
                    <article key={step.label}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{step.label}</h3>
                      <strong>{step.title}</strong>
                      <p>{step.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* SOP #20 — always show relevant links: topic-matched when no manual links configured */}
              {autoSupportLinks.length ? (
                <section className="blog-resource-panel" aria-labelledby="resource-panel-heading">
                  <div>
                    <p className="blog-section-eyebrow">Useful links</p>
                    <h2 id="resource-panel-heading">Continue through the right pages</h2>
                  </div>
                  <div className="blog-resource-links">
                    {autoSupportLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <span>{link.label}</span>
                        <strong>Open</strong>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}


              <section className="blog-faq-panel" aria-labelledby="faq-heading">
                <p className="blog-section-eyebrow">FAQ</p>
                <h2 id="faq-heading">Frequently Asked Questions</h2>
                <div className="blog-faq-list">
                  {faqs.map((faq) => (
                    <article key={faq.question}>
                      <h3>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </article>
                  ))}
                </div>
              </section>

              <ArticleConsultingContext slug={post.slug} />

              <section className="blog-next-step">
                <p className="blog-section-eyebrow">Next step</p>
                <h2>Ready to apply this for your business?</h2>
                <p>{ctaBodyCopy}</p>
                <div>
                  <Link href={ctaServiceHref} className="blog-primary-button">
                    {ctaServiceButton}
                  </Link>
                  <Link href="/contact/" className="blog-secondary-button">Request Proposal</Link>
                </div>
              </section>


              <section className="blog-author-card">
                <h2 className="text-xl font-semibold">Editorial responsibility</h2>
                <p className="mt-3 leading-7"><Link href={credit.href}>{credit.name}</Link>. Named authorship and review credits are used only where an editorial record supports them.</p>
              </section>
            </div>
          </div>

          {relatedPosts.length ? (
            <section className="blog-related-section">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Related Articles</p>
                  <h2 className="mt-2 font-syne text-3xl font-bold text-white">Continue Reading</h2>
                </div>
                <Link href="/blog/" className="hidden text-sm font-semibold text-white/62 hover:text-brand-300 sm:block">View all articles</Link>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedPosts.map((item) => {
                  const itemTitle = getPlainTitle(item);
                  const itemImage = getPostImage(item);
                  const itemCategory = item._embedded?.["wp:term"]?.flat()?.find((term) => term?.name)?.name || "Digital Marketing";
                  return (
                    <Link key={item.id} href={`/blog/${item.slug}/`} className="group overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-brand-500/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={itemImage} alt={itemTitle} width={420} height={236} loading="lazy" className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="p-5">
                        <p className="font-orbitron text-[10px] uppercase tracking-[0.16em] text-brand-300">{itemCategory}</p>
                        <h3 className="mt-3 font-syne text-lg font-bold leading-tight text-white">{itemTitle}</h3>
                        <p className="mt-3 text-xs text-white/48">{formatWpDate(item.date)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </article>
      </ContentShell>
    </>
  );
}
