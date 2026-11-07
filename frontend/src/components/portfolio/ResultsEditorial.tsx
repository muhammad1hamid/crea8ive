import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import type { CaseStudyShowcaseItem } from "@/lib/case-study-showcase";
import { additionalResults, featuredResults, resultsCollection } from "@/lib/results-portfolio";
import { ResultsCollection, ResultsReveals } from "./ResultsCollection";
import styles from "./results-editorial.module.css";

type FeaturedStudy = (typeof featuredResults)[number];

function StudyLinks({ study, featured = false }: { study: CaseStudyShowcaseItem; featured?: boolean }) {
  return (
    <div className={styles.studyLinks}>
      <Link href={study.primaryHref} prefetch={false} className={styles.textLink}>
        {study.primaryHref.startsWith("/case-studies/") ? "View Case Study" : study.primaryLabel}
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
      {study.secondaryHref && (
        <Link
          href={study.secondaryHref}
          prefetch={false}
          target={study.secondaryExternal ? "_blank" : undefined}
          rel={study.secondaryExternal ? "noopener noreferrer" : undefined}
          className={styles.textLink}
        >
          {featured && study.secondaryExternal ? "Visit Live Website" : study.secondaryLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function StudyCard({ study, lead = false }: { study: FeaturedStudy; lead?: boolean }) {
  return (
    <article className={lead ? styles.leadStudy : styles.supportStudy} data-reveal>
      <Link
        href={study.primaryHref}
        prefetch={false}
        className={styles.studyImage}
        aria-label={`View ${study.name} case study`}
      >
        <Image {...study.preview} alt={study.preview.alt} loading="lazy" sizes={lead ? "(max-width: 900px) 94vw, 54vw" : "(max-width: 639px) 94vw, 32vw"} />
      </Link>
      <div className={styles.studyCopy}>
        <p className={styles.studyCategory}>{study.industry} <span>·</span> {study.market}</p>
        <h3>{study.name}</h3>
        <p className={styles.studyDescription}>{study.eyebrow}</p>
        <ul className={styles.studyScope} aria-label="Project scope">
          {study.serviceTags.slice(0, 3).map(service => <li key={service}>{service}</li>)}
        </ul>
        <StudyLinks study={study} featured />
      </div>
    </article>
  );
}

export default function ResultsEditorial() {
  const [lead, ...supporting] = featuredResults;

  return (
    <main className={styles.page} data-results-editorial>
      <ResultsReveals />
      <section id="portfolio-perspective-hero" className={styles.hero} aria-labelledby="results-title">
        <div className={`${styles.frame} ${styles.heroLayout}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-intro>Selected work <span>/</span> Creativity in action</p>
            <h1 id="results-title" data-intro>Good work deserves a closer look.</h1>
            <p className={styles.intro} data-intro>Websites, identities and campaigns shaped around real business needs and built to make brands clearer, more credible and easier to remember.</p>
            <div className={styles.actions} data-intro>
              <a href="#client-case-studies" className={styles.primary}>Explore Case Studies <ArrowDown size={18} aria-hidden="true" /></a>
              <Link href="/contact/" className={styles.textLink} prefetch={false}>Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className={styles.collage} aria-label="Selected website previews">
            {[lead, supporting[0]].map((study, index) => (
              <Link
                key={study.id}
                href={study.primaryHref}
                prefetch={false}
                className={`${styles.browserFrame} ${index === 0 ? styles.browserLead : styles.browserSupport}`}
                data-intro
              >
                <span className={styles.browserLabel}>
                  <span>{study.name}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
                <Image
                  {...study.preview}
                  alt={study.preview.alt}
                  sizes={index === 0 ? "(max-width: 900px) 80vw, 46vw" : "(max-width: 900px) 48vw, 26vw"}
                  loading="eager"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="client-case-studies" className={styles.cases} aria-labelledby="results-case-studies-title">
        <div className={styles.frame}>
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow} data-reveal>Selected case studies</p>
              <h2 id="results-case-studies-title" data-reveal>The thinking behind the work.</h2>
            </div>
            <p className={styles.sectionIntro} data-reveal>Every project begins with a challenge. Explore the businesses, creative decisions and digital experiences behind our work.</p>
          </header>
          <div className={styles.caseLayout}>
            <StudyCard study={lead} lead />
            <div className={styles.supporting}>
              {supporting.map(study => <StudyCard key={study.id} study={study} />)}
            </div>
          </div>
          <div className={styles.proofFooter}>
            <details className={styles.proofIndex}>
              <summary><span>More project stories and proof</span><Plus size={18} aria-hidden="true" /></summary>
              <div className={styles.proofGrid}>
                {additionalResults.map(study => (
                  <article key={study.id} className={styles.proofItem}>
                    <Link href={study.primaryHref} prefetch={false} className={styles.proofImage} aria-label={`Explore ${study.name}`}>
                      <Image src={study.image} alt={study.imageAlt} fill sizes="(max-width: 639px) 100vw, 210px" loading="lazy" />
                    </Link>
                    <div>
                      <p className={styles.studyCategory}>{study.industry}</p>
                      <h3>{study.name}</h3>
                      <p className={styles.studyDescription}>{study.eyebrow}</p>
                      <StudyLinks study={study} />
                    </div>
                  </article>
                ))}
              </div>
            </details>
            <Link href="/case-studies/" prefetch={false} className={styles.textLink}>
              Explore All Case Studies <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="website-portfolio" className={styles.collection} aria-labelledby="results-collection-title">
        <div id="archive" className={styles.frame}>
          <header className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow} data-reveal>Explore the work</p>
              <h2 id="results-collection-title" data-reveal>A closer look at what we create.</h2>
            </div>
            <p className={styles.sectionIntro} data-reveal>From digital experiences to visual identities and creative campaigns, explore selected work across different disciplines.</p>
          </header>
          <ResultsCollection work={resultsCollection} />
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="results-closing-title">
        <div className={`${styles.frame} ${styles.closingLayout}`}>
          <div>
            <p className={styles.eyebrow} data-reveal>Have something in mind?</p>
            <h2 id="results-closing-title" data-reveal>Have something worth building?</h2>
          </div>
          <div data-reveal>
            <p className={styles.sectionIntro}>Tell us what you&apos;re working towards. Let&apos;s explore how the right digital experience can support your next step.</p>
            <div className={styles.actions}>
              <Link href="/contact/" prefetch={false} className={styles.primary}>Discuss Your Project <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href="/our-services/" prefetch={false} className={styles.textLink}>Explore Our Services <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
