import type { OrbitalService } from "./ui/radial-orbital-timeline";

const orbit = "/img/homepage/service-orbit";
const journey = "/img/homepage/connected-journey";
const platforms = "/img/platform-logos";

export const homeOrbitServices: OrbitalService[] = [
  {
    name: "Paid Ads",
    benefit: "Drive qualified leads",
    title: "Advertising without",
    highlight: "clear returns?",
    outcome: "Match Google and Meta ads to the right audience and landing page. Track the enquiries they bring.",
    iconSrc: `${orbit}/05-paid-ads.webp`,
    specialties: [
      { label: "Google Ads", href: "/google-ads/", iconSrc: `${platforms}/google-ads.webp` },
      { label: "Meta Ads", href: "/meta-ads/", iconSrc: `${platforms}/meta-ads.webp` },
      { label: "Tracking", href: "/google-ads/#services", iconSrc: `${platforms}/tracking.webp` },
    ],
    href: "/google-ads/",
    label: "Explore Google Ads",
  },
  {
    name: "Automation",
    benefit: "Simplify follow-up",
    title: "Losing leads",
    highlight: "after first contact?",
    outcome: "Reply on WhatsApp, route leads in your CRM and follow up on missed enquiries.",
    iconSrc: `${orbit}/06-automation.webp`,
    specialties: [
      { label: "CRM workflows", href: "/marketing-automation/#automation-capabilities-title", iconSrc: `${orbit}/06-automation.webp` },
      { label: "WhatsApp", href: "/marketing-automation/", iconSrc: `${platforms}/whatsapp.webp` },
      { label: "Lead follow-up", href: "/marketing-automation/#automation-workflow", iconSrc: `${journey}/05-follow-through.webp` },
    ],
    href: "/marketing-automation/",
    label: "Explore lead follow-up",
  },
  {
    name: "Strategy",
    benefit: "Plan your growth",
    title: "Not sure what",
    highlight: "to fix first?",
    outcome: "Use audits and performance data to decide what to fix before you spend more.",
    iconSrc: `${orbit}/01-strategy.webp`,
    specialties: [
      { label: "Growth audits", href: "/tools/", iconSrc: `${journey}/01-discover.webp` },
      { label: "Marketing strategy", href: "/growth-systems/#cm-process", iconSrc: `${orbit}/01-strategy.webp` },
      { label: "Marketing ROI", href: "/tools/marketing-roi-calculator/", iconSrc: `${journey}/05-follow-through.webp` },
    ],
    href: "/tools/",
    label: "Explore growth tools",
  },
  {
    name: "SEO & AI",
    benefit: "Get found online",
    title: "Not getting",
    highlight: "found?",
    outcome: "Help customers find you in local search, on Google Maps and in AI answers.",
    iconSrc: `${orbit}/02-seo-ai.webp`,
    specialties: [
      { label: "Local SEO", href: "/tools/local-seo-audit/", iconSrc: `${journey}/01-discover.webp` },
      { label: "Google profile", href: "/google-business-profile-growth/", iconSrc: `${platforms}/google-business-profile.webp` },
      { label: "AI visibility", href: "/ai-search-optimization/", iconSrc: `${orbit}/02-seo-ai.webp` },
    ],
    href: "/ai-search-optimization/",
    label: "Explore SEO & AI visibility",
  },
  {
    name: "Websites",
    benefit: "Get more enquiries",
    title: "Getting visits but",
    highlight: "few enquiries?",
    outcome: "Build fast, clear websites and landing pages that help more visitors enquire.",
    iconSrc: `${orbit}/03-websites.webp`,
    specialties: [
      { label: "Web design", href: "/website-development/", iconSrc: `${orbit}/03-websites.webp` },
      { label: "Landing pages", href: "/website-development/#website-capabilities", iconSrc: `${journey}/02-explore.webp` },
      { label: "Site conversion", href: "/website-development/#website-value", iconSrc: `${journey}/04-enquire.webp` },
    ],
    href: "/website-development/",
    label: "Explore website development",
  },
  {
    name: "Branding",
    benefit: "Build brand trust",
    title: "Your brand",
    highlight: "blends in?",
    outcome: "Build a clear identity and carry it through social content, reels and video.",
    iconSrc: `${orbit}/04-branding.webp`,
    specialties: [
      { label: "Visual identity", href: "/branding-and-creative/", iconSrc: `${orbit}/04-branding.webp` },
      { label: "Social content", href: "/social-media-management/", iconSrc: `${journey}/04-enquire.webp` },
      { label: "Reels & video", href: "/content-creation/#content-formats-title", iconSrc: `${platforms}/instagram.webp` },
    ],
    href: "/branding-and-creative/",
    label: "Explore branding & creative",
  },
];
