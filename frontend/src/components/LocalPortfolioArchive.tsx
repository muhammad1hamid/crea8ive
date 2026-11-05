"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import WebsitePortfolioGrid from "@/components/WebsitePortfolioGrid";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import grids from "@/data/portfolio-grid-assets.json";

type PortfolioArchiveCopy = {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  personalStory?: {
    eyebrow?: string;
    title: string;
    body: string;
    points?: string[];
  };
  primaryCta?: string;
  secondaryCta?: string;
  monogram?: string;
  imageAltName?: string;
  closeEyebrow?: string;
  closeTitle?: string;
  closeHref?: string;
  closeLabel?: string;
  hideFeaturedWork?: boolean;
  creatorName?: string;
  disableCaseStudyLinks?: boolean;
  excludeCrea8ivAssets?: boolean;
};


export default function LocalPortfolioArchive({ copy = {}, headingLevel = "h1" }: { copy?: PortfolioArchiveCopy; headingLevel?: "h1" | "h2" }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", ...Array.from(new Set(grids.map(item => item.category)))];
  const visible = useMemo(() => grids.filter(item =>
    (category === "All" || item.category === category) &&
    (!copy.excludeCrea8ivAssets || !/crea8iv|cre8iv/i.test(item.name)) &&
    `${item.name} ${item.category} ${item.label}`.toLowerCase().includes(query.toLowerCase().trim())
  ), [category, query, copy.excludeCrea8ivAssets]);
  return <main className="portfolio-archive brand-site-shell min-h-screen overflow-x-clip bg-[var(--bg-page)] text-[var(--text-strong)]">
    <header className="mx-auto max-w-[1440px] px-5 pb-12 pt-36 sm:px-8 lg:px-10">
      <p className="portfolio-kicker">{copy.eyebrow || "Selected work"}</p>
      {headingLevel === "h1" ? (
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{copy.title || "Websites and creative grids."} {copy.highlight}</h1>
      ) : (
        <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{copy.title || "Websites and creative grids."} {copy.highlight}</h2>
      )}
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-soft)]">{copy.description || "Explore website projects and complete social media grids, with room to see each brand’s visual system."}</p>
      {copy.personalStory && <div className="mt-8 max-w-3xl"><h2 className="text-2xl font-semibold">{copy.personalStory.title}</h2><p className="mt-4 leading-7 text-[var(--text-soft)]">{copy.personalStory.body}</p></div>}
      <a href="#website-portfolio" className="portfolio-button mt-7">Explore the work ↓</a>
    </header>
    <section id="website-portfolio" className="mx-auto max-w-[1440px] scroll-mt-28 px-5 py-10 sm:px-8 lg:px-10">
      <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">Website portfolio</h2>
      <WebsitePortfolioGrid />
    </section>
    <section id="archive" className="mx-auto max-w-[1440px] scroll-mt-28 px-5 py-14 sm:px-8 lg:px-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5"><div><p className="portfolio-kicker">Complete social grids</p><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">The whole visual story.</h2></div>
        <label className="grid w-full gap-2 text-sm sm:w-72">Search grids<input value={query} onChange={e=>setQuery(e.target.value)} className="registration-input" placeholder="Brand or industry" /></label>
      </div>
      <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter social grids">{categories.map(item=><button key={item} onClick={()=>setCategory(item)} aria-pressed={category===item} className={`min-h-11 rounded-full border px-4 py-2 text-sm ${category===item ? "border-[#FF6801] bg-[#FF6801] text-black" : "border-[var(--border-soft)]"}`}>{item}</button>)}</div>
      <p role="status" className="mb-5 text-sm text-[var(--text-muted)]">{visible.length} grid previews</p>
      <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(item=><figure key={item.id} className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-solid)]">
          <Image src={item.optimizedSrc || item.src} alt={`${item.category} social media grid — ${item.label}`} width={item.optimizedWidth || 900} height={item.optimizedHeight || 1200} sizes="(max-width:639px) 100vw, (max-width:1023px) 50vw, 33vw" className="h-auto w-full" loading="lazy" />
          <figcaption className="p-5 text-sm text-[var(--text-soft)]">
            <span className="block font-semibold text-[var(--text-strong)]">{item.label}</span>
            <span className="mt-1 block">{item.category} · Social grid showcase</span>
          </figcaption>
        </figure>)}
      </div>
      {!visible.length && <p className="py-12 text-center">No grids match. Try another industry or search.</p>}
    </section>
    <section className="border-t border-[var(--border-soft)] px-5 py-16 text-center">
      <h2 className="mx-auto max-w-3xl text-3xl font-semibold sm:text-5xl">{copy.closeTitle || "Let’s build your next project."}</h2>
      {copy.closeHref ? <Link href={copy.closeHref} className="portfolio-button mt-7">{copy.closeLabel || "Start a conversation"}</Link> : <LeadTriggerButton className="portfolio-button mt-7" eventLabel="portfolio_grid_enquiry">Discuss your project</LeadTriggerButton>}
    </section>
  </main>;
}
