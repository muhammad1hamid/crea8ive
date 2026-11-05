import { BUSINESS_DETAILS, BUSINESS_LOCATION, GOOGLE_MAPS_PLACE_URL } from "@/lib/site-config";
import { FOUNDER, buildFounderPersonSchema } from "@/lib/authority-data";
import { ORGANIZATION_SAME_AS } from "@/lib/social-links";

import { COMPANY } from "@/data/company";

const BRAND_LOGO_URL = "https://crea8ivmedia.com/img/crea8iv-logo-square.png";

const SERVICE_OFFERS = [
  { name: "Google Business Profile Growth", url: "https://crea8ivmedia.com/google-business-profile-growth/" },
  { name: "Social Media Management", url: "https://crea8ivmedia.com/social-media-management/" },
  { name: "Meta Ads Management", url: "https://crea8ivmedia.com/meta-ads/" },
  { name: "Google Ads Management", url: "https://crea8ivmedia.com/google-ads/" },
  { name: "Website Development", url: "https://crea8ivmedia.com/website-development/" },
  { name: "Branding and Creative Design", url: "https://crea8ivmedia.com/branding-and-creative/" },
  { name: "Content Creation", url: "https://crea8ivmedia.com/content-creation/" },
  { name: "Digital Marketing Consultation", url: "https://crea8ivmedia.com/consultation/" },
  { name: "Marketing Automation", url: "https://crea8ivmedia.com/marketing-automation/" },
  { name: "AI Search Optimization", url: "https://crea8ivmedia.com/ai-search-optimization/" },
  { name: "Software Development", url: "https://crea8ivmedia.com/software-development/" },
  { name: "AI Software Development", url: "https://crea8ivmedia.com/software-development/ai-software/" },
] as const;

const KNOWS_ABOUT = [
  "digital marketing in Pakistan",
  "website development in Pakistan",
  "software development in Pakistan",
  "Google Business Profile optimization",
  "local SEO",
  "Google Maps visibility",
  "social media management",
  "Meta Ads",
  "Google Ads",
  "lead generation",
  "branding and creative design",
  "content creation",
  "AI search optimization",
  "answer engine optimization",
  "generative engine optimization",
  "LLM visibility",
  "AI automation",
  "CRM development",
  "SaaS development",
  "restaurant websites",
  "clinic websites",
  "architecture portfolio websites",
  "interior design websites",
  "ecommerce websites",
] as const;

/**
 * Site-wide knowledge-graph schema (Organization + LocalBusiness + WebSite).
 * Rendered once in the root layout so every page emits the brand entity —
 * addresses the audit's #1/#2 issues (no Organization / no entity depth).
 */
export default function SiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://crea8ivmedia.com/#organization",
        name: BUSINESS_DETAILS.brandName,
        legalName: BUSINESS_DETAILS.legalName,
        subjectOf: { "@type": "WebPage", "@id": "https://crea8ivmedia.com/company-verification/" },
        url: "https://crea8ivmedia.com",
        description:
          "Crea8iv Media is a Rawalpindi-based digital marketing and software agency serving Pakistan with website development, software development, Google Business Profile growth, Google Ads, Meta Ads, social media management, branding, content creation, consultation, AI automation and AI search optimization.",
        logo: { "@type": "ImageObject", "@id": "https://crea8ivmedia.com/#logo", url: BRAND_LOGO_URL, width: 1024, height: 1024 },
        image: BRAND_LOGO_URL,
        email: BUSINESS_DETAILS.email,
        telephone: BUSINESS_DETAILS.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS_DETAILS.streetAddress,
          addressLocality: BUSINESS_DETAILS.addressLocality,
          addressRegion: BUSINESS_DETAILS.addressRegion,
          postalCode: BUSINESS_DETAILS.postalCode,
          addressCountry: BUSINESS_DETAILS.addressCountry,
        },
        areaServed: ["Rawalpindi", "Islamabad", "Pakistan", ...COMPANY.qatarMarkets],
        knowsAbout: KNOWS_ABOUT,
        founder: { "@type": "Person", "@id": FOUNDER.personId, name: FOUNDER.name },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BUSINESS_DETAILS.phone,
          contactType: "sales",
          areaServed: "PK",
          availableLanguage: ["en", "ur"],
        },
        sameAs: ORGANIZATION_SAME_AS,
      },
      {
        ...buildFounderPersonSchema(),
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": "https://crea8ivmedia.com/#business",
        name: BUSINESS_DETAILS.brandName,
        legalName: BUSINESS_DETAILS.legalName,
        description:
          "Crea8iv Media builds measurable digital growth systems for businesses in Rawalpindi, Islamabad and across Pakistan, combining premium websites, software, ads, local SEO, social media, branding, content, automation and AI visibility.",
        image: BRAND_LOGO_URL,
        url: "https://crea8ivmedia.com",
        telephone: BUSINESS_DETAILS.phone,
        email: BUSINESS_DETAILS.email,
        priceRange: "PKR 50,000 - PKR 250,000",
        parentOrganization: { "@type": "Organization", "@id": "https://crea8ivmedia.com/#organization", name: BUSINESS_DETAILS.brandName },
        founder: { "@type": "Person", "@id": FOUNDER.personId, name: FOUNDER.name },
        sameAs: ORGANIZATION_SAME_AS,
        knowsAbout: KNOWS_ABOUT,
        hasMap: GOOGLE_MAPS_PLACE_URL,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS_DETAILS.streetAddress,
          addressLocality: BUSINESS_DETAILS.addressLocality,
          addressRegion: BUSINESS_DETAILS.addressRegion,
          postalCode: BUSINESS_DETAILS.postalCode,
          addressCountry: BUSINESS_DETAILS.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS_LOCATION.latitude,
          longitude: BUSINESS_LOCATION.longitude,
        },
        areaServed: [
          { "@type": "City", name: "Rawalpindi" },
          { "@type": "City", name: "Islamabad" },
          { "@type": "Country", name: "Pakistan" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "10:00",
            closes: "18:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: SERVICE_OFFERS.map((service) => ({
            "@type": "Offer",
            url: service.url,
            areaServed: "Pakistan",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              url: service.url,
              provider: { "@type": "Organization", "@id": "https://crea8ivmedia.com/#organization", name: BUSINESS_DETAILS.brandName },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://crea8ivmedia.com/#website",
        url: "https://crea8ivmedia.com",
        name: "Crea8iv Media",
        publisher: { "@type": "Organization", "@id": "https://crea8ivmedia.com/#organization", name: BUSINESS_DETAILS.brandName },
        inLanguage: "en-PK",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://crea8ivmedia.com/?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
