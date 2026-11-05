import Link from "next/link";
import { ArrowUpRight, Gauge, MapPinned, SearchCheck, Sparkles } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import { featuredToolSlugs, serviceToolMap, toolsBySlug } from "@/lib/tools";

export default function ToolsDiscovery({
  title = "Not sure what's holding your growth back?",
  intro = "Run a free audit before spending more.",
  slugs = [...featuredToolSlugs],
  showAllLink = true,
}: {
  title?: string;
  intro?: string;
  slugs?: string[];
  showAllLink?: boolean;
}) {
  const selectedTools = slugs.map((slug) => toolsBySlug[slug]).filter(Boolean);
  const visualSteps = [
    { label: "Scan", icon: SearchCheck, tone: "search" },
    { label: "Score", icon: Gauge, tone: "web" },
    { label: "Prioritize", icon: Sparkles, tone: "automation" },
    { label: "Act", icon: MapPinned, tone: "local" },
  ];

  return (
    <section className="tools-discovery-section relative overflow-hidden border-y border-white/[0.08] bg-[#080706] px-6 py-16 text-white lg:px-10 lg:py-24" data-service-tone="search">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(var(--decorative-rgb),.04),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="portfolio-kicker">Free Growth Tools</p>
            <h2 className="portfolio-display mt-4 text-3xl leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">{intro}</p>
            {showAllLink && <Link href="/tools/" className="tone-link mt-3 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4">Explore all free tools <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>}
          </div>
          <div className="tools-visual-system horizontal-scroll-region" role="region" aria-label="Website visibility tool workflow" tabIndex={0}>
            {visualSteps.map(({ label, icon: Icon, tone }, index) => (
              <div className="tools-visual-node" key={label} data-service-tone={tone}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="tone-icon"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="tools-discovery-grid horizontal-scroll-region mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4" role="region" aria-label="Featured website tools" tabIndex={0}>
          {selectedTools.map((tool) => <ToolCard key={tool.slug} tool={tool} compact />)}
        </div>
      </div>
    </section>
  );
}

export function ServiceToolsPanel({ slug }: { slug: string }) {
  const selectedTools = (serviceToolMap[slug] ?? []).map((toolSlug) => toolsBySlug[toolSlug]).filter(Boolean);
  if (!selectedTools.length) return null;

  return (
    <section className="mx-auto mt-14 max-w-[1180px] px-5 sm:px-8 lg:px-10">
      <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-[var(--icon-color)]">Check Before You Spend</p>
        <h2 className="mt-3 font-syne text-3xl font-bold text-white">Use the relevant free tool for this service.</h2>
        <p className="mt-3 max-w-2xl leading-7 text-white/64">Get a practical score or estimate first, then bring better questions into the strategy call.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {selectedTools.map((tool) => <ToolCard key={tool.slug} tool={tool} compact />)}
        </div>
      </div>
    </section>
  );
}
