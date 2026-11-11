import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceClosing, ResourceDetails, ResourceHeading, ResourceHero } from "@/components/resource/ResourcePage";
import resourceStyles from "@/components/resource/resource-page.module.css";
import { aiVisibilityMonitoringCadence, aiVisibilityTargets } from "@/lib/ai-visibility-targets";
import { SITE_URL } from "@/lib/site-config";
import styles from "./targets.module.css";

const clusterIcons: Record<string, string> = {
  "website-development-pakistan": "service-orbit/03-websites",
  "local-city-growth": "connected-journey/01-discover",
  "industry-growth-systems": "connected-journey/05-follow-through",
  "software-ai-automation": "service-orbit/06-automation",
  "local-seo-google-business-profile": "service-orbit/02-seo-ai",
  "paid-ads-lead-generation": "service-orbit/05-paid-ads",
  "branding-content-social": "service-orbit/04-branding",
  "consultation-strategy": "service-orbit/01-strategy",
};

const cadence = [
  { period: "Weekly", icon: "connected-journey/01-discover" },
  { period: "Monthly", icon: "connected-journey/02-explore" },
  { period: "Quarterly", icon: "connected-journey/05-follow-through" },
].map(({ period, icon }) => ({
  period,
  icon,
  tasks: aiVisibilityMonitoringCadence
    .filter((task) => task.startsWith(`${period}: `))
    .map((task) => task.slice(period.length + 2)),
}));

const targetFaqs = [
  {
    question: "What queries should Crea8iv Media track for AI visibility?",
    answer: "Crea8iv Media should track website development, software development, AI automation, Google Business Profile, Meta Ads, Google Ads, branding, content, social media and industry-specific buyer queries in Pakistan.",
  },
  {
    question: "How often should AI visibility be monitored?",
    answer: "Priority queries should be checked weekly across search and AI answer surfaces, with monthly updates to weak pages, proof links, schema and supporting content.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Target Queries | Crea8iv Media" },
  description:
    "Crea8iv Media AI visibility query map for website development, software, ads, local SEO, social media, branding, content and industry growth systems in Pakistan.",
  alternates: { canonical: `${SITE_URL}/ai-visibility-targets/` },
};

function JsonLd() {
  const url = `${SITE_URL}/ai-visibility-targets/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Crea8iv Media AI Visibility Target Queries",
        description:
          "A query coverage map for Crea8iv Media's AI visibility, answer engine optimization and search discovery work in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Visibility Targets", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media AI visibility query clusters",
        itemListElement: aiVisibilityTargets.map((target, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: target.theme,
          description: target.directAnswer,
          url: `${SITE_URL}${target.primaryUrl}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: targetFaqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiVisibilityTargetsPage() {
  return (
    <main className={resourceStyles.page}>
      <JsonLd />
      <ResourceHero
        id="visibility-targets-title"
        breadcrumb="AI Visibility Targets"
        eyebrow="Crea8iv Media · AI visibility query map"
        heading={<>Priority queries for <em>search and AI answers.</em></>}
        intro="See which queries Crea8iv Media prioritises for websites, software, ads, local visibility, content, branding, consultation and industry growth in Pakistan."
        art={{
          src: "/img/homepage/buyer-journey/01-find-brand-v2.webp",
          alt: "A magnifying glass highlights a local business among map pins",
          width: 1120,
          height: 800,
        }}
        actions={[
          { href: "#visibility-clusters", label: "Browse query clusters" },
          { href: "/ai-visibility-targets.md", label: "Read the query map" },
        ]}
      />

      <section id="visibility-clusters" className={resourceStyles.section} aria-labelledby="clusters-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="clusters-heading"
            eyebrow="Priority clusters"
            heading={<>Query groups, source pages <em>and next actions.</em></>}
            intro="Each cluster shows the priority and primary page. Open its details for buyer intent, target queries, supporting links and planned updates."
          />
          <ol className={`${resourceStyles.cards} ${styles.clusters}`}>
            {aiVisibilityTargets.map((target, index) => (
              <ConnectedJourneyCard
                key={target.slug}
                title={target.theme}
                description={target.directAnswer}
                image={`/img/homepage/${clusterIcons[target.slug] ?? "connected-journey/01-discover"}.webp`}
                number={index + 1}
                containedIcon
              >
                <div className={styles.clusterActions}>
                  <span className={styles.priority}>{target.priority} priority</span>
                  <Link href={target.primaryUrl} className={resourceStyles.textLink}>
                    Open primary page <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <ResourceDetails label="Queries, sources and next actions">
                  <div className={styles.detailsBody}>
                    <div className={styles.fullWidth}>
                      <h4>Buyer intent</h4>
                      <p>{target.buyerIntent}</p>
                    </div>
                    <div>
                      <h4>Target queries</h4>
                      <ul>{target.targetQueries.map((query) => <li key={query}>{query}</li>)}</ul>
                    </div>
                    <div>
                      <h4>Supporting pages</h4>
                      <ul className={styles.supportLinks}>
                        {target.supportingUrls.map(({ href, label }) => (
                          <li key={href}>
                            <Link href={href} className={resourceStyles.textLink}>{label} <ArrowUpRight size={15} aria-hidden="true" /></Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.fullWidth}>
                      <h4>Next actions</h4>
                      <ul>{target.nextActions.map((action) => <li key={action}>{action}</li>)}</ul>
                    </div>
                  </div>
                </ResourceDetails>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${resourceStyles.section} ${resourceStyles.band}`} aria-labelledby="cadence-heading">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="cadence-heading"
            eyebrow="Monitoring cadence"
            heading={<>Check, update <em>and review.</em></>}
            intro="The weekly, monthly and quarterly rhythm for monitoring visibility and keeping the supporting pages current."
          />
          <ol className={resourceStyles.cards} data-columns="3">
            {cadence.map(({ period, icon, tasks }, index) => (
              <ConnectedJourneyCard
                key={period}
                title={period}
                description={tasks[0]}
                image={`/img/homepage/${icon}.webp`}
                number={index + 1}
                containedIcon
              >
                {tasks.slice(1).map((task) => <p key={task}>{task}</p>)}
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection
        id="visibility-targets-faq"
        headingId="visibility-targets-faq-title"
        eyebrow="Monitoring questions"
        heading={<>AI visibility <em>FAQs.</em></>}
        description="What to track and how often to review it."
        items={targetFaqs}
        centered
      />

      <ResourceClosing
        id="visibility-targets-sources"
        heading={<>Keep the <em>query map handy.</em></>}
        intro="Read the machine-readable query map or explore the AI search optimisation service."
        actions={[
          { href: "/ai-visibility-targets.md", label: "Read machine-readable map" },
          { href: "/ai-search-optimization/", label: "AI search optimization" },
        ]}
      />
    </main>
  );
}
