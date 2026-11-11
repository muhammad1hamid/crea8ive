import type { Metadata } from "next";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceClosing, ResourceHeading, ResourceHero, ResourceLibraryCard } from "@/components/resource/ResourcePage";
import resource from "@/components/resource/resource-page.module.css";
import { comparisonPages } from "@/lib/comparison-pages";
import { SITE_URL } from "@/lib/site-config";

const comparisonIcons: Record<string, string> = {
  "website-development-company-vs-freelancer-pakistan": "service-orbit/03-websites",
  "wordpress-vs-custom-website-pakistan": "connected-journey/02-explore",
  "website-developer-vs-growth-agency-pakistan": "service-orbit/01-strategy",
  "custom-software-vs-off-the-shelf-tools-pakistan": "service-orbit/06-automation",
  "saas-mvp-vs-full-software-product-pakistan": "connected-journey/05-follow-through",
};

const softwareGuides = new Set(["custom-software-vs-off-the-shelf-tools-pakistan", "saas-mvp-vs-full-software-product-pakistan"]);

const groups = [
  {
    id: "website-comparisons",
    label: "Websites and growth",
    title: "Choose a partner or platform.",
    intro: "Compare delivery models and website platforms before you define the scope.",
    columns: 3,
    guides: comparisonPages.filter(({ slug }) => !softwareGuides.has(slug)),
  },
  {
    id: "software-comparisons",
    label: "Software and SaaS",
    title: "Choose what to build first.",
    intro: "Compare ready-made tools with a custom build, and decide what belongs in the first version of a product.",
    columns: 2,
    guides: comparisonPages.filter(({ slug }) => softwareGuides.has(slug)),
  },
];

const comparisonFaqs = [
  { question: "How should I use a comparison guide?", answer: "Start with the decision you need to make. Compare the options against your budget, workflow, timeline and who will manage the work after launch." },
  { question: "Where can I turn a choice into a project brief?", answer: "Once you know which option fits, use a playbook to define the scope, the checks you need and what to verify before launch." },
];

export const metadata: Metadata = {
  title: { absolute: "Website and Software Comparisons Pakistan | Crea8iv Media" },
  description:
    "Compare website companies, freelancers, WordPress, custom websites, growth agencies, SaaS MVPs and custom software options for Pakistan businesses.",
  alternates: { canonical: `${SITE_URL}/compare/` },
  openGraph: {
    title: "Website and Software Comparisons Pakistan | Crea8iv Media",
    description:
      "Decision pages for Pakistan businesses comparing website development, software development, SaaS, CRM and growth options.",
    url: `${SITE_URL}/compare/`,
    type: "website",
    images: [{ url: `${SITE_URL}/img/crea8iv-search-preview.png`, width: 1200, height: 630, alt: "Crea8iv Media comparison pages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website and Software Comparisons Pakistan | Crea8iv Media",
    description: "Comparison pages for website and software buyers in Pakistan.",
    images: [`${SITE_URL}/img/crea8iv-search-preview.png`],
  },
};

function JsonLd() {
  const url = `${SITE_URL}/compare/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Website and Software Comparisons Pakistan",
        description:
          "Crea8iv Media comparison pages for website development, software development, SaaS, CRM and growth decisions in Pakistan.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Comparisons", item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media comparison pages",
        itemListElement: comparisonPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}/compare/${page.slug}/`,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function ComparePage() {
  return (
    <main className={resource.page}>
      <JsonLd />
      <ResourceHero
        id="compare-title"
        breadcrumb="Comparisons"
        eyebrow="Decision guides · Pakistan"
        heading={<>Compare website, software and growth options <em>before you spend.</em></>}
        intro="Compare a freelancer with a website company, WordPress with a custom site, or a developer with a growth agency. If you need software, compare ready-made tools with a custom build and an MVP with a full product."
        art={{ src: "/img/homepage/buyer-journey/03-decide-brand-v2.webp", alt: "A hand choosing a next step on an orange button beside a green path", width: 1120, height: 800 }}
        actions={[
          { href: "#website-comparisons", label: "Compare website options" },
          { href: "#software-comparisons", label: "Compare software options" },
        ]}
      />

      {groups.map(({ id, label, title, intro, columns, guides }, index) => (
        <section key={id} id={id} className={`${resource.section} ${index === 0 ? resource.band : ""}`} aria-labelledby={`${id}-title`}>
          <div className={resource.inner}>
            <ResourceHeading id={`${id}-title`} eyebrow={label} heading={title} intro={intro} />
            <ol className={`${resource.cards} ${resource.libraryCards}`} data-columns={columns}>
              {guides.map((guide, position) => (
                <ResourceLibraryCard
                  key={guide.slug}
                  title={guide.title}
                  description={guide.summary}
                  image={`/img/homepage/${comparisonIcons[guide.slug] ?? "service-orbit/01-strategy"}.webp`}
                  number={position + 1}
                  category={guide.eyebrow}
                  bestFor={[guide.optionA, guide.optionB]}
                  listLabel="Options compared"
                  href={`/compare/${guide.slug}/`}
                  action="Compare options"
                />
              ))}
            </ol>
          </div>
        </section>
      ))}

      <FaqSection id="comparison-faq" headingId="comparison-faq-title" eyebrow="Before you choose" heading={<>Use the guides <em>to make a decision.</em></>} description="Match the comparison to the decision in front of you." items={comparisonFaqs} centered />
      <ResourceClosing
        id="comparisons-next-step"
        heading={<>Turn your choice <em>into a clear brief.</em></>}
        intro="Use a playbook to work through the scope, or discuss what your business needs before you commit."
        actions={[
          { href: "/playbooks/", label: "Browse project playbooks" },
          { href: "/consultation/", label: "Discuss your options" },
        ]}
      />
    </main>
  );
}
