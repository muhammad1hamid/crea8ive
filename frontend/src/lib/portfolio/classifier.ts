import type {
  DriveFile,
  PortfolioAsset,
  PortfolioAssetCategory,
  PortfolioAssetType,
  PortfolioProject,
  PortfolioStats,
} from "./types";

const FOLDER_MIME = "application/vnd.google-apps.folder";

const categoryRules: Array<[PortfolioAssetCategory, RegExp]> = [
  ["brand-assets", /\b(branding|brand assets|brand)\b/i],
  ["logos", /\b(logo|logomark|wordmark|favicon|brandmark)\b/i],
  ["guidelines", /\b(guideline|brand book|brandbook|style guide|identity manual)\b/i],
  ["brand-identity", /\b(identity|stationery|business card|letterhead|palette|typography|mockup)\b/i],
  ["social-media", /\b(social media)\b/i],
  ["instagram-posts", /\b(instagram|ig|post|feed|carousel|square)\b/i],
  ["reels", /\b(reel|short|vertical video|9x16)\b/i],
  ["stories", /\b(story|stories|status)\b/i],
  ["facebook", /\b(facebook|fb)\b/i],
  ["linkedin", /\b(linkedin|linked in)\b/i],
  ["google-business", /\b(gbp|gmb|google business|google business performance|google business graph|maps|review|ranking|local seo)\b/i],
  ["seo", /\b(seo|organic|keyword|ranking|search optimization|search console|serp|technical audit)\b/i],
  ["meta-ads", /\b(meta|facebook ads|instagram ads|ad creative|campaign|ads manager)\b/i],
  ["google-ads", /\b(google ads|ppc|search ads|display ads|performance max|pmax)\b/i],
  ["analytics", /\b(analytics|ga4|looker|dashboard|reporting|utm|conversion)\b/i],
  ["videos", /\b(video|motion|animation|promo|film|render)\b/i],
  ["photography", /\b(photo|shoot|photography|portrait|product|interior|exterior)\b/i],
  ["website", /\b(website|web|landing page|ui|ux|figma|homepage|screenshot)\b/i],
  ["print", /\b(print|brochure|flyer|poster|menu|catalog|billboard)\b/i],
  ["presentations", /\b(deck|presentation|pitch|proposal|slides)\b/i],
  ["reports", /\b(report|audit|results|portfolio highlights|client feedback|performance|insights|monthly|weekly)\b/i],
  ["documents", /\b(doc|brief|copy|content|contract|notes|strategy)\b/i],
];

const serviceRules: Array<[string, RegExp]> = [
  ["Brand Strategy", /\b(strategy|positioning|discovery|brand)\b/i],
  ["Brand Identity", /\b(logo|identity|guideline|palette|typography|mockup)\b/i],
  ["Website Development", /\b(website|landing|web|ui|ux|figma|screenshot)\b/i],
  ["SEO", /\b(seo|keyword|ranking|organic|search optimization|search console|serp)\b/i],
  ["Google Business Profile", /\b(gbp|gmb|google business|maps|review)\b/i],
  ["Meta Ads", /\b(meta|facebook ads|instagram ads|ads manager)\b/i],
  ["Google Ads", /\b(google ads|ppc|pmax|search ads|display ads)\b/i],
  ["Social Media Management", /\b(instagram|facebook|linkedin|social|post|story|reel)\b/i],
  ["Content Creation", /\b(content|caption|creative|carousel|copy)\b/i],
  ["Photography", /\b(photo|photography|shoot|portrait|product)\b/i],
  ["Video Production", /\b(video|reel|motion|animation|promo)\b/i],
  ["Creative Direction", /\b(creative direction|art direction|campaign|concept)\b/i],
  ["Analytics", /\b(analytics|dashboard|report|conversion|ga4)\b/i],
  ["Print Design", /\b(print|brochure|flyer|poster|menu|catalog)\b/i],
];

const industryRules: Array<[string, RegExp]> = [
  ["Healthcare", /\b(clinic|doctor|dental|dentist|medical|aesthetic|health|hospital|patient|smile)\b/i],
  ["Real Estate", /\b(real estate|property|realtor|developer|builder|housing)\b/i],
  ["Architecture", /\b(architect|architecture|interior|construction|design studio)\b/i],
  ["Food & Beverage", /\b(restaurant|cafe|food|kitchen|bakery|menu|ghiza)\b/i],
  ["Retail", /\b(retail|store|shop|fashion|ecommerce|e-commerce|fabric|tailor|liquid)\b/i],
  ["Education", /\b(school|college|academy|course|education|training)\b/i],
  ["Corporate", /\b(corporate|company|enterprise|consulting|b2b)\b/i],
  ["Beauty & Wellness", /\b(salon|spa|beauty|wellness|skin|hair)\b/i],
  ["Technology", /\b(software|saas|app|technology|tech|portal)\b/i],
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function classifyAssetType(file: DriveFile): PortfolioAssetType {
  if (file.mimeType === FOLDER_MIME) return "folder";
  if (file.mimeType.startsWith("image/")) return "image";
  if (file.mimeType.startsWith("video/")) return "video";
  if (file.mimeType === "application/pdf") return "pdf";
  if (file.mimeType.includes("spreadsheet") || file.mimeType.includes("excel")) return "spreadsheet";
  if (file.mimeType.includes("presentation") || file.mimeType.includes("powerpoint")) return "presentation";
  if (file.mimeType.includes("document") || file.mimeType.includes("wordprocessingml")) return "document";
  if (/\.(zip|rar|7z|ai|psd|sketch|fig)$/i.test(file.name)) return file.name.match(/\.(ai|psd|sketch|fig)$/i) ? "design" : "archive";
  if (/^https?:\/\//i.test(file.name)) return "link";
  return "unknown";
}

export function classifyAssetCategory(file: DriveFile, path: string[] = []): PortfolioAssetCategory {
  const haystack = `${path.join(" ")} ${file.name} ${file.description ?? ""}`;
  for (const [category, rule] of categoryRules) {
    if (rule.test(haystack)) return category;
  }

  const type = classifyAssetType(file);
  if (type === "image") return "photography";
  if (type === "video") return "videos";
  if (type === "pdf") return "reports";
  if (type === "presentation") return "presentations";
  if (type === "document" || type === "spreadsheet") return "documents";
  return "downloads";
}

export function toPortfolioAsset(file: DriveFile, path: string[] = []): PortfolioAsset {
  const type = classifyAssetType(file);
  const previewUrl =
    type === "image" || type === "video"
      ? `/api/portfolio/asset?id=${encodeURIComponent(file.id)}&mode=preview`
      : file.thumbnailLink ?? file.webViewLink ?? `/api/portfolio/asset?id=${encodeURIComponent(file.id)}&mode=preview`;

  return {
    id: file.id,
    name: file.name,
    slug: slugify(file.name.replace(/\.[a-z0-9]+$/i, "")) || file.id,
    mimeType: file.mimeType,
    type,
    category: classifyAssetCategory(file, path),
    webViewLink: file.webViewLink,
    webContentLink: file.webContentLink,
    thumbnailLink: file.thumbnailLink,
    previewUrl,
    downloadUrl: `/api/portfolio/asset?id=${encodeURIComponent(file.id)}&mode=download`,
    description: file.description,
    size: file.size ? Number(file.size) : undefined,
    width: file.imageMediaMetadata?.width ?? file.videoMediaMetadata?.width,
    height: file.imageMediaMetadata?.height ?? file.videoMediaMetadata?.height,
    durationMillis: file.videoMediaMetadata?.durationMillis ? Number(file.videoMediaMetadata.durationMillis) : undefined,
    createdTime: file.createdTime,
    modifiedTime: file.modifiedTime,
    path,
  };
}

export function inferServices(files: DriveFile[], folderName: string) {
  const haystack = `${folderName} ${files.map((file) => `${file.name} ${file.description ?? ""}`).join(" ")}`;
  const services = serviceRules.filter(([, rule]) => rule.test(haystack)).map(([service]) => service);
  return services.length ? services : ["Brand Strategy", "Creative Direction", "Social Media Management"];
}

export function inferIndustry(files: DriveFile[], folderName: string) {
  const haystack = `${folderName} ${files.map((file) => `${file.name} ${file.description ?? ""}`).join(" ")}`;
  return industryRules.find(([, rule]) => rule.test(haystack))?.[0] ?? "Growth & Digital Commerce";
}

export function inferBrandColors(projectId: string, assets: PortfolioAsset[]) {
  const logo = assets.find((asset) => asset.category === "logos");
  const seed = `${projectId}${logo?.name ?? ""}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  const secondary = (hue + 36) % 360;
  const tertiary = (hue + 212) % 360;
  return [`hsl(${hue} 78% 56%)`, `hsl(${secondary} 90% 62%)`, `hsl(${tertiary} 72% 64%)`];
}

export function buildPortfolioProject(folder: DriveFile, childFiles: DriveFile[]): PortfolioProject {
  const assets = childFiles
    .map((file) => toPortfolioAsset(file, [folder.name]))
    .sort((a, b) => scoreAsset(b) - scoreAsset(a));

  const services = inferServices(childFiles, folder.name);
  const industry = inferIndustry(childFiles, folder.name);
  const assetCounts = assets.reduce<Record<string, number>>((counts, asset) => {
    counts[asset.category] = (counts[asset.category] ?? 0) + 1;
    counts[asset.type] = (counts[asset.type] ?? 0) + 1;
    return counts;
  }, {});

  const title = folder.name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  const gallery = assets.filter((asset) => ["image", "video", "pdf", "presentation"].includes(asset.type)).slice(0, 72);
  const logoAsset = assets.find((asset) => asset.category === "logos" && asset.type === "image");
  const heroAsset =
    assets.find((asset) => asset.category === "website" && asset.type === "image") ??
    assets.find((asset) => asset.type === "image" && asset.category !== "logos") ??
    logoAsset ??
    gallery[0];

  const platforms = derivePlatforms(assets);
  const deliverables = deriveDeliverables(assets, services);
  const kpis = deriveKpis(assetCounts, services);
  const results = deriveResults(assetCounts, services);
  const searchText = [
    title,
    industry,
    services.join(" "),
    platforms.join(" "),
    deliverables.join(" "),
    assets.map((asset) => asset.name).join(" "),
  ].join(" ").toLowerCase();

  return {
    id: folder.id,
    folderId: folder.id,
    slug: slugify(title),
    title,
    industry,
    country: inferCountry(childFiles),
    year: inferYear(childFiles, folder.modifiedTime),
    brandColors: inferBrandColors(folder.id, assets),
    services,
    platforms,
    summary: `A complete ${services.slice(0, 3).join(", ").toLowerCase()} engagement for ${title}, built from ${assets.length} live Drive item${assets.length === 1 ? "" : "s"} and structured into a conversion-ready digital case study.`,
    challenge: `The visible asset mix shows a brand that needed coherent creative systems across ${platforms.slice(0, 4).join(", ") || "digital channels"}. Crea8iv Media organized the scattered inputs into a cleaner growth narrative, stronger presentation layer, and measurable marketing engine.`,
    objectives: deriveObjectives(services),
    strategy: `We mapped the available brand, content, website, advertising, and reporting assets into one operating system: clarify the offer, sharpen visual memory, build platform-native creative, measure performance, and keep optimization loops visible.`,
    creativeDirection: `The creative system balances premium restraint with high-contrast campaign energy. Visual assets are arranged around brand recognition, scroll-stopping social formats, clean proof points, and polished conversion moments.`,
    deliverables,
    timeline: deriveTimeline(assets),
    results,
    kpis,
    assetCounts,
    heroAsset,
    logoAsset,
    assets,
    gallery,
    downloads: assets.filter((asset) => ["pdf", "document", "spreadsheet", "presentation", "archive", "design"].includes(asset.type)),
    searchText,
    createdTime: folder.createdTime,
    modifiedTime: folder.modifiedTime,
  };
}

export function calculatePortfolioStats(projects: PortfolioProject[]): PortfolioStats {
  const sum = (selector: (project: PortfolioProject) => number) => projects.reduce((total, project) => total + selector(project), 0);
  return {
    projectsCompleted: projects.length,
    campaigns: sum((project) => (project.services.some((service) => service.includes("Ads")) ? 1 : 0) + (project.assetCounts["meta-ads"] ?? 0) + (project.assetCounts["google-ads"] ?? 0)),
    socialPosts: sum((project) => (project.assetCounts["social-media"] ?? 0) + (project.assetCounts["instagram-posts"] ?? 0) + (project.assetCounts.stories ?? 0) + (project.assetCounts.facebook ?? 0) + (project.assetCounts.linkedin ?? 0)),
    videos: sum((project) => (project.assetCounts.videos ?? 0) + (project.assetCounts.video ?? 0)),
    brands: projects.filter((project) => project.services.some((service) => service.includes("Brand")) || project.logoAsset).length,
    industries: new Set(projects.map((project) => project.industry)).size,
    countries: new Set(projects.map((project) => project.country)).size,
    reports: sum((project) => (project.assetCounts.reports ?? 0) + (project.assetCounts.pdf ?? 0)),
    websites: projects.filter((project) => project.services.includes("Website Development") || project.assetCounts.website).length,
    creativeAssets: sum((project) => project.assets.length),
    adSystems: projects.filter((project) => project.services.includes("Meta Ads") || project.services.includes("Google Ads")).length,
    organicSystems: projects.filter((project) => project.services.includes("SEO") || project.services.includes("Google Business Profile")).length,
  };
}

function scoreAsset(asset: PortfolioAsset) {
  let score = 0;
  if (asset.type === "image") score += 40;
  if (asset.type === "video") score += 38;
  if (asset.category === "website") score += 30;
  if (asset.category === "brand-identity") score += 22;
  if (asset.category === "logos") score += 18;
  if (asset.category === "reports") score += 10;
  if (/hero|cover|featured|mockup|website|homepage/i.test(asset.name)) score += 24;
  if (asset.width && asset.height && asset.width > asset.height) score += 10;
  return score;
}

function derivePlatforms(assets: PortfolioAsset[]) {
  const map: Array<[string, RegExp]> = [
    ["Instagram", /instagram|ig|reel|story/i],
    ["Facebook", /facebook|fb|meta/i],
    ["Google", /google|gbp|gmb|maps|seo|search/i],
    ["LinkedIn", /linkedin/i],
    ["Website", /website|landing|ui|ux/i],
    ["YouTube", /youtube|yt|video/i],
  ];
  const text = assets.map((asset) => `${asset.name} ${asset.category}`).join(" ");
  const platforms = map.filter(([, rule]) => rule.test(text)).map(([platform]) => platform);
  return platforms.length ? platforms : ["Digital", "Social", "Search"];
}

function deriveDeliverables(assets: PortfolioAsset[], services: string[]) {
  const deliverables = new Set<string>();
  if (services.includes("Brand Identity")) deliverables.add("Logo system and brand identity assets");
  if (services.includes("Website Development")) deliverables.add("Website visuals, UI direction, and conversion sections");
  if (services.includes("SEO")) deliverables.add("SEO audits, keyword direction, and organic growth reporting");
  if (services.includes("Google Business Profile")) deliverables.add("Google Business Profile optimization assets");
  if (services.includes("Meta Ads")) deliverables.add("Meta Ads campaign creative and performance reporting");
  if (services.includes("Google Ads")) deliverables.add("Google Ads campaign structure and reporting");
  if (services.includes("Social Media Management")) deliverables.add("Platform-native posts, reels, stories, and content calendars");
  if (assets.some((asset) => asset.type === "video" || asset.category === "videos")) deliverables.add("Motion and video creative");
  if (assets.some((asset) => asset.type === "presentation")) deliverables.add("Presentation and pitch materials");
  if (assets.some((asset) => asset.type === "pdf")) deliverables.add("Downloadable reports and proof assets");
  return Array.from(deliverables).slice(0, 10);
}

function deriveObjectives(services: string[]) {
  const objectives = new Set<string>([
    "Create a premium, consistent brand presence across customer touchpoints",
    "Turn creative assets into a measurable growth system",
  ]);
  if (services.includes("SEO")) objectives.add("Improve organic visibility and keyword authority");
  if (services.includes("Google Business Profile")) objectives.add("Strengthen local discovery, maps visibility, and trust signals");
  if (services.includes("Meta Ads") || services.includes("Google Ads")) objectives.add("Increase qualified lead flow while preserving creative quality");
  if (services.includes("Website Development")) objectives.add("Build a sharper digital destination for conversion and credibility");
  if (services.includes("Social Media Management")) objectives.add("Make the brand more recognizable, active, and memorable on social platforms");
  return Array.from(objectives);
}

function deriveKpis(assetCounts: Record<string, number>, services: string[]) {
  const kpis = [
    { label: "Creative assets", value: String(Object.values(assetCounts).reduce((a, b) => a + b, 0)), context: "Classified files in the client Drive folder" },
  ];
  if (services.includes("SEO")) kpis.push({ label: "Organic system", value: "SEO", context: "Search assets and reports detected" });
  if (services.includes("Google Business Profile")) kpis.push({ label: "Local visibility", value: "GBP", context: "Google Business evidence detected" });
  if (services.includes("Meta Ads") || services.includes("Google Ads")) kpis.push({ label: "Paid growth", value: "Active", context: "Advertising assets or reports detected" });
  if (assetCounts.video) kpis.push({ label: "Video assets", value: String(assetCounts.video), context: "Motion and video files classified" });
  return kpis.slice(0, 6);
}

function deriveResults(assetCounts: Record<string, number>, services: string[]) {
  const results = ["Unified the work into a reusable brand and performance case-study system"];
  if (assetCounts["instagram-posts"] || assetCounts.reels || assetCounts.stories) results.push("Expanded the social content library with platform-specific creative formats");
  if (services.includes("SEO")) results.push("Documented organic growth opportunities through SEO and reporting assets");
  if (services.includes("Google Business Profile")) results.push("Strengthened local proof through Google Business Profile and review-led visibility assets");
  if (services.includes("Meta Ads") || services.includes("Google Ads")) results.push("Created a clearer paid media story across campaigns, creative, and reporting");
  if (services.includes("Website Development")) results.push("Improved the brand's conversion environment with web and interface assets");
  return results;
}

function deriveTimeline(assets: PortfolioAsset[]) {
  const dates = assets.map((asset) => asset.modifiedTime ?? asset.createdTime).filter(Boolean).sort() as string[];
  if (dates.length < 2) return "Ongoing growth engagement";
  const start = new Date(dates[0]);
  const end = new Date(dates[dates.length - 1]);
  const months = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)));
  return months <= 1 ? "Intensive launch sprint" : `${months}-month growth arc`;
}

function inferCountry(files: DriveFile[]) {
  const text = files.map((file) => file.name).join(" ");
  if (/\b(dubai|uae|emirates)\b/i.test(text)) return "United Arab Emirates";
  if (/\b(usa|united states|new york|california|texas)\b/i.test(text)) return "United States";
  if (/\b(uk|london|england|britain)\b/i.test(text)) return "United Kingdom";
  return "Pakistan";
}

function inferYear(files: DriveFile[], fallback?: string) {
  const years = files
    .flatMap((file) => [file.name.match(/\b(20\d{2})\b/)?.[1], file.modifiedTime?.slice(0, 4), file.createdTime?.slice(0, 4)])
    .filter(Boolean) as string[];
  return years.sort().at(-1) ?? fallback?.slice(0, 4) ?? String(new Date().getFullYear());
}
