export type CardVisual = {
  image: string;
  alt: string;
};

const AD_CONCEPT_ROOT = "/img/services/ad-concepts";

export const CARD_VISUALS = {
  brandIdentity: {
    image: `${AD_CONCEPT_ROOT}/brand-identity-ad-concept.webp`,
    alt: "Minimal premium brand identity system visual by Crea8iv Media",
  },
  socialMedia: {
    image: `${AD_CONCEPT_ROOT}/social-media-management-ad-concept.webp`,
    alt: "Minimal social media content engine visual by Crea8iv Media",
  },
  metaAds: {
    image: `${AD_CONCEPT_ROOT}/meta-advertising-ad-concept.webp`,
    alt: "Minimal Meta Ads lead flow visual by Crea8iv Media",
  },
  googleAds: {
    image: `${AD_CONCEPT_ROOT}/google-ads-ad-concept.webp`,
    alt: "Minimal Google Ads search intent visual by Crea8iv Media",
  },
  googleBusinessProfile: {
    image: `${AD_CONCEPT_ROOT}/google-business-profile-ad-concept.webp`,
    alt: "Minimal Google Business Profile local visibility visual by Crea8iv Media",
  },
  websiteDevelopment: {
    image: `${AD_CONCEPT_ROOT}/website-development-ad-concept.webp`,
    alt: "Minimal website conversion system visual by Crea8iv Media",
  },
  aiAutomation: {
    image: `${AD_CONCEPT_ROOT}/ai-automation-ad-concept.webp`,
    alt: "Minimal AI automation and follow-up system visual by Crea8iv Media",
  },
  contentReels: {
    image: `${AD_CONCEPT_ROOT}/content-reels-ad-concept.webp`,
    alt: "Minimal content and reels production system visual by Crea8iv Media",
  },
  leadGeneration: {
    image: `${AD_CONCEPT_ROOT}/lead-generation-ad-concept.webp`,
    alt: "Minimal lead generation flow visual by Crea8iv Media",
  },
  growthSystem: {
    image: `${AD_CONCEPT_ROOT}/growth-system-ad-concept.webp`,
    alt: "Minimal connected growth system visual by Crea8iv Media",
  },
  softwareDevelopment: {
    image: `${AD_CONCEPT_ROOT}/software-development-ad-concept.webp`,
    alt: "Minimal custom software system visual by Crea8iv Media",
  },
  saasDevelopment: {
    image: `${AD_CONCEPT_ROOT}/saas-development-ad-concept.webp`,
    alt: "Minimal SaaS platform architecture visual by Crea8iv Media",
  },
  crmDevelopment: {
    image: `${AD_CONCEPT_ROOT}/crm-development-ad-concept.webp`,
    alt: "Minimal CRM pipeline and follow-up visual by Crea8iv Media",
  },
  toolsDashboard: {
    image: `${AD_CONCEPT_ROOT}/growth-system-ad-concept.webp`,
    alt: "Minimal marketing tools dashboard visual by Crea8iv Media",
  },
} satisfies Record<string, CardVisual>;

export const SOFTWARE_SERVICE_VISUALS: Record<string, CardVisual> = {
  "SaaS Development": CARD_VISUALS.saasDevelopment,
  "CRM Development": CARD_VISUALS.crmDevelopment,
  "ERP Solutions": CARD_VISUALS.growthSystem,
  "Mobile Apps": CARD_VISUALS.websiteDevelopment,
  "AI Applications": CARD_VISUALS.aiAutomation,
  "Automation Systems": CARD_VISUALS.aiAutomation,
  "Enterprise Software": CARD_VISUALS.softwareDevelopment,
  "Custom Web Apps": CARD_VISUALS.websiteDevelopment,
};

export const TOOL_CARD_VISUALS: Record<string, CardVisual> = {
  "ai-visibility-checker": CARD_VISUALS.aiAutomation,
  "local-seo-audit": CARD_VISUALS.googleBusinessProfile,
  "seo-audit": CARD_VISUALS.growthSystem,
  "website-performance-checker": CARD_VISUALS.websiteDevelopment,
  "marketing-roi-calculator": CARD_VISUALS.toolsDashboard,
  "meta-ads-budget-calculator": CARD_VISUALS.metaAds,
  "google-ads-budget-calculator": CARD_VISUALS.googleAds,
  "patient-retention-roi-calculator": CARD_VISUALS.crmDevelopment,
  "website-roi-calculator": CARD_VISUALS.websiteDevelopment,
  "schema-markup-generator": CARD_VISUALS.aiAutomation,
};

export function getToolCardVisual(slug: string) {
  return TOOL_CARD_VISUALS[slug] ?? CARD_VISUALS.toolsDashboard;
}
