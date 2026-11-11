import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, Check } from "lucide-react";
import { ConnectedJourney, ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { CreativeShowcase } from "@/components/HomepageCreativeShowcase";
import { InsightsSection } from "@/components/HomepageEditorial";
import { FaqSection } from "@/components/HomepageFaq";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSchema from "@/components/PageSchema";
import PageSeoContent from "@/components/PageSeoContent";
import actionStyles from "@/components/homepage-final-cta.module.css";
import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { BUSINESS_DETAILS } from "@/lib/site-config";
import { resolveContentBySlug } from "@/lib/wordpress";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { articles, contentFaqs, contentPrinciples, creativeProjects, formats, stages } from "./content-creation-content";
import styles from "./content-creation.module.css";

const slug = "content-creation";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default async function ContentCreationPage() {
  const resolved = await resolveContentBySlug(slug).catch(() => null);
  const seo = PAGE_SEO_CONTENT[slug];
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I’d like to discuss content creation for my business.")}`;

  return (
    <main className={styles.page}>
      <PageSchema slug={slug} datePublished={resolved?.data.date} dateModified={resolved?.data.modified} />
      <PageSeoContent slug={slug} schemaOnly />

      <section id="top" className={styles.hero} aria-labelledby="content-title">
        <div className={`${styles.inner} ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Content creation · Rawalpindi &amp; Islamabad</p>
            <h1 id="content-title">Content creation that builds trust <em>and brings enquiries.</em></h1>
            <p className={styles.lead}>We create reels, posts, videos and copy around business goals, buyer trust and a clear path to enquire. One content plan connects your organic presence and paid campaigns.</p>
            <div className={styles.actions}>
              <a href="#cta" className={actionStyles.primary}>Create My Content <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href="#process" className={actionStyles.secondary}>See Process <ArrowDown size={18} aria-hidden="true" /></a>
            </div>
            <p className={styles.heroNote}>Reels production and content marketing for businesses across Pakistan.</p>
          </div>
          <figure className={styles.heroVisual}>
            <Image
              src="/img/services/ad-concepts/content-reels-ad-concept.webp"
              alt="A camera lens connected to portrait, square and landscape content formats"
              width={960}
              height={540}
              sizes="(max-width: 699px) 92vw, (max-width: 899px) 640px, (max-width: 1399px) 46vw, 620px"
              preload
            />
            <figcaption>
              <span>One idea. Multiple formats.</span>
              <strong>Reels · Posts · Copy</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="content-creation-visual-system">
        <div className={`${styles.inner} ${styles.strategyLayout}`}>
          <div className={styles.heading}>
            <p className={styles.eyebrow}>Content with direction</p>
            <h2 id="content-creation-visual-system">Creative assets that turn attention into <em>brand memory.</em></h2>
            <p>Audience relevance, buyer psychology and positioning give every piece a purpose. Your creative, captions and landing page should help people understand the offer and know what to do next.</p>
            <ol className={styles.contentRecipe} aria-label="A conversion-focused content structure">
              {["Hook", "Proof", "Offer", "CTA"].map((item, index) => (
                <li key={item}><span aria-hidden="true">0{index + 1}</span>{item}</li>
              ))}
            </ol>
          </div>
          <dl className={styles.principles}>
            {contentPrinciples.map(({ title, description }, index) => (
              <div key={title}>
                <dt><span aria-hidden="true">0{index + 1}</span>{title}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="content-formats-title">
        <div className={styles.inner}>
          <div className={`${styles.heading} ${styles.centered}`}>
            <p className={styles.eyebrow}>Content we create</p>
            <h2 id="content-formats-title">The right format <em>for every part of your story.</em></h2>
            <p>Short-form, static and written content for social, ads, websites, product launches and service storytelling.</p>
          </div>
          <ol className={styles.formatGrid}>
            {formats.map(({ title, description, image }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={description} image={`/img/homepage/${image}.webp`} number={index + 1} containedIcon />
            ))}
          </ol>
        </div>
      </section>

      <CreativeShowcase
        id="content-selected-work"
        headingId="content-work-title"
        eyebrow="Selected creative work"
        heading={<>From a brand direction <em>to content people see.</em></>}
        intro="Explore visual identities, clinic social content and product creative. Open the previews to inspect the artwork."
        projects={creativeProjects}
        className={styles.creativeWork}
      />

      <ConnectedJourney
        id="process"
        headingId="service-decision-title"
        eyebrow="Our content strategy process"
        heading={<>A clear plan. <em>A repeatable monthly rhythm.</em></>}
        intro={<p>Audit, plan, produce, publish and review. Each cycle connects audience behaviour, business goals and the response to your content.</p>}
        stages={stages}
      />

      <section id="content-creation-conversion-system" className={styles.section} aria-labelledby="content-scope-title">
        <div className={styles.inner}>
          <div className={`${styles.heading} ${styles.centered}`}>
            <p className={styles.eyebrow}>Plan your scope</p>
            <h2 id="content-scope-title">Content Creation in <em>Rawalpindi &amp; Islamabad.</em></h2>
            <p>{seo.intro}</p>
          </div>
          <div className={styles.scopeLayout}>
            <div className={styles.scopePrice}>
              <p className={styles.eyebrow}>Monthly content creation</p>
              <p className={styles.priceLabel}>Starting from</p>
              <p className={styles.price}><strong>PKR 30,000</strong><span>/ month</span></p>
              <p>Your package scales with the volume of reels, posts, shoots and copywriting agreed for each month.</p>
              <div className={styles.actions}>
                <LeadTriggerButton className={actionStyles.primary} eventLabel="service-decision-Content production system">Start Free Audit</LeadTriggerButton>
                <Link href="/pricing/" className={styles.textLink}>View pricing <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
            <div className={styles.scopeDetails}>
              <div>
                <h3>What improves</h3>
                <ul>
                  {["Visual quality", "Content usefulness", "Ad-ready assets", "Brand memory", "Campaign consistency"].map((item) => (
                    <li key={item}><Check size={17} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>First 7 days</h3>
                <ul>
                  {["Define content goals", "Plan the shoot or asset list", "Create the first creative direction"].map((item) => (
                    <li key={item}><Check size={17} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </div>
              <Link href="/results/" className={styles.textLink}>View proof <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
          <p className={styles.byline}>Strategy &amp; Content by Syed Qamar Abbas <span>Founder &amp; CEO, Crea8iv Media</span></p>
        </div>
      </section>

      <InsightsSection
        id="content-insights"
        eyebrow="Practical reading"
        issue="Content & campaigns"
        heading={<>Make your next content decision <em>a clearer one.</em></>}
        intro="Explore existing guides on Instagram, social content and turning creative into campaigns."
        linkLabel="View all articles"
        articles={articles}
      />

      <FaqSection
        id="content-questions"
        headingId="content-faq-title"
        eyebrow="Before we begin"
        heading={<>Your content questions, <em>answered.</em></>}
        description="Scope, shooting, language choices and using the assets you already have."
        items={[...contentFaqs, ...seo.faqs.map(({ q, a }) => ({ question: q, answer: a }))]}
        centered
      />

      <section id="cta" className={actionStyles.section} aria-labelledby="content-cta-title">
        <div className={`${actionStyles.card} ${styles.closing}`}>
          <div className={`${actionStyles.copy} ${styles.closingCopy}`}>
            <h2 id="content-cta-title">Ready for content <em>that moves buyers?</em></h2>
            <p className={actionStyles.intro}>Tell us about your audience, offers and the reels, copy or campaign assets you need. We’ll discuss the right scope and a clear way to get started.</p>
          </div>
          <div className={styles.closingActions}>
            <Link href="/contact/" className={actionStyles.primary}>Discuss My Content <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href={whatsappHref} className={actionStyles.secondary} target="_blank" rel="noopener noreferrer">WhatsApp the Team <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className={styles.closingLinks}>
            <LeadTriggerButton className={styles.textLink} eventLabel="service-conversion-content-creation">Request Service Audit</LeadTriggerButton>
            <a href="#top" className={styles.textLink}>Back to Top <ArrowUp size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
