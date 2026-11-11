import LogoCarousel from "@/components/LogoCarousel";
import HowItWorks from "@/components/ui/how-it-works";
import HomepageDeliveryProcess from "@/components/HomepageDeliveryProcess";
import HomepageConnectedJourney from "@/components/HomepageConnectedJourney";
import BuyerJourneyMotion from "@/components/BuyerJourneyMotion";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { homeOrbitServices } from "./home-orbit-services";
import buyerStyles from "@/components/homepage-buyer-journey.module.css";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  HeartPulse,
  MapPinned,
  Store,
  Utensils,
} from "lucide-react";
import type { ReactNode } from "react";
import HomepageFounderOffice from "@/components/HomepageFounderOffice";
import HomepageFinalCTA from "./HomepageFinalCTA";
import HomepageClientStories from "./HomepageClientStories";
import HomepageCreativeShowcase from "./HomepageCreativeShowcase";
import PortfolioCategoryFolders from "./PortfolioCategoryFolders";
import { CLIENT_LOGOS } from "@/lib/client-logos";
import EvidenceMedia from "@/components/EvidenceMedia";
import styles from "./agency-body.module.css";
import surfaces from "./homepage-surfaces.module.css";
import backdrop from "./homepage-background-rhythm.module.css";
import industryStyles from "./industry-showcase.module.css";
import IndustryMobileCarousel from "./IndustryMobileCarousel";
import orbitStyles from "./ui/radial-orbital-timeline.module.css";

const selectedClientLogos = [
  {
    name: "Buildscape",
    src: "/img/portfolio/websites/buildscape/buildscape-wordmark-black.png",
    href: "/case-studies/buildscape/",
  },
  ...CLIENT_LOGOS.filter(({ name }) => ["Home Studio", "The Smile Xperts", "Black Petals", "CO3 Premium"].includes(name)),
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
  { title: "They Find You", description: "People discover you through search, content or ads." },
  { title: "They Check You", description: "They look at your website, reviews and proof." },
  { title: "They Decide", description: "They choose the business that feels most trustworthy." },
];

const visualSystemCards = [
  {
    title: "CO3 Premium brand identity",
    body: "The visual identity and guidelines for CO3 Premium’s drinks brand.",
    image: "/img/case-studies/co3-premium-liquid-shop/co3-brand-guideline-cover.webp",
    previewImage: "/img/homepage/creative-work/co3-landscape-v2.webp",
    alt: "CO3 Premium brand guidelines and visual applications",
  },
  {
    title: "Venn Dental social content",
    body: "Social creative that presents a consistent identity across the clinic’s posts.",
    image: "/portfolio-optimized/client-social-showcases/venn-dental-instagram-grid-transformation.webp",
    previewImage: "/img/homepage/creative-work/venn-landscape-v2.webp",
    alt: "Venn Dental social content transformation by Crea8iv Media",
  },
  {
    title: "Ajwad Naturals product content",
    body: "A coordinated series of product visuals for Ajwad Naturals’ social channels.",
    image: "/portfolio-optimized/client-social-showcases/ajwad-naturals-instagram-grid-showcase.webp",
    previewImage: "/img/homepage/creative-work/ajwad-landscape-v2.webp",
    alt: "Ajwad Naturals social identity and product creative by Crea8iv Media",
  },
] as const;

export default function HomepageBelowHero({ caseStudies, editorial }: { caseStudies?: ReactNode; editorial?: ReactNode }) {
  return (
    <div data-home-palette="dark" className={`home-luxury-story brand-site-shell overflow-hidden text-white ${styles.story} ${surfaces.mixed} ${backdrop.homepage}`}>
      <IdentitySystems />
      <CustomerReality />
      <ProblemLedServices />
      {caseStudies}
      <PortfolioCategoryFolders />
      <CreativeWork />
      <HomepageConnectedJourney />
      <IndustrySystems />
      <HomepageFounderOffice />
      <HomepageClientStories />
      <HomepageDeliveryProcess />
      {editorial}
      <HomepageFinalCTA />
    </div>
  );
}

function CreativeWork() {
  return <HomepageCreativeShowcase projects={visualSystemCards} />;
}

function IdentitySystems() {
  return (
    <section id="home-client-logos" data-home-surface="light" aria-label="Selected clients" className="home-logo-marquee relative px-4 sm:px-6 lg:px-7">
      <div className="relative mx-auto max-w-[1480px]">
        <LogoCarousel compact logos={selectedClientLogos} />
      </div>
    </section>
  );
}

function CustomerReality() {
  return (
    <section id="home-buyers-decide" data-home-buyer className={buyerStyles.section} aria-labelledby="buyer-journey-title">
      <BuyerJourneyMotion className={buyerStyles.container}>
        <div className={buyerStyles.heading}>
          <p className={buyerStyles.eyebrow} data-buyer-entrance="0">HOW BUYERS DECIDE</p>
          <h2 id="buyer-journey-title" data-buyer-entrance="1">People <em>form an opinion</em>{" "}<span>before they ever contact you.</span></h2>
          <p className={buyerStyles.lead} data-buyer-entrance="2">Your website, Google presence, reviews, content and campaigns shape whether a potential customer feels confident enough to take the next step.</p>
        </div>
        <HowItWorks features={customerSteps} />
      </BuyerJourneyMotion>
    </section>
  );
}

function ProblemLedServices() {
  return (
    <section id="home-problem-services" data-home-orbit className={orbitStyles.section} aria-labelledby="home-core-services-title">
        <RadialOrbitalTimeline
          intro="Get found, build trust and attract the right enquiries. Choose the service that addresses your next growth challenge."
          timelineData={homeOrbitServices}
        />
    </section>
  );
}

function IndustrySystems() {
  return (
    <section id="home-industries" className={`home-industry-systems ${industryStyles.section} relative px-6 sm:px-8 lg:px-10`} aria-labelledby="home-industry-heading">
      <div className={industryStyles.inner}>
        <div className={industryStyles.heading}>
          <div>
            <p className="home-lux-eyebrow">Built around how people buy</p>
            <h2 id="home-industry-heading">Different customers. Different reasons to say yes.</h2>
          </div>
          <div className={industryStyles.headingAside}>
            <p>A patient choosing a clinic, a homeowner hiring an architect and a customer ordering online look for different kinds of reassurance. Your marketing should reflect those decisions.</p>
            <Link href="/industries/" className={`home-lux-link ${industryStyles.exploreLink}`}>Explore Industries <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
        <IndustryMobileCarousel count={industries.length}>
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
        </IndustryMobileCarousel>
      </div>
    </section>
  );
}
