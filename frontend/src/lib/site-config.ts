import { COMPANY } from "@/data/company";
export const SITE_URL = COMPANY.website;

export const BUSINESS_DETAILS = {
  brandName: COMPANY.brandName,
  legalName: COMPANY.brandName,
  entityType: COMPANY.pakistanEntityType,
  address: COMPANY.pakistanBusinessAddress,
  streetAddress: COMPANY.streetAddress,
  addressLocality: COMPANY.addressLocality,
  addressRegion: COMPANY.addressRegion,
  postalCode: COMPANY.postalCode,
  addressCountry: COMPANY.addressCountry,
  phoneDisplay: COMPANY.pakistanPhoneDisplay,
  phone: COMPANY.pakistanPhone,
  phoneHref: `tel:${COMPANY.pakistanPhone.replace(/[^+0-9]/g, "")}`,
  email: COMPANY.email,
} as const;

export const BUSINESS_LOCATION = {
  label: "Crea8iv Media Office",
  shortLabel: "Bahria Town office",
  latitude: 33.5511786,
  longitude: 73.1250752,
  mapZoom: 15,
  serviceAreas: ["Bahria Town", "Rawalpindi", "Islamabad", "Pakistan"],
  coverageSummary: "Serving Rawalpindi, Islamabad, and Pakistan-wide projects.",
} as const;

const mapsQuery = `${BUSINESS_DETAILS.brandName}, ${BUSINESS_DETAILS.address}`;

export const GOOGLE_MAPS_PLACE_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

export const GOOGLE_MAPS_DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_LOCATION.latitude},${BUSINESS_LOCATION.longitude}`;

export const GOOGLE_MAPS_EMBED_URL =
  `https://www.google.com/maps?q=${BUSINESS_LOCATION.latitude},${BUSINESS_LOCATION.longitude}&z=${BUSINESS_LOCATION.mapZoom}&output=embed`;

export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations/" },
  {
    label: "Solutions",
    href: "/growth-systems",
    children: [
      { label: "Growth Systems", href: "/growth-systems" },
      { label: "Meta Ads", href: "/meta-ads" },
      { label: "Google Ads", href: "/google-ads" },
      { label: "Google Business Profile", href: "/google-business-profile-growth" },
      { label: "Website Development", href: "/website-development" },
      { label: "Social Media Management", href: "/social-media-management" },
      { label: "Content Creation", href: "/content-creation" },
      { label: "Branding & Creative", href: "/branding-and-creative" },
      { label: "Marketing Automation", href: "/marketing-automation" },
      { label: "AI Search Optimization", href: "/ai-search-optimization" },
      { label: "AI Answer Briefs", href: "/answers" },
      { label: "Industries", href: "/industries" },
      { label: "AI Visibility Targets", href: "/ai-visibility-targets" },
      { label: "AI Visibility Growth", href: "/ai-visibility-growth" },
      { label: "AI Content Roadmap", href: "/ai-visibility-content-roadmap" },
      { label: "AI Citation Sources", href: "/ai-citation-sources" },
      { label: "Research", href: "/research" },
      { label: "Comparisons", href: "/compare" },
      { label: "Playbooks", href: "/playbooks" },
    ],
  },
  {
    label: "Platforms",
    href: "/platforms",
    children: [
      { label: "PatientFlow", href: "/patientflow", group: "Healthcare" },
      { label: "ExamFlow", href: "https://xtempora.org/projects/examflow", group: "Education" },
      { label: "X-Tempora", href: "https://xtempora.org/", group: "Education" },
      { label: "Free Tools", href: "/tools", group: "Marketing", isNew: true },
    ],
  },
  {
    label: "Results",
    href: "/results",
    children: [
      { label: "Full Portfolio", href: "/results" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Website Portfolio", href: "/website-portfolio" },
      { label: "Social Grids", href: "/results/#archive" },
      { label: "Clients", href: "/clients" },
    ],
  },
  { label: "Plans", href: "/pricing" },
  { label: "Insights", href: "/blog" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Crea8iv", href: "/about" },
      { label: "Company Verification", href: "/company-verification/" },
      { label: "Our Team", href: "/our-team" },
      { label: "Syed Qamar Abbas", href: "/syed-qamar-abbas" },
      { label: "Buyer Guides", href: "/guides" },
      { label: "Industries", href: "/industries" },
      { label: "AI Visibility Targets", href: "/ai-visibility-targets" },
      { label: "AI Visibility Growth", href: "/ai-visibility-growth" },
      { label: "AI Content Roadmap", href: "/ai-visibility-content-roadmap" },
      { label: "AI Citation Sources", href: "/ai-citation-sources" },
      { label: "Research", href: "/research" },
      { label: "Deployment Checklist", href: "/ai-visibility-deployment-checklist" },
      { label: "Comparisons", href: "/compare" },
      { label: "Playbooks", href: "/playbooks" },
      { label: "Academy", href: "/courses" },
      { label: "Consultation", href: "/consultation" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

// Perf audit 2026-07-06: the 27 legacy WordPress/Elementor/theme stylesheet
// URLs (crea8ivmedia.com/wp-content/plugins|themes/…) ALL return 404 on the
// live static site — WordPress no longer serves them from this domain. They
// were render-blocking dead requests delaying first paint on every page, and
// the deployed design provably renders without them (it has been, in
// production, all along). Removed. The WordPress sections are styled by their
// SSR-inlined Elementor <style> blocks + globals.css overrides.
export const EXTERNAL_STYLESHEETS = [
  // Icon font for WordPress-content icons and post-interaction UI (hero and
  // bottom-nav icons are inlined SVGs — see components/ui/FaIcon.tsx).
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
  // Site typography: Josefin Sans is the primary font across body, headings,
  // navigation, labels, and CTAs. Inter remains as a fallback for older
  // WordPress content snapshots that reference it directly.
  "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..800&display=swap",
] as const;

// The lottie-player web component (/lottie-player.js) is now injected on
// demand by components/wordpress/LottiePlayerLoader.tsx — only on pages that
// actually contain a <lottie-player> element, and only after window load.
