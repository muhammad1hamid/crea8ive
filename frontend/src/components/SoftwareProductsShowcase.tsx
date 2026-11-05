import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  HeartPulse,
  MessageSquareMore,
  UsersRound,
} from "lucide-react";
import { SOFTWARE_PRODUCTS } from "@/lib/software-products";

type SoftwareProductsShowcaseProps = {
  showIntro?: boolean;
};

const productIcons = {
  patientflow: HeartPulse,
};

const featureIcons = {
  patientflow: [UsersRound, MessageSquareMore, CalendarCheck2, ArrowUpRight],
};

export default function SoftwareProductsShowcase({ showIntro = true }: SoftwareProductsShowcaseProps) {
  return (
    <section id="software-products" className="relative overflow-hidden border-y border-white/[0.06] bg-[#060607] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--decorative-rgb),.04),transparent_38%),radial-gradient(circle_at_80%_70%,rgba(var(--decorative-rgb),.04),transparent_34%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {showIntro ? (
          <div className="mb-12 flex flex-col gap-7 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 font-orbitron text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--icon-color)]">Software by Crea8iv</p>
              <h2 className="font-syne text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Software for clinics. <span className="text-[var(--icon-color)]">Built around patient follow-up.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-inter text-base leading-7 text-white/65 sm:text-lg">
                PatientFlow helps clinics organize patient reactivation, WhatsApp follow-ups and appointment reminders.
              </p>
            </div>
            <Link
              href="/software-products/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-orbitron text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-[#FF6801]/70 hover:text-[#FF6801]"
            >
              Explore Our Software <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : null}

        <div className="grid gap-6">
          {SOFTWARE_PRODUCTS.map((product) => {
            const ProductIcon = productIcons[product.id];
            const icons = featureIcons[product.id];

            return (
              <article
                id={product.id}
                key={product.id}
                className="group relative scroll-mt-32 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-[#FF6801]/45 hover:shadow-[0_30px_90px_rgba(255,104,1,0.12)] sm:p-8 lg:p-10"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FF6801]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
                <div className="relative">
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-[#FF6801]/10 text-[var(--icon-color)]">
                        <ProductIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-orbitron text-lg font-bold text-white">{product.name}</p>
                        <p className="font-inter text-xs text-white/45">by Crea8iv Media</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-inter text-[10px] font-semibold uppercase tracking-[0.12em] ${"isNew" in product && product.isNew ? "border-[var(--border-soft)] bg-[#FF6801]/10 text-[var(--icon-color)]" : "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${"isNew" in product && product.isNew ? "bg-[#FF6801]" : "bg-emerald-300"}`} aria-hidden="true" /> {"isNew" in product && product.isNew ? "New platform" : "Live product"}
                    </span>
                  </div>

                  <p className="font-orbitron text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--icon-color)]">{product.eyebrow}</p>
                  <h3 className="mt-3 font-syne text-3xl font-bold leading-tight text-white sm:text-4xl">{product.headline}</h3>
                  <p className="mt-4 font-inter text-[15px] leading-7 text-white/65">{product.description}</p>
                  <p className="mt-4 border-l-2 border-[var(--border-soft)] pl-4 font-inter text-sm leading-6 text-white/50">{product.audience}</p>

                  <div className="mt-7 grid grid-cols-2 gap-3">
                    {product.features.map((feature, index) => {
                      const FeatureIcon = icons[index];
                      return (
                        <div key={feature} className="flex min-h-[72px] items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3">
                          <FeatureIcon className="h-4 w-4 shrink-0 text-[var(--icon-color)]" aria-hidden="true" />
                          <span className="font-inter text-xs font-medium leading-5 text-white/70 sm:text-sm">{feature}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {(
                      <>
                        <a href={product.productUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6801] px-6 py-3.5 font-orbitron text-[11px] font-bold uppercase tracking-[0.12em] text-[#1c0d00] transition-all hover:bg-[#FF6801] hover:shadow-[0_0_28px_rgba(255,104,1,0.35)]">
                          Explore PatientFlow <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <a href={product.demoUrl} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-orbitron text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#FF6801]/60 hover:text-[#FF6801]">
                          Book a Demo <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
