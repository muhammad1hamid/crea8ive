import Link from "next/link";
import styles from "./location-experience.module.css";
import { ArrowUpRight, Building2, Mail, MapPinned, Navigation, Phone } from "lucide-react";
import {
  BUSINESS_DETAILS,
  BUSINESS_LOCATION,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_PLACE_URL,
} from "@/lib/site-config";

type LocationExperienceProps = {
  variant?: "full" | "compact";
  className?: string;
};

export default function LocationExperience({
  variant = "full",
  className = "",
}: LocationExperienceProps) {
  if (variant === "compact") {
    return (
      <section
        className={`${styles.section} mx-auto max-w-[1440px] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 ${className}`.trim()}
        aria-labelledby="homepage-location-heading"
      >
        <div className={`${styles.frame} overflow-hidden`}>
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr] lg:p-10">
            <div>
              <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-[var(--icon-color)]">
                Visit the office
              </p>
              <h2 id="homepage-location-heading" className="mt-4 font-syne text-3xl font-bold text-white sm:text-4xl">
                A real office, clear directions, and a faster path to conversation.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">
                Meet Crea8iv Media in Bahria Town, Rawalpindi, or open Google Maps instantly for directions,
                calls, and route planning.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#FF6801] px-5 text-sm font-semibold text-[#1a0b02] transition hover:-translate-y-0.5 hover:bg-[#ff7b20]"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </a>
                <Link
                  href="/contact/"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-[#FF6801]/60 hover:text-[#FF6801]"
                >
                  Contact the team
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className={`${styles.address} p-5`}>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[#FF6801]/12 text-[var(--icon-color)]">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{BUSINESS_LOCATION.shortLabel}</p>
                  <p className="mt-2 text-sm leading-7 text-white/62">{BUSINESS_DETAILS.address}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {BUSINESS_LOCATION.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/62"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--icon-color)] transition hover:text-[#ff7b20]"
              >
                Open in Google Maps
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${styles.section} mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10 ${className}`.trim()}
      aria-labelledby="contact-location-heading"
    >
      <div className={`${styles.frame} overflow-hidden`}>
        <div className="grid lg:grid-cols-[.92fr_1.08fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="font-orbitron text-[11px] uppercase tracking-[0.18em] text-[var(--icon-color)]">
              Office location
            </p>
            <h2 id="contact-location-heading" className="mt-4 font-syne text-3xl font-bold text-white sm:text-4xl">
              Easy to find, easier to plan around.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">
              Use the live map for route planning, open turn-by-turn directions in Google Maps, or contact the
              team directly before your visit.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className={styles.fact}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[#FF6801]/12 text-[var(--icon-color)]">
                    <MapPinned className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-white">Office address</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/66">{BUSINESS_DETAILS.address}</p>
              </div>

              <div className={styles.fact}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[#FF6801]/12 text-[var(--icon-color)]">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-white">Coverage</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/66">{BUSINESS_LOCATION.coverageSummary}</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#FF6801] px-5 text-sm font-semibold text-[#1a0b02] transition hover:-translate-y-0.5 hover:bg-[#ff7b20]"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
              <a
                href={BUSINESS_DETAILS.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-[#FF6801]/60 hover:text-[#FF6801]"
              >
                <Phone className="h-4 w-4" />
                Call {BUSINESS_DETAILS.phoneDisplay}
              </a>
              <a
                href={`mailto:${BUSINESS_DETAILS.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-[#FF6801]/60 hover:text-[#FF6801]"
              >
                <Mail className="h-4 w-4" />
                Email office
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {BUSINESS_LOCATION.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/62"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[360px] border-t border-white/10 lg:min-h-[100%] lg:border-l lg:border-t-0">
            <iframe
              title="Crea8iv Media office map"
              src={GOOGLE_MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-[18px] border border-white/12 bg-black/55 p-4 backdrop-blur">
              <p className="text-sm font-semibold text-white">{BUSINESS_LOCATION.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/62">{BUSINESS_DETAILS.address}</p>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--icon-color)] transition hover:text-[#ff7b20]"
              >
                Open the full map
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
