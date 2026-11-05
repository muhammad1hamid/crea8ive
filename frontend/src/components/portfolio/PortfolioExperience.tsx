"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Camera,
  Clapperboard,
  Filter,
  FolderKanban,
  Layers3,
  LineChart,
  Search,
  Sparkles,
} from "lucide-react";
import type { PortfolioProject, PortfolioStats } from "@/lib/portfolio/types";

type Props = {
  projects: PortfolioProject[];
  stats: PortfolioStats;
  configured: boolean;
};

const filterOrder = [
  "All",
  "SEO",
  "Branding",
  "Website",
  "Meta Ads",
  "Google Ads",
  "Photography",
  "Video",
  "Creative",
  "Social Media",
  "Strategy",
  "Healthcare",
  "Real Estate",
  "Architecture",
  "Food",
] as const;

export default function PortfolioExperience({ projects, stats, configured }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filterOrder)[number]>("All");

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery = !normalized || project.searchText.includes(normalized);
      const matchesFilter =
        filter === "All" ||
        project.industry.toLowerCase().includes(filter.toLowerCase()) ||
        project.services.some((service) => service.toLowerCase().includes(filter.toLowerCase())) ||
        project.platforms.some((platform) => platform.toLowerCase().includes(filter.toLowerCase()));
      return matchesQuery && matchesFilter;
    });
  }, [filter, projects, query]);

  return (
    <div className="native-page relative isolate overflow-hidden bg-[#030303] text-white">
      {/* ── Luxury animated background stack (all z-0, behind z-10 content) ── */}
      {/* Base depth gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_-5%,rgba(var(--decorative-rgb),.04),transparent_42%),linear-gradient(180deg,#070505,#030303_70%)]" />
      {/* Slow-drifting aurora glows */}
      <div className="pf-aurora pointer-events-none fixed inset-0 z-0" aria-hidden />
      {/* Fine grid, faded toward the edges */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(circle_at_50%_30%,black,transparent_80%)]" />
      {/* Animated constellation network is now rendered site-wide from the root
          layout (ConstellationField, over content with screen blend). */}
      {/* Film grain + vignette for cinematic depth */}
      <div className="pf-grain pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,transparent_55%,rgba(0,0,0,.5))]" />

      <section className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-[1800px] flex-col justify-end px-5 pb-14 pt-36 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-[var(--icon-color)]" />
            Google Drive powered portfolio CMS
          </div>
          <h1 className="font-syne text-[clamp(48px,9vw,142px)] font-semibold leading-[0.9] tracking-normal text-white">
            A cinematic case study engine for every client folder.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
            Crea8iv Media&apos;s portfolio now works like a living operating system: scan Drive, classify assets, generate project narratives, publish case studies, calculate proof points, and expose every project through search, filters, SEO, and related work.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Projects" value={stats.projectsCompleted || projects.length} icon={<FolderKanban />} />
          <Stat label="Drive Items" value={stats.creativeAssets} icon={<Layers3 />} />
          <Stat label="Campaign Systems" value={stats.campaigns} icon={<LineChart />} />
          <Stat label="Reports" value={stats.reports} icon={<BarChart3 />} />
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.035] px-5 py-6 backdrop-blur-2xl sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/42" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by client, industry, platform, service, technology, year, country, campaign, keyword"
              className="h-14 w-full rounded-full border border-white/12 bg-black/35 pl-14 pr-5 text-sm text-white outline-none transition focus:border-[#FF6801] focus:ring-2 focus:ring-[#FF6801]/25"
            />
          </label>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:max-w-[760px]">
            <Filter className="h-5 w-5 shrink-0 text-[var(--icon-color)]" />
            {filterOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  filter === item
                    ? "border-[var(--border-soft)] bg-[#FF6801] text-black"
                    : "border-white/12 bg-white/[0.04] text-white/66 hover:border-white/30 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1800px] px-5 py-16 sm:px-8 lg:px-10">
        {!configured ? <DriveSetupPanel /> : null}

        <AnimatePresence mode="popLayout">
          {filteredProjects.length ? (
            <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-h-[360px] border-y border-white/10 py-20 text-center"
            >
              <p className="font-syne text-3xl text-white">The next chapter is taking shape.</p>
              <p className="mx-auto mt-4 max-w-xl text-white/58">
                Check back soon for new case studies, or contact Crea8iv Media to discuss your next growth chapter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="relative z-10 border-t border-white/10 bg-[#080808] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1800px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[var(--icon-color)]">Dynamic statistics</p>
            <h2 className="font-syne text-4xl font-semibold leading-tight text-white sm:text-6xl">Proof points that update as the archive grows.</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label="Videos" value={stats.videos} icon={<Clapperboard />} />
            <MiniStat label="Brands" value={stats.brands} icon={<BadgeCheck />} />
            <MiniStat label="Industries" value={stats.industries} icon={<Layers3 />} />
            <MiniStat label="Sections" value={stats.creativeAssets} icon={<Camera />} />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/24 p-5 shadow-[0_18px_70px_rgba(0,0,0,.35)] backdrop-blur-xl">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6801]/15 text-[var(--icon-color)] [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <p className="font-syne text-4xl font-semibold text-white">{value.toLocaleString()}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/48">{label}</p>
    </div>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-5 text-[var(--icon-color)] [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <p className="font-syne text-3xl font-semibold">{value.toLocaleString()}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</p>
    </div>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 22 });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.04, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="group relative min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_26px_90px_rgba(0,0,0,.44)]"
    >
      <Link href={`/portfolio/${project.slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-[#FF6801]">
        <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 30% 20%, ${project.brandColors[0]}44, transparent 45%)` }} />
        <div className="relative h-[330px] overflow-hidden bg-[#101010]">
          {project.heroAsset ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.heroAsset.previewUrl} alt={`${project.title} portfolio preview`} className="h-full w-full object-cover transition duration-700 ease-lux group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(var(--decorative-rgb),.04),transparent_44%),linear-gradient(135deg,#121212,#050505)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/8 to-transparent" />
          {project.logoAsset ? (
            <div className="absolute left-5 top-5 flex h-16 w-16 items-center justify-center rounded-lg border border-white/12 bg-black/42 p-2 backdrop-blur-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.logoAsset.previewUrl} alt={`${project.title} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
            </div>
          ) : null}
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--icon-color)]">{project.industry}</p>
              <h2 className="font-syne text-3xl font-semibold leading-none text-white">{project.title}</h2>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition group-hover:rotate-45 group-hover:border-[#FF6801] group-hover:bg-[#FF6801] group-hover:text-black">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="relative p-6">
          <p className="line-clamp-3 text-sm leading-6 text-white/65">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.services.slice(0, 4).map((service) => (
              <span key={service} className="rounded-full border border-white/10 bg-black/28 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
                {service}
              </span>
            ))}
          </div>
          <div className="mt-7 grid grid-cols-3 gap-2 text-center">
            <CardMetric label="Items" value={project.assets.length} />
            <CardMetric label="Media" value={project.gallery.length} />
            <CardMetric label="Reports" value={(project.assetCounts.reports ?? 0) + (project.assetCounts.pdf ?? 0)} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function CardMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/22 px-2 py-3">
      <p className="font-syne text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/38">{label}</p>
    </div>
  );
}

function DriveSetupPanel() {
  return (
    <div className="mb-8 rounded-lg border border-[var(--border-soft)] bg-[#FF6801]/8 p-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--icon-color)]">Selected work is being curated</p>
      <p className="max-w-4xl text-sm leading-6 text-white/72">
        We are preparing the next collection of client stories. In the meantime, explore our services or start a conversation about the growth system your business needs.
      </p>
    </div>
  );
}
