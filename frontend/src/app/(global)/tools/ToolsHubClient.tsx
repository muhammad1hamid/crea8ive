"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics-events";
import ToolCard from "@/components/tools/ToolCard";
import { TOOL_CATEGORIES, tools } from "@/lib/tools";

export default function ToolsHubClient() {
  const [active, setActive] = useState<(typeof TOOL_CATEGORIES)[number]>("All");
  const visibleTools = active === "All" ? tools : tools.filter((tool) => tool.category === active);
  const rail = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  const move = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>("[data-tool-card]");
    element.scrollBy({ left: direction * ((card?.offsetWidth || 248) + 14), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    trackEvent("carousel_next", { location: "tools_directory", direction });
  };

  return (
    <section className="border-y border-white/[0.08] bg-[#080706] px-6 py-16 text-white lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap gap-3" role="group" aria-label="Tool categories">
          {TOOL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => { setActive(category); setPosition(1); rail.current?.scrollTo({ left: 0, behavior: "instant" }); }}
              aria-pressed={active === category}
              data-active={active === category}
              className="min-h-11 rounded-lg border border-[var(--border-soft)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-secondary)] transition data-[active=true]:border-[#FF6801] data-[active=true]:bg-[#FF6801] data-[active=true]:text-black"
            >
              {category}
            </button>
          ))}
        </div>
        <div key={active} ref={rail} id="tools-carousel" style={{ scrollPaddingInline: "1.5rem" }} onScroll={() => {
          const element = rail.current;
          const card = element?.querySelector<HTMLElement>("[data-tool-card]");
          if (element && card) setPosition(Math.min(visibleTools.length, Math.round(element.scrollLeft / (card.offsetWidth + 14)) + 1));
        }} onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
        }} className="tools-directory-grid horizontal-scroll-region mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3" role="region" aria-label="Website tools directory" tabIndex={0}>
          {visibleTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
        <div className="mt-4 flex items-center justify-between md:hidden">
          <span role="status" aria-live="polite" className="text-sm text-white/75">{position} / {visibleTools.length}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} disabled={position === 1} aria-controls="tools-carousel" aria-label="Previous tool" title="Previous tool" className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 disabled:opacity-40"><ChevronLeft /></button>
            <button type="button" onClick={() => move(1)} disabled={position === visibleTools.length} aria-controls="tools-carousel" aria-label="Next tool" title="Next tool" className="grid h-11 w-11 place-items-center rounded-lg border border-white/20 disabled:opacity-40"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
