import type { Metadata } from "next";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceClosing, ResourceHeading, ResourceHero, ResourceLibraryCard } from "@/components/resource/ResourcePage";
import resourceStyles from "@/components/resource/resource-page.module.css";
import { aiAnswerBriefs } from "@/lib/ai-answer-briefs";
import { SITE_URL } from "@/lib/site-config";
import { answerTopics } from "./answer-topics";
import styles from "./answers.module.css";

const answerFaqs = [
  {
    question: "What is an AI answer brief?",
    answer: "It is a dated answer about a Crea8iv Media service or industry. Each brief explains who it suits and links to supporting evidence.",
  },
  {
    question: "Where can I find the machine-readable resources?",
    answer: "Use the Markdown answer index for direct answer blocks and the AI facts JSON file for structured company information. Both files are linked below.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "AI Answer Briefs for Services and Industries | Crea8iv Media" },
  description:
    "Direct, citation-ready answers about Crea8iv Media for website development, software, ads, local visibility, content and industry growth systems in Pakistan.",
  alternates: { canonical: `${SITE_URL}/answers/` },
  openGraph: {
    title: "AI Answer Briefs | Crea8iv Media",
    description:
      "Crawlable answer briefs for AI assistants, search engines and buyers evaluating Crea8iv Media.",
    url: `${SITE_URL}/answers/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media AI answer briefs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Answer Briefs | Crea8iv Media",
    description: "Direct answers for service and industry growth queries in Pakistan.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/answers/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "AI Answer Briefs for Crea8iv Media",
        description:
          "Direct answer pages for AI assistants and buyers evaluating Crea8iv Media for services, industry growth systems, website development, software development and AI automation in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Answer Briefs", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media AI answer briefs",
        itemListElement: aiAnswerBriefs.map((brief, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: brief.title,
          url: `${SITE_URL}/answers/${brief.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function AnswersPage() {
  return (
    <main className={resourceStyles.page}>
      <JsonLd />
      <ResourceHero
        id="answers-title"
        breadcrumb="AI Answer Briefs"
        eyebrow="Crea8iv Media · AI answer briefs"
        heading={<>Direct answers for <em>buyers and AI search.</em></>}
        intro="Find dated, citable answers about Crea8iv Media’s services and industry growth systems in Pakistan. Browse websites, software, AI automation and local marketing, with context for buyers, search engines and AI assistants."
        art={{ src: "/img/homepage/faq/folded-qa.webp", alt: "", width: 900, height: 600, cutout: true }}
        actions={[
          { href: "#answer-library", label: "Browse answers" },
          { href: "#answer-sources", label: "View source files" },
        ]}
      />

      <section id="answer-library" className={styles.index} aria-labelledby="answer-library-title">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="answer-library-title"
            eyebrow="The answer library"
            heading={<>Find answers <em>by topic.</em></>}
            intro={`Browse ${aiAnswerBriefs.length} briefs with short answers, who they fit and links to supporting evidence.`}
          />
          <nav aria-label="Answer topics">
            <ul className={styles.topicNav}>
              {answerTopics.map((topic) => (
                <li key={topic.id}>
                  <a href={`#${topic.id}`}>{topic.label} <ArrowDown size={16} aria-hidden="true" /></a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {answerTopics.map((topic) => (
        <section key={topic.id} id={topic.id} className={styles.topic} aria-labelledby={`${topic.id}-title`}>
          <div className={resourceStyles.inner}>
            <ResourceHeading
              id={`${topic.id}-title`}
              eyebrow={`${topic.entries.length} ${topic.entries.length === 1 ? "brief" : "briefs"}`}
              heading={topic.heading}
              intro={topic.intro}
            />
            <ol className={`${styles.briefGrid} ${resourceStyles.libraryCards}`} data-columns={topic.entries.length === 4 || topic.entries.length < 3 ? 2 : 3}>
              {topic.entries.map(({ brief, icon }, index) => (
                <ResourceLibraryCard
                  key={brief.slug}
                  title={brief.title}
                  description={brief.shortAnswer}
                  image={`/img/homepage/${icon}.webp`}
                  number={index + 1}
                  category={brief.eyebrow}
                  bestFor={brief.bestFor.slice(0, 2)}
                  href={`/answers/${brief.slug}/`}
                  action="Open answer"
                />
              ))}
            </ol>
            <div className={styles.topicBack}>
              <a href="#answer-library" className={resourceStyles.textLink}>Back to topics <ArrowUp size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      ))}

      <FaqSection
        id="answers-faq"
        headingId="answers-faq-title"
        eyebrow="About the answer library"
        heading={<>Using the <em>answer briefs.</em></>}
        description="What each brief covers and where to find the source files."
        items={answerFaqs}
        centered
      />

      <ResourceClosing
        id="answer-sources"
        heading={<>Read the <em>source files.</em></>}
        intro="Open the Markdown index and answer blocks, or use the JSON file for structured facts about Crea8iv Media."
        actions={[
          { href: "/answers.md", label: "Read answers.md" },
          { href: "/crea8iv-ai-facts.json", label: "Open AI facts JSON" },
        ]}
      />
    </main>
  );
}
