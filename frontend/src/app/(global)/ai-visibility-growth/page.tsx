import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { FaqSection } from "@/components/HomepageFaq";
import actionStyles from "@/components/homepage-final-cta.module.css";
import { ResourceChecklist, ResourceClosing, ResourceHeading, ResourceHero } from "@/components/resource/ResourcePage";
import resource from "@/components/resource/resource-page.module.css";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { aiVisibilityTargets } from "@/lib/ai-visibility-targets";
import { BUSINESS_DETAILS, SITE_URL } from "@/lib/site-config";
import styles from "./growth-plan.module.css";

const PAGE_URL = `${SITE_URL}/ai-visibility-growth/`;
const LAST_UPDATED = "2026-09-13";

const priorityQueries = [
  "best digital marketing agency Rawalpindi",
  "website development company Pakistan",
  "AI search optimization Pakistan",
  "Google Business Profile agency Pakistan",
  "Meta Ads agency Pakistan",
  "restaurant marketing agency Pakistan",
  "clinic website development Pakistan",
  "custom software development company Pakistan",
] as const;

const operatingCadence = [
  {
    title: "Weekly AI citation check",
    body: "Run the priority query set in Google Search, visible AI results, ChatGPT with search, Perplexity and Gemini. Log whether Crea8iv Media is cited, mentioned, absent or described incorrectly.",
  },
  {
    title: "Monthly page refresh",
    body: "Update pages with weak clicks or weak AI visibility by improving direct answer blocks, proof links, FAQ depth, schema alignment and internal links.",
  },
  {
    title: "Authority distribution",
    body: "Create off-site signals through Google Business Profile posts, founder LinkedIn content, YouTube transcripts, partner mentions, directory consistency and useful community answers.",
  },
  {
    title: "Traffic to lead capture",
    body: "Measure WhatsApp clicks, call clicks, form starts, consultation visits and tool usage so AI and organic visibility turns into qualified enquiries.",
  },
] as const;

const ninetyDayPlan = [
  {
    phase: "Weeks 1-2",
    title: "Measurement and entity cleanup",
    actions: [
      "Create a weekly query tracking sheet for AI mentions, citations, competitors and source URLs.",
      "Confirm entity consistency across website, Google Business Profile, social profiles, founder page and machine-readable files.",
      "Add missing SameAs, proof and source-of-truth links only where they are real and public.",
    ],
  },
  {
    phase: "Weeks 3-4",
    title: "Top service page upgrades",
    actions: [
      "Refresh the top eight service pages with direct answer blocks for fit, scope, pricing, timeline, proof and next step.",
      "Connect every priority service page to one tool, one answer brief, one proof page and one consultation path.",
      "Check that FAQ schema matches visible FAQs and avoids unsupported claims.",
    ],
  },
  {
    phase: "Month 2",
    title: "Authority content sprint",
    actions: [
      "Publish high-intent guides around AI visibility, local SEO, website development, clinics, restaurants, ads and automation.",
      "Create comparison pages where buyers naturally ask X vs Y questions.",
      "Add one portfolio or proof update for each priority industry cluster when real evidence is available.",
    ],
  },
  {
    phase: "Month 3",
    title: "Distribution and citation building",
    actions: [
      "Repurpose guides into founder LinkedIn posts, Google Business Profile posts, YouTube scripts and short answer assets.",
      "Build consistent third-party mentions without fake awards, fake metrics or unsupported claims.",
      "Review Search Console and AI mention logs to decide the next content cluster.",
    ],
  },
] as const;

const conversionSignals = [
  "WhatsApp click from AI, service and tool pages",
  "Consultation page visits from blog, guide and answer pages",
  "Form submits by service category",
  "Tool completions and related CTA clicks",
  "Search Console impressions and clicks by query cluster",
  "AI referral and assistant traffic where analytics exposes it",
] as const;

const trackerFields = [
  "Query and cluster",
  "Platform checked",
  "Crea8iv mention/citation status",
  "Cited source URL",
  "Competitors cited",
  "Description accuracy",
  "Search Console metrics",
  "Lead actions",
  "Next action and owner",
] as const;

const cadenceIcons = ["connected-journey/01-discover", "connected-journey/02-explore", "connected-journey/03-trust", "connected-journey/05-follow-through"];
const phaseIcons = ["service-orbit/02-seo-ai", "service-orbit/03-websites", "service-orbit/04-branding", "connected-journey/05-follow-through"];
const clusterIcons = ["03-websites", "02-seo-ai", "01-strategy", "06-automation", "02-seo-ai", "05-paid-ads", "04-branding", "01-strategy"];

const growthFaqs = [
  { question: "How can Crea8iv Media improve AI visibility?", answer: "Crea8iv Media can improve AI visibility by tracking priority queries, publishing extractable answer blocks, keeping schema aligned with visible content, strengthening real proof pages and building consistent third-party entity signals." },
  { question: "Which traffic signals should be monitored?", answer: "The most useful signals are AI mentions, source citations, Search Console impressions and clicks, WhatsApp clicks, call clicks, form submissions, tool completions and consultation page visits." },
];

export const metadata: Metadata = {
  title: { absolute: "AI Visibility Growth Plan for Crea8iv Media" },
  description:
    "Crea8iv Media's AI visibility growth operating plan for tracking AI citations, improving traffic, strengthening authority and converting organic demand into leads.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Visibility Growth Plan for Crea8iv Media",
    description:
      "A crawlable operating plan for AI citation monitoring, query clusters, authority signals and traffic-to-lead measurement.",
    url: PAGE_URL,
    siteName: "Crea8iv Media",
    type: "website",
    images: [{ url: `${SITE_URL}/img/services/ad-concepts/ai-automation-ad-concept.webp`, width: 1200, height: 675, alt: "AI visibility growth system" }],
  },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "AI Visibility Growth Plan for Crea8iv Media",
        description: metadata.description,
        datePublished: LAST_UPDATED,
        dateModified: LAST_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@id": `${SITE_URL}/#organization` },
          { "@type": "Thing", name: "AI visibility" },
          { "@type": "Thing", name: "Answer engine optimization" },
          { "@type": "Thing", name: "Generative engine optimization" },
          { "@type": "Thing", name: "AI citation monitoring" },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-PK",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
      },
      {
        "@type": "HowTo",
        "@id": `${PAGE_URL}#howto`,
        name: "How Crea8iv Media should grow AI visibility and traffic",
        description:
          "A 90-day operating workflow for AI citation tracking, content refresh, authority building and conversion measurement.",
        totalTime: "P90D",
        step: ninetyDayPlan.map((phase, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `${phase.phase}: ${phase.title}`,
          text: phase.actions.join(" "),
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#queries`,
        name: "Priority AI visibility and SEO queries",
        itemListElement: priorityQueries.map((query, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: query,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Visibility Growth", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: growthFaqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AiVisibilityGrowthPage() {
  return (
    <main className={resource.page}>
      <JsonLd />
      <ResourceHero
        id="ai-growth-title"
        breadcrumb="AI Visibility Growth"
        eyebrow="AI visibility and organic traffic"
        heading={<>AI visibility growth plan <em>for Crea8iv Media.</em></>}
        intro={`Track priority queries, publish clear answers, align schema with visible facts and connect verifiable evidence to qualified enquiries. This is the 90-day operating plan for ${BUSINESS_DETAILS.brandName}.`}
        note={<>Last updated <time dateTime={LAST_UPDATED}>September 13, 2026</time></>}
        art={{ src: "/img/services/ad-concepts/ai-automation-ad-concept.webp", alt: "A central AI system linking messages, planning, qualification and measurement", width: 960, height: 540 }}
        actions={[
          { href: "#ninety-day-plan", label: "View the 90-day plan" },
          { href: "/ai-visibility-tracker-template.csv", label: "Open tracker CSV" },
        ]}
      />

      <section id="ninety-day-plan" className={`${resource.section} ${resource.band}`} aria-labelledby="ninety-day-heading">
        <div className={resource.inner}>
          <ResourceHeading id="ninety-day-heading" eyebrow="90-day action plan" heading={<>Measure, improve <em>and distribute.</em></>} intro="Start with tracking and reliable business facts. Then refresh key service pages, publish supporting content and review what earns useful visibility." />
          <ol className={resource.cards}>
            {ninetyDayPlan.map(({ phase, title, actions }, index) => (
              <ConnectedJourneyCard key={phase} title={title} description={phase} image={`/img/homepage/${phaseIcons[index]}.webp`} number={index + 1} containedIcon>
                <ResourceChecklist items={actions} />
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section className={resource.section} aria-labelledby="cadence-heading">
        <div className={resource.inner}>
          <ResourceHeading id="cadence-heading" eyebrow="Operating cadence" heading={<>Check what changed. <em>Decide what to do next.</em></>} intro="Use the weekly citation checks and monthly page refreshes to guide distribution and lead measurement." />
          <ol className={resource.cards} data-columns="4">
            {operatingCadence.map(({ title, body }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={body} image={`/img/homepage/${cadenceIcons[index]}.webp`} number={index + 1} containedIcon />
            ))}
          </ol>
        </div>
      </section>

      <section className={`${resource.section} ${resource.band}`} aria-labelledby="template-heading">
        <div className={resource.inner}>
          <ResourceHeading id="template-heading" eyebrow="Tracking template" heading={<>One record for queries, <em>citations and lead actions.</em></>} intro="Keep each review comparable. Record who is cited, which sources are used, how accurately the business is described and what needs attention next." />
          <div className={styles.split}>
            <div><h3>Priority query set</h3><ResourceChecklist items={priorityQueries} /></div>
            <div><h3>Tracker fields</h3><ResourceChecklist items={trackerFields} /></div>
          </div>
          <div className={styles.actions}>
            <Link href="/ai-visibility-tracker-template.csv" className={actionStyles.primary}>Open CSV template <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/ai-visibility-tracker-template.md" className={resource.textLink}>Read tracker guide <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={resource.section} aria-labelledby="clusters-heading">
        <div className={resource.inner}>
          <ResourceHeading id="clusters-heading" eyebrow="Traffic clusters" heading={<>Give every query cluster <em>a useful destination.</em></>} intro="Pair the main service page with supporting proof, a relevant tool and a clear next step. Use the target map to see the full set of queries and supporting pages." />
          <ol className={`${resource.cards} ${styles.clusters}`} data-columns="4">
            {aiVisibilityTargets.slice(0, 8).map(({ slug, theme, directAnswer, priority, primaryUrl }, index) => (
              <ConnectedJourneyCard key={slug} title={theme} description={directAnswer} image={`/img/homepage/service-orbit/${clusterIcons[index]}.webp`} number={index + 1} containedIcon>
                <div className={styles.clusterFoot}>
                  <span>{priority} priority</span>
                  <Link href={primaryUrl} className={resource.textLink}>Open primary page <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
              </ConnectedJourneyCard>
            ))}
          </ol>
          <div className={styles.actions}>
            <Link href="/ai-visibility-targets/" className={resource.textLink}>Full target map <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/ai-visibility-content-roadmap/" className={resource.textLink}>Content roadmap <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/ai-citation-sources/" className={resource.textLink}>Citation sources <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className={`${resource.section} ${resource.band}`} aria-labelledby="measurement-heading">
        <div className={resource.inner}>
          <ResourceHeading id="measurement-heading" eyebrow="Lead measurement" heading={<>Track useful traffic <em>and qualified enquiries.</em></>} intro="Review what people do after they discover a page. Use that evidence to decide which content, offers and enquiry paths to improve." />
          <div className={styles.split}>
            <div><h3>Conversion signals</h3><ResourceChecklist items={conversionSignals} /></div>
            <NotchedProjectCard
              href="/case-studies/stw-movers-barcelona/"
              title="STW Movers Barcelona case study"
              description="See how search architecture, traveller answers and enquiry preparation work together."
              image="/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp"
              imageAlt="STW Movers Barcelona chauffeur website"
              surface="var(--resource-band)"
              tags={["Search architecture"]}
              className={styles.evidence}
            />
          </div>
          <div className={styles.actions}>
            <Link href="/tools/ai-visibility-checker/" className={resource.textLink}>Run AI visibility checker <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/tools/" className={resource.textLink}>View free tools <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <FaqSection id="ai-growth-faq" headingId="ai-growth-faq-title" eyebrow="Monitoring questions" heading={<>AI visibility growth <em>FAQs.</em></>} description="What to improve and how to measure the response." items={growthFaqs} centered />
      <ResourceClosing
        id="ai-growth-next-step"
        heading={<>Start with a baseline <em>you can track.</em></>}
        intro="Use the plan to review current visibility and agree which gaps to address first."
        actions={[
          { href: "/consultation/", label: "Book AI visibility audit" },
          { href: "/ai-visibility-growth-plan.md", label: "Read machine-readable plan" },
        ]}
      />
    </main>
  );
}
