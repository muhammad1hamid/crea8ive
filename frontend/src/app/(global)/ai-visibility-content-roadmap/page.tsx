import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceChecklist, ResourceClosing, ResourceDetails, ResourceHeading, ResourceHero } from "@/components/resource/ResourcePage";
import resourceStyles from "@/components/resource/resource-page.module.css";
import { SITE_URL } from "@/lib/site-config";
import styles from "./roadmap.module.css";

const PAGE_URL = `${SITE_URL}/ai-visibility-content-roadmap/`;
const LAST_UPDATED = "2026-09-13";

const contentAssets = [
  {
    title: "Best Digital Marketing Agency in Rawalpindi: What Businesses Should Compare",
    type: "Best-of buyer guide",
    cluster: "Local city growth",
    targetQuery: "best digital marketing agency Rawalpindi",
    targetUrl: "/contact/",
    supportingUrls: ["/about/", "/clients/", "/company-verification/", "/ai-visibility-growth/"],
    citationGoal: "Become easier to cite for local agency comparison and Rawalpindi business growth queries.",
  },
  {
    title: "Website Development Company in Pakistan: Portfolio, SEO, Pricing and Support Checklist",
    type: "Definitive guide",
    cluster: "Website development",
    targetQuery: "website development company Pakistan",
    targetUrl: "/website-development/pakistan/",
    supportingUrls: ["/website-portfolio/", "/guides/best-website-development-company-pakistan/", "/pricing.md"],
    citationGoal: "Support AI and search answers for website partner selection, scope and proof.",
  },
  {
    title: "AI Search Optimization in Pakistan: AEO, GEO, LLMO and Entity SEO Explained",
    type: "Definition guide",
    cluster: "AI visibility",
    targetQuery: "AI search optimization Pakistan",
    targetUrl: "/ai-search-optimization/",
    supportingUrls: ["/ai-visibility-growth/", "/ai-visibility-targets/", "/tools/ai-visibility-checker/"],
    citationGoal: "Own the direct definition for AI visibility and answer engine optimization in Pakistan.",
  },
  {
    title: "Google Business Profile Agency in Pakistan: Maps, Reviews and Local Lead Signals",
    type: "How-to guide",
    cluster: "Local SEO",
    targetQuery: "Google Business Profile agency Pakistan",
    targetUrl: "/google-business-profile-growth/pakistan/",
    supportingUrls: ["/tools/local-seo-audit/", "/blog/google-business-profile-optimization-checklist/", "/industries/restaurants-cafes/"],
    citationGoal: "Get cited for Google Maps, reviews, local rankings and call enquiry guidance.",
  },
  {
    title: "Meta Ads Agency in Pakistan: Lead Quality, Creative Testing and WhatsApp Follow-Up",
    type: "Service buyer guide",
    cluster: "Paid ads",
    targetQuery: "Meta Ads agency Pakistan",
    targetUrl: "/meta-ads/pakistan/",
    supportingUrls: ["/tools/meta-ads-budget-calculator/", "/answers/meta-ads-agency-pakistan/", "/growth-systems/"],
    citationGoal: "Support paid social and WhatsApp lead generation answers with clear process and conversion path.",
  },
  {
    title: "Facebook and Instagram Ads in Pakistan: Creative, Targeting and Lead Flow",
    type: "Paid ads guide",
    cluster: "Paid ads",
    targetQuery: "Facebook and Instagram Ads Pakistan",
    targetUrl: "/blog/facebook-instagram-ads-pakistan-guide/",
    supportingUrls: ["/google-ads/pakistan/", "/meta-ads/pakistan/", "/consultation/"],
    citationGoal: "Support clear answers about paid social planning and lead generation.",
  },
  {
    title: "Restaurant Marketing Agency in Pakistan: Maps, Reels, Menu Pages, Ads and Reviews",
    type: "Industry playbook",
    cluster: "Restaurants",
    targetQuery: "restaurant marketing agency Pakistan",
    targetUrl: "/industries/restaurants-cafes/",
    supportingUrls: ["/results/restaurants/", "/website-development/restaurants/", "/answers/restaurant-marketing-agency-pakistan/"],
    citationGoal: "Connect hospitality proof, local SEO, content and conversion pages for restaurant queries.",
  },
  {
    title: "Clinic Website Development in Pakistan: Treatment Pages, Trust and Appointment Flow",
    type: "Industry guide",
    cluster: "Healthcare",
    targetQuery: "clinic website development Pakistan",
    targetUrl: "/website-development/clinics/",
    supportingUrls: ["/industries/clinics-dental/", "/results/health-clinics/", "/patientflow/"],
    citationGoal: "Improve discoverability for clinic, dental and aesthetic website intent.",
  },
  {
    title: "Custom Software Development Company in Pakistan: CRM, SaaS, Dashboard and AI Scope",
    type: "Definitive guide",
    cluster: "Software development",
    targetQuery: "custom software development company Pakistan",
    targetUrl: "/software-development/pakistan/",
    supportingUrls: ["/software-development/custom-software/", "/software-development/saas/", "/guides/custom-software-development-company-pakistan/"],
    citationGoal: "Support AI answers for custom software, SaaS MVP, CRM and automation partner selection.",
  },
  {
    title: "WhatsApp Lead Management System for Clinics and Service Businesses",
    type: "How-to guide",
    cluster: "Automation",
    targetQuery: "WhatsApp lead management system Pakistan",
    targetUrl: "/marketing-automation/",
    supportingUrls: ["/patientflow/", "/growth-systems/", "/consultation/"],
    citationGoal: "Build topical authority around lead response, CRM, follow-up and automation.",
  },
  {
    title: "AI Visibility Tracker: How to Monitor Brand Mentions in ChatGPT and Perplexity",
    type: "How-to guide",
    cluster: "AI visibility measurement",
    targetQuery: "AI visibility tracker brand mentions",
    targetUrl: "/ai-visibility-growth/",
    supportingUrls: ["/ai-visibility-tracker-template.csv", "/ai-visibility-tracker-template.md", "/tools/ai-visibility-checker/"],
    citationGoal: "Turn the tracking template into a citeable methodology page.",
  },
  {
    title: "Schema Markup for Local Businesses in Pakistan",
    type: "Technical guide",
    cluster: "Technical SEO",
    targetQuery: "schema markup local businesses Pakistan",
    targetUrl: "/tools/schema-markup-generator/",
    supportingUrls: ["/ai-search-optimization/", "/tools/seo-audit/", "/company-verification/"],
    citationGoal: "Support schema, entity SEO, LocalBusiness and FAQPage queries.",
  },
] as const;

const contentTypes = [
  { label: "Comparison articles", reason: "Compare options side by side to support buyer decisions.", icon: "connected-journey/03-trust" },
  { label: "Definitive guides", reason: "Define a service or category and explain what to look for.", icon: "connected-journey/02-explore" },
  { label: "How-to guides", reason: "Answer questions about processes, checklists and implementation.", icon: "service-orbit/01-strategy" },
  { label: "Industry playbooks", reason: "Answer industry questions for clinics, restaurants and architects.", icon: "connected-journey/05-follow-through" },
] as const;

const clusterIcons: Record<string, string> = {
  "Local city growth": "connected-journey/01-discover",
  "Website development": "service-orbit/03-websites",
  "AI visibility": "service-orbit/02-seo-ai",
  "Local SEO": "connected-journey/01-discover",
  "Paid ads": "service-orbit/05-paid-ads",
  Restaurants: "connected-journey/01-discover",
  Healthcare: "connected-journey/03-trust",
  "Software development": "service-orbit/06-automation",
  Automation: "service-orbit/06-automation",
  "AI visibility measurement": "connected-journey/05-follow-through",
  "Technical SEO": "connected-journey/02-explore",
};

const publishingRules = [
  "Lead with a direct 40-60 word answer block.",
  "Add FAQ content only when it is visible and useful.",
  "Link to one service page, one tool, one proof page and one consultation path.",
  "Avoid fake proof, fake metrics, fake reviews and unsupported awards.",
  "Show last updated date and author/entity context.",
  "Use tables for comparisons and numbered lists for process content.",
  "Keep schema aligned with visible page content.",
  "Track impressions, clicks, AI citations and lead actions after publishing.",
];

const roadmapFaqs = [
  {
    question: "Which content types should Crea8iv Media prioritize for AI visibility?",
    answer: "Crea8iv Media should prioritize comparison articles, definitive guides, how-to guides, industry playbooks, proof-backed portfolio pages and technical explainers because these formats are easier for AI systems to extract and cite.",
  },
  {
    question: "How should the roadmap be used?",
    answer: "Use the roadmap to publish, refresh and internally link content assets around priority query clusters. Each asset should connect to a service page, tool, answer brief, proof page and consultation path.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Content Roadmap | Crea8iv Media" },
  description:
    "A crawlable content sprint roadmap for Crea8iv Media covering AI-citable guides, comparisons, industry pages and traffic-growth topics.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Visibility Content Roadmap | Crea8iv Media",
    description:
      "Priority content assets for AI citations, search traffic and qualified lead growth across services and industries.",
    url: PAGE_URL,
    siteName: "Crea8iv Media",
    type: "website",
    images: [{ url: `${SITE_URL}/img/services/ad-concepts/growth-system-ad-concept.webp`, width: 1200, height: 675, alt: "AI visibility content roadmap" }],
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "AI Visibility Content Roadmap",
        description: metadata.description,
        datePublished: LAST_UPDATED,
        dateModified: LAST_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@id": `${SITE_URL}/#organization` },
          { "@type": "Thing", name: "AI visibility content strategy" },
          { "@type": "Thing", name: "AI citation optimization" },
          { "@type": "Thing", name: "Topical authority" },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-PK",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#content-roadmap`,
        name: "Crea8iv Media AI visibility content sprint roadmap",
        itemListElement: contentAssets.map((asset, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: asset.title,
          description: `${asset.type}. Target query: ${asset.targetQuery}. ${asset.citationGoal}`,
          url: `${SITE_URL}${asset.targetUrl}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Visibility Content Roadmap", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: roadmapFaqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiVisibilityContentRoadmapPage() {
  return (
    <main className={resourceStyles.page}>
      <JsonLd />
      <ResourceHero
        id="visibility-roadmap-title"
        breadcrumb="AI Visibility Content Roadmap"
        eyebrow="Citation-ready content sprint"
        heading={<>AI visibility content roadmap <em>for search growth.</em></>}
        intro="See which guides, comparisons, how-to pages and industry playbooks Crea8iv Media plans to publish or refresh to improve search visibility, AI mentions, citations and qualified enquiries."
        note={<>Last updated <time dateTime={LAST_UPDATED}>September 13, 2026</time></>}
        art={{
          src: "/img/services/ad-concepts/growth-system-ad-concept.webp",
          alt: "Website, content, advertising and local search connected in one growth system",
          width: 960,
          height: 540,
        }}
        actions={[
          { href: "#content-roadmap", label: "Browse planned assets" },
          { href: "/ai-visibility-content-roadmap.md", label: "Read the Markdown roadmap" },
        ]}
      />

      <section className={`${resourceStyles.section} ${resourceStyles.band}`} aria-labelledby="sprint-formats-title">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="sprint-formats-title"
            eyebrow="Sprint focus"
            heading={<>Choose the format <em>that fits the question.</em></>}
            intro="Compare options, define a service, explain a process or show how a plan applies to one industry."
          />
          <ol className={resourceStyles.cards} data-columns="4">
            {contentTypes.map(({ label, reason, icon }, index) => (
              <ConnectedJourneyCard
                key={label}
                title={label}
                description={reason}
                image={`/img/homepage/${icon}.webp`}
                number={index + 1}
                containedIcon
              />
            ))}
          </ol>
        </div>
      </section>

      <section id="content-roadmap" className={resourceStyles.section} aria-labelledby="roadmap-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="roadmap-heading"
            eyebrow={`${contentAssets.length} planned assets`}
            heading={<>What to publish or refresh <em>in priority order.</em></>}
            intro="Each planned piece has a target query, a citation goal and links to the pages that can support it."
          />
          <ol className={`${resourceStyles.cards} ${styles.assets}`}>
            {contentAssets.map((asset, index) => (
              <ConnectedJourneyCard
                key={asset.title}
                title={asset.title}
                description={asset.citationGoal}
                image={`/img/homepage/${clusterIcons[asset.cluster] ?? "connected-journey/02-explore"}.webp`}
                number={index + 1}
                containedIcon
              >
                <div className={styles.assetContext}>
                  <p className={styles.assetType}>{asset.type} · {asset.cluster}</p>
                  <dl className={styles.query}>
                    <dt>Target query</dt>
                    <dd>{asset.targetQuery}</dd>
                  </dl>
                  <Link href={asset.targetUrl} className={resourceStyles.textLink}>
                    Open target page <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <ResourceDetails label="Supporting links">
                  <ul className={styles.supportLinks}>
                    {asset.supportingUrls.map((url) => (
                      <li key={url}>
                        <Link href={url} className={resourceStyles.textLink}>
                          <span>{url}</span> <ArrowUpRight size={15} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </ResourceDetails>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${resourceStyles.section} ${resourceStyles.band}`} aria-labelledby="rules-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="rules-heading"
            eyebrow="Publishing rules"
            heading={<>Write the answer, <em>then show the proof.</em></>}
            intro="Use this checklist to make each piece easy to read, verify and act on."
          />
          <ResourceChecklist items={publishingRules} columns={2} />
          <div className={styles.planLink}>
            <Link href="/ai-visibility-growth/" className={resourceStyles.textLink}>
              View growth operating plan <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        id="visibility-roadmap-faq"
        headingId="visibility-roadmap-faq-title"
        eyebrow="Planning questions"
        heading={<>Content roadmap <em>FAQs.</em></>}
        description="Which formats to prioritise and how to use this roadmap."
        items={roadmapFaqs}
        centered
      />

      <ResourceClosing
        id="roadmap-next-step"
        heading={<>Track what you <em>publish and refresh.</em></>}
        intro="Use the tracker to review published assets, or discuss your priorities in a content audit."
        actions={[
          { href: "/ai-visibility-tracker-template.csv", label: "Track published assets" },
          { href: "/consultation/", label: "Book content audit" },
        ]}
      />
    </main>
  );
}
