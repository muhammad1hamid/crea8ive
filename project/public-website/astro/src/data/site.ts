export const SITE_URL = "https://crea8ivmedia.com";

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/crea8ivmedia",
  "https://www.facebook.com/crea8ivmedia",
  "https://www.tiktok.com/@crea8ivmedia",
  "https://www.youtube.com/@crea8ivmedia",
] as const;

export const PLATFORM_LINKS = [
  {
    label: "Clutch",
    href: "https://clutch.co/profile/crea8iv-media-marketing-agency-private",
    purpose: "Reviews",
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/Crea8ivmedia/",
    purpose: "Community",
  },
  {
    label: "GoodFirms",
    href: "https://www.goodfirms.co/company/crea8iv-media-marketing-agency-private-limited",
    purpose: "Reviews",
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/crea8ivmedia",
    purpose: "All links",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@crea8ivmedia",
    purpose: "Updates",
  },
  {
    label: "Medium",
    href: "https://medium.com/@crea8ivmedia",
    purpose: "Articles",
  },
  {
    label: "Blogger",
    href: "https://www.blogger.com/blog/posts/6081939335814286580?hl=en&tab=jj",
    purpose: "Blog",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/crea8ivmediapk",
    purpose: "Portfolio",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/crea8iv-media",
    purpose: "Portfolio",
  },
] as const;

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Growth Systems",
    href: "/growth-systems/",
    children: [
      ["Meta Ads", "/meta-ads/"],
      ["Google Ads", "/google-ads/"],
      ["Google Business Profile", "/google-business-profile-growth/"],
      ["Website Development", "/website-development/"],
      ["Social Media Management", "/social-media-management/"],
      ["Content Creation", "/content-creation/"],
      ["Branding & Creative", "/branding-and-creative/"],
      ["Marketing Automation", "/marketing-automation/"],
      ["AI Search Optimization", "/ai-search-optimization/"],
    ],
  },
  { label: "Results", href: "/results/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Free Tools", href: "/tools/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Blog", href: "/blog/" },
  {
    label: "About",
    href: "/about/",
    children: [
      ["About Crea8iv", "/about/"],
      ["Our Team", "/our-team/"],
      ["Careers", "/careers/"],
      ["Course", "/courses/"],
      ["FAQs", "/faqs/"],
    ],
  },
  { label: "Contact", href: "/contact/" },
] as const;

export const EXTRA_ROUTES = [
  "/portfolio/",
  "/portfolio/websites/",
  "/portfolio/graphics/",
  "/portfolio/reels/",
  "/portfolio/campaigns/",
  "/case-studies/",
  "/case-studies/healthcare/",
  "/case-studies/restaurants/",
  "/case-studies/salons/",
  "/case-studies/real-estate-architecture/",
  "/case-studies/ecommerce/",
  "/marketing-automation/",
  "/ai-search-optimization/",
  "/tools/",
  "/tools/ai-visibility-checker/",
  "/tools/local-seo-audit/",
  "/tools/seo-audit/",
  "/tools/website-performance-checker/",
  "/tools/marketing-roi-calculator/",
  "/tools/meta-ads-budget-calculator/",
  "/tools/google-ads-budget-calculator/",
  "/tools/patient-retention-roi-calculator/",
  "/tools/website-roi-calculator/",
  "/tools/schema-markup-generator/",
] as const;
