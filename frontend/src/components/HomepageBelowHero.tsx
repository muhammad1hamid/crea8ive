import Image from "next/image";
import LogoCarousel from "@/components/LogoCarousel";
import HowItWorks from "@/components/ui/how-it-works";
import HomepageDeliveryProcess from "@/components/HomepageDeliveryProcess";
import HomepageConnectedJourney from "@/components/HomepageConnectedJourney";
import ConnectedJourneyMotion from "@/components/ConnectedJourneyMotion";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import buyerStyles from "@/components/ui/how-it-works.module.css";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  HeartPulse,
  MapPinned,
  MessageSquareText,
  Store,
  Utensils,
  ShieldCheck,
  SearchCheck,
} from "lucide-react";
import { getServiceTone } from "@/lib/service-tones";
import type { ReactNode } from "react";
import LocationExperience from "@/components/LocationExperience";
import { BUSINESS_DETAILS } from "@/lib/site-config";
import HomepageClientStories from "./HomepageClientStories";
import HomepageCreativeShowcase from "./HomepageCreativeShowcase";
import { CLIENT_LOGOS } from "@/lib/client-logos";
import { FOUNDER } from "@/lib/authority-data";
import EvidenceMedia from "@/components/EvidenceMedia";
import styles from "./agency-body.module.css";
import surfaces from "./homepage-surfaces.module.css";
import industryStyles from "./industry-showcase.module.css";
import orbitStyles from "./ui/radial-orbital-timeline.module.css";
import closingStyles from "./homepage-final-cta.module.css";

const selectedClientLogos = [
  {
    name: "Buildscape",
    src: "/img/portfolio/websites/buildscape/buildscape-wordmark-black.png",
    href: "/case-studies/buildscape/",
  },
  ...CLIENT_LOGOS.filter(({ name }) => ["Home Studio", "The Smile Xperts", "Black Petals", "CO3 Premium"].includes(name)),
];

const services = [
  { name: "Strategy", title: "Not sure what to fix first?", outcome: "Strategy, audits and measurement to find the highest-impact improvement before adding more spend.", specialties: ["Growth audits", "Marketing strategy", "Performance measurement"], iconSrc: "/img/homepage/service-orbit/01-strategy.webp", href: "/tools/", label: "Explore growth tools" },
  { name: "SEO & AI", title: "Not getting found?", outcome: "SEO, Google Business Profile, local search and AI-search readiness to make your business easier to discover.", specialties: ["Local SEO", "Google Business Profile", "AI search visibility"], iconSrc: "/img/homepage/service-orbit/02-seo-ai.webp", href: "/ai-search-optimization/", label: "Explore SEO & AI visibility", primary: true },
  { name: "Websites", title: "Getting visits but few enquiries?", outcome: "Website development, landing pages and conversion improvements built around clarity, speed and trust.", specialties: ["Website development", "Landing pages", "Conversion improvements"], iconSrc: "/img/homepage/service-orbit/03-websites.webp", href: "/website-development/", label: "Explore website development", primary: true },
  { name: "Branding", title: "Your brand blends in?", outcome: "Brand identity, content creation, reels and social media that reflect the quality of your business.", specialties: ["Visual identity", "Social content", "Reels & video"], iconSrc: "/img/homepage/service-orbit/04-branding.webp", href: "/branding-and-creative/", label: "Explore branding & creative" },
  { name: "Paid Ads", title: "Advertising without clear returns?", outcome: "Google Ads and Meta campaigns aligned with intent, landing pages and meaningful conversion tracking.", specialties: ["Google Ads", "Meta Ads", "Conversion tracking"], iconSrc: "/img/homepage/service-orbit/05-paid-ads.webp", href: "/google-ads/", label: "Explore Google Ads", primary: true },
  { name: "Automation", title: "Losing leads after first contact?", outcome: "CRM workflows, WhatsApp automation and follow-up systems that reduce missed opportunities.", specialties: ["CRM workflows", "WhatsApp automation", "Lead follow-up"], iconSrc: "/img/homepage/service-orbit/06-automation.webp", href: "/marketing-automation/", label: "Explore lead follow-up" },
];

const industries = [
  {
    title: "Clinics & Dental Practices",
    icon: HeartPulse,
    image: "/img/case-studies/the-smile-xperts/the-smile-xperts-details-post.webp",
    imageAlt: "The Smile Xperts branded dental care creative",
    client: "The Smile Xperts",
    proof: "Clinic creative",
    href: "/industries/clinics-dental/",
    outcome: "Make treatment information, practitioner credibility and appointments easier to access.",
  },
  {
    title: "Restaurants & Food Brands",
    icon: Utensils,
    image: "/portfolio-optimized/Resturants/grid preview/Blaster Ramadan grid.webp",
    imageAlt: "Blaster Chicken Ramadan campaign creative",
    client: "Blaster Chicken",
    proof: "Food campaign",
    href: "/industries/restaurants-cafes/",
    outcome: "Help people discover your menu, location, offers and reasons to visit or order.",
  },
  {
    title: "Architecture, Construction & Interiors",
    icon: Building2,
    image: "/img/case-studies/home-studio-interiors/home-studio-social-post.webp",
    imageAlt: "Home Studio Interiors interior campaign creative",
    client: "Home Studio Interiors",
    proof: "Interior campaign",
    href: "/industries/architects-interiors/",
    outcome: "Show the quality of your work through project-led proof and clear consultation paths.",
  },
  {
    title: "E-commerce & Retail",
    icon: Store,
    image: "/portfolio-optimized/Resturants/images/CO3 Summer drinks post.webp",
    imageAlt: "CO3 Premium summer drinks campaign creative",
    client: "CO3 Premium",
    proof: "Product creative",
    href: "/industries/ecommerce-retail/",
    outcome: "Connect product discovery, strong product pages, advertising and smoother purchasing journeys.",
  },
  {
    title: "Local Services",
    icon: MapPinned,
    image: "/img/portfolio/websites/stw-movers/stw-desktop-20261019.webp",
    imageAlt: "STW Movers chauffeur service website creative",
    client: "STW Movers",
    proof: "Service website",
    href: "/google-business-profile-growth/pakistan/",
    outcome: "Improve location discovery, trust and quick access to calls, quotes or bookings.",
  },
];

const customerSteps = [
  { title: "They find you", body: "A search, map result, social post, recommendation or AI-generated answer introduces your brand.", icon: SearchCheck, tone: "search" },
  { title: "They check you", body: "They look for clear services, genuine examples, credibility and straightforward information.", icon: ShieldCheck, tone: "web" },
  { title: "They decide", body: "They reach out when the offer feels relevant and the next step is easy.", icon: MessageSquareText, tone: "local" },
];

const workingPrinciples = [
  "Start with the business problem—not a preferred tool.",
  "Show the work and be precise about the results.",
  "Create systems that stay useful after launch.",
];

const visualSystemCards = [
  {
    title: "CO3 Premium brand identity",
    body: "The visual identity and guidelines for CO3 Premium’s drinks brand.",
    image: "/img/case-studies/co3-premium-liquid-shop/co3-brand-guideline-cover.webp",
    alt: "CO3 Premium brand guidelines and visual applications",
  },
  {
    title: "Venn Dental social content",
    body: "Social creative that presents a consistent identity across the clinic’s posts.",
    image: "/portfolio-optimized/client-social-showcases/venn-dental-instagram-grid-transformation.webp",
    alt: "Venn Dental social content transformation by Crea8iv Media",
  },
  {
    title: "Ajwad Naturals product content",
    body: "A coordinated series of product visuals for Ajwad Naturals’ social channels.",
    image: "/portfolio-optimized/client-social-showcases/ajwad-naturals-instagram-grid-showcase.webp",
    alt: "Ajwad Naturals social identity and product creative by Crea8iv Media",
  },
] as const;

export default function HomepageBelowHero({ selectedWork, caseStudies, editorial }: { selectedWork?: ReactNode; caseStudies?: ReactNode; editorial?: ReactNode }) {
  return (
    <div data-home-palette="dark" className={`home-luxury-story brand-site-shell overflow-hidden bg-[#050403] text-white ${styles.story} ${surfaces.mixed}`}>
      <IdentitySystems />
      <CustomerReality />
      <ProblemLedServices />
      {caseStudies}
      {selectedWork}
      <CreativeWork />
      <HomepageConnectedJourney />
      <IndustrySystems />
      <FounderTrust />
      <HomepageClientStories />
      <HomepageDeliveryProcess />
      {editorial}
      <FinalCTA />
    </div>
  );
}

function CreativeWork() {
  return <HomepageCreativeShowcase projects={visualSystemCards} />;
}

function SectionIntro({ eyebrow, title, copy, titleId }: { eyebrow: string; title: string; copy: string; titleId?: string }) {
  return (
    <RevealCard>
      <div className="home-section-intro max-w-3xl">
        <p className="home-lux-eyebrow">{eyebrow}</p>
        <h2 id={titleId} className="home-lux-heading mt-4">{title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">{copy}</p>
      </div>
    </RevealCard>
  );
}

function RevealCard({ children, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Ambient() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:94px_94px] opacity-45" />
    </>
  );
}

function IdentitySystems() {
  return (
    <section data-home-surface="light" className="home-logo-marquee relative border-y border-white/[0.08] px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
      <Ambient />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionIntro eyebrow="Selected clients" title="Good company to be in." copy="Meet some of the businesses we work with—and the different challenges we help them solve." />
        <div className="mt-8"><LogoCarousel compact logos={selectedClientLogos} /></div>
        <div className="mt-8 flex justify-center">
          <Link href="/case-studies/" className="home-lux-button">See Client Work <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

function CustomerReality() {
  return (
    <section id="home-buyers-decide" data-home-buyer className={buyerStyles.section} aria-labelledby="buyer-journey-title">
      <ConnectedJourneyMotion className={buyerStyles.container}>
        <div className={buyerStyles.heading} data-journey-heading>
          <p className={buyerStyles.eyebrow}>HOW BUYERS DECIDE</p>
          <h2 id="buyer-journey-title">People <em>form an opinion</em>{" "}<span>before they ever contact you.</span></h2>
          <p className={buyerStyles.lead}>Your website, Google presence, reviews, content and campaigns shape whether a potential customer feels confident enough to take the next step.</p>
        </div>
        <HowItWorks features={customerSteps.map((step) => ({ title: step.title, description: step.body }))} />
      </ConnectedJourneyMotion>
    </section>
  );
}

function ProblemLedServices() {
  return (
    <section id="home-problem-services" data-home-orbit className={orbitStyles.section} aria-labelledby="home-core-services-title">
        <RadialOrbitalTimeline
          intro="You may need better visibility, a more convincing website or campaigns that attract the right enquiries. Start with the obstacle—not a long list of marketing terms."
          timelineData={services.map((service) => ({
            ...service,
            tone: getServiceTone(service.href),
          }))}
        />
    </section>
  );
}

function IndustrySystems() {
  return (
    <section className={`home-industry-systems ${industryStyles.section} relative px-6 sm:px-8 lg:px-10`} aria-labelledby="home-industry-heading">
      <div className={industryStyles.inner}>
        <div className={industryStyles.heading}>
          <div>
            <p className="home-lux-eyebrow">Built around how people buy</p>
            <h2 id="home-industry-heading">Different customers. Different reasons to say yes.</h2>
          </div>
          <div className={industryStyles.headingAside}>
            <p>A patient choosing a clinic, a homeowner hiring an architect and a customer ordering online look for different kinds of reassurance. Your marketing should reflect those decisions.</p>
            <Link href="/industries/" className="home-lux-link">Explore Industries <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className={industryStyles.gallery}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <article key={industry.title} className={industryStyles.card}>
                <div className={industryStyles.media}>
                  <EvidenceMedia
                    src={industry.image}
                    alt={industry.imageAlt}
                    sizes={index < 2 ? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 50vw" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
                    className="object-cover"
                  />
                </div>
                <div className={industryStyles.topline}>
                  <span className={industryStyles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{industry.client} · {industry.proof}</span>
                </div>
                <div className={industryStyles.cardShade} aria-hidden="true" />
                <Link href={industry.href} className={industryStyles.cardLink}>
                  <div className={industryStyles.cardText}>
                    <div className={industryStyles.cardTitle}><Icon size={21} aria-hidden="true" /><h3>{industry.title}</h3></div>
                    <p className={industryStyles.cardDescription}>{industry.outcome}</p>
                  </div>
                  <span className={industryStyles.arrow} aria-hidden="true"><ArrowUpRight size={23} /></span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FounderTrust() {
  return (
    <section data-home-surface="light" className={`${styles.founder} relative border-y border-white/[0.08] px-6 py-20 sm:px-8 lg:px-10 lg:py-28`}>
      <Ambient />
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[.86fr_1.14fr]">
        <RevealCard>
          <Link href={FOUNDER.canonicalPath} className="home-founder-mark group">
            <Image
              src="/assets/syed-qamar-abbas-founder-card.webp"
              alt="Syed Qamar Abbas, Founder and CEO of Crea8iv Media digital marketing agency"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain"
              loading="lazy"
            />
            <span className="home-founder-card-badge">Founder & CEO</span>
          </Link>
        </RevealCard>
        <div>
          <SectionIntro
            eyebrow="The people behind the work"
            title="We get to know your business before we get to work."
            copy="Your customers, offer and growth priorities guide what we recommend. Our job is to make each part of your digital presence work harder together—not to sell services you do not need."
          />
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">
            Crea8iv Media is a digital marketing and website development agency based in Rawalpindi, Pakistan. Founded by Syed Qamar Abbas, it works across website strategy, search visibility, paid media, creative production and practical business automation.
          </p>
          <ul className="mt-5 space-y-2 text-sm leading-7 text-white/65">
            {workingPrinciples.map((principle) => <li key={principle}>{principle}</li>)}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/about/" className="home-lux-link">Meet Crea8iv Media <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href={FOUNDER.canonicalPath} className="home-lux-link">Read the Founder Story <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
      <LocationExperience variant="compact" />
    </section>
  );
}

function FinalCTA() {
  const whatsappHref = `https://wa.me/${BUSINESS_DETAILS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I’d like to discuss a project.")}`;
  return (
    <section id="home-project-enquiry" data-home-closing className={`${closingStyles.section} home-final-cta`} aria-labelledby="home-final-cta-title">
      <div className={closingStyles.card}>
        <p className={closingStyles.eyebrow}>Let’s talk about what’s next</p>
        <div className={closingStyles.layout}>
          <div className={closingStyles.copy}>
            <h2 id="home-final-cta-title">You’ve built something worth choosing.{" "}<span>Let’s help people see why.</span></h2>
            <p>Tell us what you want to improve. We’ll help identify the next practical step—whether that starts with your website, visibility, campaigns or customer follow-up.</p>
          </div>
          <div className={closingStyles.actions}>
            <p>What are you trying to improve right now?</p>
            <Link href="/contact/" prefetch={false} className={closingStyles.primary}>Discuss Your Project <ArrowUpRight size={20} aria-hidden="true" /></Link>
            <a href={whatsappHref} className={closingStyles.secondary} target="_blank" rel="noopener noreferrer">WhatsApp the Team <ArrowUpRight size={20} aria-hidden="true" /></a>
          </div>
        </div>
        <p className={closingStyles.proof}>Prefer to see the work first? <Link href="/case-studies/" prefetch={false}>Explore our case studies.</Link></p>
      </div>
    </section>
  );
}
