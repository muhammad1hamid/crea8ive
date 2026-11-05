import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import {
  caseStudyItems,
  portfolioItems,
  proofStats,
  type StrategicPageConfig,
} from "@/lib/growth-pages";

export default function StrategicGrowthPage({ page }: { page: StrategicPageConfig }) {
  return (
    <div className="native-page overflow-hidden bg-[#050505] text-white">
      <section className="relative px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(var(--decorative-rgb),.04),transparent_34%),linear-gradient(180deg,rgba(255,255,255,.035),transparent_42%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FF6801]/60 to-transparent" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <nav className="mb-8 flex flex-wrap items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-300">Home</Link>
              <span>/</span>
              <span className="text-white/72">{page.eyebrow}</span>
            </nav>
            <p className="lux-eyebrow mb-5">{page.eyebrow}</p>
            <h1 className="max-w-5xl font-syne text-[clamp(2.45rem,5.7vw,5.6rem)] font-bold leading-[0.97] text-white">
              {page.headline}
            </h1>
            <p className="mt-7 max-w-[820px] font-inter text-lg leading-8 text-white/72">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={page.ctaHref ?? "/contact/"} className="portfolio-button">
                {page.ctaLabel ?? "Book Free Growth Audit"} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={page.secondaryCtaHref ?? "/results/"} className="portfolio-text-link">
                {page.secondaryCtaLabel ?? "View Results"} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <aside className="lux-card p-5">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-brand-300">What this page helps with</p>
            {page.visual ? (
              <div className="relative mt-5 aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-black">
                <Image
                  src={page.visual.image}
                  alt={page.visual.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 390px"
                  className="object-cover transition duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-white/[0.03]" />
              </div>
            ) : null}
            <div className="mt-5 grid gap-3">
              {page.bullets.map((item) => (
                <div key={item} className="flex gap-3 rounded-[18px] border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/72">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--icon-color)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-5 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
          {proofStats.map((stat) => (
            <div key={stat.label} className="bg-[#060504] p-5">
              <p className="font-syne text-2xl font-semibold text-[var(--icon-color)]">{stat.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/48">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-5 lg:grid-cols-3">
            {page.sections.map((section) => (
              <article key={section.title} className="lux-card p-6">
                <h2 className="font-orbitron text-xl font-semibold text-white">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/64">{section.body}</p>
                <ul className="mt-6 grid gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="border-t border-white/10 pt-3 text-sm text-white/72">{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.relatedInsights?.length ? (
        <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="portfolio-kicker">Related Insights</p>
                <h2 className="portfolio-display mt-5 text-4xl leading-[.98] sm:text-6xl">Support the service page with stronger supporting content.</h2>
                <p className="mt-5 text-lg leading-8 text-white/68">
                  These articles help search engines and buyers connect campaign demand, lead handling, and business trust.
                </p>
              </div>
              <Link href="/blog/" className="portfolio-text-link">
                Explore all insights <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {page.relatedInsights.map((item) => (
                <Link key={item.href} href={item.href} className="lux-card block p-6 transition hover:border-[#FF6801]/50">
                  <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.18em] text-brand-300">Insight</p>
                  <h3 className="mt-4 font-orbitron text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/64">{item.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/82">
                    Read article <ArrowUpRight className="h-4 w-4 text-brand-300" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.showPortfolio ? <PortfolioPreview /> : null}
      {page.showCases ? <CaseStudyPreview /> : null}

      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#080706] px-6 py-16 text-center lg:px-10 lg:py-24">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6801]/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <p className="portfolio-kicker justify-center"><MessageCircle className="h-3.5 w-3.5" /> Start with a quick audit</p>
          <h2 className="portfolio-display mt-5 text-4xl leading-[.95] sm:text-6xl">Want this system built for your business?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/62">
            Share your industry, city, and main growth goal. We will map the channels, pages, and follow-up system you need first.
          </p>
          <Link href="/contact/" className="portfolio-button mt-9">
            Book Free Growth Audit <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-16 text-white lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="portfolio-kicker">Portfolio</p>
            <h2 className="portfolio-display mt-5 text-4xl leading-[.98] sm:text-6xl">Visual proof that makes the work easy to trust.</h2>
            <p className="mt-5 text-lg leading-8 text-white/68">Browse Crea8iv work by output type: websites, graphics, reels, and lead-generation campaigns.</p>
          </div>
          <Link href="/portfolio/" className="portfolio-text-link">View Portfolio <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {portfolioItems.map((item) => (
            <Link key={item.title} href={item.href} className="group block overflow-hidden rounded-[24px] border border-white/10 bg-black">
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">{item.type}</p>
                <h3 className="mt-3 font-orbitron text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyPreview() {
  return (
    <section className="bg-black px-6 py-16 text-white lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <p className="portfolio-kicker">Results System</p>
          <h2 className="portfolio-display mt-5 text-4xl leading-[.98] sm:text-6xl">Build trust with results by industry, not generic promises.</h2>
          <p className="mt-5 text-lg leading-8 text-white/68">The strongest proof is organized around how buyers choose agencies: by industry, problem, channel, and outcome.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {caseStudyItems.slice(0, 4).map((study) => (
            <Link key={study.title} href={study.href} className="group grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative min-h-64 overflow-hidden bg-white/5">
                <Image src={study.image} alt={study.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="font-orbitron text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">{study.industry}</p>
                <h3 className="mt-3 font-orbitron text-2xl font-semibold text-white">{study.title}</h3>
                <p className="mt-3 text-sm font-semibold text-white">{study.result}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.services.map((service) => (
                    <span key={service} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/64">{service}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/case-studies/" className="portfolio-button mt-10">
          Explore Case Studies <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
