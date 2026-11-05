import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export const stwMoversStudy = {
  slug: "stw-movers-barcelona",
  name: "STW Movers",
  clientUrl: "https://www.stwmovers.com",
  url: `${SITE_URL}/case-studies/stw-movers-barcelona/`,
  title: "STW Movers: Website Development, Search Visibility & Lead Generation",
  description: "Crea8iv Media's STW Movers case study: a Barcelona chauffeur website, search architecture, travel content and preparation for measurable lead generation.",
  published: "2026-10-20",
  modified: "2026-10-20",
  dateLabel: "19 October 2026",
  publishedLabel: "20 October 2026",
  modifiedLabel: "20 October 2026",
  imageRoot: "/img/portfolio/websites/stw-movers",
  desktop: "/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp",
  mobile: "/img/portfolio/websites/stw-movers/stw-mobile-20261019.webp",
  service: "/img/portfolio/websites/stw-movers/stw-service-20261019.webp",
  answers: "/img/portfolio/websites/stw-movers/stw-answers-20261019.webp",
  social: "/img/portfolio/websites/stw-movers/stw-social-20261019.webp",
} as const;

export const stwMoversMetadata: Metadata = {
  title: { absolute: `${stwMoversStudy.title} | Crea8iv Media` },
  description: stwMoversStudy.description,
  alternates: { canonical: stwMoversStudy.url },
  authors: [{ name: "Crea8iv Media", url: `${SITE_URL}/about/` }],
  openGraph: {
    title: stwMoversStudy.title,
    description: stwMoversStudy.description,
    url: stwMoversStudy.url,
    siteName: "Crea8iv Media",
    type: "article",
    locale: "en_GB",
    publishedTime: stwMoversStudy.published,
    modifiedTime: stwMoversStudy.modified,
    authors: [`${SITE_URL}/about/`],
    images: [{ url: `${SITE_URL}${stwMoversStudy.social}`, width: 1200, height: 630, alt: "STW Movers Barcelona website on desktop and mobile" }],
  },
  twitter: { card: "summary_large_image", title: stwMoversStudy.title, description: stwMoversStudy.description, images: [`${SITE_URL}${stwMoversStudy.social}`] },
  robots: { index: true, follow: true },
};

export const stwArchitecture = [
  { role: "Service pages", purpose: "Explain the service, who it suits and which trip details to provide.", examples: "Barcelona airport transfers, private driver, executive chauffeur, hourly chauffeur, cruise-port transfers, group and family transport." },
  { role: "Location and route pages", purpose: "Resolve destination-specific questions and connect a place with the right service.", examples: "Eixample, Fira Barcelona, Sitges, Costa Brava; airport-to-city, airport-to-port and onward journeys." },
  { role: "Focused answer pages", purpose: "Give a direct response to one practical question, with context and a useful next step.", examples: "Flight delays, meet-and-greet arrangements, luggage requirements and choosing a chauffeur rather than an on-demand ride." },
  { role: "Editorial travel guides", purpose: "Support research with comparisons, checklists and source-backed planning detail.", examples: "Airport pickup, transport costs, cruise connections, business itineraries and multi-stop days." },
  { role: "Campaign landing pages", purpose: "Match commercial search intent to a concise service explanation and enquiry path.", examples: "Airport taxi, cab Barcelona, private transfer, taxi van and chauffeur Barcelona search journeys." },
] as const;

export const stwMeasurement = [
  { metric: "Organic discovery", definition: "Non-brand impressions and clicks, reviewed by query and landing page.", source: "Search Console; compare matching periods and account for seasonality." },
  { metric: "Content contribution", definition: "Article-to-service navigation and enquiry-start interactions.", source: "Consented web events; navigation and CTA clicks are intermediate actions." },
  { metric: "Lead quality", definition: "Enquiries with sufficient journey details and a genuine service requirement.", source: "Deduplicated enquiry records with an agreed qualification definition." },
  { metric: "Confirmed bookings", definition: "Reservations confirmed in the booking system, separated from quote requests.", source: "Backend booking records; cancellations and attribution limits reported separately." },
  { metric: "AI visibility", definition: "Observed mentions and linked citations across a fixed set of traveller questions.", source: "Repeatable query panel with dates, platform, wording and source URLs; AI referrals provide additional context." },
  { metric: "Experience and reliability", definition: "Mobile usability, field Core Web Vitals where available and vehicle/pricing API availability.", source: "Responsive review, field data and operational monitoring; build status is a separate signal." },
] as const;

export const stwFaqs = [
  { question: "What did Crea8iv Media deliver for STW Movers?", answer: "The engagement covers website development and UX, service and route architecture, technical SEO, answer-led travel content and lead-generation preparation. The website uses Nuxt 4, Vue and TypeScript, with a Java/Spring Boot booking backend. Google Ads strategy and measurement are part of the ongoing scope." },
  { question: "Is STW Movers a Barcelona street-hail taxi company?", answer: "STW Movers is a pre-booked private chauffeur and transfer service. Taxi and cab comparisons help travellers understand that distinction before choosing a service or requesting a quote." },
  { question: "Does this case study report verified campaign or booking results?", answer: "It documents implementation and qualitative outcomes. Approved campaign reports, enquiry records and booking attribution have not been supplied for this case study, so it does not report spend, lead volume, bookings, CPA or ROAS." },
  { question: "Does AI search readiness guarantee citations or rich results?", answer: "No. Clear service information, helpful answers, verifiable sources and accessible pages support discovery and understanding. They do not guarantee inclusion in ChatGPT, Gemini, Perplexity, Google AI Overviews or AI Mode. FAQs do not guarantee FAQ rich results, featured snippets or People Also Ask placement." },
] as const;

export function stwMoversSchema() {
  const study = stwMoversStudy;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${study.clientUrl}/#organization`, name: study.name, url: study.clientUrl },
      {
        "@type": "Article", "@id": `${study.url}#article`, headline: study.title, description: study.description,
        url: study.url, image: [`${SITE_URL}${study.social}`, `${SITE_URL}${study.desktop}`],
        datePublished: study.published, dateModified: study.modified, inLanguage: "en",
        author: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Crea8iv Media", url: `${SITE_URL}/about/` },
        publisher: { "@id": `${SITE_URL}/#organization` }, about: { "@id": `${study.clientUrl}/#organization` },
        mainEntityOfPage: { "@id": `${study.url}#webpage` },
        citation: [study.clientUrl, `${study.clientUrl}/services/barcelona-airport-transfer`, `${study.clientUrl}/answers`],
        articleSection: "Client case studies",
      },
      { "@type": "WebPage", "@id": `${study.url}#webpage`, url: study.url, name: study.title, isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@id": `${study.url}#article` }, breadcrumb: { "@id": `${study.url}#breadcrumb` } },
      { "@type": "BreadcrumbList", "@id": `${study.url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE_URL}/case-studies/` },
        { "@type": "ListItem", position: 3, name: study.name, item: study.url },
      ] },
    ],
  };
}
