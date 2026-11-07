import type { Metadata } from "next";
import ResultsEditorial from "@/components/portfolio/ResultsEditorial";
import { caseStudyShowcaseItems, showcaseItemToCreativeWork } from "@/lib/case-study-showcase";
import { websitePortfolioItems } from "@/lib/website-portfolio";

export const metadata: Metadata = {
  title: { absolute: "Website Portfolio Pakistan | Crea8iv Media" },
  description: "Explore Crea8iv Media website systems, brand identity, SEO, healthcare, restaurant, interiors, SaaS and conversion case studies from Pakistan.",
  keywords: [
    "website portfolio Pakistan",
    "website design portfolio Rawalpindi",
    "website design portfolio Islamabad",
    "digital marketing portfolio Pakistan",
    "branding agency portfolio Islamabad",
    "social media marketing portfolio Rawalpindi",
    "SEO website design Pakistan",
    "conversion focused website design",
    "Meta Ads creative portfolio",
    "healthcare marketing agency Pakistan",
    "restaurant branding portfolio",
    "e-commerce creative agency",
  ],
  alternates: { canonical: "https://crea8ivmedia.com/results/" },
  openGraph: {
    title: "Website Portfolio Pakistan | Crea8iv Media",
    description: "A curated showcase of SEO-ready websites, brand identities, campaign grids and growth creative by Crea8iv Media.",
    url: "https://crea8ivmedia.com/results/",
    type: "website",
  },
};

export default function ResultsPage() {
  const proofWorks = caseStudyShowcaseItems.map((item, index) => showcaseItemToCreativeWork(item, index + 1));
  const portfolioWebsites = websitePortfolioItems.map((item, index) => ({
    "@type": "CreativeWork",
    position: proofWorks.length + index + 1,
    name: `${item.brand} - ${item.title}`,
    headline: item.title,
    description: item.summary,
    url: item.external ? item.href : `https://crea8ivmedia.com${item.href}`,
    image: `https://crea8ivmedia.com${item.image}`,
    keywords: item.seoKeywords.join(", "),
    creator: {
      "@type": "Organization",
      name: "Crea8iv Media",
      url: "https://crea8ivmedia.com/",
    },
    workExample: item.services,
    areaServed: item.location,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://crea8ivmedia.com/results/#webpage",
        name: "Crea8iv Media Portfolio",
        url: "https://crea8ivmedia.com/results/",
        description: "Crea8iv Media's portfolio of websites, branding, social media, digital marketing grids and content systems.",
        isPartOf: { "@type": "WebSite", "@id": "https://crea8ivmedia.com/#website", name: "Crea8iv Media", url: "https://crea8ivmedia.com/" },
        publisher: { "@type": "Organization", "@id": "https://crea8ivmedia.com/#organization", name: "Crea8iv Media" },
        about: ["Website design", "Conversion-focused web development", "Brand identity", "Social media marketing", "Digital marketing", "Content creation", "SEO content"],
        hasPart: [...proofWorks, ...portfolioWebsites],
        mainEntity: { "@id": "https://crea8ivmedia.com/results/#proof-list" },
      },
      {
        "@type": "ItemList",
        "@id": "https://crea8ivmedia.com/results/#proof-list",
        name: "Crea8iv Media results, case studies and website portfolio",
        itemListElement: [...proofWorks, ...portfolioWebsites],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://crea8ivmedia.com/results/#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://crea8ivmedia.com/" },
          { "@type": "ListItem", position: 2, name: "Results", item: "https://crea8ivmedia.com/results/" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ResultsEditorial />
    </>
  );
}
