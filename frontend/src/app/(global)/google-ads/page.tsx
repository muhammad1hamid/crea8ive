import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSchema from "@/components/PageSchema";
import PageSeoContent from "@/components/PageSeoContent";
import ToolCard from "@/components/tools/ToolCard";
import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { serviceResources } from "@/lib/service-resources";
import { serviceToolMap, toolsBySlug } from "@/lib/tools";
import { resolveContentBySlug } from "@/lib/wordpress";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { articles, benefits, campaigns, pillars, planning, process } from "./google-ads-content";
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

      <section id="top" className={`${styles.inner} ${styles.hero}`} aria-labelledby="google-ads-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Google Ads management</p>
          <h1 id="google-ads-title">Turn searches into <em>opportunities.</em></h1>
          <p className={styles.lede}>Reach people actively searching for your services through strategically planned Google Ads campaigns designed around relevant traffic, meaningful enquiries and measurable growth.</p>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primary}>Discuss Your Campaign <ArrowUpRight aria-hidden="true" /></Link>
            <a href="#services" className={styles.secondary}>Explore Our Approach <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.heroImage}>
          <Image src="/img/services/ad-concepts/google-ads-ad-concept.webp" alt="A search bar connected to phone, form and shopping icons" width={960} height={540} preload />
          <figcaption>
            <span>Search intent</span><ArrowRight aria-hidden="true" />
            <span>Relevant ad</span><ArrowRight aria-hidden="true" />
            <span>Enquiry</span>
          </figcaption>
        </figure>
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
          <div className={styles.intro}>
            <p className={styles.kicker}>A complete PPC system</p>
            <h2 id="ads-system">From the right search to a better enquiry.</h2>
            <p>Keyword research, ads, landing pages and tracking work together to improve traffic relevance and lead quality.</p>
          </div>
          <ul className={styles.pillars}>
            {pillars.map(({ icon: Icon, title, copy }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-campaigns">
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Campaign types</p>
            <h2 id="ads-campaigns">Choose the format around your goal.</h2>
            <p>Match the campaign to how customers find you and what you want them to do next.</p>
          </div>
          <ul className={styles.campaigns}>
            {campaigns.map(({ icon: Icon, title, copy, fit }) => (
              <li key={title} className={styles.card}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
                <p className={styles.fit}><strong>Best for</strong> {fit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="ads-approach">
        <div className={`${styles.inner} ${styles.editorial}`}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Different campaign approaches</p>
            <h2 id="ads-approach">Capture demand. Build it where needed.</h2>
            <p>Search ads suit services people already know to look for, such as legal, dental, construction and consulting. Where customers need more time or familiarity, Meta can introduce the offer and bring people back.</p>
          </div>
          <dl className={styles.approaches}>
            <div><dt>Google Search</dt><dd>Reach people while they’re looking for a specific service.</dd></div>
            <div><dt>Meta Ads</dt><dd>Introduce the offer to new audiences and retarget people who’ve shown interest.</dd></div>
            <div><dt>Combined approach</dt><dd>Use Google to capture active searches and Meta to build awareness and support follow-up.</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-planning">
        <div className={`${styles.inner} ${styles.editorial}`}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Before launch</p>
            <h2 id="ads-planning">Plan around your market.</h2>
            <p>Set a media budget, agree on how the account will be managed, and define where the campaign should run.</p>
          </div>
          <div className={styles.disclosures}>
            {planning.map(({ title, copy }, index) => (
              <details key={title} name="google-ads-planning" open={index === 0}>
                <summary>{title}<Plus aria-hidden="true" /></summary>
                <p>{copy}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="ads-process">
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.kicker}>How the system works</p>
            <h2 id="ads-process">From the first review to the next decision.</h2>
          </div>
          <ol className={styles.process}>
            {process.map(({ icon: Icon, title, copy }, index) => (
              <li key={title}>
                <div className={styles.processMark}><span>0{index + 1}</span><Icon aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-features">
        <div className={`${styles.inner} ${styles.editorial}`}>
          <div className={styles.intro}>
            <p className={styles.kicker}>Service details</p>
            <h2 id="ads-features">What we work on first.</h2>
            <p>This service suits businesses that already have search demand and need cleaner campaign structure, more relevant landing pages and clearer lead tracking.</p>
            <div className={styles.actions}>
              <LeadTriggerButton className={styles.primary} eventLabel="service-decision-Search growth system">Start Free Audit</LeadTriggerButton>
              <Link href="/results/" className={styles.secondary}>View proof <ArrowUpRight aria-hidden="true" /></Link>
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
          <div className={styles.intro}>
            <p className={styles.kicker}>Free growth tools</p>
            <h2 id="ads-tools">Check before you spend.</h2>
            <p>Estimate a campaign budget or check the page where your ads will send people.</p>
          </div>
          <div className={styles.toolGrid}>
            {toolSlugs.map((tool) => <ToolCard key={tool} tool={toolsBySlug[tool]} compact />)}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="ads-articles">
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <div className={styles.intro}>
              <p className={styles.kicker}>Recommended reading</p>
              <h2 id="ads-articles">Guides for planning your campaign.</h2>
            </div>
            <Link href="/blog/" className={styles.textLink}>View all articles <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.articles}>
            {articles.map(({ category, image, title, description, href }) => (
              <article key={href} className={styles.card}>
                <div className={styles.articleMedia}><Image src={image} alt="" width={640} height={360} /></div>
                <div className={styles.articleCopy}>
                  <p className={styles.category}>{category}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link href={href} className={styles.textLink} aria-label={`Read article: ${title}`}>Read article <ArrowUpRight aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section id="cta" className={styles.section} aria-labelledby="ads-cta">
        <div className={`${styles.inner} ${styles.closing}`}>
          <div className={styles.intro}>
            <h2 id="ads-cta">Ready to make your next campaign count?</h2>
            <p>Let’s discuss your goals and build a Google Ads approach around what your business actually needs.</p>
          </div>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primary}>Discuss Your Campaign <ArrowUpRight aria-hidden="true" /></Link>
            <LeadTriggerButton className={styles.secondary} eventLabel="service-conversion-google-ads">Request Service Audit</LeadTriggerButton>
          </div>
        </div>
      </section>
    </div>
  );
}
