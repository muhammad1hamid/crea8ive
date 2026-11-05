import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CLIENT_LOGOS } from "@/lib/client-logos";

const logos = CLIENT_LOGOS;

export default function PremiumLogoShowcase() {
  return (
    <section className="premium-logo-showcase relative overflow-hidden border-y border-white/[0.08] bg-[#050403] px-6 py-16 text-white sm:px-8 lg:px-10">
      <div className="premium-logo-grid-bg absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="portfolio-kicker">
              <Sparkles className="h-3.5 w-3.5" /> Premium identity work
            </p>
            <h2 className="portfolio-display mt-4 max-w-4xl text-4xl leading-[.95] sm:text-6xl">
              Logos that make brands feel expensive<span>.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
              A polished preview of Crea8iv Media logo design, wordmark, calligraphy, and brand identity systems crafted for memorable first impressions.
            </p>
          </div>
          <Link href="/results/logo-identity/" className="portfolio-text-link">
            View logo portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="premium-logo-row mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <a
              key={logo.src}
              href={logo.href ?? "/results/logo-identity/"}
              target={logo.href ? "_blank" : undefined}
              rel={logo.href ? "noopener noreferrer" : undefined}
              className="premium-logo-card group"
              aria-label={`${logo.href ? "Visit" : "View"} ${logo.name} in Crea8iv Media logo portfolio`}
            >
              <span className="premium-logo-card-glow" />
              <Image
                src={logo.src}
                alt={`${logo.name} by Crea8iv Media`}
                width={420}
                height={420}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                className="relative z-10 h-full w-full object-contain p-5 transition duration-700 group-hover:scale-105"
                priority={index < 2}
              />
              <span className="premium-logo-label">{logo.name.replace(" Logo Identity", "").replace(" Logo Design", "")}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
