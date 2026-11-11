import PartnershipEnquiry from "@/components/PartnershipEnquiry";
import MarketPage, { marketMetadata } from "@/components/markets/MarketPage";
import { markets, getMarket } from "@/data/markets";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ContentShell from "@/components/wordpress/ContentShell";
import WordPressContent from "@/components/wordpress/WordPressContent";
import WordPressAssets from "@/components/wordpress/WordPressAssets";
import NativeMarketingPage from "@/components/pages/NativeMarketingPage";
import ServiceResources from "@/components/ServiceResources";
import LocationExperience from "@/components/LocationExperience";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSeoContent from "@/components/PageSeoContent";
import PageSchema from "@/components/PageSchema";
import { ServiceToolsPanel } from "@/components/tools/ToolsDiscovery";
import { nativePages } from "@/lib/native-pages";
import {
  formatWpDate,
  getOpenGraphImage,
  getSeoDescription,
  getSeoTitle,
  stripHtml,
  getRecentPosts,
  resolveContentBySlug,
  getAllPages,
  cleanWpHtml,
  normalizeWpUrl,
} from "@/lib/wordpress";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import { isSpamPath } from "@/lib/seo-cleanup";
import { PAGE_METADATA, pageUrl } from "@/lib/seo-metadata";
import { SOCIAL_LINKS } from "@/lib/social-links";
import type { WPPost } from "@/types/wordpress";
import detailStyles from "@/components/service-body.module.css";
import { InsightsSection } from "@/components/HomepageEditorial";
import GrowthSystemsIntro, { GrowthSystemsContact } from "../growth-systems/GrowthSystemsIntro";
import growthStyles from "../growth-systems/growth-systems.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getAllPages().catch(() => []);
  const explicitRoutes = new Set([
    "locations",
    "results",
    "blog",
    "software-development",
    "software-products",
    "privacy-policy",
    "terms-and-conditions",
    "syed-qamar-abbas",
    "ai-search-optimization",
    "growth-systems",
    "marketing-automation",
    "meta-ads",
  ]);
  const params = pages
    .map((page) => ({ slug: page.slug }))
    .filter(({ slug }) => !explicitRoutes.has(slug) && !isSpamPath(slug));
  for (const market of markets) if (!params.some(p => p.slug === market.slug)) params.push({ slug: market.slug });
  if (params.length > 0) return params;
  // WordPress unreachable: `output: export` hard-fails on an empty params
  // list. Emit one placeholder (it renders not-found and is NOT deployed) so
  // the rest of the site can still build; live slug pages keep their last
  // deployed HTML until the backend returns.
  return [{ slug: "wp-offline-placeholder" }];
}

type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type SuggestedReadingItem = {
  title: string;
  href: string;
  category: string;
  image: string;
  description?: string;
};

const AUTHOR = {
  name: "Syed Qamar Abbas",
  role: "Founder & CEO, Crea8iv Media",
  url: `${SITE_URL}/syed-qamar-abbas/`,
  image: `${SITE_URL}/assets/syed-qamar-abbas-founder-card.webp`,
  bio:
    "Syed Qamar Abbas leads Crea8iv Media's performance marketing, local SEO, AI automation, and custom software work for Pakistan-based businesses.",
  expertise: ["Performance Marketing", "Local SEO", "Google Ads", "AI Automation"],
  socials: [
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { label: "Instagram", href: SOCIAL_LINKS.instagram },
    { label: "X", href: SOCIAL_LINKS.x },
    { label: "Medium", href: SOCIAL_LINKS.medium },
  ],
};

const INTERNAL_LINKS = [
  { label: "Google Ads management", href: "/google-ads/" },
  { label: "Meta Ads growth systems", href: "/meta-ads/" },
  { label: "Local SEO and Google Business Profile", href: "/google-business-profile-growth/" },
  { label: "Crea8iv Media case studies", href: "/results/" },
];

const PAGE_FALLBACK_IMAGES: Record<string, string> = {
  about: "/img/services/ad-concepts/growth-system-ad-concept.webp",
  "our-team": "/assets/syed-qamar-abbas-founder-card.webp",
  "google-ads": "/img/services/ad-concepts/google-ads-ad-concept.webp",
  "meta-ads": "/img/services/ad-concepts/meta-advertising-ad-concept.webp",
  "website-development": "/img/services/ad-concepts/website-development-ad-concept.webp",
  "social-media-management": "/img/services/ad-concepts/social-media-management-ad-concept.webp",
  "google-business-profile-growth": "/img/services/ad-concepts/google-business-profile-ad-concept.webp",
  "content-creation": "/img/services/ad-concepts/content-reels-ad-concept.webp",
  "branding-and-creative": "/img/services/ad-concepts/brand-identity-ad-concept.webp",
  "growth-systems": "/img/services/ad-concepts/growth-system-ad-concept.webp",
  "software-products": "/img/services/ad-concepts/software-development-ad-concept.webp",
  "marketing-automation": "/img/services/ad-concepts/ai-automation-ad-concept.webp",
  "business-consultancy": "/img/services/ad-concepts/growth-system-ad-concept.webp",
  consultation: "/img/services/ad-concepts/growth-system-ad-concept.webp",
  careers: "/img/services/ad-concepts/software-development-ad-concept.webp",
  "our-services": "/img/services/ad-concepts/growth-system-ad-concept.webp",
};

const SERVICE_PAGE_VISUALS: Record<string, { eyebrow: string; title: string; image: string; body: string; points: string[] }> = {
  "google-ads": {
    eyebrow: "Search growth system",
    title: "Search visibility built for qualified enquiries.",
    image: "/img/services/ad-concepts/google-ads-ad-concept.webp",
    body: "Use search intent, offer clarity, landing pages, and conversion tracking together so high-intent demand turns into measurable leads.",
    points: ["Search intent mapping", "Conversion-ready landing paths", "Weekly reporting rhythm"],
  },
  "meta-ads": {
    eyebrow: "Paid social system",
    title: "Meta campaigns with creative, tracking, and follow-up connected.",
    image: "/img/services/ad-concepts/meta-advertising-ad-concept.webp",
    body: "Campaigns perform better when the ad, offer, audience, landing step, and WhatsApp or form follow-up are built as one system.",
    points: ["Audience and funnel strategy", "Creative testing system", "Lead routing and retargeting"],
  },
  "website-development": {
    eyebrow: "Website system",
    title: "Fast premium websites designed around trust and action.",
    image: "/img/services/ad-concepts/website-development-ad-concept.webp",
    body: "A business website should explain the offer quickly, establish credibility, load fast, and make the next step obvious on every screen size.",
    points: ["Mobile-first UX", "SEO-ready sections", "WhatsApp and form conversion paths"],
  },
  "social-media-management": {
    eyebrow: "Social presence system",
    title: "Content calendars that make the brand active and believable.",
    image: "/img/services/ad-concepts/social-media-management-ad-concept.webp",
    body: "Social media becomes useful when posts, reels, captions, offers, and profile optimization support one consistent brand story.",
    points: ["Content planning", "Profile optimization", "Platform-native creative"],
  },
  "google-business-profile-growth": {
    eyebrow: "Local growth system",
    title: "Google Business Profile growth for maps, calls, and local trust.",
    image: "/img/services/ad-concepts/google-business-profile-ad-concept.webp",
    body: "Local buyers compare businesses through Google Maps, reviews, photos, posts, services, and profile activity before they call or visit.",
    points: ["Map-pack visibility", "Review and post system", "Call, direction, and website actions"],
  },
  "content-creation": {
    eyebrow: "Content production system",
    title: "Creative assets that turn attention into brand memory.",
    image: "/img/services/ad-concepts/content-reels-ad-concept.webp",
    body: "Content works best when every reel, post, photo, and campaign asset supports a clear buyer journey instead of filling the feed randomly.",
    points: ["Reels and short-form content", "Product and service visuals", "Campaign-ready creative"],
  },
  "branding-and-creative": {
    eyebrow: "Identity system",
    title: "Brand identity built to look premium across every channel.",
    image: "/img/services/ad-concepts/brand-identity-ad-concept.webp",
    body: "A strong identity gives the website, social content, ads, proposals, and customer touchpoints one memorable visual language.",
    points: ["Logo and visual direction", "Brand kit consistency", "Campaign-ready identity assets"],
  },
  "growth-systems": {
    eyebrow: "Complete growth infrastructure",
    title: "Search, content, paid media, and automation working together.",
    image: "/img/services/ad-concepts/growth-system-ad-concept.webp",
    body: "Growth becomes more predictable when visibility, creative, conversion paths, tracking, and follow-up are connected into one operating rhythm.",
    points: ["SEO and content architecture", "Paid acquisition channels", "Automation and reporting"],
  },
  "software-products": {
    eyebrow: "AI platform ecosystem",
    title: "Automation products for learning, operations, and growth.",
    image: "/img/services/ad-concepts/software-development-ad-concept.webp",
    body: "Crea8iv Media connects AI tools, portals, workflows, and custom systems so repeated business tasks become easier to manage.",
    points: ["AI workflows", "Internal tools", "Connected business systems"],
  },
  "marketing-automation": {
    eyebrow: "WhatsApp automation system",
    title: "Follow-up workflows that stop good leads from going cold.",
    image: "/img/services/ad-concepts/ai-automation-ad-concept.webp",
    body: "Automation keeps enquiries moving through instant replies, qualification, reminders, CRM capture, and reactivation flows.",
    points: ["WhatsApp auto-replies", "Lead qualification", "CRM and reminder workflows"],
  },
  careers: {
    eyebrow: "Careers at CREA8IV",
    title: "A growth team for creative, technical, and strategic builders.",
    image: "/img/services/ad-concepts/software-development-ad-concept.webp",
    body: "Careers at CREA8IV MEDIA are built around practical execution: brand systems, performance marketing, software, automation, and measurable business growth.",
    points: ["Creative and strategy roles", "Marketing and software delivery", "Premium client work rhythm"],
  },
};

const SERVICE_SUGGESTED_READING: Record<string, SuggestedReadingItem[]> = {
  "google-ads": [
    {
      title: "Google Is Betting Bigger on Conversational Search Ads: What Pakistan Businesses Should Change Now",
      href: "/blog/google-conversational-search-ads-pakistan-businesses/",
      category: "Google Ads",
      image: "/wp-content/uploads/2026/07/google-conversational-search-ads-pakistan-businesses-cover.webp",
    },
    {
      title: "Google AI Overviews Are Now Showing Ads in Pakistan: What Every Business Needs to Know",
      href: "/blog/google-ai-overviews-ads-in-pakistan-what-businesses-need-to-know/",
      category: "Search Ads",
      image: "/wp-content/uploads/2026/07/google-ai-overviews-ads-in-pakistan-cover.webp",
    },
    {
      title: "Google Ads Cost in Pakistan for Doctors, Clinics and Aesthetic Brands",
      href: "/blog/google-ads-cost-in-pakistan-for-doctors-clinics-and-aesthetic-brands/",
      category: "Budgeting",
      image: "/wp-content/uploads/2026/06/google-ads-small-business-pakistan-premium-cover.webp",
    },
  ],
  "meta-ads": [
    {
      title: "How Much Should a Business Spend on Meta Ads in Pakistan?",
      href: "/blog/how-much-should-a-business-spend-on-meta-ads-in-pakistan/",
      category: "Meta Ads",
      image: "/wp-content/uploads/2026/06/facebook-ads-cost-pakistan-premium-cover.webp",
    },
    {
      title: "How Real Estate Businesses in Pakistan Get Leads from Facebook Ads",
      href: "/blog/how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads/",
      category: "Lead Generation",
      image: "/wp-content/uploads/2026/07/how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads-cover.webp",
    },
    {
      title: "Facebook & Instagram Ads in Pakistan: The Complete Guide",
      href: "/blog/facebook-instagram-ads-pakistan-guide/",
      category: "Paid Social",
      image: "/wp-content/uploads/2026/06/facebook-instagram-ads-pakistan-guide-premium-cover.webp",
    },
  ],
  "google-business-profile-growth": [
    {
      title: "Google Business Profile for Restaurants in Islamabad: Full Setup Guide",
      href: "/blog/google-business-profile-for-restaurants-in-islamabad-full-setup-guide/",
      category: "Local SEO",
      image: "/wp-content/uploads/2026/07/google-business-profile-for-restaurants-in-islamabad-full-setup-guide-premium-cover.webp",
    },
    {
      title: "How Dentists in Rawalpindi Can Rank on Google Maps",
      href: "/blog/how-dentists-in-rawalpindi-can-rank-on-google-maps/",
      category: "Google Maps",
      image: "/wp-content/uploads/2026/06/rank-google-maps-rawalpindi-islamabad-premium-cover.webp",
    },
    {
      title: "How Restaurants in Islamabad Can Get More Google Reviews",
      href: "/blog/how-restaurants-in-islamabad-can-get-more-google-reviews/",
      category: "Reviews",
      image: "/wp-content/uploads/2026/07/google-reviews-for-restaurants-in-islamabad-cover.webp",
    },
  ],
  "website-development": [
    {
      title: "Best Website Design Company in Islamabad: What to Look For",
      href: "/blog/best-website-design-company-in-islamabad-what-to-look-for/",
      category: "Website Strategy",
      image: "/wp-content/uploads/2026/06/website-cost-pakistan-premium-cover.webp",
    },
    {
      title: "Lead Generation for Builders and Architects in Pakistan",
      href: "/blog/lead-generation-for-builders-and-architects-in-pakistan/",
      category: "Conversion",
      image: "/wp-content/uploads/2026/06/digital-marketing-cost-pakistan-premium-cover.webp",
    },
    {
      title: "SEO Cost in Pakistan: What Businesses Should Actually Expect to Pay",
      href: "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/",
      category: "SEO + Website",
      image: "/wp-content/uploads/2026/06/seo-services-pakistan-premium-cover.webp",
    },
  ],
  "software-products": [
    {
      title: "WhatsApp Automation for Clinics: Booking, Follow-Up and Reminders",
      href: "/blog/whatsapp-automation-for-clinics-booking-follow-up-and-reminders/",
      category: "Automation",
      image: "/wp-content/uploads/2026/06/whatsapp-business-marketing-pakistan-premium-cover.webp",
    },
    {
      title: "What Syed Qamar Abbas Builds at Crea8iv Media",
      href: "/blog/what-syed-qamar-abbas-builds-at-crea8iv-media/",
      category: "Systems",
      image: "/wp-content/uploads/2026/06/the-ai-automation-blueprint-for-marketing-2026-guide-premium-cover.webp",
    },
    {
      title: "Google Search Console Now Tracks Instagram, TikTok, YouTube and X Visibility",
      href: "/blog/google-search-console-social-platforms-pakistan-businesses/",
      category: "Visibility",
      image: "/wp-content/uploads/2026/07/google-search-console-social-platforms-pakistan-cover.webp",
    },
  ],
  "ai-search-optimization": [
    {
      title: "Why Founder Pages Matter for AI Search, Entity SEO and Business Trust",
      href: "/blog/founder-pages-ai-search-entity-seo-business-trust/",
      category: "Entity SEO",
      image: "/wp-content/uploads/2026/07/founder-pages-ai-search-entity-seo-business-trust-cover.webp",
    },
    {
      title: "Google Search Console Now Tracks Instagram, TikTok, YouTube and X Visibility",
      href: "/blog/google-search-console-social-platforms-pakistan-businesses/",
      category: "Search Signals",
      image: "/wp-content/uploads/2026/07/google-search-console-social-platforms-pakistan-cover.webp",
    },
    {
      title: "Google Is Betting Bigger on Conversational Search Ads: What Pakistan Businesses Should Change Now",
      href: "/blog/google-conversational-search-ads-pakistan-businesses/",
      category: "AI Search",
      image: "/wp-content/uploads/2026/07/google-conversational-search-ads-pakistan-businesses-cover.webp",
    },
  ],
  "growth-systems": [
    {
      title: "Lead Generation for Builders and Architects in Pakistan",
      description: "How construction and architecture businesses can build a more reliable enquiry pipeline.",
      href: "/blog/lead-generation-for-builders-and-architects-in-pakistan/",
      category: "Lead Systems",
      image: "/wp-content/uploads/2026/06/digital-marketing-cost-pakistan-premium-cover.webp",
    },
    {
      title: "What Syed Qamar Abbas Builds at Crea8iv Media",
      description: "A look at the strategy, marketing systems and automation behind the agency’s work.",
      href: "/blog/what-syed-qamar-abbas-builds-at-crea8iv-media/",
      category: "Growth Systems",
      image: "/wp-content/uploads/2026/06/the-ai-automation-blueprint-for-marketing-2026-guide-premium-cover.webp",
    },
    {
      title: "WhatsApp Automation for Clinics: Booking, Follow-Up and Reminders",
      description: "Practical ways to connect appointment booking, reminders and patient follow-up.",
      href: "/blog/whatsapp-automation-for-clinics-booking-follow-up-and-reminders/",
      category: "Automation",
      image: "/wp-content/uploads/2026/06/whatsapp-business-marketing-pakistan-premium-cover.webp",
    },
  ],
};

function getPageFallbackImage(slug: string) {
  return PAGE_FALLBACK_IMAGES[slug] ?? "/img/services/service-branding.webp";
}

function getSuggestedReading(slug: string) {
  return SERVICE_SUGGESTED_READING[slug] ?? [];
}

function getServiceVisual(slug: string) {
  return SERVICE_PAGE_VISUALS[slug] ?? null;
}

const SERVICE_CONVERSION_CONTEXT: Record<string, { fit: string; improves: string[]; firstWeek: string[] }> = {
  "google-ads": {
    fit: "Best for businesses that already have demand in search and need cleaner landing pages, stronger tracking, and better quality enquiries.",
    improves: ["Campaign structure", "Keyword and intent quality", "Landing-page trust", "Lead tracking", "Budget clarity"],
    firstWeek: ["Audit current account and search intent", "Map landing-page gaps", "Prioritize quick conversion fixes"],
  },
  "meta-ads": {
    fit: "Best for clinics, real estate, ecommerce, restaurants, and service businesses that need consistent creative testing and lead follow-up.",
    improves: ["Offer clarity", "Creative testing", "Audience strategy", "Retargeting", "WhatsApp handoff"],
    firstWeek: ["Review offer and audience", "Build creative testing plan", "Fix lead route and follow-up path"],
  },
  "website-development": {
    fit: "Best for businesses whose website looks weaker than their actual service quality or does not turn mobile visitors into action.",
    improves: ["Premium first impression", "Mobile UX", "Page speed", "Trust signals", "CTA flow"],
    firstWeek: ["Audit current pages", "Map conversion sections", "Define homepage and service-page structure"],
  },
  "social-media-management": {
    fit: "Best for brands that post inconsistently, look less premium online, or need content that supports trust and sales conversations.",
    improves: ["Content rhythm", "Brand consistency", "Profile trust", "Campaign alignment", "Audience recall"],
    firstWeek: ["Review profile and competitors", "Set content pillars", "Build first monthly calendar direction"],
  },
  "google-business-profile-growth": {
    fit: "Best for local businesses that need more calls, map visibility, reviews, photos, and high-intent discovery.",
    improves: ["Map visibility", "Review quality", "Profile activity", "Local service signals", "Call actions"],
    firstWeek: ["Audit profile and categories", "Review local competitors", "Create review and posting rhythm"],
  },
  "content-creation": {
    fit: "Best for brands that need better visual assets for social, ads, website, launch campaigns, and product/service storytelling.",
    improves: ["Visual quality", "Content usefulness", "Ad-ready assets", "Brand memory", "Campaign consistency"],
    firstWeek: ["Define content goals", "Plan shoot or asset list", "Create first creative direction"],
  },
  "branding-and-creative": {
    fit: "Best for businesses that need a more premium identity before scaling website, ads, packaging, or social campaigns.",
    improves: ["Logo direction", "Visual language", "Brand consistency", "Premium perception", "Campaign readiness"],
    firstWeek: ["Audit current identity", "Define brand personality", "Create visual direction routes"],
  },
  "growth-systems": {
    fit: "Best for businesses that need website, content, ads, SEO, tracking, and follow-up working as one connected system.",
    improves: ["Acquisition clarity", "Channel alignment", "Lead quality", "Reporting rhythm", "Scale decisions"],
    firstWeek: ["Map the buyer journey", "Audit all active channels", "Prioritize the first growth system"],
  },
  "software-products": {
    fit: "Best for businesses that need internal tools, portals, automations, dashboards, or AI-assisted workflows.",
    improves: ["Workflow speed", "Lead handling", "Data visibility", "Team operations", "Repeatable processes"],
    firstWeek: ["Map manual workflows", "Define data and user roles", "Prototype the first automation path"],
  },
  "marketing-automation": {
    fit: "Best for businesses that receive leads but lose them because replies, qualification, reminders, and follow-up are inconsistent.",
    improves: ["Response speed", "Lead qualification", "WhatsApp flow", "CRM capture", "Reminder systems"],
    firstWeek: ["Audit lead sources", "Write qualification logic", "Build first follow-up sequence"],
  },
};

function getServiceConversionContext(slug: string) {
  return SERVICE_CONVERSION_CONTEXT[slug] ?? null;
}

function ServiceDecisionPath({ serviceTitle }: { serviceTitle: string }) {
  const stages = [
    {
      label: "Diagnose",
      title: "Find the conversion gap",
      body: "We review your current page, offer, trust signals, mobile flow, and lead path before suggesting any campaign or redesign.",
    },
    {
      label: "Design",
      title: "Shape the premium buyer journey",
      body: "We turn the service into a clearer story: outcome, proof, process, package direction, and a next step that feels natural.",
    },
    {
      label: "Launch",
      title: "Connect traffic to action",
      body: "The page, creative, WhatsApp, forms, and tracking are aligned so attention has a clean path into a qualified conversation.",
    },
    {
      label: "Optimize",
      title: "Refine from real behavior",
      body: "We improve the system from calls, chats, form starts, scroll depth, click quality, and buyer objections instead of guesswork.",
    },
  ];

  return (
    <section className="service-decision-path mx-auto mt-14 max-w-[1180px] px-5 sm:px-8 lg:px-10" aria-labelledby="service-decision-title">
      <div className="service-decision-shell">
        <div className="service-decision-intro">
          <p className="service-visual-eyebrow">Premium conversion path</p>
          <h2 id="service-decision-title" className="service-decision-title">Make {serviceTitle.toLowerCase()} easier to trust, choose, and act on.</h2>
          <p className="service-decision-copy">
            A better service page is not only prettier. It reduces doubt, shows the buyer what happens next, and gives mobile visitors a fast path to contact.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LeadTriggerButton className="portfolio-button justify-center" eventLabel={`service-decision-${serviceTitle}`}>
              Start Free Audit
            </LeadTriggerButton>
            <Link href="/results/" className="portfolio-text-link justify-center">
              View proof
            </Link>
          </div>
        </div>
        <div className="service-decision-grid">
          {stages.map((stage, index) => (
            <article key={stage.label} className="service-decision-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{stage.label}</p>
              <h3>{stage.title}</h3>
              <div>{stage.body}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceConversionSystem({ slug, serviceTitle }: { slug: string; serviceTitle: string }) {
  const context = getServiceConversionContext(slug);
  if (!context) return null;

  return (
    <section className="service-conversion-system mx-auto mt-14 max-w-[1180px] px-5 sm:px-8 lg:px-10" aria-labelledby={`${slug}-conversion-system`}>
      <div className="service-conversion-shell">
        <div className="service-conversion-lead">
          <p className="service-visual-eyebrow">Better buyer journey</p>
          <h2 id={`${slug}-conversion-system`}>Turn interest in {serviceTitle.toLowerCase()} into a clearer next step.</h2>
          <p>{context.fit}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <LeadTriggerButton className="portfolio-button justify-center" eventLabel={`service-conversion-${slug}`}>
              Request Service Audit
            </LeadTriggerButton>
            <Link href="/contact/" className="portfolio-text-link justify-center">
              Contact team
            </Link>
          </div>
        </div>
        <div className="service-conversion-panels">
          <article>
            <span>What improves</span>
            <ul>
              {context.improves.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span>First 7 days</span>
            <ul>
              {context.firstWeek.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
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
  if (!url) {
    return `${SITE_URL}/img/crea8iv-white-3d-logo.webp`;
  }
  if (url.startsWith("http")) {
    return url.replace("https://darkgray-eland-964548.hostingersite.com", SITE_URL);
  }
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function enrichContactHtml(html: string) {
  const companyAndAddress = `
              <h4>Company &amp; Office</h4>
              <p><strong>${BUSINESS_DETAILS.legalName}</strong><br>${BUSINESS_DETAILS.address}</p>`;
  const emailCard = `
          <div class="cm-info-card">
            <div class="cm-icon">✉</div>
            <div>
              <h4>Email Address</h4>
              <a href="mailto:${BUSINESS_DETAILS.email}">${BUSINESS_DETAILS.email}</a>
            </div>
          </div>`;

  let enriched = html
    .replace(
      /<h4>Office Address<\/h4>\s*<p>Office No 01, 1st Floor, Plaza 54, Phase 4 Civic Center, Bahria Town, Rawalpindi,?\s*46220<\/p>/i,
      companyAndAddress
    )
    .replace(/mailto:info@example\.com/gi, `mailto:${BUSINESS_DETAILS.email}`);

  if (!enriched.includes("Book a PatientFlow demo")) {
    enriched = enriched.replace(
      /<option>Other \/ Consultancy<\/option>/i,
      `<option>Book a PatientFlow demo</option>
                  <option>Other / Consultancy</option>`
    );
  }

  if (!enriched.includes(`href="mailto:${BUSINESS_DETAILS.email}"`)) {
    enriched = enriched.replace(
      /(<h4>Contact Number<\/h4>[\s\S]*?<\/div>\s*<\/div>)/i,
      `$1\n${emailCard}`
    );
  }

  return enriched;
}

function getPlainTitle(content: { title: { rendered: string } }) {
  return decodeEntities(stripHtml(content.title.rendered));
}

function getPrimaryKeyword(title: string) {
  return title
    .replace(/\([^)]*\)/g, "")
    .split(/[:|]/)[0]
    .replace(/\b(complete guide|guide|beginner's guide|strategy guide|data & benchmarks)\b/gi, "")
    .trim();
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

// Prefer the hand-written WordPress/Yoast title when it already fits the SERP
// window (50–60 chars). Only synthesize a title when the source is missing,
// too short, or too long. This stops good titles like
// "Pakistan Digital Marketing Statistics 2026: Data & Benchmarks" from being
// overwritten with a generic "Practical 2026 Guide" suffix.
// Drop a dangling trailing token (conjunction, ampersand, separator, or a
// word left half-cut) so a trimmed title never ends on "&", "and", "to", etc.
function trimSerpTitle(value: string, max: number) {
  let clipped = value.slice(0, max + 1);
  const lastSpace = clipped.lastIndexOf(" ");
  if (lastSpace > 30) {
    clipped = clipped.slice(0, lastSpace);
  }
  return clipped
    .replace(/[\s,:;|&/–-]+$/u, "")
    .replace(/\s+(?:and|or|the|a|an|to|for|in|of|with|your|&)$/i, "")
    .trim();
}

function buildPostSeoTitle(title: string, yoastTitle?: string) {
  const candidate = decodeEntities(stripHtml(yoastTitle || title))
    .replace(/\s*[|–-]\s*Crea8iv Media\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

  // Keep the hand-written title verbatim while it renders fully in the SERP.
  // 65 is the practical pixel-truncation point — better a clean 61-char title
  // than a butchered 50-char one ending in "&".
  if (candidate.length >= 50 && candidate.length <= 65) {
    return candidate;
  }
  if (candidate.length > 65) {
    return trimSerpTitle(candidate, 60);
  }
  // Too short — extend toward the lower bound without duplicating the year.
  const keyword = getPrimaryKeyword(candidate || title);
  const suffix = /20\d\d/.test(candidate) ? "Complete Guide" : "2026 Guide";
  return fitToSerpLength(`${candidate}: ${suffix}`, 50, 65, `${keyword} | Crea8iv`);
}

// Prefer the real excerpt / Yoast description. Only fall back to a generated
// string when the source is missing or unusably short.
function buildPostMetaDescription(title: string, excerpt: string) {
  const real = decodeEntities(stripHtml(excerpt || "")).replace(/\s+/g, " ").trim();

  if (real.length >= 140 && real.length <= 155) {
    return real;
  }
  if (real.length > 155) {
    return fitToSerpLength(real, 140, 155, "");
  }
  if (real.length >= 110) {
    // Good excerpt, just a little short — pad with a localized brand CTA.
    return fitToSerpLength(`${real} — Crea8iv Media, Rawalpindi.`, 140, 155, "Learn more today.");
  }

  // Missing / thin excerpt — synthesize a unique, length-valid description.
  const keyword = getPrimaryKeyword(title);
  const context = real.toLowerCase().includes("pakistan") ? "Pakistan-specific" : "practical";
  const variants = [
    `${keyword}: get ${context} costs, real examples, FAQs, and steps to win more leads. Plan smarter with Crea8iv Media.`,
    `${keyword}: get costs, real examples, FAQs, and steps to win more leads. Plan smarter with Crea8iv Media.`,
    `${keyword}: costs, examples, FAQs, and lead-growth steps from Crea8iv Media, Rawalpindi.`,
  ];
  let description = variants.find((variant) => variant.length <= 155) || variants[variants.length - 1].slice(0, 154).trim() + ".";
  const extensions = [
    " Use this guide before you invest.",
    " Get practical next steps now.",
    " Start with a stronger strategy.",
    " Learn what works in 2026.",
    " Read the full guide.",
  ];

  for (const extension of extensions) {
    if (description.length >= 140) {
      break;
    }
    if (description.length + extension.length <= 155) {
      description += extension;
    }
  }

  return description;
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
    .replace(/<img\b(?![^>]*\bloading=)([^>]*)>/gi, "<img loading=\"lazy\"$1>")
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
  const niche = category.toLowerCase();
  return [
    {
      question: "What is this article about?",
      answer: `This article explains ${title.toLowerCase()} in the context of ${niche}, lead generation, and business visibility in Pakistan.`,
    },
    {
      question: "Why does this matter for businesses in Pakistan?",
      answer: "Search, social platforms, and AI-assisted discovery are changing how customers compare businesses. Companies need clearer content, stronger tracking, and better follow-up systems so visibility turns into real enquiries.",
    },
    {
      question: "What should a business do after reading this guide?",
      answer: "Audit the relevant search results, review your landing pages and tracking, check whether your content answers buyer questions clearly, and prioritize improvements that can be measured through leads, calls, WhatsApp chats, or bookings.",
    },
    {
      question: "Can Crea8iv Media help with this?",
      answer: "Yes. Crea8iv Media helps businesses in Rawalpindi, Islamabad, and across Pakistan connect SEO, paid ads, content, websites, and automation into measurable growth systems.",
    },
  ];
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarket(slug);
  if (market) return marketMetadata(market);
  if (isSpamPath(slug)) {
    return {
      title: { absolute: "Page removed | Crea8iv Media" },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const resolved = await resolveContentBySlug(slug).catch(() => null);

  if (!resolved) {
    const nativePage = nativePages[slug];
    if (nativePage) {
      const pageMetadata = PAGE_METADATA[slug];
      const title = pageMetadata?.title || `${nativePage.title} | Crea8iv Media`;
      const description = pageMetadata?.description || nativePage.intro;
      const canonical = `${SITE_URL}/${nativePage.slug}/`;
      const ogImage = `${SITE_URL}${nativePage.image}`;

      return {
        title: { absolute: title },
        description,
        robots: {
          index: true,
          follow: true,
        },
        alternates: {
          canonical,
        },
        openGraph: {
          title,
          description,
          url: canonical,
          type: "website",
          images: [{ url: ogImage, width: 1200, height: 630, alt: nativePage.imageAlt }],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
        },
      };
    }

    return {};
  }

  const { data } = resolved;
  const plainTitle = getPlainTitle(data);
  const rawDescription = decodeEntities(getSeoDescription(data));
  const isPost = resolved.type === "post";
  const pageMetadata = PAGE_METADATA[data.slug];
  const title = isPost
    ? buildPostSeoTitle(plainTitle, getSeoTitle(data))
    : pageMetadata?.title || decodeEntities(getSeoTitle(data)).replace(/\s*[|–-]\s*Crea8iv Media\s*$/i, "");
  const description = isPost
    ? buildPostMetaDescription(plainTitle, rawDescription)
    : pageMetadata?.description || fitToSerpLength(rawDescription, 130, 155, "Learn more from Crea8iv Media.");
  const ogImage = isPost && data._embedded?.["wp:featuredmedia"]?.[0]?.source_url
    ? toAbsoluteUrl(normalizeWpUrl(data._embedded["wp:featuredmedia"][0].source_url))
    : getOpenGraphImage(data.yoast_head_json);
  const canonical = pageUrl(data.slug);

  return {
    title: { absolute: title },
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: resolved.type === "post" ? "article" : "website",
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

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (market) return <MarketPage market={market} />;
  if (isSpamPath(slug)) {
    notFound();
  }

  // .catch → notFound instead of a build-crashing throw when WP is down.
  const resolved = await resolveContentBySlug(slug).catch(() => null);

  if (!resolved) {
    const nativePage = nativePages[slug];
    if (nativePage) {
      return <NativeMarketingPage page={nativePage} />;
    }

    notFound();
  }

  const { type, data } = resolved;
  if ((type as string) === "post") {
    redirect(`/blog/${slug}/`);
  }
  const featuredImage =
    data._embedded?.["wp:featuredmedia"]?.[0]?.source_url
      ? normalizeWpUrl(data._embedded["wp:featuredmedia"][0].source_url)
      : null;
  const plainTitle = decodeEntities(stripHtml(data.title.rendered));
  const plainExcerpt = decodeEntities(stripHtml(data.excerpt.rendered || "")).trim();
  const category =
    data._embedded?.["wp:term"]?.flat()?.find((term) => term?.name)?.name || "Digital Marketing";
  const articleBrief = buildArticleBrief(plainTitle, plainExcerpt, category);

  // Older WordPress snapshots can still point at the retired Astro asset
  // mirror. Replace those URLs before injecting the page HTML so inner routes
  // never ship broken image requests.
  const pageFallbackImage = getPageFallbackImage(slug);
  let contentHtml = cleanWpHtml(data.content.rendered)
    .replace(/\/assets\/mirror\/images\.unsplash\.com\/[^"'\s)]+/g, pageFallbackImage)
    .replace(/\/assets\/mirror\/crea8ivmedia\.com\/[^"'\s)]+\.(?:svg|webp|png|jpe?g)/gi, pageFallbackImage);
  let toc: TocItem[] = [];
  const faqs = buildFaqs(plainTitle, category);
  let relatedPosts: WPPost[] = [];
  const suggestedReading = type !== "post" ? getSuggestedReading(slug) : [];
  const serviceVisual = type !== "post" ? getServiceVisual(slug) : null;

  if (type === "post") {
    const enhanced = enhanceArticleHtml(contentHtml, `${plainTitle} article image`, plainTitle);
    contentHtml = enhanced.html;
    toc = enhanced.toc.slice(0, 8);
    relatedPosts = (await getRecentPosts(8).catch(() => [] as WPPost[]))
      .filter((post) => post.id !== data.id)
      .slice(0, 3);
  }

  // --- EEAT & GEO CONTENT INJECTIONS ---
  if (type !== "post") {
    if (slug === "contact") {
      contentHtml = enrichContactHtml(contentHtml);
    }

    if (slug === "about") {
      // Phase 2: About Page EEAT Injection (Hidden/Visible trust signals)
      const eeatBlock = `
        <div class="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 text-center border-t border-white/10 mt-12">
          <h3 class="font-orbitron text-2xl font-bold text-white mb-4">Founder-Led Performance Marketing and Automation</h3>
          <p class="font-inter text-white/70 max-w-3xl mx-auto leading-relaxed">
            Founded by <strong>Syed Qamar Abbas</strong>, Crea8iv Media focuses on performance marketing, AI automation, and custom SaaS architecture for businesses in Pakistan. The team works across healthcare, aesthetics, real estate, hospitality, and SaaS contexts with a systems-first approach to growth.
          </p>
        </div>
      `;
      contentHtml += eeatBlock;
    }

    if (slug === "pricing") {
      // Pricing is represented as server-rendered JSON-LD below. Do not append
      // hidden keyword copy to the visible WordPress document.
    }
  }

  const isGrowthSystems = slug === "growth-systems";
  const pageContentOwnsH1 = isGrowthSystems || (type !== "post" && /<h1\b/i.test(contentHtml));

  return (
    <>
      {!isGrowthSystems && <WordPressAssets />}
      <ContentShell
        className={isGrowthSystems ? growthStyles.shell : detailStyles.page}
        title={type === "post" || pageContentOwnsH1 ? undefined : data.title.rendered}
        titleAs={pageContentOwnsH1 ? "div" : "h1"}
      >
        {type === "post" ? (
        <article className="mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36 lg:px-10 lg:pt-40">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "BlogPosting",
                    "@id": `${SITE_URL}/${data.slug}/#article`,
                    headline: plainTitle,
                    description: buildPostMetaDescription(plainTitle, plainExcerpt),
                    image: featuredImage ? [toAbsoluteUrl(featuredImage)] : [AUTHOR.image],
                    datePublished: data.date,
                    dateModified: data.modified,
                    author: {
                      "@type": "Person",
                      "@id": `${SITE_URL}/syed-qamar-abbas/#person`,
                      name: AUTHOR.name,
                      jobTitle: AUTHOR.role,
                      image: AUTHOR.image,
                    },
                    publisher: { "@id": `${SITE_URL}/#organization` },
                    mainEntityOfPage: `${SITE_URL}/${data.slug}/`,
                    articleSection: category,
                    wordCount: stripHtml(contentHtml).split(/\s+/).filter(Boolean).length,
                    timeRequired: `PT${getReadingTimeFromHtml(contentHtml)}M`,
                    inLanguage: "en-US",
                  },
                  {
                    "@type": "WebPage",
                    "@id": `${SITE_URL}/${data.slug}/#webpage`,
                    url: `${SITE_URL}/${data.slug}/`,
                    name: plainTitle,
                    description: buildPostMetaDescription(plainTitle, plainExcerpt),
                    isPartOf: { "@id": `${SITE_URL}/#website` },
                    breadcrumb: { "@id": `${SITE_URL}/${data.slug}/#breadcrumb` },
                    primaryImageOfPage: featuredImage ? { "@type": "ImageObject", url: toAbsoluteUrl(featuredImage) } : { "@id": `${SITE_URL}/#logo` },
                    datePublished: data.date,
                    dateModified: data.modified,
                    inLanguage: "en-PK",
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": `${SITE_URL}/${data.slug}/#breadcrumb`,
                    itemListElement: [
                      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
                      { "@type": "ListItem", position: 3, name: category, item: `${SITE_URL}/blog/` },
                      { "@type": "ListItem", position: 4, name: plainTitle, item: `${SITE_URL}/${data.slug}/` },
                    ],
                  },
                  {
                    "@type": "FAQPage",
                    "@id": `${SITE_URL}/${data.slug}/#faq`,
                    mainEntity: faqs.map((faq) => ({
                      "@type": "Question",
                      name: faq.question,
                      acceptedAnswer: { "@type": "Answer", text: faq.answer },
                    })),
                  },
                ],
              }),
            }}
          />

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
              <Link href="/syed-qamar-abbas/" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-2.5 py-2 text-white/72 transition hover:border-brand-500/40 hover:text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-500/45 bg-brand-500/12 font-orbitron text-[11px] font-bold text-brand-300">
                  SQ
                </span>
                <span className="font-semibold text-white">{AUTHOR.name}</span>
              </Link>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">{formatWpDate(data.date)}</span>
              {data.modified !== data.date ? (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">Updated {formatWpDate(data.modified)}</span>
              ) : null}
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">{getReadingTimeFromHtml(contentHtml)} min read</span>
            </div>
          </header>

          {featuredImage ? (
            <div className="relative mx-auto mb-14 mt-10 aspect-video max-w-[980px] overflow-hidden rounded-[22px] border border-white/12 bg-[#111] shadow-[0_28px_100px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* Static Hostinger deployment cannot serve Next's image optimizer endpoint. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage}
                alt={`${plainTitle} — ${category} guide by Crea8iv Media`}
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

          <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,860px)] lg:items-start">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[18px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
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
                    {INTERNAL_LINKS.slice(0, 3).map((link) => (
                      <Link key={link.href} href={link.href} className="block text-white/62 hover:text-brand-300">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <section id="article-introduction" className="mb-10 rounded-[18px] border border-brand-500/25 bg-gradient-to-br from-brand-500/12 via-white/[0.04] to-transparent p-5 sm:p-7">
                <p className="mb-3 font-orbitron text-[10px] uppercase tracking-[0.18em] text-brand-300">Quick answer</p>
                <p className="text-base leading-8 text-white/82 sm:text-[17px]">{articleBrief}</p>
              </section>

              <WordPressContent html={contentHtml} className="tx-blogDetails-box__wrapper post-details-content" fallbackImage={pageFallbackImage} />

              <section className="mt-14 rounded-[20px] border border-white/10 bg-white/[0.035] p-6 sm:p-8" aria-labelledby="faq-heading">
                <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">FAQ</p>
                <h2 id="faq-heading" className="mt-3 font-syne text-3xl font-bold text-white">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-6">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-syne text-xl font-bold text-white">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-white/70">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-10 rounded-[20px] border border-brand-500/25 bg-gradient-to-br from-brand-500/14 via-white/[0.04] to-transparent p-6 sm:p-8">
                <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Next step</p>
                <h2 className="mt-3 font-syne text-3xl font-bold text-white">Need this executed for your business?</h2>
                <p className="mt-3 max-w-2xl leading-7 text-white/68">
                  Crea8iv Media builds SEO, paid ads, content, and automation systems for businesses in Rawalpindi, Islamabad, and across Pakistan.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/consultation/" className="rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-glow-sm hover:bg-brand-400">
                    Book Consultation
                  </Link>
                  <Link href="/contact/" className="rounded-full border border-white/35 px-5 py-3 text-sm font-bold text-white hover:border-brand-300">
                    Request Proposal
                  </Link>
                </div>
              </section>

              <section className="mt-10 rounded-[20px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Link
                    href="/syed-qamar-abbas/"
                    aria-label={`Read ${AUTHOR.name}'s founder profile`}
                    className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/12 font-orbitron text-xl font-bold text-brand-300 transition hover:border-brand-300"
                  >
                    SQ
                  </Link>
                  <div>
                    <Link href="/syed-qamar-abbas/" className="font-syne text-2xl font-bold text-white hover:text-brand-300">
                      {AUTHOR.name}
                    </Link>
                    <p className="mt-1 text-sm text-brand-300">{AUTHOR.role}</p>
                    <p className="mt-3 max-w-2xl leading-7 text-white/68">{AUTHOR.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {AUTHOR.expertise.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/62">{tag}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-4 text-sm">
                      {AUTHOR.socials.map((social) => (
                        <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-white">
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {relatedPosts.length ? (
            <section className="mt-16">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Related Articles</p>
                  <h2 className="mt-2 font-syne text-3xl font-bold text-white">Continue Reading</h2>
                </div>
                <Link href="/blog/" className="hidden text-sm font-semibold text-white/62 hover:text-brand-300 sm:block">
                  View all articles
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedPosts.map((post) => {
                  const postTitle = getPlainTitle(post);
                  const postImage = getPostImage(post);
                  const postCategory =
                    post._embedded?.["wp:term"]?.flat()?.find((term) => term?.name)?.name || "Digital Marketing";
                  return (
                    <Link key={post.id} href={`/blog/${post.slug}/`} className="group overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] transition hover:border-brand-500/40">
                      {/* Static Hostinger deployment cannot serve Next's image optimizer endpoint. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={postImage}
                        alt={postTitle}
                        width={420}
                        height={236}
                        loading="lazy"
                        className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="p-5">
                        <p className="font-orbitron text-[10px] uppercase tracking-[0.16em] text-brand-300">{postCategory}</p>
                        <h3 className="mt-3 font-syne text-lg font-bold leading-tight text-white">{postTitle}</h3>
                        <p className="mt-3 text-xs text-white/48">{formatWpDate(post.date)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </article>
        ) : (
        <>
          <PageSchema
            slug={data.slug}
            name={PAGE_METADATA[data.slug]?.title || plainTitle}
            description={PAGE_METADATA[data.slug]?.description || plainExcerpt}
            datePublished={data.date}
            dateModified={data.modified}
          />
          {slug === "pricing" ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  "@id": `${pageUrl("pricing")}#packages`,
                  name: "Digital Marketing Pricing and Packages in Rawalpindi",
                  description: PAGE_METADATA.pricing.description,
                  itemListElement: [
                    ["Google Business Profile Management", "20000"],
                    ["Social Media Management per platform", "10000"],
                    ["Branding Design", "50000"],
                    ["Monthly Creatives", "30000"],
                    ["Google Ads Management", "25000"],
                    ["Meta Ads Management", "25000"],
                    ["Website Design", "70000"],
                    ["Marketing Consultancy", "20000"],
                    ["On-site Shoot Visit", "25000"],
                  ].map(([name, price], index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "Offer",
                      price,
                      priceCurrency: "PKR",
                      url: pageUrl("pricing"),
                      itemOffered: { "@type": "Service", name, provider: { "@id": `${SITE_URL}/#business` } },
                    },
                  })),
                }),
              }}
            />
          ) : null}
          {isGrowthSystems ? <GrowthSystemsIntro /> : (
            <WordPressContent html={contentHtml} className={`tx-page-content ${detailStyles.legacy}`} fallbackImage={pageFallbackImage} offsetFixedHeader />
          )}
          {["about", "contact", "pricing", "consultation"].includes(slug) && <p className="registration-proof mx-auto my-6 max-w-5xl px-6 text-sm text-[#ff9b57]"><Link className="inline-flex min-h-11 items-center underline" href="/company-verification/">Pakistan sole proprietorship · Business information</Link></p>}
          {slug === "contact" && <PartnershipEnquiry />}
          {slug === "contact" ? <LocationExperience className="mt-14" /> : null}
          {serviceVisual ? (
            <section className="service-visual-showcase mx-auto mt-14 max-w-[1180px] px-5 sm:px-8 lg:px-10" aria-labelledby={`${slug}-visual-system`}>
              <div className="service-visual-card group">
                <div className="service-visual-media">
                  {/* Static export: serve the optimized WebP directly. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={serviceVisual.image}
                    alt={`${serviceVisual.title} visual by Crea8iv Media`}
                    width={1600}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="service-visual-image"
                  />
                </div>
                <div className="service-visual-copy">
                  <p className="service-visual-eyebrow">{serviceVisual.eyebrow}</p>
                  <h2 id={`${slug}-visual-system`} className="service-visual-title">{serviceVisual.title}</h2>
                  <p className="service-visual-body">{serviceVisual.body}</p>
                  <div className="service-visual-points">
                    {serviceVisual.points.map((point) => (
                      <span key={point}>{point}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
          {serviceVisual ? <ServiceDecisionPath serviceTitle={serviceVisual.eyebrow} /> : null}
          {serviceVisual ? <ServiceConversionSystem slug={slug} serviceTitle={isGrowthSystems ? "Growth Systems" : plainTitle} /> : null}
          <ServiceToolsPanel slug={slug} />
          <ServiceResources slug={slug} />
          {isGrowthSystems ? (
            <InsightsSection
              id="growth-insights"
              eyebrow="Recommended reading"
              issue="Growth systems"
              heading={<>Practical insights on <em>building growth systems.</em></>}
              intro="See how lead generation, marketing strategy and follow-up work in practice."
              linkLabel="View all articles"
              articles={suggestedReading.map((item) => ({ ...item, topic: item.category }))}
            />
          ) : suggestedReading.length ? (
            <section className="mx-auto mt-14 max-w-[1180px] px-5 sm:px-8 lg:px-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">Recommended Reading</p>
                  <h2 className="mt-2 font-syne text-3xl font-bold text-white">Support Articles For This Service</h2>
                </div>
                <Link href="/blog/" className="hidden text-sm font-semibold text-white/62 hover:text-brand-300 sm:block">
                  View all articles
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {suggestedReading.map((item) => (
                  <Link key={item.href} href={item.href} className="group overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] transition hover:border-brand-500/40">
                    {/* Static Hostinger deployment cannot serve Next's image optimizer endpoint. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      width={420}
                      height={236}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="p-5">
                      <p className="font-orbitron text-[10px] uppercase tracking-[0.16em] text-brand-300">{item.category}</p>
                      <h3 className="mt-3 font-syne text-lg font-bold leading-tight text-white">{item.title}</h3>
                      {item.description && <p className={growthStyles.articleSummary}>{item.description}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
          {/* AEO/SEO content appended below the Elementor design (design untouched) */}
          <PageSeoContent slug={slug} />
          {isGrowthSystems && <GrowthSystemsContact />}
        </>
        )}
      </ContentShell>
    </>
  );
}
