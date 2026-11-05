export type AdminRole = "owner" | "admin";

export type BlogStatus = "draft" | "scheduled" | "published" | "unpublished";

export type SeoCheckSeverity = "pass" | "warning" | "fail";

export type SeoCheck = {
  id: string;
  label: string;
  status: SeoCheckSeverity;
  fix: string;
};

export type BlogScore = {
  overall: number;
  technical: number;
  contentQuality: number;
  aiVisibility: number;
  eeat: number;
  internalLinking: number;
  schema: number;
  media: number;
  readability: number;
  cro: number;
  checks: SeoCheck[];
};

export type PublishReadiness = {
  ready: boolean;
  score: number;
  passed: string[];
  warnings: string[];
  blockers: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CtaBlock = {
  label: string;
  href: string;
  context: string;
};

export type BlogPostRecord = {
  id: string;
  title: string;
  slug: string;
  status: BlogStatus;
  category: string;
  tags: string[];
  author: string;
  excerpt: string;
  markdown: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  aiSearchIntent: string;
  targetAudience: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  faqs: FaqItem[];
  ctas: CtaBlock[];
  internalLinks: string[];
  externalReferences: string[];
  relatedPostIds: string[];
  schemaTypes: string[];
  readingTimeMinutes: number;
  scheduledAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  score: BlogScore;
};

export type MediaAssetRecord = {
  id: string;
  fileName: string;
  publicUrl: string;
  altText: string;
  caption: string;
  mimeType: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

export type PageContentStatus = "live" | "needs_review" | "draft" | "blocked";

export type PageContentRecord = {
  id: string;
  title: string;
  path: string;
  template: "home" | "service" | "result" | "company" | "tool" | "blog_index" | "system";
  status: PageContentStatus;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  heroImageUrl: string;
  heroImageAlt: string;
  sectionCount: number;
  editableSlots: string[];
  missingAltCount: number;
  lastReviewedAt: string;
  updatedAt: string;
};

export type EditorialCalendarItem = {
  id: string;
  topic: string;
  slug: string;
  scheduledAt: string;
  status: "planned" | "draft_created" | "thumbnail_created" | "published" | "verified" | "blocked";
  draftCreated: boolean;
  thumbnailCreated: boolean;
  published: boolean;
  liveVerified: boolean;
  deploymentResult: "pending" | "success" | "failed" | "not_started";
  sitemapVerified: boolean;
  rssVerified: boolean;
  notes: string;
  blockers: string;
  blogId?: string;
  createdAt: string;
  updatedAt: string;
};

export type DeploymentLogRecord = {
  id: string;
  action: "build" | "deploy" | "verify" | "revalidate";
  status: "pending" | "success" | "failed";
  message: string;
  details: string[];
  createdAt: string;
};

export type VerificationLogRecord = {
  id: string;
  blogId?: string;
  url: string;
  target: "live_url" | "blog_index" | "sitemap" | "rss" | "thumbnail";
  status: "pass" | "fail";
  message: string;
  checkedAt: string;
};

export type AnalyticsSnapshot = {
  id: string;
  source: "search_console" | "ga4" | "first_party" | "manual";
  pagePath: string;
  query?: string;
  device?: string;
  country?: string;
  impressions: number;
  clicks: number;
  ctr: number;
  averagePosition: number;
  sessions: number;
  users: number;
  engagementRate: number;
  scrollDepth: number;
  ctaClicks: number;
  contactClicks: number;
  conversions?: number;
  capturedAt: string;
};

export type AnalyticsSyncSourceState = {
  status: "not_configured" | "ready" | "success" | "error";
  lastSyncedAt: string | null;
  rows: number;
  message: string;
};

export type AnalyticsSyncState = {
  gsc: AnalyticsSyncSourceState;
  ga4: AnalyticsSyncSourceState;
};

export type LeadEventRecord = {
  id: string;
  event: string;
  pagePath: string;
  targetUrl: string;
  location: string;
  label: string;
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  userAgent: string;
  createdAt: string;
};

export type ActivityLogRecord = {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId?: string;
  message: string;
  createdAt: string;
};

export type AdminSettings = {
  siteUrl: string;
  ownerEmail: string;
  deployCommand: string;
  deployWebhookUrl: string;
  searchConsoleProperty: string;
  ga4PropertyId: string;
  ga4MeasurementId: string;
  googleTagManagerId: string;
  metaPixelId: string;
  googleAdsConversionId: string;
  googleAdsConversionLabel: string;
  microsoftClarityProjectId: string;
  bingSiteVerification: string;
  whatsappNumber: string;
  googleBusinessProfileUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  xUrl: string;
  databaseProvider: "file" | "hostinger_mysql" | "postgres" | "supabase";
  databaseStatus: "not_connected" | "planned" | "connected";
  requiredSchemaTypes: string[];
  analyticsSync: AnalyticsSyncState;
  updatedAt: string;
};

export type AdminStore = {
  blogs: BlogPostRecord[];
  media: MediaAssetRecord[];
  pages: PageContentRecord[];
  calendar: EditorialCalendarItem[];
  deployments: DeploymentLogRecord[];
  verifications: VerificationLogRecord[];
  analytics: AnalyticsSnapshot[];
  leadEvents: LeadEventRecord[];
  activity: ActivityLogRecord[];
  settings: AdminSettings;
};
