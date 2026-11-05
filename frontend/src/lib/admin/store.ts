import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { SITE_URL } from "@/lib/site-config";
import { scoreBlog } from "@/lib/admin/scoring";
import { getPublishBlockers } from "@/lib/admin/publish-gate";
import { growthRoadmapSeeds } from "@/lib/admin/growth-roadmap";
import { getManualPosts } from "@/lib/wordpress/manual-posts";
import type { WPPost } from "@/types/wordpress";
import type {
  ActivityLogRecord,
  AdminSettings,
  AdminStore,
  AnalyticsSnapshot,
  AnalyticsSyncState,
  BlogPostRecord,
  BlogStatus,
  DeploymentLogRecord,
  EditorialCalendarItem,
  LeadEventRecord,
  MediaAssetRecord,
  PageContentRecord,
  VerificationLogRecord,
} from "@/lib/admin/types";

const DATA_DIR = process.env.CREA8IV_CMS_DATA_DIR || path.join(process.cwd(), ".crea8iv-cms");
const STORE_FILE = path.join(DATA_DIR, "store.json");
const MEDIA_DIR = path.join(process.cwd(), "public", "admin-media");

const now = () => new Date().toISOString();

const defaultAnalyticsSync: AnalyticsSyncState = {
  gsc: { status: "not_configured", lastSyncedAt: null, rows: 0, message: "Not synced yet." },
  ga4: { status: "not_configured", lastSyncedAt: null, rows: 0, message: "Not synced yet." },
};

const defaultSettings: AdminSettings = {
  siteUrl: SITE_URL,
  ownerEmail: process.env.ADMIN_EMAIL || "owner@crea8ivmedia.com",
  deployCommand: process.env.CREA8IV_DEPLOY_COMMAND || "npm run build",
  deployWebhookUrl: process.env.CREA8IV_DEPLOY_WEBHOOK_URL || "",
  searchConsoleProperty: process.env.GSC_SITE_URL || SITE_URL,
  ga4PropertyId: process.env.GA4_PROPERTY_ID || "",
  ga4MeasurementId:
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.GA4_MEASUREMENT_ID || "G-4T16NR75HT",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || process.env.GOOGLE_TAG_MANAGER_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID || "",
  googleAdsConversionId: process.env.GOOGLE_ADS_CONVERSION_ID || "",
  googleAdsConversionLabel: process.env.GOOGLE_ADS_CONVERSION_LABEL || "",
  microsoftClarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || process.env.MICROSOFT_CLARITY_PROJECT_ID || "ynq6hs77ex",
  bingSiteVerification: process.env.BING_SITE_VERIFICATION || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  googleBusinessProfileUrl: process.env.GOOGLE_BUSINESS_PROFILE_URL || "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
  xUrl: process.env.NEXT_PUBLIC_X_URL || "",
  databaseProvider: "file",
  databaseStatus: "not_connected",
  requiredSchemaTypes: ["Organization", "LocalBusiness", "BlogPosting", "FAQPage", "BreadcrumbList"],
  analyticsSync: defaultAnalyticsSync,
  updatedAt: now(),
};

const emptyStore: AdminStore = {
  blogs: [],
  media: [],
  pages: [],
  calendar: [],
  deployments: [],
  verifications: [],
  analytics: [],
  leadEvents: [],
  activity: [],
  settings: defaultSettings,
};

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(MEDIA_DIR, { recursive: true });
  try {
    await readFile(STORE_FILE, "utf8");
  } catch {
    await writeFile(STORE_FILE, JSON.stringify(emptyStore, null, 2));
  }
}

async function readStore(): Promise<AdminStore> {
  await ensureStore();
  const raw = await readFile(STORE_FILE, "utf8");
  const parsed = JSON.parse(raw) as Partial<AdminStore>;
  const store = {
    ...emptyStore,
    ...parsed,
    settings: {
      ...defaultSettings,
      ...(parsed.settings || {}),
      analyticsSync: { ...defaultAnalyticsSync, ...(parsed.settings?.analyticsSync || {}) },
    },
    blogs: parsed.blogs || [],
    media: parsed.media || [],
    pages: parsed.pages || [],
    calendar: parsed.calendar || [],
    deployments: parsed.deployments || [],
    verifications: parsed.verifications || [],
    analytics: parsed.analytics || [],
    leadEvents: parsed.leadEvents || [],
    activity: parsed.activity || [],
  };

  return seedDefaultPageInventory(await seedGrowthRoadmapCalendar(await seedStoreFromPublishedContent(store)));
}

async function writeStore(store: AdminStore) {
  await ensureStore();
  const tmpFile = `${STORE_FILE}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmpFile, JSON.stringify(store, null, 2));
  await rename(tmpFile, STORE_FILE);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function readingTime(markdown: string) {
  const words = markdown.replace(/[#>*_`[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#8212;|&mdash;/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlToEditableMarkdown(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n\n# $1\n\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n\n#### $1\n\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<\/ul>|<\/ol>/gi, "\n\n")
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n\n> $1\n\n")
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#8220;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#8212;|&mdash;/g, "-")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanImportedBlogMarkdown(markdown: string) {
  let clean = markdown.trim();

  clean = clean.replace(/^##\s*Published article snapshot\s*/i, "").trim();
  clean = clean.replace(/^#\s+.+\n+/, "").trim();
  clean = clean.replace(
    /^##\s*Content Package Summary\s*\n[\s\S]*?(?=\n##\s*(?:Opening Hook|Introduction|Quick Answer|The Short Answer|Table of Contents|Key Takeaways)\b)/i,
    ""
  ).trim();
  clean = clean.replace(
    /^(?:AI \w+.*?)?Content Package Summary[\s\S]*?(?=\n\n(?:Opening Hook|Introduction|Quick Answer|The Short Answer|\#|[A-Z][a-z]{2,}))/m,
    ""
  ).trim();
  clean = clean.replace(/^##\s*Opening Hook\s*/i, "").trim();
  clean = clean.replace(/^Opening Hook\s+/i, "").trim();
  clean = clean.replace(
    /\n+##\s*Table of Contents\s*\n(?:[-*]\s+.+\n?|\d+\.\s+.+\n?)+/i,
    "\n"
  ).trim();
  clean = clean.replace(/\n{3,}/g, "\n\n").trim();

  return clean || markdown.trim();
}

function isFlattenedLegacySnapshot(blog: BlogPostRecord) {
  if (!blog.id.startsWith("legacy-")) return false;
  if (!blog.tags.includes("legacy-import")) return false;
  const markdown = blog.markdown.trim();
  if (/^##\s*Published article snapshot/i.test(markdown)) return true;
  return !/^#{1,4}\s+/m.test(markdown) && markdown.length > 800;
}

function hasEditorMetadataPreamble(blog: BlogPostRecord) {
  if (!blog.id.startsWith("legacy-")) return false;
  return /^#\s+.+\n+##\s*Content Package Summary/im.test(blog.markdown.trim());
}

function categoryForPost(post: WPPost) {
  return post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Digital Marketing";
}

function featuredImageForPost(post: WPPost) {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
}

function seedBlogFromPost(post: WPPost): BlogPostRecord {
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered || post.yoast_head_json?.description || "");
  const image = featuredImageForPost(post);
  const editableContent = cleanImportedBlogMarkdown(
    post._crea8ivRawMarkdown ||
      htmlToEditableMarkdown(post.content.rendered) ||
      stripHtml(post.content.rendered)
  );
  const internalLinks = Array.from(
    new Set([...(post._crea8ivInternalLinks || []), "/consultation/", "/results/", "/ai-search-optimization/"])
  ).slice(0, 8);
  const draft: Omit<BlogPostRecord, "score"> = {
    id: `legacy-${post.id}`,
    title,
    slug: post.slug,
    status: "published",
    category: categoryForPost(post),
    tags: ["published", "legacy-import"],
    author: post._embedded?.author?.[0]?.name || "Syed Qamar Abbas",
    excerpt,
    markdown: editableContent,
    seoTitle: post.yoast_head_json?.title || title,
    metaDescription: post.yoast_head_json?.description || excerpt.slice(0, 165),
    focusKeyword: post.slug.split("-").slice(0, 4).join(" "),
    secondaryKeywords: [categoryForPost(post), "digital marketing Pakistan", "Crea8iv Media"],
    searchIntent: "Informational and commercial search intent for Pakistan business owners comparing digital marketing options.",
    aiSearchIntent: "Answer-ready guidance for AI search results about digital marketing, SEO, ads, websites, and business growth in Pakistan.",
    targetAudience: "Business owners, founders, clinics, restaurants, real estate teams, service providers, and marketing decision makers in Pakistan.",
    canonicalUrl: `${SITE_URL}/blog/${post.slug}/`,
    ogTitle: post.yoast_head_json?.og_title || post.yoast_head_json?.title || title,
    ogDescription: post.yoast_head_json?.og_description || post.yoast_head_json?.description || excerpt.slice(0, 165),
    ogImage: post.yoast_head_json?.og_image?.[0]?.url || image,
    twitterTitle: post.yoast_head_json?.og_title || post.yoast_head_json?.title || title,
    twitterDescription: post.yoast_head_json?.og_description || post.yoast_head_json?.description || excerpt.slice(0, 165),
    twitterImage: post.yoast_head_json?.og_image?.[0]?.url || image,
    thumbnailUrl: image,
    thumbnailAlt: post._crea8ivCoverAlt || `${title} blog thumbnail by Crea8iv Media`,
    faqs: post._crea8ivFaqs || [],
    ctas: [{ label: "Book a strategy consultation", href: "/consultation/", context: "Legacy blog CTA" }],
    internalLinks,
    externalReferences: [],
    relatedPostIds: [],
    schemaTypes: ["BlogPosting", "FAQPage", "BreadcrumbList"],
    readingTimeMinutes: readingTime(editableContent),
    scheduledAt: null,
    publishedAt: post.date,
    createdAt: post.date,
    updatedAt: post.modified || post.date,
  };

  return { ...draft, score: scoreBlog(draft) };
}

const defaultPageInventory: Omit<PageContentRecord, "id" | "lastReviewedAt" | "updatedAt">[] = [
  {
    title: "Home",
    path: "/",
    template: "home",
    status: "live",
    seoTitle: "CREA8IV MEDIA | Digital Marketing Agency in Rawalpindi",
    metaDescription: "Premium SEO, ads, websites, automation, and AI visibility systems for businesses in Rawalpindi, Islamabad, and Pakistan.",
    h1: "Growth systems for ambitious businesses",
    summary: "Main conversion page for agency positioning, services, proof, tools, and consultation.",
    primaryCtaLabel: "Get proposal",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 11,
    editableSlots: ["hero", "proof", "solutions", "results", "tools", "process", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Growth Systems",
    path: "/growth-systems/",
    template: "service",
    status: "needs_review",
    seoTitle: "Growth Systems for Pakistan Businesses | CREA8IV MEDIA",
    metaDescription: "Full-funnel growth systems connecting SEO, ads, landing pages, WhatsApp leads, automation, and reporting.",
    h1: "Growth systems",
    summary: "Service page for business growth strategy, funnels, automation, dashboards, and lead conversion.",
    primaryCtaLabel: "Build my growth system",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 8,
    editableSlots: ["hero", "problem", "system map", "process", "proof", "pricing bridge", "faq", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Meta Ads",
    path: "/meta-ads/",
    template: "service",
    status: "needs_review",
    seoTitle: "Meta Ads Agency in Pakistan | CREA8IV MEDIA",
    metaDescription: "Facebook and Instagram ads strategy, creative, tracking, and lead generation for Pakistan businesses.",
    h1: "Meta Ads that convert attention into qualified leads",
    summary: "Dedicated service page for Meta ads strategy, budget, creatives, tracking, lead quality, and WhatsApp handoff.",
    primaryCtaLabel: "Plan Meta Ads",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 8,
    editableSlots: ["hero", "offer", "creative system", "audiences", "tracking", "case proof", "faq", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Google Ads",
    path: "/google-ads/",
    template: "service",
    status: "needs_review",
    seoTitle: "Google Ads Agency in Pakistan | CREA8IV MEDIA",
    metaDescription: "Google Ads setup, optimization, landing pages, conversion tracking, and lead quality reporting.",
    h1: "Google Ads built around lead quality",
    summary: "Dedicated page for search intent, keyword strategy, budgets, tracking, landing pages, and conversion cleanup.",
    primaryCtaLabel: "Audit Google Ads",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 8,
    editableSlots: ["hero", "intent map", "campaign structure", "landing page", "tracking", "results", "faq", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Website Development",
    path: "/website-development/",
    template: "service",
    status: "needs_review",
    seoTitle: "Website Development Company in Islamabad | CREA8IV MEDIA",
    metaDescription: "Fast, premium, SEO-ready websites and web apps for businesses in Islamabad, Rawalpindi, and Pakistan.",
    h1: "Websites that feel premium and load fast",
    summary: "Service page for speed, design, SEO, conversion paths, admin CMS, and custom web app capability.",
    primaryCtaLabel: "Request website audit",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 9,
    editableSlots: ["hero", "speed", "design", "cms", "seo", "proof", "process", "faq", "cta"],
    missingAltCount: 0,
  },
  {
    title: "About CREA8IV MEDIA",
    path: "/about/",
    template: "company",
    status: "needs_review",
    seoTitle: "About CREA8IV MEDIA | Rawalpindi Digital Marketing Agency",
    metaDescription: "Learn who CREA8IV MEDIA is, what we build, and how our team connects design, SEO, ads, automation, and AI visibility.",
    h1: "About CREA8IV MEDIA",
    summary: "Company entity page for brand trust, founder signals, services, process, and team visibility.",
    primaryCtaLabel: "Meet the team",
    primaryCtaHref: "/our-team/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 7,
    editableSlots: ["hero", "story", "values", "team", "entity proof", "local trust", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Plans",
    path: "/pricing/",
    template: "service",
    status: "needs_review",
    seoTitle: "Digital Marketing Plans in Pakistan | CREA8IV MEDIA",
    metaDescription: "Compare growth, SEO, ads, website, and automation plans for Pakistan businesses.",
    h1: "Plans built around outcomes",
    summary: "Pricing and package page for conversion clarity, plan comparison, qualification, and proposal routing.",
    primaryCtaLabel: "Get custom proposal",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 7,
    editableSlots: ["hero", "plans", "comparison", "what is included", "who fits", "faq", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Blog",
    path: "/blog/",
    template: "blog_index",
    status: "live",
    seoTitle: "Digital Marketing Blog Pakistan | CREA8IV MEDIA",
    metaDescription: "SEO, AI search, ads, local SEO, website, automation, and conversion guides for Pakistan businesses.",
    h1: "Insights",
    summary: "Blog archive for topical authority, AI visibility, entity reinforcement, and lead nurturing.",
    primaryCtaLabel: "Book an audit",
    primaryCtaHref: "/consultation/",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 5,
    editableSlots: ["hero", "filters", "featured posts", "clusters", "cta"],
    missingAltCount: 0,
  },
  {
    title: "Admin OS",
    path: "/admin/",
    template: "system",
    status: "live",
    seoTitle: "CREA8IV Admin OS",
    metaDescription: "Private owner-only website, blog, SEO, media, analytics, and automation system.",
    h1: "Command dashboard",
    summary: "Private operating system for publishing, scheduling, analytics, integrations, and website content control.",
    primaryCtaLabel: "New blog",
    primaryCtaHref: "/admin/blogs/new",
    heroImageUrl: "",
    heroImageAlt: "",
    sectionCount: 10,
    editableSlots: ["dashboard", "blogs", "calendar", "media", "seo", "analytics", "settings"],
    missingAltCount: 0,
  },
];

async function seedDefaultPageInventory(store: AdminStore): Promise<AdminStore> {
  const existingPaths = new Set(store.pages.map((page) => page.path));
  const timestamp = now();
  const missingPages = defaultPageInventory
    .filter((page) => !existingPaths.has(page.path))
    .map((page) => ({
      id: `page-${slugify(page.path === "/" ? "home" : page.path)}`,
      lastReviewedAt: timestamp,
      updatedAt: timestamp,
      ...page,
    }));

  if (!missingPages.length) return store;

  const nextStore = {
    ...store,
    pages: [...store.pages, ...missingPages].sort((a, b) => a.path.localeCompare(b.path)),
    activity: [
      {
        id: randomUUID(),
        actor: "system",
        action: "seed",
        entityType: "page",
        message: `Added ${missingPages.length} editable page inventory record(s).`,
        createdAt: timestamp,
      },
      ...store.activity,
    ].slice(0, 500),
  };

  await writeStore(nextStore);
  return nextStore;
}

async function seedGrowthRoadmapCalendar(store: AdminStore): Promise<AdminStore> {
  const existingSlugs = new Set([
    ...store.calendar.map((item) => item.slug),
    ...store.blogs.map((blog) => blog.slug),
  ]);
  const timestamp = now();
  const missingCalendarItems = growthRoadmapSeeds
    .filter((seed) => !existingSlugs.has(seed.slug))
    .map((seed): EditorialCalendarItem => ({
      id: `growth-roadmap-${seed.slug}`,
      topic: seed.topic,
      slug: seed.slug,
      scheduledAt: seed.scheduledAt,
      status: "planned",
      draftCreated: false,
      thumbnailCreated: false,
      published: false,
      liveVerified: false,
      deploymentResult: "not_started",
      sitemapVerified: false,
      rssVerified: false,
      notes: [
        `${seed.category} roadmap item for the CREA8IV SEO, GEO, AEO, LLMO, authority, and WhatsApp lead engine.`,
        `Focus keyword: ${seed.focusKeyword}.`,
        `Required internal destination: ${seed.targetLink}.`,
        "Before publishing: write the full 2500-4000 word article, create a 1280x720 WebP thumbnail, add schema, internal links, RSS, sitemap, and live URL verification.",
      ].join(" "),
      blockers: "Needs full article, thumbnail, schema, internal links, RSS, sitemap, and live URL verification.",
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

  if (!missingCalendarItems.length) return store;

  const nextStore = {
    ...store,
    calendar: [...store.calendar, ...missingCalendarItems].sort(
      (a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt)
    ),
    activity: [
      {
        id: randomUUID(),
        actor: "system",
        action: "seed",
        entityType: "calendar",
        message: `Added ${missingCalendarItems.length} planned growth roadmap topic(s) to the editorial calendar.`,
        createdAt: timestamp,
      },
      ...store.activity,
    ].slice(0, 500),
  };

  await writeStore(nextStore);
  return nextStore;
}

async function seedStoreFromPublishedContent(store: AdminStore): Promise<AdminStore> {
  const posts = getManualPosts();
  if (!posts.length) return store;

  const existingSlugs = new Set(store.blogs.map((blog) => blog.slug));
  const blogsBySlug = new Map(posts.map((post) => [post.slug, seedBlogFromPost(post)]));
  let refreshedImportedBlogs = 0;
  const migratedBlogs = store.blogs.map((blog) => {
    const source = blogsBySlug.get(blog.slug);
    if (!source || (!isFlattenedLegacySnapshot(blog) && !hasEditorMetadataPreamble(blog))) return blog;
    refreshedImportedBlogs += 1;
    return {
      ...source,
      id: blog.id,
      status: blog.status,
      scheduledAt: blog.scheduledAt,
      publishedAt: blog.publishedAt || source.publishedAt,
      createdAt: blog.createdAt || source.createdAt,
      updatedAt: now(),
    };
  });
  const missingBlogs = posts
    .filter((post) => !existingSlugs.has(post.slug))
    .map(seedBlogFromPost);

  if (!missingBlogs.length && !refreshedImportedBlogs) return store;

  const blogs = [...migratedBlogs, ...missingBlogs].sort(
    (a, b) => +new Date(b.publishedAt || b.updatedAt) - +new Date(a.publishedAt || a.updatedAt)
  );
  const seededAt = now();
  const existingCalendarSlugs = new Set(store.calendar.map((item) => item.slug));
  const calendar = [
    ...store.calendar,
    ...blogs
      .filter((blog) => !existingCalendarSlugs.has(blog.slug))
      .slice(0, 50)
      .map((blog) => ({
        id: `legacy-calendar-${blog.slug}`,
        topic: blog.title,
        slug: blog.slug,
        scheduledAt: blog.publishedAt || blog.createdAt,
        status: "verified" as const,
        draftCreated: true,
        thumbnailCreated: Boolean(blog.thumbnailUrl),
        published: true,
        liveVerified: true,
        deploymentResult: "success" as const,
        sitemapVerified: true,
        rssVerified: true,
        notes: "Imported from the published Crea8iv Media blog archive.",
        blockers: "",
        blogId: blog.id,
        createdAt: seededAt,
        updatedAt: seededAt,
      })),
  ];

  const nextStore = {
    ...store,
    blogs,
    calendar,
    activity: [
      {
        id: randomUUID(),
        actor: "system",
        action: store.blogs.length ? "sync" : "seed",
        entityType: "blog",
        message: store.blogs.length
          ? `Synced ${missingBlogs.length} missing published blog records and refreshed ${refreshedImportedBlogs} imported blog records.`
          : `Imported ${blogs.length} existing published blog records into the private admin baseline.`,
        createdAt: seededAt,
      },
      ...store.activity,
    ].slice(0, 500),
  };

  await writeStore(nextStore);
  return nextStore;
}

export function getCmsDataDir() {
  return DATA_DIR;
}

export function getCmsMediaDir() {
  return MEDIA_DIR;
}

export async function getAdminStore() {
  return readStore();
}

export async function getPublicTrackingSettings() {
  await ensureStore();
  try {
    const raw = await readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<AdminStore>;
    const settings = { ...defaultSettings, ...(parsed.settings || {}) };

    return {
      googleTagManagerId: settings.googleTagManagerId,
      ga4MeasurementId:
        settings.ga4MeasurementId ||
        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
        process.env.GA4_MEASUREMENT_ID ||
        "G-4T16NR75HT",
      microsoftClarityProjectId: settings.microsoftClarityProjectId,
      metaPixelId: settings.metaPixelId,
    };
  } catch {
    return {
      googleTagManagerId: defaultSettings.googleTagManagerId,
      ga4MeasurementId:
        defaultSettings.ga4MeasurementId ||
        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
        process.env.GA4_MEASUREMENT_ID ||
        "G-4T16NR75HT",
      microsoftClarityProjectId: defaultSettings.microsoftClarityProjectId,
      metaPixelId: defaultSettings.metaPixelId,
    };
  }
}

export async function addActivity(input: Omit<ActivityLogRecord, "id" | "createdAt">) {
  const store = await readStore();
  store.activity.unshift({ id: randomUUID(), createdAt: now(), ...input });
  store.activity = store.activity.slice(0, 500);
  await writeStore(store);
}

export async function getBlog(id: string) {
  const store = await readStore();
  return store.blogs.find((blog) => blog.id === id) || null;
}

export async function createBlog(input: Partial<BlogPostRecord>, actor = "owner") {
  const store = await readStore();
  const timestamp = now();
  const title = input.title?.trim() || "Untitled strategic article";
  const slug = slugify(input.slug || title);
  const draft: Omit<BlogPostRecord, "score"> = {
    id: randomUUID(),
    title,
    slug,
    status: input.status || "draft",
    category: input.category || "Digital Marketing",
    tags: input.tags || [],
    author: input.author || "Syed Qamar Abbas",
    excerpt: input.excerpt || "",
    markdown: input.markdown || "## Strategic Summary\n\nWrite the article here.\n\n## FAQ\n\n### What should readers know?\n\nAdd a useful answer.",
    seoTitle: input.seoTitle || title,
    metaDescription: input.metaDescription || "",
    focusKeyword: input.focusKeyword || "",
    secondaryKeywords: input.secondaryKeywords || [],
    searchIntent: input.searchIntent || "",
    aiSearchIntent: input.aiSearchIntent || "",
    targetAudience: input.targetAudience || "",
    canonicalUrl: input.canonicalUrl || `${SITE_URL}/blog/${slug}/`,
    ogTitle: input.ogTitle || input.seoTitle || title,
    ogDescription: input.ogDescription || input.metaDescription || "",
    ogImage: input.ogImage || "",
    twitterTitle: input.twitterTitle || input.seoTitle || title,
    twitterDescription: input.twitterDescription || input.metaDescription || "",
    twitterImage: input.twitterImage || "",
    thumbnailUrl: input.thumbnailUrl || "",
    thumbnailAlt: input.thumbnailAlt || "",
    faqs: input.faqs || [],
    ctas: input.ctas || [{ label: "Book a strategy consultation", href: "/consultation/", context: "Primary blog CTA" }],
    internalLinks: input.internalLinks || ["/consultation/", "/tools/seo-audit/", "/ai-search-optimization/"],
    externalReferences: input.externalReferences || [],
    relatedPostIds: input.relatedPostIds || [],
    schemaTypes: input.schemaTypes || ["BlogPosting", "FAQPage", "BreadcrumbList"],
    readingTimeMinutes: readingTime(input.markdown || ""),
    scheduledAt: input.scheduledAt || null,
    publishedAt: input.publishedAt || null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  const blog = { ...draft, score: scoreBlog(draft) };
  store.blogs.unshift(blog);
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "create",
    entityType: "blog",
    entityId: blog.id,
    message: `Created blog draft: ${blog.title}`,
    createdAt: timestamp,
  });
  await writeStore(store);
  return blog;
}

export async function updateBlog(id: string, input: Partial<BlogPostRecord>, actor = "owner") {
  const store = await readStore();
  const index = store.blogs.findIndex((blog) => blog.id === id);
  if (index === -1) return null;
  const previous = store.blogs[index];
  const slug = slugify(input.slug || previous.slug || previous.title);
  const merged: Omit<BlogPostRecord, "score"> = {
    ...previous,
    ...input,
    slug,
    canonicalUrl: input.canonicalUrl || previous.canonicalUrl || `${SITE_URL}/blog/${slug}/`,
    readingTimeMinutes: readingTime(input.markdown ?? previous.markdown),
    updatedAt: now(),
  };
  const nextBlog = { ...merged, score: scoreBlog(merged) };
  store.blogs[index] = nextBlog;
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "edit",
    entityType: "blog",
    entityId: id,
    message: `Updated blog: ${nextBlog.title}`,
    createdAt: now(),
  });
  await writeStore(store);
  return nextBlog;
}

export async function setBlogStatus(id: string, status: BlogStatus, actor = "owner") {
  const blog = await getBlog(id);
  if (!blog) return null;
  if (status === "published") {
    const blockers = getPublishBlockers(blog);
    if (blockers.length) return null;
  }
  const patch: Partial<BlogPostRecord> = {
    status,
    publishedAt: status === "published" ? now() : undefined,
  };
  return updateBlog(id, patch, actor);
}

export async function publishDueScheduledBlogs(actor = "automation") {
  const store = await readStore();
  const timestamp = now();
  const due = store.blogs.filter(
    (blog) => blog.status === "scheduled" && blog.scheduledAt && +new Date(blog.scheduledAt) <= Date.now()
  );

  if (!due.length) {
    store.activity.unshift({
      id: randomUUID(),
      actor,
      action: "publish_due",
      entityType: "automation",
      message: "Automation checked scheduled blogs. No due posts found.",
      createdAt: timestamp,
    });
    store.activity = store.activity.slice(0, 500);
    await writeStore(store);
    return { published: [], skipped: [] as { id: string; title: string; reason: string }[] };
  }

  const published: BlogPostRecord[] = [];
  const skipped: { id: string; title: string; reason: string }[] = [];

  store.blogs = store.blogs.map((blog) => {
    if (!due.some((item) => item.id === blog.id)) return blog;
    const blockers = getPublishBlockers(blog);
    if (blockers.length) {
      skipped.push({ id: blog.id, title: blog.title, reason: blockers.slice(0, 4).join(" | ") });
      return blog;
    }
    const nextBlog = { ...blog, status: "published" as BlogStatus, publishedAt: blog.publishedAt || timestamp, updatedAt: timestamp };
    published.push(nextBlog);
    return nextBlog;
  });

  const publishedIds = new Set(published.map((blog) => blog.id));
  const skippedById = new Map(skipped.map((item) => [item.id, item.reason]));
  store.calendar = store.calendar.map((item) => {
    if (!item.blogId) return item;
    const skippedReason = skippedById.get(item.blogId);
    if (skippedReason) {
      return {
        ...item,
        status: "blocked",
        blockers: skippedReason,
        notes: item.notes || "Blocked by publish readiness gate.",
        updatedAt: timestamp,
      };
    }
    if (!publishedIds.has(item.blogId)) return item;
    return {
      ...item,
      status: "published",
      published: true,
      deploymentResult: "pending",
      updatedAt: timestamp,
    };
  });

  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "publish_due",
    entityType: "automation",
    message: `Published ${published.length} due blog(s); skipped ${skipped.length}.`,
    createdAt: timestamp,
  });
  store.activity = store.activity.slice(0, 500);
  await writeStore(store);
  return { published, skipped };
}

export async function duplicateBlog(id: string, actor = "owner") {
  const blog = await getBlog(id);
  if (!blog) return null;
  return createBlog(
    {
      ...blog,
      id: undefined,
      title: `${blog.title} Copy`,
      slug: `${blog.slug}-copy`,
      status: "draft",
      publishedAt: null,
    },
    actor
  );
}

export async function deleteBlog(id: string, actor = "owner") {
  const store = await readStore();
  const blog = store.blogs.find((item) => item.id === id);
  store.blogs = store.blogs.filter((item) => item.id !== id);
  if (blog) {
    store.activity.unshift({
      id: randomUUID(),
      actor,
      action: "delete",
      entityType: "blog",
      entityId: id,
      message: `Deleted blog: ${blog.title}`,
      createdAt: now(),
    });
  }
  await writeStore(store);
}

export async function upsertCalendarItem(input: Partial<EditorialCalendarItem>, actor = "owner") {
  const store = await readStore();
  const timestamp = now();
  const item: EditorialCalendarItem = {
    id: input.id || randomUUID(),
    topic: input.topic || "Untitled topic",
    slug: slugify(input.slug || input.topic || "untitled-topic"),
    scheduledAt: input.scheduledAt || timestamp,
    status: input.status || "planned",
    draftCreated: Boolean(input.draftCreated),
    thumbnailCreated: Boolean(input.thumbnailCreated),
    published: Boolean(input.published),
    liveVerified: Boolean(input.liveVerified),
    deploymentResult: input.deploymentResult || "not_started",
    sitemapVerified: Boolean(input.sitemapVerified),
    rssVerified: Boolean(input.rssVerified),
    notes: input.notes || "",
    blockers: input.blockers || "",
    blogId: input.blogId,
    createdAt: input.createdAt || timestamp,
    updatedAt: timestamp,
  };
  const index = store.calendar.findIndex((entry) => entry.id === item.id);
  if (index >= 0) store.calendar[index] = item;
  else store.calendar.push(item);
  store.calendar.sort((a, b) => +new Date(a.scheduledAt) - +new Date(b.scheduledAt));
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: index >= 0 ? "edit" : "create",
    entityType: "calendar",
    entityId: item.id,
    message: `Updated calendar topic: ${item.topic}`,
    createdAt: timestamp,
  });
  await writeStore(store);
  return item;
}

export async function addMediaAsset(input: Omit<MediaAssetRecord, "id" | "createdAt">, actor = "owner") {
  const store = await readStore();
  const asset: MediaAssetRecord = { id: randomUUID(), createdAt: now(), ...input };
  store.media.unshift(asset);
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "upload",
    entityType: "media",
    entityId: asset.id,
    message: `Uploaded media: ${asset.fileName}`,
    createdAt: now(),
  });
  await writeStore(store);
  return asset;
}

export async function getPage(id: string) {
  const store = await readStore();
  return store.pages.find((page) => page.id === id) || null;
}

export async function updatePage(id: string, input: Partial<PageContentRecord>, actor = "owner") {
  const store = await readStore();
  const index = store.pages.findIndex((page) => page.id === id);
  if (index === -1) return null;

  const previous = store.pages[index];
  const page: PageContentRecord = {
    ...previous,
    ...input,
    sectionCount: Number(input.sectionCount ?? previous.sectionCount) || previous.sectionCount,
    missingAltCount: Number(input.missingAltCount ?? previous.missingAltCount) || 0,
    editableSlots: Array.isArray(input.editableSlots) ? input.editableSlots : previous.editableSlots,
    lastReviewedAt: now(),
    updatedAt: now(),
  };

  store.pages[index] = page;
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "edit",
    entityType: "page",
    entityId: page.id,
    message: `Updated page inventory: ${page.title}`,
    createdAt: now(),
  });
  await writeStore(store);
  return page;
}

export async function deletePage(id: string, actor = "owner") {
  const store = await readStore();
  const page = store.pages.find((item) => item.id === id);
  store.pages = store.pages.filter((item) => item.id !== id);
  if (page) {
    store.activity.unshift({
      id: randomUUID(),
      actor,
      action: "delete",
      entityType: "page",
      entityId: id,
      message: `Deleted page inventory record: ${page.title}`,
      createdAt: now(),
    });
  }
  await writeStore(store);
}

export async function addDeploymentLog(input: Omit<DeploymentLogRecord, "id" | "createdAt">, actor = "owner") {
  const store = await readStore();
  const log: DeploymentLogRecord = { id: randomUUID(), createdAt: now(), ...input };
  store.deployments.unshift(log);
  store.deployments = store.deployments.slice(0, 100);
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: input.action,
    entityType: "deployment",
    entityId: log.id,
    message: input.message,
    createdAt: now(),
  });
  await writeStore(store);
  return log;
}

export async function addVerificationLog(input: Omit<VerificationLogRecord, "id" | "checkedAt">) {
  const store = await readStore();
  const log: VerificationLogRecord = { id: randomUUID(), checkedAt: now(), ...input };
  store.verifications.unshift(log);
  store.verifications = store.verifications.slice(0, 200);
  await writeStore(store);
  return log;
}

export async function addAnalyticsSnapshot(input: Omit<AnalyticsSnapshot, "id" | "capturedAt">) {
  const store = await readStore();
  const snapshot: AnalyticsSnapshot = { id: randomUUID(), capturedAt: now(), ...input };
  store.analytics.unshift(snapshot);
  store.analytics = store.analytics.slice(0, 1000);
  await writeStore(store);
  return snapshot;
}

export async function replaceAnalyticsSnapshots(
  source: AnalyticsSnapshot["source"],
  inputs: Omit<AnalyticsSnapshot, "id" | "capturedAt">[],
  actor = "automation"
) {
  const store = await readStore();
  const capturedAt = now();
  const snapshots = inputs.map((input) => ({ id: randomUUID(), capturedAt, ...input }));
  store.analytics = [...snapshots, ...store.analytics.filter((item) => item.source !== source)].slice(0, 1000);
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "sync",
    entityType: "analytics",
    message: `Replaced ${source} analytics snapshot(s): ${snapshots.length}.`,
    createdAt: capturedAt,
  });
  store.activity = store.activity.slice(0, 500);
  await writeStore(store);
  return snapshots.length;
}

export async function addLeadEvent(input: Omit<LeadEventRecord, "id" | "createdAt">) {
  const store = await readStore();
  const event: LeadEventRecord = { id: randomUUID(), createdAt: now(), ...input };
  store.leadEvents.unshift(event);
  store.leadEvents = store.leadEvents.slice(0, 2000);

  const isWhatsApp = /whatsapp|wa\.me/i.test(`${input.event} ${input.targetUrl} ${input.label}`);
  const isContact = /contact|proposal|consultation|call|book/i.test(`${input.event} ${input.targetUrl} ${input.label}`);
  store.analytics.unshift({
    id: randomUUID(),
    source: "first_party",
    pagePath: input.pagePath || "/",
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: 0,
    sessions: 0,
    users: 0,
    engagementRate: 0,
    scrollDepth: 0,
    ctaClicks: isContact || isWhatsApp ? 1 : 0,
    contactClicks: isWhatsApp ? 1 : isContact ? 1 : 0,
    capturedAt: now(),
  });
  store.analytics = store.analytics.slice(0, 1000);
  await writeStore(store);
  return event;
}

export async function updateSettings(settings: Partial<AdminSettings>, actor = "owner") {
  const store = await readStore();
  store.settings = { ...store.settings, ...settings, updatedAt: now() };
  store.activity.unshift({
    id: randomUUID(),
    actor,
    action: "settings",
    entityType: "settings",
    message: "Updated admin settings",
    createdAt: now(),
  });
  await writeStore(store);
  return store.settings;
}
