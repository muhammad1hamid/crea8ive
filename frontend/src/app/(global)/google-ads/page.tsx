import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { DeliveryProcess } from "@/components/HomepageDeliveryProcess";
import { InsightsSection } from "@/components/HomepageEditorial";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSchema from "@/components/PageSchema";
import PageSeoContent from "@/components/PageSeoContent";
import ToolCard from "@/components/tools/ToolCard";
import actionStyles from "@/components/homepage-final-cta.module.css";
import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { serviceResources } from "@/lib/service-resources";
import { serviceToolMap, toolsBySlug } from "@/lib/tools";
import { resolveContentBySlug } from "@/lib/wordpress";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { approaches, articles, benefits, campaigns, pillars, planning, process } from "./google-ads-content";
import styles from "./google-ads.module.css";

const slug = "google-ads";

export function generateMetadata(): Promise<Metadata> {
  return generateSlugMetadata({ params: Promise.resolve({ slug }) });
}

export default async function GoogleAdsPage() {
  const resolved = await resolveContentBySlug(slug).catch(() => null);
  const seo = PAGE_SEO_CONTENT[slug];
  const toolSlugs = serviceToolMap[slug] ?? [];
  const featuredLinks = new Set([
    ...articles.map(({ href }) => href),
    ...toolSlugs.map((tool) => `/tools/${tool}/`),
  ]);
  const resources = [...(serviceResources[slug] ?? []), ...(seo.relatedLinks ?? [])]
    .filter(({ href }) => !featuredLinks.has(href));

  return (
    <div className={styles.page}>
      <PageSchema slug={slug} datePublished={resolved?.data.date} dateModified={resolved?.data.modified} />
      <PageSeoContent slug={slug} schemaOnly />

      <section id="top" className={styles.hero} aria-labelledby="google-ads-title">
        <div className={`${styles.inner} ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Google Ads management</p>
            <h1 id="google-ads-title">Turn searches into <em>opportunities.</em></h1>
            <p className={styles.lede}>Reach people actively searching for your services. We plan your Google Ads campaigns around relevant traffic, meaningful enquiries and clear conversion tracking.</p>
            <div className={styles.actions}>
              <Link href="/contact/" className={actionStyles.primary}>Discuss Your Campaign <ArrowUpRight aria-hidden="true" /></Link>
              <a href="#services" className={actionStyles.secondary}>Explore Our Approach <ArrowDown aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.heroImage}>
            <Image src="/img/services/ad-concepts/google-ads-ad-concept.webp" alt="A search bar connected to phone, form and shopping icons" width={960} height={540} sizes="(max-width: 699px) 92vw, (max-width: 899px) 640px, (max-width: 1399px) 44vw, 610px" preload />
            <figcaption>
              <ol className={styles.heroFlow} aria-label="Campaign journey">
                {["Search intent", "Relevant ad", "Enquiry"].map((label, index) => (
                  <li key={label}><span aria-hidden="true">0{index + 1}</span>{label}</li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-intent">
        <div className={`${styles.inner} ${styles.editorial}`}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Why Google Ads matters</p>
            <h2 id="ads-intent">Reach people when they’re looking.</h2>
            <p>{seo.intro}</p>
          </div>
          <ul className={styles.benefits}>
            {benefits.map(({ icon: Icon, title, copy }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <div><h3>{title}</h3><p>{copy}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className={`${styles.section} ${styles.band}`} aria-labelledby="ads-system">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.kicker}>A complete PPC system</p>
            <h2 id="ads-system">From the right search <em>to a better enquiry.</em></h2>
            <p>Keyword research, ads, landing pages and tracking work together to improve traffic relevance and lead quality.</p>
          </div>
          <ol className={`${styles.cardGrid} ${styles.pillars}`}>
            {pillars.map(({ image, title, copy }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={copy} image={`/img/homepage/${image}.webp`} number={index + 1} containedIcon />
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-campaigns">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.kicker}>Campaign types</p>
            <h2 id="ads-campaigns">Choose the format around your goal.</h2>
            <p>Match the campaign to how customers find you and what you want them to do next.</p>
          </div>
          <ol className={`${styles.cardGrid} ${styles.campaigns}`}>
            {campaigns.map(({ image, title, copy, fit }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={copy} image={`/img/homepage/${image}.webp`} number={index + 1} containedIcon>
                <p className={styles.fit}><strong>Best for</strong> {fit}</p>
              </ConnectedJourneyCard>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="ads-approach">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.kicker}>Different campaign approaches</p>
            <h2 id="ads-approach">Capture demand. <em>Build it where needed.</em></h2>
            <p>Search ads suit services people already know to look for, such as legal, dental, construction and consulting. Where customers need more time or familiarity, Meta can introduce the offer and bring people back.</p>
          </div>
          <ul className={`${styles.cardGrid} ${styles.approachCards}`}>
            {approaches.map(({ image, title, label, copy }, index) => (
              <ConnectedJourneyCard key={title} title={title} description={copy} image={`/img/homepage/connected-journey/${image}.webp`} number={index + 1} containedIcon>
                <span className={styles.approachLabel}>{label}</span>
              </ConnectedJourneyCard>
            ))}
          </ul>
          <div className={styles.combined}>
            <div>
              <h3>Combined approach</h3>
              <p>Use Google to capture active searches and Meta to build awareness and support follow-up.</p>
            </div>
            <div className={styles.channelPair} aria-hidden="true">
              <span>Google Search</span><Plus size={15} /><span>Meta Ads</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-planning">
        <div className={`${styles.inner} ${styles.launchLayout}`}>
          <div className={`${styles.intro} ${styles.launchBrief}`}>
            <p className={styles.kicker}>Before launch</p>
            <h2 id="ads-planning">Plan around <em>your market.</em></h2>
            <p>Set a media budget, agree on how the account will be managed, and define where the campaign should run.</p>
            <Link className={actionStyles.secondary} href="/tools/google-ads-budget-calculator/">
              Estimate your media budget <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={`${styles.disclosures} ${styles.launchSteps}`}>
            {planning.map(({ title, summary, copy }, index) => (
              <details key={title} name="google-ads-planning" open={index === 0}>
                <summary>
                  <span className={styles.launchNumber} aria-hidden="true">0{index + 1}</span>
                  <span className={styles.launchTitle}>{title}<span className={styles.launchMeta}>{summary}</span></span>
                  <Plus aria-hidden="true" />
                </summary>
                <p>{copy}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <DeliveryProcess
        id="google-ads-process"
        headingId="ads-process"
        eyebrow="How the system works"
        heading={<>From the first review <em>to the next decision.</em></>}
        steps={process}
        mobileSequence={{ label: "Campaign launch sequence", steps: ["Build", "Align ads", "Check tracking", "Launch"] }}
      />

      <section className={styles.section} aria-labelledby="ads-features">
        <div className={`${styles.inner} ${styles.editorial}`}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Service details</p>
            <h2 id="ads-features">What we work on first.</h2>
            <p>This service suits businesses that already have search demand and need cleaner campaign structure, more relevant landing pages and clearer lead tracking.</p>
            <div className={styles.actions}>
              <LeadTriggerButton className={actionStyles.primary} eventLabel="service-decision-Search growth system">Start Free Audit</LeadTriggerButton>
              <Link href="/results/" className={actionStyles.secondary}>View proof <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
          <div className={styles.scope}>
            <div>
              <h3>What improves</h3>
              <ul>
                {["Campaign structure and keyword relevance", "Landing-page trust and conversion paths", "Lead tracking and budget clarity"].map((item) => (
                  <li key={item}><Check aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>First seven days</h3>
              <ul>
                {["Audit the account and search intent", "Map landing-page gaps", "Prioritize quick conversion fixes"].map((item) => (
                  <li key={item}><Check aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band} ${styles.tools}`} aria-labelledby="ads-tools">
        <div className={styles.inner}>
          <div className={`${styles.intro} ${styles.centered}`}>
            <p className={styles.kicker}>Free growth tools</p>
            <h2 id="ads-tools">Check before you spend.</h2>
            <p>Estimate a campaign budget or check the page where your ads will send people.</p>
          </div>
          <div className={styles.toolGrid}>
            {toolSlugs.map((tool) => <ToolCard key={tool} tool={toolsBySlug[tool]} compact />)}
          </div>
        </div>
      </section>

      <InsightsSection
        id="ads-articles"
        eyebrow="Recommended reading"
        issue="Google Ads"
        heading={<>Guides for planning <em>your campaign.</em></>}
        intro="Explore how search is changing and what to consider when you plan your ads, landing pages and budget."
        linkLabel="View all articles"
        articles={articles.map(({ category, ...article }) => ({ ...article, topic: category }))}
      />

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="ads-faq">
        <div className={`${styles.inner} ${styles.editorial}`}>
          <div className={styles.intro}>
            <p className={styles.kicker}>{seo.heading}</p>
            <h2 id="ads-faq">Frequently asked questions.</h2>
            <p className={styles.byline}>Strategy &amp; content by Syed Qamar Abbas<span>Founder &amp; CEO, Crea8iv Media</span></p>
          </div>
          <div className={styles.disclosures}>
            {seo.faqs.map(({ q, a }) => (
              <details key={q} name="google-ads-faq">
                <summary>{q}<Plus aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <div className={styles.resources}>
            <h3>Related guides and client work</h3>
            <ul>
              {resources.map(({ label, href }) => (
                <li key={href}><Link href={href}>{label} <ArrowUpRight aria-hidden="true" /></Link></li>
              ))}
              <li><Link href="/consultation/">Discuss strategy <ArrowUpRight aria-hidden="true" /></Link></li>
              <li><Link href="/pricing/">View pricing <ArrowUpRight aria-hidden="true" /></Link></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="cta" className={actionStyles.section} aria-labelledby="ads-cta">
        <div className={`${actionStyles.card} ${styles.closing}`}>
          <div className={actionStyles.copy}>
            <h2 id="ads-cta">Ready to make your <em>next campaign count?</em></h2>
            <p className={actionStyles.intro}>Let’s discuss your goals and build a Google Ads approach around what your business actually needs.</p>
          </div>
          <div className={styles.actions}>
            <Link href="/contact/" className={actionStyles.primary}>Discuss Your Campaign <ArrowUpRight aria-hidden="true" /></Link>
            <LeadTriggerButton className={actionStyles.secondary} eventLabel="service-conversion-google-ads">Request Service Audit</LeadTriggerButton>
          </div>
        </div>
      </section>
    </div>
  );
}
