import type { Metadata } from "next";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceClosing, ResourceHeading, ResourceHero, ResourceLibraryCard } from "@/components/resource/ResourcePage";
import resourceStyles from "@/components/resource/resource-page.module.css";
import { playbookPages } from "@/lib/playbook-pages";
import { SITE_URL } from "@/lib/site-config";

const playbookIcons: Record<string, string> = {
  "plan-business-website-pakistan": "service-orbit/03-websites",
  "website-redesign-seo-migration-pakistan": "connected-journey/03-trust",
  "plan-custom-software-mvp-pakistan": "service-orbit/06-automation",
  "ai-visibility-business-website-pakistan": "service-orbit/02-seo-ai",
};

const playbookFaqs = [
  {
    question: "Which playbook should I start with?",
    answer: "Start with the decision in front of you. Use website planning for a new build, the migration checklist for an existing site, MVP planning for custom software, or the AI visibility checklist to review how your site presents answers and evidence.",
  },
  {
    question: "What does each playbook include?",
    answer: "Each playbook gives you a step-by-step process, checks for each step, and links to supporting resources you can use to plan or verify the work.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Website and Software Playbooks Pakistan | Crea8iv Media" },
  description:
    "Step-by-step website, software, redesign and AI visibility playbooks for Pakistan businesses planning stronger digital growth systems.",
  alternates: { canonical: `${SITE_URL}/playbooks/` },
  openGraph: {
    title: "Website and Software Playbooks Pakistan | Crea8iv Media",
    description:
      "How-to playbooks for business websites, redesigns, custom software MVPs and AI visibility in Pakistan.",
    url: `${SITE_URL}/playbooks/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media playbooks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website and Software Playbooks Pakistan | Crea8iv Media",
    description: "Step-by-step digital growth playbooks for Pakistan businesses.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/playbooks/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Website and Software Playbooks Pakistan",
        description:
          "Crea8iv Media playbooks for planning business websites, website redesigns, custom software MVPs and AI visibility.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Playbooks", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media how-to playbooks",
        itemListElement: playbookPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}/playbooks/${page.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function PlaybooksPage() {
  return (
    <main className={resourceStyles.page}>
      <JsonLd />
      <ResourceHero
        id="playbooks-title"
        breadcrumb="Playbooks"
        eyebrow="Crea8iv Media · Playbook library"
        heading={<>Digital growth playbooks <em>for Pakistan businesses.</em></>}
        intro="Use step-by-step checklists for websites, redesigns, software and AI visibility. See what to plan, what to verify and what to avoid before spending on a build."
        art={{
          src: "/img/homepage/service-orbit/01-strategy.webp",
          alt: "A chess knight, compass and a route marked on a planning sheet",
          width: 512,
          height: 512,
          cutout: true,
        }}
        actions={[
          { href: "#playbook-library", label: "Browse playbooks" },
          { href: "#playbooks-faq", label: "How to use them" },
        ]}
      />

      <section id="playbook-library" className={`${resourceStyles.section} ${resourceStyles.band}`} aria-labelledby="playbook-library-title">
        <div className={resourceStyles.inner}>
          <ResourceHeading
            id="playbook-library-title"
            eyebrow="Project checklists"
            heading={<>Find a playbook <em>for your next decision.</em></>}
            intro="Plan a new build, protect search visibility during a redesign, scope a software MVP or improve how AI systems understand your website."
          />
          <ol className={`${resourceStyles.cards} ${resourceStyles.libraryCards}`}>
            {playbookPages.map((page, index) => (
              <ResourceLibraryCard
                key={page.slug}
                title={page.title}
                description={page.summary}
                image={`/img/homepage/${playbookIcons[page.slug] ?? "service-orbit/01-strategy"}.webp`}
                number={index + 1}
                category={page.eyebrow}
                bestFor={page.bestFor.slice(0, 4)}
                href={`/playbooks/${page.slug}/`}
                action="Open playbook"
                fitColumns={2}
              />
            ))}
          </ol>
        </div>
      </section>

      <FaqSection
        id="playbooks-faq"
        headingId="playbooks-faq-title"
        eyebrow="Before you start"
        heading={<>Using the <em>playbooks.</em></>}
        description="Pick the checklist that fits the decision you are making."
        items={playbookFaqs}
        centered
      />

      <ResourceClosing
        id="playbooks-next-step"
        heading={<>Take your checklist <em>into the next conversation.</em></>}
        intro="Use your playbook to discuss the scope of a project, or explore related service and industry answers."
        actions={[
          { href: "/consultation/", label: "Discuss your project" },
          { href: "/answers/", label: "Browse answer briefs" },
        ]}
      />
    </main>
  );
}
