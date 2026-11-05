import type { AdminStore, AnalyticsSnapshot, BlogPostRecord, PageContentRecord } from "@/lib/admin/types";

export type OperatingStatus = "excellent" | "good" | "warning" | "critical";

export type OperatingScoreCategory = {
  id: string;
  label: string;
  score: number;
  weight: number;
  status: OperatingStatus;
  summary: string;
};

export type AdminTask = {
  id: string;
  title: string;
  detail: string;
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  scoreImpact: number;
  href: string;
  status: "open" | "complete" | "blocked";
};

export type IntegrationStatus = {
  id: string;
  label: string;
  value: string;
  category: "analytics" | "ads" | "lead" | "social" | "system";
  connected: boolean;
  state: "missing" | "configured" | "receiving";
  href: string;
};

export type PageHealth = {
  page: PageContentRecord;
  score: number;
  weightKb: number;
  status: OperatingStatus;
  issue: string;
};

export type BlogPipelineItem = {
  blog: BlogPostRecord;
  readiness: OperatingStatus;
  missing: string[];
};

function statusFromScore(score: number): OperatingStatus {
  if (score >= 90) return "excellent";
  if (score >= 75) return "good";
  if (score >= 55) return "warning";
  return "critical";
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function hasValue(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function category(id: string, label: string, score: number, weight: number, summary: string): OperatingScoreCategory {
  return {
    id,
    label,
    score: clampScore(score),
    weight,
    status: statusFromScore(score),
    summary,
  };
}

function addTask(tasks: AdminTask[], task: AdminTask) {
  tasks.push(task);
}

function getMissingBlogItems(blog: BlogPostRecord) {
  const missing: string[] = [];
  if (blog.score.checks.some((check) => check.status === "fail")) missing.push("SEO fixes");
  if (!blog.thumbnailUrl) missing.push("Thumbnail");
  if (!blog.schemaTypes.includes("BlogPosting")) missing.push("Schema");
  if (blog.internalLinks.length < 3) missing.push("Internal links");
  if (!blog.metaDescription) missing.push("Meta description");
  if (!blog.focusKeyword) missing.push("Focus keyword");
  return missing;
}

function getPageHealth(page: PageContentRecord): PageHealth {
  const reviewPenalty = page.status === "live" ? 0 : 20;
  const altPenalty = Math.min(25, page.missingAltCount * 8);
  const slotPenalty = page.editableSlots.length < 4 ? 8 : 0;
  const ctaPenalty = page.primaryCtaHref ? 0 : 10;
  const seoPenalty = page.seoTitle && page.metaDescription && page.h1 ? 0 : 18;
  const score = clampScore(100 - reviewPenalty - altPenalty - slotPenalty - ctaPenalty - seoPenalty);
  const weightKb = Math.max(42, page.sectionCount * 18 + page.editableSlots.length * 4 + page.missingAltCount * 22);
  const issue =
    page.status !== "live"
      ? "Needs content/design review"
      : page.missingAltCount > 0
        ? "Image alt text needs cleanup"
        : score < 90
          ? "Review page metadata and conversion slots"
          : "Healthy";

  return {
    page,
    score,
    weightKb,
    status: statusFromScore(score),
    issue,
  };
}

export function buildAdminOperatingSystem(store: AdminStore) {
  const published = store.blogs.filter((blog) => blog.status === "published");
  const drafts = store.blogs.filter((blog) => blog.status === "draft");
  const scheduledBlogs = store.blogs.filter((blog) => blog.status === "scheduled");
  const openCalendar = store.calendar.filter((item) => !item.published && item.status !== "blocked");
  const overdueCalendar = openCalendar.filter((item) => +new Date(item.scheduledAt) < Date.now());
  const blockedCalendar = store.calendar.filter((item) => item.status === "blocked");
  const missingSeo = store.blogs.filter((blog) => blog.score.checks.some((check) => check.status === "fail"));
  const missingThumb = store.blogs.filter((blog) => !blog.thumbnailUrl);
  const missingSchema = store.blogs.filter((blog) => !blog.schemaTypes.includes("BlogPosting"));
  const missingInternalLinks = store.blogs.filter((blog) => blog.internalLinks.length < 3);
  const pageHealth = store.pages.map(getPageHealth).sort((a, b) => a.score - b.score);
  const weakPages = pageHealth.filter((item) => item.score < 90);
  const leadEvents = store.leadEvents.filter((item) => /whatsapp|wa\.me|contact|proposal/i.test(`${item.event} ${item.targetUrl} ${item.label}`));
  const hasAnalyticsSource = (source: AnalyticsSnapshot["source"]) => store.analytics.some((item) => item.source === source);
  const hasWhatsAppLead = store.leadEvents.some((item) => /whatsapp|wa\.me/i.test(`${item.event} ${item.targetUrl} ${item.label}`));
  const integrationState = (configured: boolean, receiving = false): IntegrationStatus["state"] => {
    if (!configured) return "missing";
    return receiving ? "receiving" : "configured";
  };

  const integrations: IntegrationStatus[] = [
    { id: "gsc", label: "Google Search Console", value: store.settings.searchConsoleProperty, category: "analytics", connected: hasValue(store.settings.searchConsoleProperty), state: integrationState(hasValue(store.settings.searchConsoleProperty), hasAnalyticsSource("search_console")), href: "/admin/settings#tracking" },
    { id: "ga4", label: "GA4 property", value: store.settings.ga4PropertyId || store.settings.ga4MeasurementId, category: "analytics", connected: hasValue(store.settings.ga4PropertyId) || hasValue(store.settings.ga4MeasurementId), state: integrationState(hasValue(store.settings.ga4PropertyId) || hasValue(store.settings.ga4MeasurementId), hasAnalyticsSource("ga4")), href: "/admin/settings#tracking" },
    { id: "gtm", label: "Google Tag Manager", value: store.settings.googleTagManagerId, category: "analytics", connected: hasValue(store.settings.googleTagManagerId), state: integrationState(hasValue(store.settings.googleTagManagerId)), href: "/admin/settings#tracking" },
    { id: "meta", label: "Meta Pixel", value: store.settings.metaPixelId, category: "ads", connected: hasValue(store.settings.metaPixelId), state: integrationState(hasValue(store.settings.metaPixelId)), href: "/admin/settings#tracking" },
    { id: "clarity", label: "Microsoft Clarity", value: store.settings.microsoftClarityProjectId, category: "analytics", connected: hasValue(store.settings.microsoftClarityProjectId), state: integrationState(hasValue(store.settings.microsoftClarityProjectId)), href: "/admin/settings#tracking" },
    { id: "whatsapp", label: "WhatsApp lead route", value: store.settings.whatsappNumber, category: "lead", connected: hasValue(store.settings.whatsappNumber), state: integrationState(hasValue(store.settings.whatsappNumber), hasWhatsAppLead), href: "/admin/settings#lead-paths" },
    { id: "gbp", label: "Google Business Profile", value: store.settings.googleBusinessProfileUrl, category: "social", connected: hasValue(store.settings.googleBusinessProfileUrl), state: integrationState(hasValue(store.settings.googleBusinessProfileUrl)), href: "/admin/settings#lead-paths" },
    { id: "linkedin", label: "LinkedIn", value: store.settings.linkedinUrl, category: "social", connected: hasValue(store.settings.linkedinUrl), state: integrationState(hasValue(store.settings.linkedinUrl)), href: "/admin/settings#lead-paths" },
    { id: "database", label: "Persistent database", value: store.settings.databaseStatus, category: "system", connected: store.settings.databaseStatus === "connected", state: store.settings.databaseStatus === "connected" ? "receiving" : "missing", href: "/admin/settings#database" },
    { id: "deploy", label: "Deploy webhook", value: store.settings.deployWebhookUrl, category: "system", connected: hasValue(store.settings.deployWebhookUrl), state: integrationState(hasValue(store.settings.deployWebhookUrl)), href: "/admin/settings#system" },
  ];
  const connectedIntegrations = integrations.filter((item) => item.connected).length;
  const trackingScore = (connectedIntegrations / integrations.length) * 100;
  const seoScore = 100 - Math.min(80, missingSeo.length * 4 + missingSchema.length * 3 + weakPages.length * 3);
  const aiScore = 100 - Math.min(75, missingSchema.length * 5 + missingInternalLinks.length * 3 + missingSeo.length * 2);
  const contentScore = 100 - Math.min(80, drafts.length * 2 + overdueCalendar.length * 10 + blockedCalendar.length * 8 + missingThumb.length * 2);
  const mediaScore = 100 - Math.min(80, missingThumb.length * 4 + store.pages.reduce((total, page) => total + page.missingAltCount, 0) * 5);
  const conversionScore = 100 - Math.min(70, (hasValue(store.settings.whatsappNumber) ? 0 : 25) + (leadEvents.length ? 0 : 10) + weakPages.length * 3);
  const opsScore = 100 - Math.min(80, (store.settings.databaseStatus === "connected" ? 0 : 24) + (hasValue(store.settings.deployWebhookUrl) ? 0 : 18) + (store.deployments[0]?.status === "failed" ? 25 : 0));

  const categories = [
    category("tracking", "Tracking and connections", trackingScore, 15, `${connectedIntegrations}/${integrations.length} connection cards ready`),
    category("seo", "SEO and index health", seoScore, 20, `${missingSeo.length} posts need SEO fixes, ${weakPages.length} pages need review`),
    category("ai", "AI visibility", aiScore, 15, "Schema, answer blocks, internal links, and entity signals"),
    category("content", "Content pipeline", contentScore, 15, `${published.length} published, ${scheduledBlogs.length + openCalendar.length} scheduled/planned`),
    category("media", "Media and performance", mediaScore, 15, `${missingThumb.length} posts missing thumbnails`),
    category("conversion", "Lead conversion", conversionScore, 10, `${leadEvents.length} tracked lead event(s)`),
    category("ops", "Security and deployment", opsScore, 10, `${store.settings.databaseStatus.replace("_", " ")} database, ${store.deployments[0]?.status || "ready"} deploy state`),
  ];

  const overallScore = clampScore(categories.reduce((total, item) => total + item.score * (item.weight / 100), 0));
  const tasks: AdminTask[] = [];

  integrations.filter((item) => !item.connected).forEach((item) => {
    addTask(tasks, {
      id: `connect-${item.id}`,
      title: `Connect ${item.label}`,
      detail: "Add this value in Settings so the dashboard can stop guessing and start reporting real signals.",
      category: item.category,
      priority: item.id === "database" || item.id === "gsc" || item.id === "ga4" ? "high" : "medium",
      scoreImpact: item.id === "database" ? 8 : 4,
      href: item.href,
      status: "open",
    });
  });

  if (missingSeo.length) {
    addTask(tasks, {
      id: "fix-blog-seo-fields",
      title: `Fix SEO fields on ${missingSeo.length} blog post(s)`,
      detail: "Open the SEO queue, repair missing metadata, and keep every article publish-ready for search and AI answers.",
      category: "seo",
      priority: "critical",
      scoreImpact: Math.min(12, missingSeo.length),
      href: "/admin/seo",
      status: "open",
    });
  }

  if (!openCalendar.length) {
    addTask(tasks, {
      id: "schedule-editorial-roadmap",
      title: "Schedule the next SEO growth topics",
      detail: "Add the next AI search, local SEO, website, ads, and authority posts into the editorial calendar.",
      category: "content",
      priority: "high",
      scoreImpact: 6,
      href: "/admin/calendar",
      status: "open",
    });
  }

  if (overdueCalendar.length) {
    addTask(tasks, {
      id: "clear-overdue-calendar",
      title: `Resolve ${overdueCalendar.length} overdue calendar item(s)`,
      detail: "Create drafts, add thumbnails, publish, or mark blocked with an exact reason.",
      category: "content",
      priority: "critical",
      scoreImpact: 8,
      href: "/admin/calendar",
      status: "open",
    });
  }

  if (weakPages.length) {
    addTask(tasks, {
      id: "review-public-pages",
      title: `Review ${weakPages.length} public page(s)`,
      detail: "Upgrade copy, page assets, CTA coverage, SEO metadata, and image alt text from the page control center.",
      category: "pages",
      priority: "high",
      scoreImpact: Math.min(10, weakPages.length),
      href: "/admin/pages",
      status: "open",
    });
  }

  if (missingThumb.length) {
    addTask(tasks, {
      id: "create-blog-thumbnails",
      title: `Create ${missingThumb.length} missing blog thumbnail(s)`,
      detail: "Every strategic post needs a custom 1280x720 WebP thumbnail before it is treated as complete.",
      category: "media",
      priority: "high",
      scoreImpact: Math.min(8, missingThumb.length),
      href: "/admin/media",
      status: "open",
    });
  }

  const sortedTasks = tasks.sort((a, b) => {
    const rank = { critical: 0, high: 1, medium: 2, low: 3 };
    return rank[a.priority] - rank[b.priority] || b.scoreImpact - a.scoreImpact;
  });

  const pipeline = store.blogs.map((blog): BlogPipelineItem => {
    const missing = getMissingBlogItems(blog);
    return {
      blog,
      missing,
      readiness: statusFromScore(blog.score.overall - missing.length * 5),
    };
  });

  return {
    overallScore,
    status: statusFromScore(overallScore),
    categories,
    tasks: sortedTasks,
    integrations,
    pageHealth,
    pipeline,
    stats: {
      published: published.length,
      drafts: drafts.length,
      scheduled: scheduledBlogs.length + openCalendar.length,
      overdue: overdueCalendar.length,
      missingSeo: missingSeo.length,
      missingThumb: missingThumb.length,
      missingSchema: missingSchema.length,
      missingInternalLinks: missingInternalLinks.length,
      leadEvents: leadEvents.length,
      trackedPages: store.pages.length,
    },
  };
}
