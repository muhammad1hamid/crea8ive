"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Pause,
  Globe,
  Search,
  Infinity,
  Palette,
  Users,
  BriefcaseBusiness,
  Layers,
  MapPin,
  Bot,
  ChartNoAxesCombined,
  MessageSquareText,
} from "lucide-react";
import { getServiceTone } from "@/lib/service-tones";
import type { LucideIcon } from "lucide-react";
import FaIcon, { type FaIconName } from "@/components/ui/FaIcon";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { GOOGLE_MAPS_PLACE_URL } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics-events";
import "./PremiumHero.css";

const features: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Web Development", href: "/website-development/", icon: Globe },
  {
    label: "SEO & AI Visibility",
    href: "/ai-search-optimization/",
    icon: Search,
  },
  { label: "Google Ads", href: "/google-ads/", icon: ChartNoAxesCombined },
  {
    label: "Branding",
    href: "/branding-and-creative/",
    icon: Palette,
  },
  {
    label: "Social Media",
    href: "/social-media-management/",
    icon: MessageSquareText,
  },
  {
    label: "Automation",
    href: "/marketing-automation/",
    icon: Bot,
  },
];
const platforms = [
  { label: "Visibility", Icon: Search, href: "/ai-search-optimization/" },
  {
    label: "Social Media",
    Icon: () => <FaIcon icon="instagram" />,
    href: "/social-media-management/",
  },
  { label: "Ads", Icon: Infinity, href: "/meta-ads/" },
  { label: "Branding", Icon: Palette, href: "/branding-and-creative/" },
  { label: "Website Development", Icon: Globe, href: "/website-development/" },
];
const socials: {
  label: string;
  href: string;
  icon?: FaIconName;
  asset?: string;
}[] = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "instagram" },
  { label: "TikTok", href: SOCIAL_LINKS.tiktok, icon: "tiktok" },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: "linkedin-in" },
  {
    label: "Pinterest",
    href: SOCIAL_LINKS.pinterest,
    asset: "/assets/hero/pinterest.svg",
  },
  {
    label: "Medium",
    href: SOCIAL_LINKS.medium,
    asset: "/assets/hero/medium.svg",
  },
  { label: "X / Twitter", href: SOCIAL_LINKS.x, icon: "x-twitter" },
  {
    label: "Google Location",
    href: GOOGLE_MAPS_PLACE_URL,
    icon: "location-dot",
  },
];

function SocialIcon({ icon, asset, label }: (typeof socials)[number]) {
  return asset ? (
    <Image src={asset} width={24} height={24} alt={`${label} icon`} />
  ) : (
    <FaIcon icon={icon!} />
  );
}

function HeroVisual() {
  return (
    <div className="premium-hero-visual">
      <div className="premium-hero-halo" aria-hidden="true" />
      <div className="premium-hero-platform" aria-hidden="true" />
      <nav
        className="premium-glass premium-social-panel"
        aria-label="Crea8iv Media social profiles and location"
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} (opens in a new tab)`}
          >
            <span className="premium-brand-icon">
              <SocialIcon {...social} />
            </span>
            <span>{social.label}</span>
            <ArrowRight className="premium-panel-arrow" aria-hidden="true" />
          </a>
        ))}
      </nav>
      <Image
        className="premium-hero-mascot"
        src="/assets/crea8iv-media-vector-hero-840.webp"
        sizes="(max-width: 767px) 62vw, (max-width: 1199px) 350px, 420px"
        alt="Crea8iv Media robot mascot giving a thumbs-up"
        width={420}
        height={630}
        priority
      />
      <nav
        className="premium-glass premium-platforms"
        aria-label="Explore our services"
      >
        {platforms.map(({ label, Icon, href }) => (
          <Link key={label} href={href} prefetch={false}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
            <ArrowRight className="premium-panel-arrow" aria-hidden="true" />
          </Link>
        ))}
      </nav>
      <span className="premium-signature">
        Ideas
        <br />
        <i>into</i>
        <br />
        Impact
      </span>
      <nav className="premium-socials" aria-label="Connect with Crea8iv Media">
        {socials.slice(0, 6).map((social, i) => (
          <a
            className={`premium-social premium-social-${i}`}
            key={social.label}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon {...social} />
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let visible = true;
    const update = () => { hero.dataset.motionVisible = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(hero);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  return (
    <section ref={heroRef} className="premium-hero" data-motion-paused={motionPaused} aria-labelledby="premium-hero-title">
      <button type="button" className="premium-motion-toggle" onClick={() => setMotionPaused(!motionPaused)} aria-label={motionPaused ? "Resume hero animation" : "Pause hero animation"} title={motionPaused ? "Resume animation" : "Pause animation"}>
        {motionPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
      <div className="premium-hero-wave" aria-hidden="true" />
      <div className="premium-hero-inner relative mx-auto w-full">
        <div className="premium-hero-grid grid items-center">
          <HeroVisual />
          <div className="premium-hero-copy">
            <div className="premium-hero-badge">
              <span aria-hidden="true" />
              <span className="premium-badge-desktop">
                WEB DEVELOPMENT · GOOGLE ADS · AI VISIBILITY
              </span>
              <span className="premium-badge-mobile">
                WEB DEVELOPMENT · GOOGLE ADS · AI VISIBILITY
              </span>
            </div>
            <h1 id="premium-hero-title">
              Your business deserves
              <br />
              to be seen. <span>And chosen.</span>
            </h1>
            <p>
              Websites, SEO and advertising that help people find you, understand your value
              and get in touch. Based in Pakistan, serving clients internationally.
            </p>
            <div className="premium-hero-actions flex flex-wrap gap-3">
              <button
                type="button"
                className="premium-cta"
                onClick={() => {
                  trackEvent("cta_clicked", {
                    location: "home_hero",
                    button_text: "Discuss Your Project",
                  });
                  window.dispatchEvent(
                    new CustomEvent("crea8iv:lead", {
                      detail: { source: "home_hero" },
                    }),
                  );
                }}
              >
                DISCUSS YOUR PROJECT <ArrowRight aria-hidden="true" />
              </button>
              <Link
                href="/case-studies/"
                prefetch={false}
                className="premium-watch"
                onClick={() => trackEvent("cta_clicked", { location: "home_hero", button_text: "View Case Studies" })}
              >
                VIEW CASE STUDIES <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="premium-hero-features grid">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                <Link key={feature.href} href={feature.href} prefetch={false} data-service-tone={getServiceTone(feature.href)}>
                  <Icon aria-hidden="true" />
                  <span>{feature.label}</span>
                  <ArrowRight
                    className="premium-feature-arrow"
                    aria-hidden="true"
                  />
                </Link>
              );})}
            </div>
          </div>
        </div>
        <div className="premium-hero-stats">
          <div>
            <Users aria-hidden="true" />
            <p>
              <strong>+120</strong>
              <span>CLIENTS TRUST US</span>
            </p>
          </div>
          <div>
            <BriefcaseBusiness aria-hidden="true" />
            <p>
              <strong>6+</strong>
              <span>INDUSTRIES SERVED</span>
            </p>
          </div>
          <div>
            <Layers aria-hidden="true" />
            <p>
              <strong className="premium-proof-title"><Link href="/case-studies/">Case Studies</Link></strong>
              <span>EXPLORE OUR WORK</span>
            </p>
          </div>
          <div>
            <MapPin aria-hidden="true" />
            <p>
              <strong className="premium-presence"><Link href="/locations/">INTERNATIONAL</Link></strong>
              <span>EXPLORE OUR MARKETS</span>
            </p>
          </div>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Crea8iv Media on Instagram (opens in a new tab)"
          >
            <span className="premium-play">
              <Play aria-hidden="true" fill="currentColor" />
            </span>
            <span>
              PLAY
              <br />
              SHOWREEL
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
