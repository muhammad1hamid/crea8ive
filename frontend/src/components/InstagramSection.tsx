import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social-links";

const IG_PROFILE = SOCIAL_LINKS.instagram;

const socialPreview = [
  {
    label: "Campaign creative",
    title: "Launch-ready visuals",
    body: "Premium posts, reels covers, offer graphics, and campaign assets built around real business goals.",
  },
  {
    label: "Behind the scenes",
    title: "Strategy in motion",
    body: "Content planning, shoots, design systems, local SEO work, and conversion-focused website improvements.",
  },
  {
    label: "Client proof",
    title: "Work worth opening",
    body: "Portfolio-led social proof from clinics, restaurants, architects, ecommerce brands, and local businesses.",
  },
] as const;

/**
 * Homepage Instagram section — first-party preview + follow button.
 */
export default function InstagramSection({
  heading = "Follow Us on Instagram",
  subtitle = "Our latest work, client wins and behind-the-scenes from the Crea8iv Media team in Rawalpindi & Islamabad.",
}: {
  heading?: string;
  subtitle?: string;
}) {
  return (
    <section className="native-page relative px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="lux-eyebrow mb-3">@crea8ivmedia</p>
            <h2 className="font-orbitron text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-tight text-white">
              {heading}
            </h2>
            <p className="mt-3 max-w-xl font-inter text-base leading-relaxed text-white/60">
              {subtitle}
            </p>
          </div>

          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FF6801] px-6 py-3 font-orbitron text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c0d00] shadow-[0_0_15px_rgba(var(--decorative-rgb),.04)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.06A6.74 6.74 0 1018.74 12 6.74 6.74 0 0012 5.26zm0 11.12A4.38 4.38 0 1116.38 12 4.38 4.38 0 0112 16.38zm6.96-11.39a1.58 1.58 0 11-1.57-1.57 1.58 1.58 0 011.57 1.57z" />
            </svg>
            Follow @crea8ivmedia
          </a>
        </div>

        <div className="home-instagram-preview-grid horizontal-scroll-region mt-10 grid gap-4 lg:grid-cols-3" role="region" aria-label="Instagram campaign previews" tabIndex={0}>
          {socialPreview.map((item, index) => (
            <article
              key={item.title}
              className="group relative min-h-[220px] overflow-hidden rounded-[26px] border border-[var(--border-soft)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.018)),radial-gradient(circle_at_88%_12%,rgba(var(--decorative-rgb),.04),transparent_38%)] p-6 shadow-[0_26px_80px_-58px_rgba(var(--decorative-rgb),.04)] transition duration-300 hover:-translate-y-1 hover:border-[#FF6801]/55"
            >
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.22em] text-[var(--icon-color)]">{item.label}</span>
              <h3 className="mt-5 font-syne text-2xl leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/62">{item.body}</p>
              <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-[var(--icon-color)] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="home-social-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
