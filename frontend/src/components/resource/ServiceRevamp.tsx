import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { ServiceConsultingContext } from "@/components/ConsultingContext";
import { ConnectedJourney, ConnectedJourneyCard } from "@/components/HomepageConnectedJourney";
import { DeliveryProcess } from "@/components/HomepageDeliveryProcess";
import { InsightsSection } from "@/components/HomepageEditorial";
import { FaqSection } from "@/components/HomepageFaq";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import PageSchema from "@/components/PageSchema";
import PageSeoContent from "@/components/PageSeoContent";
import ToolCard from "@/components/tools/ToolCard";
import actionStyles from "@/components/homepage-final-cta.module.css";
import type { Discipline } from "@/lib/consulting-editorial";
import { PAGE_SEO_CONTENT } from "@/lib/page-seo-content";
import { PAGE_METADATA } from "@/lib/seo-metadata";
import { serviceResources } from "@/lib/service-resources";
import { serviceToolMap, toolsBySlug } from "@/lib/tools";
import { resolveContentBySlug, stripHtml } from "@/lib/wordpress";
import { ResourceChecklist, ResourceClosing, ResourceHeading, ResourceHero } from "./ResourcePage";
import type { ResourceAction } from "./ResourcePage";
import ServiceResourceSpotlight, { type ServiceResourceLink } from "./ServiceResourceSpotlight";
import resource from "./resource-page.module.css";
import styles from "./service-revamp.module.css";

type Entry = { title: string; description: string };
type Heading = { title: string; accent?: string; intro?: string };
type CardSection = Heading & { id: string; anchor?: string; eyebrow: string; columns?: 3 | 4; numbered?: boolean } & (
  | { layout: "pathways"; entries: readonly (Entry & { path: readonly [string, string] })[] }
  | { layout?: never; compact?: boolean; entries: readonly (Entry & { icon?: string })[] }
);
type Package = Entry & { price: string; features: readonly string[] };

export type ServiceRevampConfig = {
  slug: string;
  hero: Heading & { eyebrow: string; breadcrumb: string; image: string; alt: string; width?: number; height?: number };
  actions: readonly ResourceAction[];
  sections: readonly CardSection[];
  journey?: Heading & { stages: readonly (Entry & { image: string })[] };
  process: Heading & { steps: readonly [Entry, Entry, Entry, Entry]; sequence: readonly string[] };
  scope: { unit: string; detail: string; fit: string; improves: readonly string[]; firstWeek: readonly string[]; auditLabel: string; packages?: readonly Package[] };
  articles: { href: string; title: string; description?: string; image: string; topic: string }[];
  links?: readonly ServiceResourceLink[];
  resourceSpotlight?: { image: string; description: string; intro?: string };
  resourceFeature?: { href: string; image: string };
  faqs?: readonly { question: string; answer: string }[];
  consulting?: Discipline;
  closing: Heading & { actions: readonly ResourceAction[] };
};

const processArt = ["understand-chameleon", "plan-chess", "build-launch-rocket", "learn-improve-owl"];

function AccentHeading({ title, accent }: Heading) {
  return <>{title}{accent && <> <em>{accent}</em></>}</>;
}

export default async function ServiceRevamp({ config, featuredWork, className }: { config: ServiceRevampConfig; featuredWork?: ReactNode; className?: string }) {
  const { slug, hero, process, scope, articles, closing } = config;
  const seo = PAGE_SEO_CONTENT[slug];
  const resolved = await resolveContentBySlug(slug).catch(() => null);
  const data = resolved?.data;
  const pageMetadata = PAGE_METADATA[slug];
  const toolSlugs = serviceToolMap[slug] ?? [];
  const spotlight = config.resourceSpotlight && toolSlugs.length === 1
    ? { ...config.resourceSpotlight, tool: toolsBySlug[toolSlugs[0]] }
    : undefined;
  const usedLinks = new Set([...articles.map(({ href }) => href), ...toolSlugs.map((tool) => `/tools/${tool}/`)]);
  const related: ServiceResourceLink[] = [...(config.links ?? []), ...(seo.relatedLinks ?? []), ...(serviceResources[slug] ?? [])]
    .filter(({ href }) => {
      if (usedLinks.has(href)) return false;
      usedLinks.add(href);
      return true;
    });
  const feature = config.resourceFeature;
  const featuredResource = feature && related.find(({ href }) => href === feature.href);
  const remainingResources = related.filter((link) => link !== featuredResource);
  const faqs = [...seo.faqs.map(({ q, a }) => ({ question: q, answer: a })), ...(config.faqs ?? [])];

  return (
    <main id="top" className={className ? `${resource.page} ${className}` : resource.page}>
      <PageSchema
        slug={data?.slug ?? slug}
        name={pageMetadata?.title ?? (data ? stripHtml(data.title.rendered) : undefined)}
        description={pageMetadata?.description ?? (data ? stripHtml(data.excerpt.rendered).trim() : undefined)}
        datePublished={data?.date}
        dateModified={data?.modified}
      />
      <PageSeoContent slug={slug} schemaOnly />

      <ResourceHero
        id={`${slug}-title`}
        breadcrumb={hero.breadcrumb}
        eyebrow={hero.eyebrow}
        heading={<AccentHeading {...hero} />}
        intro={hero.intro ?? ""}
        art={{ src: hero.image, alt: hero.alt, width: hero.width ?? 960, height: hero.height ?? 540 }}
        actions={config.actions}
      />

      {config.sections.map((section, index) => {
        const numbered = section.numbered !== false;
        const CardList = numbered ? "ol" : "ul";

        return (
          <section key={section.id} id={section.anchor} className={`${resource.section} ${index % 2 === 0 ? resource.band : ""}`} aria-labelledby={section.id}>
            <div className={resource.inner}>
              <ResourceHeading id={section.id} eyebrow={section.eyebrow} heading={<AccentHeading {...section} />} intro={section.intro} />
              {section.layout === "pathways" ? (
                <ul className={styles.pathways} role="list">
                  {section.entries.map(({ title, description, path }) => (
                    <li key={title} className={styles.pathway}>
                      <div className={styles.path}>
                        <span>{path[0]}</span><ArrowRight size={16} aria-hidden="true" /><span className="sr-only">to</span><span>{path[1]}</span>
                      </div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </li>
                  ))}
                </ul>
              ) : section.compact ? (
                <ul className={styles.entries}>
                  {section.entries.map(({ title, description }) => (
                    <li key={title}><h3>{title}</h3><p>{description}</p></li>
                  ))}
                </ul>
              ) : (
                <CardList className={resource.cards} data-columns={section.columns}>
                  {section.entries.map(({ title, description, icon }, index) => (
                    <ConnectedJourneyCard key={title} title={title} description={description} image={`/img/homepage/${icon ?? "connected-journey/02-explore"}.webp`} number={numbered ? index + 1 : undefined} containedIcon />
                  ))}
                </CardList>
              )}
            </div>
          </section>
        );
      })}

      {featuredWork}

      {config.journey && (
        <ConnectedJourney id={`${slug}-journey`} headingId={`${slug}-journey-title`} eyebrow="How it connects" heading={<AccentHeading {...config.journey} />} intro={<p>{config.journey.intro}</p>} stages={config.journey.stages} />
      )}

      <DeliveryProcess
        id="process"
        headingId="service-decision-title"
        eyebrow="A clear way to work"
        heading={<AccentHeading {...process} />}
        intro={process.intro}
        steps={process.steps.map((step, index) => ({ ...step, image: processArt[index], alt: "" }))}
        mobileSequence={{ label: "Delivery steps", steps: process.sequence }}
      />

      <section id="pricing" className={resource.section} aria-labelledby={`${slug}-conversion-system`}>
        <div className={resource.inner}>
          <ResourceHeading id={`${slug}-conversion-system`} eyebrow="Scope and starting price" heading={seo.heading} intro={scope.fit} />
          {scope.packages && (
            <div className={styles.packages}>
              {scope.packages.map(({ title, description, price, features }) => (
                <article key={title} className={styles.price}>
                  <h3>{title}</h3>
                  <p className={styles.packagePrice}>{price}</p>
                  <p>{description}</p>
                  <ResourceChecklist items={features} />
                </article>
              ))}
            </div>
          )}
          <div className={scope.packages ? styles.packageScope : styles.scope}>
            {scope.packages ? (
              <p className={styles.packageNote}>{scope.detail} <Link href="/pricing/" className={resource.textLink}>View pricing <ArrowUpRight size={17} aria-hidden="true" /></Link></p>
            ) : <div className={styles.price}>
              <h3>{seo.serviceName}</h3>
              <p className={styles.priceNote}>Starting from</p>
              <p className={styles.amount}><strong>PKR {Number(seo.price).toLocaleString("en-PK")}</strong> <span>{scope.unit}</span></p>
              <p>{scope.detail}</p>
              <Link href="/pricing/" className={resource.textLink}>View pricing <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>}
            <div className={styles.scopeLists}>
              <div><h3>What improves</h3><ResourceChecklist items={scope.improves} /></div>
              <div><h3>First 7 days</h3><ResourceChecklist items={scope.firstWeek} /></div>
            </div>
          </div>
          <div className={styles.scopeActions}>
            <LeadTriggerButton className={actionStyles.primary} eventLabel={`service-decision-${scope.auditLabel}`}>Start Free Audit</LeadTriggerButton>
            <Link href="/results/" className={resource.textLink}>View proof <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <p className={styles.byline}>Strategy &amp; Content by Syed Qamar Abbas <span>Founder &amp; CEO, Crea8iv Media</span></p>
        </div>
      </section>

      {(toolSlugs.length > 0 || related.length > 0) && (
        <section id={spotlight || featuredResource ? "practical-resources" : undefined} className={`${resource.section} ${resource.band}`} aria-labelledby={`${slug}-tools-title`}>
          <div className={resource.inner}>
            <ResourceHeading id={`${slug}-tools-title`} eyebrow="Practical resources" heading={<>Plan your <em>next step.</em></>} intro={spotlight?.intro} />
            {spotlight ? <ServiceResourceSpotlight {...spotlight} links={related} /> : (
              <>
                {toolSlugs.length > 0 && (
                  <div className={styles.tools}>
                    {toolSlugs.map((tool, index) => <ToolCard key={tool} tool={toolsBySlug[tool]} compact iconImage={`/img/homepage/connected-journey/${index === 0 ? "01-discover" : "05-follow-through"}.webp`} />)}
                  </div>
                )}
                {feature && featuredResource && (
                  <Link href={featuredResource.href} className={styles.resourceFeature} prefetch={false}>
                    <Image src={feature.image} width={1280} height={720} sizes="(max-width: 619px) 90vw, 280px" alt="" loading="lazy" />
                    <div className={styles.resourceFeatureCopy}>
                      <span className={resource.eyebrow}>Follow-up guide</span>
                      <h3>{featuredResource.label}</h3>
                      {featuredResource.description && <p>{featuredResource.description}</p>}
                      <span className={styles.resourceFeatureAction}>Read the guide <ArrowUpRight size={16} aria-hidden="true" /></span>
                    </div>
                  </Link>
                )}
                {remainingResources.length > 0 && <ul className={styles.links}>
                  {remainingResources.map(({ href, label, description }) => <li key={href}><Link href={href} className={resource.textLink}>{label} <ArrowUpRight size={16} aria-hidden="true" /></Link>{description && <p>{description}</p>}</li>)}
                </ul>}
              </>
            )}
          </div>
        </section>
      )}

      {articles.length > 0 && <InsightsSection id={`${slug}-insights`} eyebrow="Recommended reading" issue={hero.breadcrumb} heading={<>Practical guides <em>for your next decision.</em></>} intro="Explore examples, planning advice and related guides." linkLabel="View all articles" articles={articles} />}
      <FaqSection id={`${slug}-questions`} headingId={`${slug}-faq-title`} eyebrow="Before we begin" heading={<>Frequently asked <em>questions.</em></>} description={`What to know before planning ${hero.breadcrumb.toLowerCase()} for your business.`} items={faqs} centered />

      {config.consulting && <div className={`${resource.inner} ${styles.consulting}`}><ServiceConsultingContext discipline={config.consulting} /></div>}
      <ResourceClosing id="cta" heading={<AccentHeading {...closing} />} intro={closing.intro ?? ""} actions={closing.actions} />
      <div className={styles.footerLinks}>
        <LeadTriggerButton className={resource.textLink} eventLabel={`service-conversion-${slug}`}>Request Service Audit</LeadTriggerButton>
        <a href="#top" className={resource.textLink}>Back to top <ArrowUp size={16} aria-hidden="true" /></a>
      </div>
    </main>
  );
}
