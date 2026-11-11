import type { Metadata } from "next";
import { FaqSection } from "@/components/HomepageFaq";
import { ResourceClosing, ResourceHeading, ResourceHero } from "@/components/resource/ResourcePage";
import resource from "@/components/resource/resource-page.module.css";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { industryPages } from "@/lib/industry-pages";
import { SITE_URL } from "@/lib/site-config";
import styles from "./industries.module.css";

const defaultCover = { image: "/img/services/ad-concepts/growth-system-ad-concept.webp", alt: "Connected growth channels" };

const industryCovers: Record<string, typeof defaultCover> = {
  "restaurants-cafes": { image: "/img/homepage/creative-work/co3-landscape-v2.webp", alt: "CO3 Premium drinks brand creative" },
  "clinics-dental": { image: "/img/case-studies/the-smile-xperts/the-smile-xperts-details-post.webp", alt: "The Smile Xperts branded dental care creative" },
  "architects-interiors": { image: "/img/case-studies/home-studio-interiors/home-studio-social-post.webp", alt: "Home Studio Interiors campaign creative" },
  "ecommerce-retail": { image: "/img/case-studies/black-petals/black-petals-live-desktop.webp", alt: "Black Petals ecommerce storefront" },
  "real-estate-builders": { image: "/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp", alt: "Buildscape construction website" },
  "education-academies": { image: "/img/client-logos/optimized/cake-art-academy.webp", alt: "Cake Art Academy logo" },
};

const industryFaqs = [
  { question: "What is an industry growth system?", answer: "It connects the channels a buyer uses to find and evaluate a business with the next action. A restaurant may need menu discovery and ordering, while a clinic may need treatment information, patient trust and an appointment path." },
  { question: "Where should I start if several services look relevant?", answer: "Start with your industry page and identify where customers get stuck. The service stack explains the role of each channel, and the proof links help you compare examples before choosing a scope." },
];

export const metadata: Metadata = {
  title: { absolute: "Industry Growth Systems for Pakistan Businesses | Crea8iv Media" },
  description:
    "Explore Crea8iv Media industry growth systems for restaurants, clinics, architects, interiors, ecommerce, real estate and education brands in Pakistan.",
  alternates: { canonical: `${SITE_URL}/industries/` },
};

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/industries/#webpage`,
        url: `${SITE_URL}/industries/`,
        name: "Industry Growth Systems for Pakistan Businesses",
        description:
          "Industry solution pages for Crea8iv Media website development, local visibility, ads, content, branding and consultation services.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
        inLanguage: "en-PK",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries/` },
        ],
      },
      {
        "@type": "ItemList",
        name: "Crea8iv Media industry solution pages",
        itemListElement: industryPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: `${SITE_URL}/industries/${page.slug}/`,
          description: page.metaDescription,
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function IndustriesPage() {
  return (
    <main className={resource.page}>
      <JsonLd />
      <ResourceHero
        id="industries-title"
        breadcrumb="Industries"
        eyebrow="Industry growth systems · Pakistan"
        heading={<>Growth systems built around <em>how your buyers decide.</em></>}
        intro="A restaurant booking, a clinic appointment and a property enquiry each need a different route to trust. Explore how Crea8iv Media connects websites, local visibility, ads, content, branding and consultation to the needs of your industry."
        art={{ src: "/img/services/ad-concepts/growth-system-ad-concept.webp", alt: "A connected system linking websites, content, advertising and local discovery", width: 960, height: 540 }}
        actions={[
          { href: "#industry-directory", label: "Find your industry" },
          { href: "/industry-pages.md", label: "Read the industry index" },
        ]}
      />

      <section id="industry-directory" className={`${resource.section} ${resource.band}`} aria-labelledby="industry-directory-title">
        <div className={resource.inner}>
          <ResourceHeading
            id="industry-directory-title"
            eyebrow="Industry directory"
            heading={<>Find the approach <em>that fits your business.</em></>}
            intro="Open your industry for the buyer journey, relevant services and examples you can inspect."
          />
          <ul className={`${resource.cards} ${styles.directory}`} data-columns="3">
            {industryPages.map((page) => {
              const cover = industryCovers[page.slug] ?? defaultCover;
              return (
                <li key={page.slug}>
                  <NotchedProjectCard
                    href={`/industries/${page.slug}/`}
                    title={page.title}
                    description={page.quickAnswer}
                    image={cover.image}
                    imageAlt={cover.alt}
                    tags={[page.eyebrow]}
                    surface="var(--resource-band)"
                    className={page.slug === "education-academies" ? `${styles.card} ${styles.logoCover}` : styles.card}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FaqSection
        id="industries-faq"
        headingId="industries-faq-title"
        eyebrow="Choosing a starting point"
        heading={<>Questions about <em>industry growth.</em></>}
        description="How to use the directory and choose which part of the customer journey to improve first."
        items={industryFaqs}
        centered
      />

      <ResourceClosing
        id="industries-next-step"
        heading={<>Find the gap <em>in your buyer journey.</em></>}
        intro="Bring your industry, audience and main enquiry goal. We can discuss which changes to your website, search presence or campaigns should come first."
        actions={[
          { href: "/consultation/", label: "Discuss your growth plan" },
          { href: "/results/", label: "Explore client work" },
        ]}
      />
    </main>
  );
}
