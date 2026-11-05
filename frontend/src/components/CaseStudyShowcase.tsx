import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck } from "lucide-react";
import { caseStudyProofSignals, caseStudyShowcaseItems, homepageCaseStudies } from "@/lib/case-study-showcase";
import styles from "./case-study-body.module.css";
import HomepageCaseStories from "./HomepageCaseStories";

type CaseStudyShowcaseProps = {
  variant?: "home" | "results";
};

export default function CaseStudyShowcase({ variant = "results" }: CaseStudyShowcaseProps) {
  if (variant === "home") return <HomepageCaseStories />;
  return <CaseStudyResults variant={variant} />;
}

function CaseStudyResults({ variant = "results" }: CaseStudyShowcaseProps) {
  const isHome = variant === "home";
  const studies = isHome ? homepageCaseStudies : caseStudyShowcaseItems;

  return (
    <section
      id={isHome ? "featured-case-studies" : "client-case-studies"}
      className={`${styles.showcase} ${isHome ? styles.homeShowcase : ""} relative overflow-hidden border-y border-white/[0.08] bg-[#050403] px-6 text-white sm:px-8 lg:px-10 ${
        isHome ? "py-18 sm:py-20 lg:py-24" : "py-16 sm:py-20 lg:py-24"
      }`}
      aria-labelledby={`${variant}-case-studies-heading`}
    >
      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="home-lux-eyebrow">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> {isHome ? "Client stories" : "Case studies and proof"}
            </p>
            <h2 id={`${variant}-case-studies-heading`} className="home-lux-heading mt-4">
              {isHome ? "The work is only half the story." : "Open the full case study, proof page or live client website."}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">
              {isHome
                ? "Behind every project is a business challenge. Explore what the client needed, what we worked on and how the solution came together."
                : "These pages document website design, SEO, AI visibility, creative production, admin systems and conversion strategy with verified evidence and no inflated performance claims."}
            </p>
          </div>
          <Link href="/case-studies/" className="home-lux-link w-fit">
            {isHome ? "Explore All Case Studies" : "View all case studies"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {!isHome && <dl className={`${styles.standards} mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4`} aria-label="Case study proof standards">
          {caseStudyProofSignals.map((signal) => (
            <div key={signal.label} className="border border-white/[0.09] bg-white/[0.035] px-4 py-3">
              <dt className="font-inter text-[10px] uppercase tracking-[0.18em] text-white/42">{signal.label}</dt>
              <dd className="mt-1 font-syne text-lg leading-tight text-white">{signal.value}</dd>
            </div>
          ))}
        </dl>}

        <div
          className={`${styles.rail} horizontal-scroll-region case-study-rail mt-10 grid gap-5 overflow-x-auto pb-4 ${
            isHome ? "auto-cols-[minmax(300px,84vw)] grid-flow-col md:auto-cols-[minmax(390px,34vw)]" : "grid-flow-col auto-cols-[minmax(310px,88vw)] md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible xl:grid-cols-3"
          }`}
          role="region"
          aria-label={isHome ? "Featured Crea8iv Media case studies" : "Client case studies"}
          tabIndex={0}
        >
          {studies.map((study) => (
            <article key={study.id} className="group min-w-0 overflow-hidden rounded-lg border border-white/[0.1] bg-white/[0.035] shadow-[0_24px_70px_-54px_rgba(var(--decorative-rgb),.04)]">
              <Link href={study.primaryHref} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6801] focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                <div className="case-study-media-stage relative aspect-[16/9] overflow-hidden bg-black/70">
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    sizes={isHome ? "(max-width: 768px) 82vw, 34vw" : "(max-width: 1024px) 92vw, 24vw"}
                    className={`transition duration-700 ${
                      study.id === "cake-art-academy" ? "object-contain p-8" : "object-contain"
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--icon-color)]">{study.statusLabel}</p>
                  <p className="mt-2 text-xs leading-5 text-white/62">{study.industry} · {study.market}</p>
                  <h3 className="mt-3 font-syne text-2xl leading-tight text-white">{study.name}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/62">{study.eyebrow}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {study.serviceTags.slice(0, 3).map((tag) => (
                      <span key={tag} className="border border-white/10 bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white/45">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 font-orbitron text-[11px] font-black uppercase tracking-[.16em] text-[var(--icon-color)]">
                    {study.primaryLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
              <div className="flex flex-col gap-2 border-t border-white/[0.08] p-5 sm:flex-row">
                {study.primaryExternal ? (
                  <a href={study.primaryHref} target="_blank" rel="noopener noreferrer" className="portfolio-button min-h-11 flex-1 justify-center text-center">
                    {study.primaryLabel} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={study.primaryHref} className="portfolio-button min-h-11 flex-1 justify-center text-center">
                    {study.primaryLabel}
                  </Link>
                )}
                {study.secondaryHref ? (
                  study.secondaryExternal ? (
                    <a href={study.secondaryHref} target="_blank" rel="noopener noreferrer" className="portfolio-text-link min-h-11 flex-1 justify-center text-center">
                      {study.secondaryLabel} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={study.secondaryHref} className="portfolio-text-link min-h-11 flex-1 justify-center text-center">
                      {study.secondaryLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
