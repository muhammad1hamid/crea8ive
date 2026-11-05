import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, Film, Image as ImageIcon } from "lucide-react";
import LeadTriggerButton from "@/components/LeadTriggerButton";
import type { LocalCaseStudySlug } from "@/lib/local-case-studies";
import { localCaseStudies } from "@/lib/local-case-studies";
import assetManifest from "@/data/local-portfolio.json";

type Asset = (typeof assetManifest.assets)[number];

export default function LocalCaseStudy({ slug }: { slug: LocalCaseStudySlug }) {
  const study = localCaseStudies[slug];
  const assets = assetManifest.assets.filter((asset) => asset.category === study.category && hasPublicAsset(asset));
  const images = assets.filter((asset) => asset.kind === "image");
  const videos = assets.filter((asset) => asset.kind === "video");
  const documents = assets.filter((asset) => asset.kind === "pdf");
  const proofStory = [
    ["Problem", study.intro],
    ["Strategy", study.story],
    ["Output", `The archive includes ${images.length} visual assets, ${videos.length} reels/videos, and ${documents.length} supporting documents for this category.`],
    ["Next step", "Use this proof to plan the right website, content, ads, local visibility, or automation system for a similar business."],
  ] as const;

  return (
    <main className="min-h-screen overflow-x-clip bg-[#080808] text-[#f4efe8]">
      <section className="relative overflow-hidden border-b border-white/[0.08] px-6 pb-16 pt-36 sm:px-8 lg:px-10 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(var(--decorative-rgb),.04),transparent_36%),linear-gradient(180deg,#100c09,#080808)]" />
        <div className="relative mx-auto max-w-[1440px]">
          <Link href="/results" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50 transition hover:text-[#FF6801]"><ArrowLeft className="h-4 w-4" /> Back to archive</Link>
          <p className="mt-16 eyebrow">{study.eyebrow}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="font-syne text-5xl leading-[0.93] tracking-normal sm:text-7xl lg:text-8xl">{study.title}</h1>
            <p className="max-w-xl text-base leading-7 text-white/62 sm:text-lg">{study.intro}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {study.services.map((service) => <span key={service} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">{service}</span>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-24">
        <div>
          <p className="eyebrow">The story in the archive</p>
          <h2 className="mt-4 font-syne text-4xl leading-tight sm:text-5xl">A system, not a single post.</h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-8 text-white/65">{study.story}</p>
          <div className="mt-10 grid grid-cols-3 gap-3 border-y border-white/[0.08] py-6">
            <Evidence label="Visual assets" value={images.length} icon={<ImageIcon />} />
            <Evidence label="Reels & video" value={videos.length} icon={<Film />} />
            <Evidence label="Reports & PDFs" value={documents.length} icon={<FileText />} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0b0908] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Proof path</p>
            <h2 className="mt-4 font-syne text-4xl leading-tight sm:text-5xl">How this collection should be read.</h2>
            <p className="mt-5 max-w-lg leading-7 text-white/58">
              Each result page is organized to show the business context, the creative system, the evidence, and the next action a similar business can take.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[22px] border border-white/[0.1] bg-white/[0.1] sm:grid-cols-2">
            {proofStory.map(([label, body]) => (
              <article key={label} className="bg-[#070605] p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--icon-color)]">{label}</p>
                <p className="mt-3 text-sm leading-7 text-white/64">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {images.length ? <section className="bg-[#f1ece5] px-6 py-16 text-[#17120f] sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 border-b border-[#17120f]/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow eyebrow-dark">Selected creative</p><h2 className="mt-3 font-syne text-4xl sm:text-6xl">The work speaks first.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-[#17120f]/60">Every image below is sourced from the optimized public archive.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((asset) => <GalleryItem key={asset.id} asset={asset} />)}
          </div>
        </div>
      </section> : null}

      {[...videos, ...documents].length ? <section className="mx-auto grid min-w-0 max-w-[1440px] gap-10 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
        <div className="min-w-0"><p className="eyebrow">Archive evidence</p><h2 className="mt-4 font-syne text-4xl sm:text-5xl">The supporting layer.</h2><p className="mt-5 max-w-lg leading-7 text-white/58">Reels, campaign PDFs, guidelines, and supporting material keep the case study grounded in the actual production system.</p></div>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          {[...videos, ...documents].map((asset) => <a key={asset.id} href={getPublicAssetHref(asset)} target="_blank" rel="noreferrer" className="group flex min-w-0 max-w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#FF6801]/55 hover:bg-white/[0.06]"><span className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6801]/12 text-[var(--icon-color)]">{asset.kind === "video" ? <Film className="h-5 w-5" /> : <FileText className="h-5 w-5" />}</span><span className="truncate text-sm text-white/75">{asset.label}</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--icon-color)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}
        </div>
      </section> : null}

      <section className="border-t border-white/[0.08] bg-[#0d0b0a] px-6 py-20 text-center sm:px-8 lg:px-10">
        <p className="eyebrow">Build the next chapter</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-syne text-4xl leading-tight sm:text-6xl">Your brand deserves a system this considered.</h2>
        <LeadTriggerButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF6801] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-[#160d08] transition hover:bg-[#FF6801]" eventLabel={`results-${slug}`}>
          Plan a similar system <ArrowUpRight className="h-4 w-4" />
        </LeadTriggerButton>
      </section>
    </main>
  );
}

function Evidence({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return <div><div className="flex items-center gap-2 text-[var(--icon-color)]">{icon}<span className="font-syne text-3xl text-[#f4efe8]">{value}</span></div><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">{label}</p></div>;
}

function GalleryItem({ asset }: { asset: Asset }) {
  const image = asset.optimizedSrc ?? asset.src;
  const width = Number(asset.optimizedWidth) || 4;
  const height = Number(asset.optimizedHeight) || 3;
  return (
    <a
      href={getPublicAssetHref(asset)}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-[22px] bg-[#16110e] focus:outline-none focus:ring-2 focus:ring-[#FF6801]"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image src={image} alt={`${asset.label} blurred background`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="scale-110 object-cover opacity-28 blur-xl" loading="lazy" />
      <Image src={image} alt={asset.label} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-2 transition duration-300 group-hover:scale-[1.01]" loading="lazy" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-5 pt-16">
        <p className="text-xs font-semibold text-white/85">{asset.label}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--icon-color)]">{asset.folder.join(" · ")}</p>
      </div>
    </a>
  );
}

function getPublicAssetHref(asset: Asset) {
  return asset.playSrc ?? asset.optimizedSrc ?? asset.posterSrc ?? asset.src;
}

function hasPublicAsset(asset: Asset) {
  return Boolean(asset.playSrc || asset.optimizedSrc || asset.posterSrc || !asset.src.startsWith("/portfolio-assets/"));
}
