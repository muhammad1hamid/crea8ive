import { ArrowRight, ArrowUpRight, BarChart3, MapPinned, Search, Sparkles, Workflow } from "lucide-react";
import Link from "next/link";

const channels = [
  { label: "Google", sublabel: "Search & Ads", href: "/google-ads/", icon: Search },
  { label: "Meta", sublabel: "Social Leads", href: "/meta-ads/", icon: Sparkles },
  { label: "Local", sublabel: "Maps Visibility", href: "/google-business-profile-growth/", icon: MapPinned },
  { label: "AI", sublabel: "Automation", href: "/ai-search-optimization/", icon: Workflow },
];

const proof = [
  {
    label: "Strategy",
    title: "Clear direction",
    body: "The right offer, funnel, and channel mix before budget gets wasted.",
    href: "/about/",
    icon: Sparkles,
  },
  {
    label: "Execution",
    title: "Built to convert",
    body: "Landing pages, ads, local visibility, and follow-up systems that move together.",
    href: "/results/",
    icon: Workflow,
  },
  {
    label: "Performance",
    title: "Measured growth",
    body: "Trackable leads, cleaner reporting, and decisions backed by actual demand signals.",
    href: "/pricing/",
    icon: BarChart3,
  },
];

export default function LuxuryProofStrip() {
  return (
    <section className="luxury-proof border-y border-white/[0.08] bg-[radial-gradient(circle_at_top,_rgba(var(--decorative-rgb),.04),_transparent_42%),linear-gradient(180deg,_#130e0b_0%,_#080808_100%)]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="grid border-x border-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
          {channels.map(({ label, sublabel, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="group relative overflow-hidden border-b border-white/[0.08] px-6 py-6 transition duration-500 hover:bg-white/[0.03] sm:px-8 xl:border-b-0 xl:border-r xl:last:border-r-0"
              aria-label={`Open ${label} services`}
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6801]/70 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(var(--decorative-rgb),.04),_transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="font-syne text-[2.15rem] font-semibold leading-none text-[#f4efe8] transition duration-500 group-hover:-translate-y-0.5">
                    {label}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.34em] text-white/52 transition duration-500 group-hover:text-white/72">
                    {sublabel}
                  </p>
                </div>
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[var(--icon-color)] transition duration-500 group-hover:-translate-y-1 group-hover:border-[#FF6801]/40 group-hover:bg-[#FF6801]/10 group-hover:text-[#f4efe8]">
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid border-x border-white/[0.08] lg:grid-cols-[1.04fr_1.96fr]">
          <div className="relative overflow-hidden border-b border-white/[0.08] px-6 py-10 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(var(--decorative-rgb),.04),_transparent_34%)]" />
            <div className="relative">
              <p className="eyebrow">The Crea8iv standard</p>
              <h2 className="mt-4 max-w-[11ch] font-syne text-4xl leading-[0.98] text-[#f4efe8] sm:text-5xl">
                Growth should feel intentional.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 sm:text-base">
                A senior team, one connected system, and a sharper path from attention to revenue for businesses in Rawalpindi, Islamabad, and across Pakistan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about/"
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[#f4efe8] transition duration-500 hover:-translate-y-0.5 hover:border-[#FF6801]/55 hover:bg-[#FF6801]/10"
                >
                  Why Crea8iv
                  <ArrowUpRight className="h-4 w-4 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/72 transition duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3">
            {proof.map(({ label, title, body, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="group relative overflow-hidden border-b border-white/[0.08] px-6 py-8 transition duration-500 hover:bg-white/[0.03] sm:min-h-[320px] sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 lg:px-8 lg:py-14"
                aria-label={`Open ${title}`}
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(var(--decorative-rgb),.04),_transparent_38%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[#FF6801]/8 text-[var(--icon-color)] transition duration-500 group-hover:-translate-y-1 group-hover:border-[#FF6801]/40 group-hover:bg-[#FF6801]/14 group-hover:text-[#f4efe8]">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--icon-color)]">{label}</p>
                  <p className="mt-2 font-syne text-[2rem] leading-tight text-[#f4efe8]">{title}</p>
                  <p className="mt-4 max-w-[22ch] text-sm leading-7 text-white/56 transition duration-500 group-hover:text-white/72">
                    {body}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--icon-color)] transition duration-500 group-hover:translate-x-1 group-hover:text-[#f4efe8]">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
