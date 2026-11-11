import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, MousePointer2, ShieldCheck, Smartphone } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { DeliveryProcess } from "@/components/HomepageDeliveryProcess";
import { InsightsSection } from "@/components/HomepageEditorial";
import { FaqSection } from "@/components/HomepageFaq";
import { FaqDisclosure } from "@/components/PremiumFaqAccordion";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSchema from "@/components/PageSchema";
import PageSeoContent from "@/components/PageSeoContent";
import ToolCard from "@/components/tools/ToolCard";
import NotchedProjectCard from "@/components/ui/notched-project-card";
import actionStyles from "@/components/homepage-final-cta.module.css";
import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { serviceResources } from "@/lib/service-resources";
import { BUSINESS_DETAILS } from "@/lib/site-config";
import { serviceToolMap, toolsBySlug } from "@/lib/tools";
import { selectedWebsiteProof, websiteIndustryTargets } from "@/lib/website-service-proof";
import { resolveContentBySlug } from "@/lib/wordpress";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { articles, capabilities, features, industryExamples, packages, process, technical, timeline, toolIcons } from "./website-development-content";
import styles from "./website-development.module.css";

const slug = "website-development";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

const screenshots: Record<string, { src: string; width: number; height: number }> = {
  "home-studio-interior-design": { src: "/img/case-studies/home-studio-interiors/proof/home-studio-live-desktop-2026.webp", width: 1600, height: 866 },
  "co3-premium-rawalpindi-drinks": { src: "/img/case-studies/co3-premium-liquid-shop/co3-live-desktop.png", width: 1440, height: 900 },
};

export default async function WebsiteDevelopmentPage() {
  const resolved = await resolveContentBySlug(slug).catch(() => null);
  const seo = PAGE_SEO_CONTENT[slug];
  const tools = serviceToolMap[slug] ?? [];
  const guides: { href: string; label: string; description?: string }[] = [
    ...(seo.relatedLinks ?? []),
    ...(serviceResources[slug] ?? []).filter(({ href }) => href.startsWith("/blog/") || href === "/ai-visibility-growth/"),
  ];
  const caseLinks = (serviceResources[slug] ?? []).filter(({ href }) => href.startsWith("/case-studies/"));
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I’d like to discuss a website project.")}`;

  return (
    <div className={styles.page}>
      <PageSchema slug={slug} datePublished={resolved?.data.date} dateModified={resolved?.data.modified} />
      <PageSeoContent slug={slug} schemaOnly />

      <section id="top" className={styles.hero} aria-labelledby="website-development-title">
        <div className={`${styles.inner} ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <p className={styles.label}>Website Development</p>
            <h1 id="website-development-title">Your website is either your best salesperson or your <em>biggest liability.</em></h1>
            <p className={styles.lede}>We build fast, SEO-ready websites that help customers understand your offer and take the next step, from Rawalpindi and Islamabad to businesses across Pakistan.</p>
            <div className={styles.actions}>
              <a href="#cta" className={actionStyles.primary}>Start Your Website <ArrowUpRight aria-hidden="true" /></a>
              <a href="#pricing" className={actionStyles.secondary}>See Pricing <ArrowDown aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.heroFrame}>
            <div className={styles.browserBar}>
              <span aria-hidden="true"><i /><i /><i /></span>
              <span>Buildscape website</span>
            </div>
            <Image src="/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp" alt="Buildscape’s construction website with architecture photography and a project enquiry button" width={720} height={500} sizes="(max-width: 639px) 92vw, (max-width: 899px) 640px, (max-width: 1399px) 46vw, 620px" preload />
            <figcaption><span>Architecture &amp; construction</span><Link href="/case-studies/buildscape/" className={styles.textLink}>View case study <ArrowUpRight aria-hidden="true" /></Link></figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-value">
        <div className={`${styles.inner} ${styles.split} ${styles.valueLayout}`}>
          <figure className={styles.projectFrame}>
            <Image src="/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp" alt="STW Movers’ Barcelona chauffeur website with service navigation and booking actions" width={1440} height={1040} sizes="(max-width: 899px) 92vw, (max-width: 1399px) 50vw, 650px" />
            <figcaption><span>STW Movers · Barcelona chauffeur website</span><Link href="/case-studies/stw-movers-barcelona/" className={styles.textLink}>View case study <ArrowUpRight aria-hidden="true" /></Link></figcaption>
          </figure>
          <div className={styles.intro}>
            <h2 id="website-value">Give visitors a clear reason to enquire.</h2>
            <p>A good website makes your offer easy to understand, backs it up with relevant work and makes it easy to take action.</p>
            <ul className={styles.valueList}>
              <li><ShieldCheck aria-hidden="true" /><div><h3>Build trust early</h3><p>Explain what you do, who it’s for and what proves you can deliver it.</p></div></li>
              <li><Smartphone aria-hidden="true" /><div><h3>Make mobile easy</h3><p>Keep pages fast and readable, with navigation that works on smaller screens.</p></div></li>
              <li><MousePointer2 aria-hidden="true" /><div><h3>Make the next step obvious</h3><p>Put calls, forms, bookings and WhatsApp where visitors need them.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="website-work">
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <div className={styles.intro}>
              <p className={styles.label}>Selected work</p>
              <h2 id="website-work">Different businesses. Different ways to enquire.</h2>
              <p>Explore how an interiors site presents its projects and how a drinks brand takes orders.</p>
            </div>
            <Link href="/results/" className={`${actionStyles.secondary} ${styles.outlineAction}`}>Explore client work <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.projectGrid}>
            {selectedWebsiteProof.filter(({ slug }) => slug in screenshots).map((item) => {
              const shot = screenshots[item.slug];
              return (
                <article key={item.slug} className={styles.card}>
                  <div className={styles.projectMedia}><Image {...shot} alt={`${item.brand} desktop website screenshot`} /></div>
                  <div className={styles.cardCopy}>
                    <p className={styles.label}>{item.category}</p>
                    <h3>{item.brand}</h3>
                    <p>{item.summary}</p>
                    <a href={item.href} className={styles.textLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.brand} live website`}>Open live website <ArrowUpRight aria-hidden="true" /></a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className={styles.moreWork}>
            <h3>More projects and case studies</h3>
            <div className={styles.moreProjectGrid}>
              {selectedWebsiteProof.filter(({ slug }) => !(slug in screenshots)).map((item) => (
                <article key={item.slug}>
                  <NotchedProjectCard
                    href={item.href}
                    title={item.brand}
                    description={item.title}
                    image={item.image}
                    imageAlt={item.imageAlt}
                    badge={item.slug === "patientflow-clinic-retention-software" ? "Website concept" : undefined}
                    external={item.external}
                    surface="var(--web-bg)"
                    className={styles.projectPreview}
                  />
                </article>
              ))}
            </div>
            <ul className={styles.caseStudyLinks}>
              {caseLinks.filter(({ href }) => href !== "/case-studies/stw-movers-barcelona/").map(({ label, href }) => (
                <li key={href}><Link href={href} className={styles.textLink}>{label} <ArrowUpRight aria-hidden="true" /></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="website-capabilities">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.label}>Development capabilities</p>
            <h2 id="website-capabilities">Build around how your business works.</h2>
            <p>Choose the site, pages and integrations around your actual goal, whether that’s enquiries, bookings, a portfolio or online sales.</p>
          </div>
          <ol className={styles.capabilityGrid}>
            {capabilities.map(({ image, title, copy }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={copy} image={`/img/homepage/${image}.webp`} number={index + 1} containedIcon />
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-features">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.label}>Core website features</p>
            <h2 id="website-features">A site your team can use after launch.</h2>
            <p>Enquiry tools, tracking and support give your team a clear way to run the site and act on what it learns.</p>
          </div>
          <ul className={styles.features}>
            {features.map(({ icon: Icon, title, copy }) => (
              <li key={title} className={styles.card}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <DeliveryProcess
        id="website-build-process"
        headingId="website-process"
        eyebrow="How the work happens"
        heading={<>From the brief <em>to a working site.</em></>}
        steps={process}
        mobileSequence={{ label: "Website build and test sequence", steps: ["Build pages", "Check speed", "Test forms", "Check integrations"] }}
      />

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-technical">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.label}>Technical foundations</p>
            <h2 id="website-technical">Ready to use, <em>find and maintain.</em></h2>
            <p>We plan technical requirements with the design so the site can support buyers on mobile, organic search and paid traffic.</p>
          </div>
          <ul className={styles.technical}>
            {technical.map(({ image, title, copy }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={copy} image={`/img/homepage/connected-journey/${image}.webp`} number={index + 1} containedIcon />
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className={styles.section} aria-labelledby="website-pricing">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.label}>Pricing and scope</p>
            <h2 id="website-pricing">Clear starting points <em>for your build.</em></h2>
            <p>Page count, content, booking and other integrations shape the final proposal.</p>
          </div>
          <div className={styles.pricing}>
            {packages.map(({ title, price, copy, includes, custom }, index) => (
              <article key={title} className={styles.priceCard} data-custom={custom || undefined}>
                <span className={styles.packageNumber} aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <div className={styles.price}>
                  <span>{custom ? "Project pricing" : "Starting price"}</span>
                  <strong>{price}</strong>
                </div>
                <p>{copy}</p>
                <ul>{includes.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                <a href="#cta" className={`${actionStyles.secondary} ${styles.packageAction}`}>
                  <span>{custom ? "Request a quote" : "Discuss your build"}<span className="sr-only"> for {title}</span></span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <Link href="/pricing/" className={`${styles.textLink} ${styles.allPricing}`}>View full pricing <ArrowUpRight aria-hidden="true" /></Link>
          <div className={styles.scopeNote}>
            <div><h3>Already have a website?</h3><p>We can audit the current site, map conversion and search gaps, and define the homepage and service-page structure before a rebuild.</p></div>
            <LeadTriggerButton className={`${actionStyles.secondary} ${styles.outlineAction}`} eventLabel="service-decision-Website system">Start Free Audit</LeadTriggerButton>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band} ${styles.tools}`} aria-labelledby="website-tools">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}><p className={styles.label}>Free growth tools</p><h2 id="website-tools">Find out what needs <em>attention first.</em></h2><p>Check speed, search foundations and the potential value of more enquiries before planning a rebuild.</p></div>
          <div className={styles.toolGrid}>
            {tools.map(tool => <ToolCard key={tool} tool={toolsBySlug[tool]} iconImage={toolIcons[tool]} compact />)}
          </div>
        </div>
      </section>

      <InsightsSection
        id="website-articles"
        eyebrow="Recommended reading"
        issue="Websites"
        heading={<>Guides for planning <em>your website.</em></>}
        intro="Explore how to choose a website partner, plan for enquiries and budget for search visibility."
        linkLabel="View all articles"
        articles={articles.map(({ category, ...article }) => ({ ...article, topic: category }))}
      />

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-development-pakistan">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered} ${styles.industryIntro}`}>
            <h2 id="website-development-pakistan">{seo.heading}</h2>
            <p>{seo.intro}</p>
            <p className={styles.byline}>Strategy &amp; content by Syed Qamar Abbas<span>Founder &amp; CEO, Crea8iv Media</span></p>
          </div>
          <div className={styles.industries}>
            <h3>Website development by industry</h3>
            <div className={styles.industryGrid}>
              {websiteIndustryTargets.map(({ title, description, href }) => (
                <article key={href}>
                  <NotchedProjectCard
                    href={href}
                    title={title}
                    description={description}
                    image={industryExamples[href].image}
                    imageAlt={industryExamples[href].alt}
                    tags={[industryExamples[href].label]}
                    surface="var(--web-raised)"
                    className={styles.industryPreview}
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        id="website-questions"
        headingId="website-faq"
        eyebrow="Before we begin"
        heading={<>Frequently <em>asked questions.</em></>}
        description="Find answers about price, platform choices, project timelines and redesigns."
        items={[timeline, ...seo.faqs].map(({ q, a }) => ({ question: q, answer: a }))}
        centered
      >
        <FaqDisclosure
          question="More guides, comparisons and next steps"
          questionId="website-guides-question"
          answerId="website-guides-answer"
          className={styles.guideList}
        >
          <ul className={styles.linkGrid}>
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} className={styles.textLink}>{guide.label} <ArrowUpRight aria-hidden="true" /></Link>
                {guide.description && <p>{guide.description}</p>}
              </li>
            ))}
            <li><Link href="/consultation/" className={styles.textLink}>Discuss strategy <ArrowUpRight aria-hidden="true" /></Link></li>
          </ul>
        </FaqDisclosure>
      </FaqSection>

      <section id="cta" className={actionStyles.section} aria-labelledby="website-cta">
        <div className={`${actionStyles.card} ${styles.closing}`}>
          <div className={`${actionStyles.copy} ${styles.closingCopy}`}>
            <h2 id="website-cta">Ready to build <em>a website that converts?</em></h2>
            <p className={actionStyles.intro}>Tell us what you sell, who your site needs to reach and what you want visitors to do. We’ll use that to discuss the right project scope.</p>
          </div>
          <div className={`${styles.actions} ${styles.closingActions}`}>
            <Link href="/contact/" className={actionStyles.primary}>Discuss My Website <ArrowUpRight aria-hidden="true" /></Link>
            <a href={whatsappHref} className={actionStyles.secondary} target="_blank" rel="noopener noreferrer">WhatsApp the Team <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className={styles.closingLinks}>
            <LeadTriggerButton className={styles.textLink} eventLabel="service-conversion-website-development">Request Service Audit</LeadTriggerButton>
            <a href="#top" className={styles.textLink}>Back to top <ArrowUp aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
