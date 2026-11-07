import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, MousePointer2, Plus, ShieldCheck, Smartphone } from "lucide-react";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSchema from "@/components/PageSchema";
import PageSeoContent from "@/components/PageSeoContent";
import ToolCard from "@/components/tools/ToolCard";
import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { serviceResources } from "@/lib/service-resources";
import { BUSINESS_DETAILS } from "@/lib/site-config";
import { serviceToolMap, toolsBySlug } from "@/lib/tools";
import { selectedWebsiteProof, websiteIndustryTargets } from "@/lib/website-service-proof";
import { resolveContentBySlug } from "@/lib/wordpress";
import { generateMetadata as generateSlugMetadata } from "../[slug]/page";
import { articles, capabilities, features, packages, process, technical, timeline } from "./website-development-content";
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

      <section id="top" className={`${styles.inner} ${styles.hero}`} aria-labelledby="website-development-title">
        <div>
          <p className={styles.label}>Website Development</p>
          <h1 id="website-development-title">Your website is either your best salesperson or your <em>biggest liability.</em></h1>
          <p className={styles.lede}>We build fast, SEO-ready websites that help customers understand your offer and take the next step, from Rawalpindi and Islamabad to businesses across Pakistan.</p>
          <div className={styles.actions}>
            <a href="#cta" className={styles.primary}>Start Your Website <ArrowUpRight aria-hidden="true" /></a>
            <a href="#pricing" className={styles.secondary}>See Pricing <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.heroFrame}>
          <div className={styles.browserBar}>
            <span aria-hidden="true"><i /><i /><i /></span>
            <span>Buildscape website</span>
          </div>
          <Image src="/img/portfolio/websites/buildscape/buildscape-production-card-20260927.webp" alt="Buildscape’s construction website with architecture photography and a project enquiry button" width={720} height={500} preload />
          <figcaption><span>Architecture &amp; construction</span><Link href="/case-studies/buildscape/" className={styles.textLink}>View case study <ArrowUpRight aria-hidden="true" /></Link></figcaption>
        </figure>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-value">
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.intro}>
            <h2 id="website-value">Give visitors a clear reason to enquire.</h2>
            <p>A good website makes your offer easy to understand, backs it up with relevant work and makes it easy to take action.</p>
            <ul className={styles.valueList}>
              <li><ShieldCheck aria-hidden="true" /><div><h3>Build trust early</h3><p>Explain what you do, who it’s for and what proves you can deliver it.</p></div></li>
              <li><Smartphone aria-hidden="true" /><div><h3>Make mobile easy</h3><p>Keep pages fast and readable, with navigation that works on smaller screens.</p></div></li>
              <li><MousePointer2 aria-hidden="true" /><div><h3>Make the next step obvious</h3><p>Put calls, forms, bookings and WhatsApp where visitors need them.</p></div></li>
            </ul>
          </div>
          <figure className={styles.projectFrame}>
            <Image src="/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp" alt="STW Movers’ Barcelona chauffeur website with service navigation and booking actions" width={1440} height={1040} />
            <figcaption><span>STW Movers · Barcelona chauffeur website</span><Link href="/case-studies/stw-movers-barcelona/" className={styles.textLink}>View case study <ArrowUpRight aria-hidden="true" /></Link></figcaption>
          </figure>
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
            <Link href="/results/" className={styles.secondary}>Explore client work <ArrowUpRight aria-hidden="true" /></Link>
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
            <ul className={styles.linkGrid}>
              {selectedWebsiteProof.filter(({ slug }) => !(slug in screenshots)).map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className={styles.textLink} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                    {item.brand} · {item.title} <ArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
              {caseLinks.filter(({ href }) => href !== "/case-studies/stw-movers-barcelona/").map(({ label, href }) => (
                <li key={href}><Link href={href} className={styles.textLink}>{label} <ArrowUpRight aria-hidden="true" /></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="website-capabilities">
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.intro}>
            <p className={styles.label}>Development capabilities</p>
            <h2 id="website-capabilities">Build around how your business works.</h2>
            <p>Choose the site, pages and integrations around your actual goal, whether that’s enquiries, bookings, a portfolio or online sales.</p>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-features">
        <div className={styles.inner}>
          <div className={styles.intro}>
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

      <section className={styles.section} aria-labelledby="website-process">
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.label}>How the work happens</p>
            <h2 id="website-process">From the brief to a working site.</h2>
          </div>
          <ol className={styles.process}>
            {process.map(({ icon: Icon, title, copy }, index) => (
              <li key={title}><div className={styles.step}><span>0{index + 1}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-technical">
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.intro}>
            <p className={styles.label}>Technical foundations</p>
            <h2 id="website-technical">Ready to use, find and maintain.</h2>
            <p>We plan technical requirements with the design so the site can support buyers on mobile, organic search and paid traffic.</p>
          </div>
          <ul className={styles.technical}>
            {technical.map(({ icon: Icon, title, copy }) => (
              <li key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className={styles.section} aria-labelledby="website-pricing">
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <div className={styles.intro}>
              <p className={styles.label}>Pricing and scope</p>
              <h2 id="website-pricing">Clear starting points for your build.</h2>
              <p>Page count, content, booking and other integrations shape the final proposal.</p>
            </div>
            <Link href="/pricing/" className={styles.secondary}>View pricing <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.pricing}>
            {packages.map(({ title, price, copy, includes }) => (
              <article key={title}>
                <h3>{title}</h3>
                <strong className={styles.price}>{price}</strong>
                <p>{copy}</p>
                <ul>{includes.map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className={styles.scopeNote}>
            <div><h3>Already have a website?</h3><p>We can audit the current site, map conversion and search gaps, and define the homepage and service-page structure before a rebuild.</p></div>
            <LeadTriggerButton className={styles.secondary} eventLabel="service-decision-Website system">Start Free Audit</LeadTriggerButton>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band} ${styles.tools}`} aria-labelledby="website-tools">
        <div className={styles.inner}>
          <div className={styles.intro}><p className={styles.label}>Free growth tools</p><h2 id="website-tools">Find out what needs attention first.</h2><p>Check speed, search foundations and the potential value of more enquiries before planning a rebuild.</p></div>
          <div className={styles.toolGrid}>{tools.map(tool => <ToolCard key={tool} tool={toolsBySlug[tool]} compact />)}</div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="website-articles">
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <div className={styles.intro}><p className={styles.label}>Recommended reading</p><h2 id="website-articles">Guides for planning your website.</h2></div>
            <Link href="/blog/" className={styles.textLink}>View all articles <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.articleGrid}>
            {articles.map(({ title, href, image, category, description }) => (
              <article key={href} className={styles.card}>
                <div className={styles.articleMedia}><Image src={image} alt="" width={640} height={360} /></div>
                <div className={styles.cardCopy}>
                  <p className={styles.label}>{category}</p><h3>{title}</h3><p>{description}</p>
                  <Link href={href} className={styles.textLink} aria-label={`Read article: ${title}`}>Read article <ArrowUpRight aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.band}`} aria-labelledby="website-development-pakistan">
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.intro}>
            <h2 id="website-development-pakistan">{seo.heading}</h2>
            <p>{seo.intro}</p>
            <p className={styles.byline}>Strategy &amp; content by Syed Qamar Abbas<span>Founder &amp; CEO, Crea8iv Media</span></p>
          </div>
          <div className={styles.industries}>
            <h3>Website development by industry</h3>
            <ul>{websiteIndustryTargets.map(({ title, description, href }) => (
              <li key={href}>
                <Link href={href} className={styles.textLink}>{title} <ArrowUpRight aria-hidden="true" /></Link>
                <p>{description}</p>
              </li>
            ))}</ul>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="website-faq">
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.intro}><h2 id="website-faq">Frequently asked questions.</h2><p>Find answers about price, platform choices, project timelines and redesigns.</p></div>
          <div className={styles.disclosures}>
            {[timeline, ...seo.faqs].map(({ q, a }) => (
              <details key={q} name="website-development-faq">
                <summary>{q}<Plus aria-hidden="true" /></summary><p>{a}</p>
              </details>
            ))}
          </div>
          <details className={styles.guideList}>
            <summary>More guides, comparisons and next steps <Plus aria-hidden="true" /></summary>
            <ul className={styles.linkGrid}>
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href} className={styles.textLink}>{guide.label} <ArrowUpRight aria-hidden="true" /></Link>
                  {guide.description && <p>{guide.description}</p>}
                </li>
              ))}
              <li><Link href="/consultation/" className={styles.textLink}>Discuss strategy <ArrowUpRight aria-hidden="true" /></Link></li>
            </ul>
          </details>
        </div>
      </section>

      <section id="cta" className={styles.section} aria-labelledby="website-cta">
        <div className={`${styles.inner} ${styles.closing}`}>
          <div className={styles.intro}>
            <h2 id="website-cta">Ready to build a website that converts?</h2>
            <p>Tell us what you sell, who your site needs to reach and what you want visitors to do. We’ll use that to discuss the right project scope.</p>
            <a href="#top" className={styles.textLink}>Back to top <ArrowUp aria-hidden="true" /></a>
          </div>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primary}>Discuss My Website <ArrowUpRight aria-hidden="true" /></Link>
            <a href={whatsappHref} className={styles.secondary} target="_blank" rel="noopener noreferrer">WhatsApp the Team <ArrowUpRight aria-hidden="true" /></a>
            <LeadTriggerButton className={styles.textLink} eventLabel="service-conversion-website-development">Request Service Audit</LeadTriggerButton>
          </div>
        </div>
      </section>
    </div>
  );
}
