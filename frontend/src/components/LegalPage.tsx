import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS_DETAILS } from "@/lib/site-config";

type LegalPageProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalPage({ title, description, lastUpdated, children }: LegalPageProps) {
  return (
    <article className="mx-auto max-w-[1040px] px-5 pb-24 pt-36 sm:px-8 lg:px-10 lg:pt-44">
      <nav className="mb-8 flex items-center gap-2 font-orbitron text-[10px] uppercase tracking-[0.16em] text-white/45" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-[#FF6801]">Home</Link>
        <span aria-hidden="true">/</span>
        <span className="text-white/70">{title}</span>
      </nav>

      <header className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:px-10 lg:px-14 lg:py-14">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6801]/80 to-transparent" aria-hidden="true" />
        <p className="mb-5 font-orbitron text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF6801]">Legal</p>
        <h1 className="max-w-4xl font-syne text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl font-inter text-base leading-7 text-white/70 sm:text-lg">{description}</p>
        <p className="mt-6 font-inter text-xs uppercase tracking-[0.14em] text-white/45">Last updated: {lastUpdated}</p>
      </header>

      <div className="mt-10 rounded-[28px] border border-white/10 bg-[#0b0b0d]/80 px-6 py-9 sm:px-10 lg:px-14 lg:py-12
        [&_a]:text-[#FF6801] [&_a]:underline-offset-4 [&_a:hover]:underline
        [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-syne [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white
        [&_h2:first-child]:mt-0
        [&_li]:mb-2 [&_li]:font-inter [&_li]:leading-7 [&_li]:text-white/70
        [&_p]:mb-5 [&_p]:font-inter [&_p]:leading-7 [&_p]:text-white/70
        [&_strong]:font-semibold [&_strong]:text-white
        [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>

      <aside className="mt-8 rounded-2xl border border-[#FF6801]/25 bg-[#FF6801]/[0.06] px-6 py-6 font-inter text-sm leading-6 text-white/70">
        <strong className="text-white">Questions about this document?</strong>{" "}
        Email <a className="text-[#FF6801] hover:underline" href={`mailto:${BUSINESS_DETAILS.email}`}>{BUSINESS_DETAILS.email}</a>, call{" "}
        <a className="text-[#FF6801] hover:underline" href={BUSINESS_DETAILS.phoneHref}>{BUSINESS_DETAILS.phoneDisplay}</a>, or visit our{" "}
        <Link className="text-[#FF6801] hover:underline" href="/contact/">Contact Us page</Link>.
      </aside>
    </article>
  );
}
