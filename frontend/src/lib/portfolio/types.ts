import { z } from "zod";

export const portfolioAssetCategories = [
  "brand-assets",
  "logos",
  "guidelines",
  "brand-identity",
  "social-media",
  "instagram-posts",
  "reels",
  "stories",
  "facebook",
  "linkedin",
  "google-business",
  "seo",
  "meta-ads",
  "google-ads",
  "analytics",
  "videos",
  "photography",
  "website",
  "print",
  "reports",
  "presentations",
  "documents",
  "downloads",
] as const;

export const portfolioAssetTypes = [
  "folder",
  "image",
  "video",
  "pdf",
  "document",
  "spreadsheet",
  "presentation",
  "archive",
  "design",
  "link",
  "unknown",
] as const;

export const portfolioServices = [
  "Brand Strategy",
  "Brand Identity",
  "Website Development",
  "SEO",
  "Google Business Profile",
  "Meta Ads",
  "Google Ads",
  "Social Media Management",
  "Content Creation",
  "Photography",
  "Video Production",
  "Creative Direction",
  "Analytics",
  "Print Design",
] as const;

export const portfolioAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  mimeType: z.string(),
  type: z.enum(portfolioAssetTypes),
  category: z.enum(portfolioAssetCategories),
  webViewLink: z.string().url().optional(),
  webContentLink: z.string().url().optional(),
  thumbnailLink: z.string().url().optional(),
  previewUrl: z.string(),
  downloadUrl: z.string().optional(),
  description: z.string().optional(),
  size: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  durationMillis: z.number().optional(),
  createdTime: z.string().optional(),
  modifiedTime: z.string().optional(),
  path: z.array(z.string()).default([]),
});

export const portfolioKpiSchema = z.object({
  label: z.string(),
  value: z.string(),
  context: z.string(),
  source: z.string().optional(),
});

export const portfolioProjectSchema = z.object({
  id: z.string(),
  folderId: z.string(),
  slug: z.string(),
  title: z.string(),
  industry: z.string(),
  country: z.string(),
  year: z.string(),
  brandColors: z.array(z.string()),
  services: z.array(z.string()),
  platforms: z.array(z.string()),
  summary: z.string(),
  challenge: z.string(),
  objectives: z.array(z.string()),
  strategy: z.string(),
  creativeDirection: z.string(),
  deliverables: z.array(z.string()),
  timeline: z.string(),
  results: z.array(z.string()),
  kpis: z.array(portfolioKpiSchema),
  assetCounts: z.record(z.string(), z.number()),
  heroAsset: portfolioAssetSchema.optional(),
  logoAsset: portfolioAssetSchema.optional(),
  assets: z.array(portfolioAssetSchema),
  gallery: z.array(portfolioAssetSchema),
  downloads: z.array(portfolioAssetSchema),
  searchText: z.string(),
  createdTime: z.string().optional(),
  modifiedTime: z.string().optional(),
});

export const portfolioStatsSchema = z.object({
  projectsCompleted: z.number(),
  campaigns: z.number(),
  socialPosts: z.number(),
  videos: z.number(),
  brands: z.number(),
  industries: z.number(),
  countries: z.number(),
  reports: z.number(),
  websites: z.number(),
  creativeAssets: z.number(),
  adSystems: z.number(),
  organicSystems: z.number(),
});

export type PortfolioAssetCategory = (typeof portfolioAssetCategories)[number];
export type PortfolioAssetType = (typeof portfolioAssetTypes)[number];
export type PortfolioAsset = z.infer<typeof portfolioAssetSchema>;
export type PortfolioKpi = z.infer<typeof portfolioKpiSchema>;
export type PortfolioProject = z.infer<typeof portfolioProjectSchema>;
export type PortfolioStats = z.infer<typeof portfolioStatsSchema>;

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  description?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
  };
  videoMediaMetadata?: {
    width?: number;
    height?: number;
    durationMillis?: string;
  };
};
