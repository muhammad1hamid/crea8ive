import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calculator, CodeXml, HeartPulse, MapPin, Search, Sparkles, Globe } from "lucide-react";
import type { ToolPage } from "@/lib/tools";
import { getToolCardVisual } from "@/lib/card-visuals";
import { getServiceTone } from "@/lib/service-tones";

const compactBenefits: Record<string, string> = {
  "ai-visibility-checker": "Check how clearly AI search systems can understand your business.",
  "seo-audit": "Find technical and content gaps affecting search visibility.",
  "local-seo-audit": "Review your Google profile, local pages and trust signals.",
  "website-roi-calculator": "Estimate the value of turning more visits into enquiries.",
};

export default function ToolCard({ tool, compact = false }: { tool: ToolPage; compact?: boolean }) {
  const visual = getToolCardVisual(tool.slug);
  const Icon = { SEO: Search, "AI Visibility": Sparkles, "Local SEO": MapPin, Ads: Calculator, Website: Globe, ROI: Calculator, Healthcare: HeartPulse }[tool.category] || CodeXml;

  return (
    <article
      data-tool-card
      data-category={tool.category}
      data-service-tone={getServiceTone(tool.category)}
      data-compact={compact || undefined}
      className="tool-card group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-[var(--border-soft)] bg-[var(--card-bg)] transition hover:border-[var(--border-interactive)]"
    >
      {!compact && <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={visual.image}
          alt={visual.alt}
          fill
          sizes={compact ? "(max-width: 768px) 100vw, 360px" : "(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 30vw"}
          className="object-contain"
          loading="lazy"
        />
      </div>}
      <div className="tool-card-body flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="tone-icon">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 font-orbitron text-[9px] uppercase tracking-[0.15em] text-white/54">
          {tool.category}
        </span>
      </div>
      <h3 className="mt-4 font-orbitron text-lg font-semibold leading-tight text-white">{tool.name}</h3>
      <p className="mt-2 text-sm leading-6 text-white/75">{compact ? compactBenefits[tool.slug] ?? tool.benefit : tool.benefit}</p>
      {!compact ? <p className="mt-3 text-xs leading-5 text-white/65">{tool.inputSummary}</p> : null}
      <Link href={`/tools/${tool.slug}/`} className="tone-link mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2">
        Use Free Tool <ArrowUpRight className="h-4 w-4" />
      </Link>
      </div>
    </article>
  );
}
