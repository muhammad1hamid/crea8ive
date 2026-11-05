"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Download,
  Expand,
  FileText,
  ImageIcon,
  Layers3,
  Play,
  Search,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import type { PortfolioAsset, PortfolioProject } from "@/lib/portfolio/types";

type Props = {
  project: PortfolioProject;
  related: PortfolioProject[];
};

const storyBlocks = [
  ["Challenge", "challenge"],
  ["Strategy", "strategy"],
  ["Creative Direction", "creativeDirection"],
] as const;

export default function CaseStudyView({ project, related }: Props) {
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [activeAsset, setActiveAsset] = useState<PortfolioAsset | null>(null);

  const galleryFilters = useMemo(() => ["All", ...Array.from(new Set(project.gallery.map((asset) => labelCategory(asset.category))))], [project.gallery]);
  const filteredGallery = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return project.gallery.filter((asset) => {
      const matchesFilter = galleryFilter === "All" || labelCategory(asset.category) === galleryFilter;
      const matchesQuery = !normalized || `${asset.name} ${asset.category} ${asset.type}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [galleryFilter, project.gallery, query]);

  return (
    <div className="native-page relative isolate overflow-hidden bg-[#030303] text-white">
      {/* Constellation animation is rendered site-wide from the root layout. */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_10%,rgba(var(--decorative-rgb),.04),transparent_30%),radial-gradient(circle_at_82%_8%,rgba(255,255,255,.08),transparent_28%),linear-gradient(180deg,rgba(3,3,3,.25),#030303_72%)]" />

      <section className="relative z-10 mx-auto grid min-h-[94vh] max-w-[1800px] gap-8 px-5 pb-12 pt-36 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col justify-end">
          <Link href="/portfolio" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/66 transition hover:border-[#FF6801] hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[var(--icon-color)]">{project.industry} / {project.year}</p>
          <h1 className="font-syne text-[clamp(48px,8vw,132px)] font-semibold leading-[0.9] tracking-normal text-white">{project.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/70">{project.summary}</p>
          <div className="mt-9 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span key={service} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/62">
                {service}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="flex items-end">
          <div className="relative h-[58vh] min-h-[460px] w-full overflow-hidden rounded-lg border border-white/10 bg-[#101010] shadow-[0_40px_120px_rgba(0,0,0,.55)]">
            {project.heroAsset ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.heroAsset.previewUrl} alt={`${project.title} portfolio hero preview`} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_24%_22%,rgba(var(--decorative-rgb),.04),transparent_40%),linear-gradient(135deg,#151515,#050505)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/8 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
              {project.kpis.slice(0, 3).map((kpi) => (
                <div key={kpi.label} className="rounded-md border border-white/10 bg-black/42 p-4 backdrop-blur-xl">
                  <p className="font-syne text-2xl font-semibold">{kpi.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/46">{kpi.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.035] px-5 py-10 backdrop-blur-2xl sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1800px] gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewItem label="Timeline" value={project.timeline} icon={<BarChart3 />} />
          <OverviewItem label="Country" value={project.country} icon={<Target />} />
          <OverviewItem label="Drive Items" value={String(project.assets.length)} icon={<Layers3 />} />
          <OverviewItem label="Platforms" value={project.platforms.join(", ")} icon={<Sparkles />} />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1800px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Overview</p>
            <h2 className="font-syne text-4xl font-semibold leading-tight text-white sm:text-6xl">A generated case study built from the client archive.</h2>
          </div>
          <div className="grid gap-5">
            {storyBlocks.map(([label, key]) => (
              <StoryPanel key={key} label={label} body={project[key]} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-[#080808] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Objectives</p>
            <div className="space-y-3">
              {project.objectives.map((objective) => (
                <ProofRow key={objective} text={objective} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Results</p>
            <div className="space-y-3">
              {project.results.map((result) => (
                <ProofRow key={result} text={result} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1800px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-9">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Extracted Drive Sections</p>
          <h2 className="font-syne text-4xl font-semibold leading-tight text-white sm:text-6xl">Exact folders from the client archive.</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {project.assets.map((asset) => (
            <a
              key={asset.id}
              href={asset.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#FF6801]/60 hover:bg-[#FF6801]/8"
            >
              <span className="min-w-0">
                <span className="block truncate font-syne text-xl font-semibold text-white">{asset.name}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-[var(--icon-color)]">{labelCategory(asset.category)}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition group-hover:rotate-45 group-hover:text-[#FF6801]" />
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1800px] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Gallery</p>
            <h2 className="font-syne text-4xl font-semibold leading-tight text-white sm:text-6xl">Media, reports, motion, and proof.</h2>
          </div>
          <label className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/42" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search gallery assets"
              className="h-14 w-full rounded-full border border-white/12 bg-black/35 pl-14 pr-5 text-sm text-white outline-none transition focus:border-[#FF6801] focus:ring-2 focus:ring-[#FF6801]/25"
            />
          </label>
        </div>
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {galleryFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGalleryFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                galleryFilter === item ? "border-[var(--border-soft)] bg-[#FF6801] text-black" : "border-white/12 bg-white/[0.04] text-white/66 hover:border-white/30 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 2xl:columns-4">
          {filteredGallery.map((asset, index) => (
            <GalleryTile key={asset.id} asset={asset} index={index} onOpen={() => setActiveAsset(asset)} />
          ))}
        </div>
      </section>

      {project.downloads.length ? (
        <section className="relative z-10 border-y border-white/10 bg-white/[0.035] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1800px]">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Downloads</p>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {project.downloads.slice(0, 12).map((asset) => (
                <a key={asset.id} href={asset.downloadUrl} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/24 p-4 transition hover:border-[#FF6801]/60 hover:bg-[#FF6801]/8">
                  <span className="flex min-w-0 items-center gap-3">
                    <FileText className="h-5 w-5 shrink-0 text-[var(--icon-color)]" />
                    <span className="truncate text-sm text-white/72">{asset.name}</span>
                  </span>
                  <Download className="h-5 w-5 shrink-0 text-white/46" />
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="relative z-10 mx-auto max-w-[1800px] px-5 py-20 sm:px-8 lg:px-10">
          <div className="mb-9 flex items-end justify-between gap-5">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Related Projects</p>
              <h2 className="font-syne text-4xl font-semibold text-white">More work in this orbit.</h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-[#FF6801] sm:inline-flex">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/portfolio/${item.slug}`} className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                <div className="h-48 overflow-hidden bg-[#111]">
                  {item.heroAsset ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.heroAsset.previewUrl} alt={`${item.title} related portfolio preview`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  ) : null}
                </div>
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--icon-color)]">{item.industry}</p>
                  <p className="mt-2 font-syne text-2xl font-semibold text-white">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative z-10 border-t border-white/10 bg-[#0a0a0c] px-5 py-20 text-center sm:px-8 lg:px-10">
        <h2 className="mx-auto max-w-4xl font-syne text-4xl font-semibold leading-tight sm:text-6xl">Ready to turn your brand archive into a growth system?</h2>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("crea8iv:lead"))}
          className="mt-8 rounded-full border border-[var(--border-soft)] bg-[#FF6801] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
        >
          Start a project
        </button>
      </section>

      {activeAsset ? <Lightbox asset={activeAsset} onClose={() => setActiveAsset(null)} /> : null}
    </div>
  );
}

function OverviewItem({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/24 p-5">
      <div className="mb-5 text-[var(--icon-color)] [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{label}</p>
      <p className="mt-2 font-syne text-2xl font-semibold leading-tight text-white">{value}</p>
    </div>
  );
}

function StoryPanel({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">{label}</p>
      <p className="text-base leading-8 text-white/70">{body}</p>
    </div>
  );
}

function ProofRow({ text }: { text: string }) {
  return (
    <div className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6801] text-black">✓</span>
      <p className="text-sm leading-6 text-white/72">{text}</p>
    </div>
  );
}

function GalleryTile({ asset, index, onOpen }: { asset: PortfolioAsset; index: number; onOpen: () => void }) {
  const isMedia = asset.type === "image" || asset.type === "video";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "80px" }}
      transition={{ delay: Math.min(index * 0.02, 0.24), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] text-left shadow-[0_20px_70px_rgba(0,0,0,.35)]"
    >
      <div className="relative min-h-[220px] bg-[#101010]">
        {isMedia ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset.previewUrl} alt={asset.name} className="h-auto min-h-[220px] w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        ) : (
          <div className="flex min-h-[240px] items-center justify-center bg-[radial-gradient(circle_at_40%_20%,rgba(var(--decorative-rgb),.04),transparent_40%),linear-gradient(135deg,#151515,#070707)]">
            <FileText className="h-14 w-14 text-[var(--icon-color)]" />
          </div>
        )}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/42 text-white backdrop-blur-xl">
          {asset.type === "video" ? <Play className="h-4 w-4" /> : isMedia ? <Expand className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm font-medium leading-5 text-white/76">{asset.name}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--icon-color)]">{labelCategory(asset.category)}</p>
      </div>
    </motion.button>
  );
}

function Lightbox({ asset, onClose }: { asset: PortfolioAsset; onClose: () => void }) {
  const isMedia = asset.type === "image" || asset.type === "video";
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
      <button type="button" onClick={onClose} aria-label="Close gallery item" className="absolute right-5 top-5 rounded-full border border-white/12 bg-white/10 p-3 text-white transition hover:bg-white/20">
        <X className="h-5 w-5" />
      </button>
      <div className="w-full max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[#080808]">
        <div className="max-h-[78vh] overflow-auto bg-black">
          {isMedia ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset.previewUrl} alt={asset.name} className="mx-auto max-h-[78vh] w-auto object-contain" />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center">
              <FileText className="h-20 w-20 text-[var(--icon-color)]" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-syne text-2xl font-semibold">{asset.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--icon-color)]">{labelCategory(asset.category)}</p>
          </div>
          <div className="flex gap-3">
            {asset.webViewLink ? (
              <a href={asset.webViewLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/70 transition hover:border-[#FF6801] hover:text-white">
                Open in Drive
              </a>
            ) : null}
            {asset.downloadUrl ? (
              <a href={asset.downloadUrl} className="rounded-full border border-[var(--border-soft)] bg-[#FF6801] px-4 py-2 text-sm font-semibold text-black transition hover:bg-transparent hover:text-white">
                Download
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function labelCategory(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
