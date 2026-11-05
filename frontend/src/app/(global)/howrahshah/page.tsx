import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Camera,
  Clapperboard,
  Mail,
  Megaphone,
  MessageCircle,
  Palette,
  Phone,
  Share2,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import LocalPortfolioArchive from "@/components/LocalPortfolioArchive";
import assetManifest from "@/data/local-portfolio.json";
import { SITE_URL } from "@/lib/site-config";

const standaloneSiteUrl = (process.env.NEXT_PUBLIC_HOWRAH_SITE_URL || "https://antiquewhite-chough-517508.hostingersite.com").replace(/\/$/, "");
const isStandalonePortfolio = process.env.NEXT_PUBLIC_HOWRAH_STANDALONE === "true";
const PAGE_URL = isStandalonePortfolio ? `${standaloneSiteUrl}/` : `${SITE_URL}/howrahshah/`;
const PROFILE_IMAGE = `${isStandalonePortfolio ? standaloneSiteUrl : SITE_URL}/img/howrah-og-preview.png`;
const phoneDisplay = "+92 339 5413960";
const phoneHref = "tel:+923395413960";
const email = "howrah.shah98@gmail.com";
const whatsappText = encodeURIComponent(
  "Hi Howrah, I saw your portfolio. I want help with design/reels/social media for my brand."
);
const whatsappHref = `https://wa.me/923395413960?text=${whatsappText}`;

export const metadata: Metadata = {
  title: { absolute: "Howrah Shah Portfolio | Design, Reels & Social Media" },
  description:
    "Explore Howrah Shah's complete creative portfolio: graphic design, reels, shoots, social media management, Meta Ads, AI-assisted content systems and fashion-informed brand storytelling.",
  keywords: [
    "Howrah Shah portfolio",
    "Howrah Shah graphic designer",
    "graphic designer Pakistan",
    "reel editor Pakistan",
    "social media manager Pakistan",
    "Meta Ads manager Pakistan",
    "AI content creator",
    "fashion design portfolio",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Howrah Shah Portfolio | Creative Design, Reels, Social Media & Meta Ads",
    description:
      "A client-ready individual portfolio for Howrah Shah, showcasing design taste, reel production, social media execution, Meta Ads management and AI-powered creative workflow.",
    url: PAGE_URL,
    siteName: "Howrah Shah Portfolio",
    type: "profile",
    images: [{ url: PROFILE_IMAGE, width: 1200, height: 1200, alt: "Howrah Shah creative portfolio identity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Howrah Shah Portfolio | Graphic Designer & Social Media Creative",
    description: "Graphic design, reels, shoots, social media management, Meta Ads and AI-assisted creative execution.",
    images: [PROFILE_IMAGE],
  },
};

const skills = [
  { title: "Graphic Design", body: "Premium posts, grids, campaigns and brand visuals.", icon: Palette },
  { title: "Reel Editing", body: "Hooks, pacing, captions and clean short-form cuts.", icon: Clapperboard },
  { title: "Reel Shoots", body: "Social-first shooting for brands, products and spaces.", icon: Camera },
  { title: "Social Media", body: "Consistent content systems that keep brands active.", icon: Share2 },
  { title: "Meta Ads", body: "Creative built for attention, clicks and inquiries.", icon: Megaphone },
  { title: "AI Workflow", body: "Fast ideas, captions, research and creative variations.", icon: WandSparkles },
];

const proof = [
  ["Degree", "BS in Fashion & Design"],
  ["Creative Focus", "Design, reels, shoots and social media"],
  ["Performance Layer", "Meta Ads management and campaign support"],
  ["AI Edge", "Strong command of AI-assisted creative workflows"],
] as const;

const portfolioAssets = assetManifest.assets.filter((asset) => asset.kind === "image" && asset.folder.join(" ").toLowerCase().includes("grid preview"));
const portfolioCategories = new Set(portfolioAssets.map((asset) => asset.category));
const imageCount = portfolioAssets.filter((asset) => asset.kind === "image").length;
const pdfCount = portfolioAssets.filter((asset) => asset.kind === "pdf").length;

const overallStats = [
  ["Creative assets", portfolioAssets.length.toLocaleString()],
  ["Grid previews", imageCount.toLocaleString()],
  ["Design visuals", (imageCount + pdfCount).toLocaleString()],
  ["Work categories", portfolioCategories.size.toLocaleString()],
] as const;

type PortfolioAsset = (typeof assetManifest.assets)[number];

const featuredWork = [
  {
    title: "Premium Social Grid Design",
    category: "Social media design",
    note: "Polished social grids for premium brand presence.",
    asset: findAsset("Health Clinics", (asset) => asset.kind === "image" && asset.folder.join(" ").toLowerCase().includes("grid preview")),
  },
  {
    title: "AI-Led Reel Storytelling",
    category: "Reel editing",
    note: "Fast hooks, clean pacing and social-first video flow.",
    asset: findAsset("Health Clinics", (asset) => asset.kind === "video" && asset.name.toLowerCase().includes("ai character")),
  },
  {
    title: "Fashion-Sensitive Product Creative",
    category: "E-commerce",
    note: "Styled product visuals with a commercial edge.",
    asset: findAsset("E Commerce", (asset) => asset.kind === "image" && asset.folder.join(" ").toLowerCase().includes("grid preview")),
  },
  {
    title: "Interior Brand Campaigns",
    category: "Brand content",
    note: "Mood-led content for spaces and design brands.",
    asset: findAsset("Interiors & Architects", (asset) => asset.kind === "image" && asset.folder.join(" ").toLowerCase().includes("images")),
  },
  {
    title: "Brand Guideline Systems",
    category: "Visual identity",
    note: "Identity systems for consistent brand execution.",
    asset: findAsset("Brand Guidelines", (asset) => asset.kind === "pdf" || asset.name.toLowerCase().includes("brand")),
  },
  {
    title: "Food & Beverage Campaign Design",
    category: "Restaurant creative",
    note: "Bold food visuals for offers and campaigns.",
    asset: findAsset("Restaurants", (asset) => asset.kind === "image"),
  },
].filter((item): item is (typeof item & { asset: PortfolioAsset }) => Boolean(item.asset));

const experienceSignals = [
  "Graphic design",
  "Reel shooting",
  "Reel editing",
  "Social media",
  "Meta Ads",
  "AI workflow",
] as const;

const serviceMenu = ["Design", "Reels", "Shoots", "Social Media", "Meta Ads", "AI"] as const;
const processSteps = ["Brief", "Shoot / Design", "Edit", "Post", "Promote"] as const;

const serviceNarrative = [
  {
    eyebrow: "Creative Direction",
    title: "Fashion-trained visual taste.",
    body: "Color, mood, proportion and detail shaped for brands that want to look premium.",
  },
  {
    eyebrow: "Execution",
    title: "Shoot, edit, design, post.",
    body: "A practical creative workflow from concept to publish-ready content.",
  },
  {
    eyebrow: "AI Advantage",
    title: "AI-assisted, human-finished.",
    body: "Faster ideas, captions and concepts without losing taste or brand polish.",
  },
];

const clientReasons = [
  "Fashion & Design eye.",
  "Design + reels + ads support.",
  "Strong for clinics, food, ecommerce and interiors.",
  "Content made to look premium and sell trust.",
  "AI speed with human taste.",
  "Consistent brand presence.",
] as const;

const faqs = [
  ["What does Howrah Shah specialize in?", "Howrah specializes in graphic design, reel editing, reel shooting, social media management, Meta Ads management and AI-assisted creative production."],
  ["What is Howrah Shah's education?", "Howrah Shah holds a BS in Fashion & Design, giving her work a strong foundation in visual composition, styling, brand aesthetics and design thinking."],
  ["Can clients contact Howrah directly?", `Yes. Clients can call ${phoneDisplay}, send a WhatsApp inquiry on ${phoneDisplay}, or email ${email} for portfolio inquiries, creative work and social media projects.`],
  ["Why is this portfolio useful for clients?", "It combines personal credentials with a full visual portfolio, helping clients evaluate style, skill range, execution quality and marketing understanding in one place."],
] as const;

export default function HowrahShahPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        name: "Howrah Shah Portfolio",
        url: PAGE_URL,
        description:
          "Individual portfolio page for Howrah Shah, graphic designer, reel editor, social media manager, Meta Ads manager and AI-enabled creative professional.",
        about: { "@id": `${PAGE_URL}#person` },
        isPartOf: { "@type": "WebSite", name: "Howrah Shah Portfolio", url: PAGE_URL },
      },
      {
        "@type": "Person",
        "@id": `${PAGE_URL}#person`,
        name: "Howrah Shah",
        url: PAGE_URL,
        image: PROFILE_IMAGE,
        email,
        telephone: "+92-339-5413960",
        alumniOf: { "@type": "EducationalOrganization", name: "BS in Fashion & Design" },
        jobTitle: "Graphic Designer, Reel Editor and Social Media Manager",
        knowsAbout: [
          "Graphic design",
          "Fashion design",
          "Reel editing",
          "Reel shooting",
          "Social media management",
          "Meta Ads management",
          "AI content workflows",
          "Creative direction",
        ],
      },
      {
        "@type": "ItemList",
        name: "Howrah Shah Featured Portfolio Work",
        itemListElement: featuredWork.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: item.title,
            genre: item.category,
            description: item.note,
            creator: { "@id": `${PAGE_URL}#person` },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="portfolio-archive relative overflow-hidden bg-[#050505] px-5 pb-8 pt-24 text-[#f7f1e9] sm:px-8 md:pb-16 md:pt-32 lg:px-10 lg:pt-40">
        <div className="portfolio-grid absolute inset-0" />
        <div className="portfolio-glow absolute -right-40 top-10 h-[560px] w-[560px] rounded-full" />
        <div className="howrah-luxury-orbit absolute left-[7%] top-[18%] h-44 w-44 rounded-full" aria-hidden="true" />
        <div className="howrah-luxury-orbit howrah-luxury-orbit--small absolute bottom-[10%] right-[9%] h-28 w-28 rounded-full" aria-hidden="true" />
        <div className="howrah-luxury-sheen absolute left-0 top-0 h-full w-1/2" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="howrah-hero-copy">
            <p className="portfolio-kicker">
              <Sparkles className="h-3.5 w-3.5" /> Individual portfolio · Howrah Shah
            </p>
            <h1 className="portfolio-display mt-5 text-[clamp(2.55rem,12vw,5.9rem)] leading-[.9] md:mt-6">
              <span className="howrah-name-white block whitespace-nowrap">Howrah Shah.</span>
              <br />
              <span className="block text-[clamp(2rem,9vw,5rem)] text-[#FF6801]">Design, reels and social growth.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/62 sm:text-lg md:mt-8">
              Graphic design, reels, shoots, social media, Meta Ads and AI-powered creative direction.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="portfolio-button">
                <MessageCircle className="h-4 w-4" /> WhatsApp inquiry
              </a>
              <a href={phoneHref} className="portfolio-text-link">
                <Phone className="h-4 w-4" /> Call {phoneDisplay}
              </a>
              <a href={`mailto:${email}`} className="portfolio-text-link">
                <Mail className="h-4 w-4" /> {email}
              </a>
            </div>
          </div>

          <ArtisticExperiencePanel />
        </div>
      </section>

      <MobileWhatsAppBar />
      <ClientProofStrip />
      <HowrahSelectedWorkArchive />
      <ServicesMiniMenu />

      <SkillSetSection />
      <WhyHireSection />
      <FinalClientCta />
    </>
  );
}

function HowrahSelectedWorkArchive() {
  return (
    <LocalPortfolioArchive
      headingLevel="h2"
      copy={{
        eyebrow: "Howrah Shah · selected creative work",
        title: "Visuals with taste.",
        highlight: "Content with purpose.",
        description: "Selected brand visuals, reels, social grids and campaign creatives presented for clients who want premium content.",
        personalStory: {
          eyebrow: "Personal brand story",
          title: "Fashion-trained taste, built for brands that need attention.",
          body: "Howrah Shah brings a BS in Fashion & Design into social media execution: clean composition, sharp styling, practical reel thinking and campaign-ready visuals. Her work connects premium aesthetics with daily content needs, helping clients look polished, active and trustworthy online.",
          points: ["BS Fashion & Design", "Design + reels", "AI-powered workflow"],
        },
        primaryCta: "Explore selected work",
        secondaryCta: "Browse collections",
        monogram: "HS",
        imageAltName: "Howrah Shah",
        closeEyebrow: "Need content for your brand?",
        closeTitle: "Send a WhatsApp message and share your brand page.",
        closeHref: whatsappHref,
        closeLabel: "Message Howrah",
        creatorName: "Howrah Shah",
        disableCaseStudyLinks: true,
        excludeCrea8ivAssets: true,
        // Show the curated "Work in action" explore-work showcase (same as the
        // /results page) above the full archive grid.
        hideFeaturedWork: false,
      }}
    />
  );
}

function ServicesMiniMenu() {
  return (
    <section className="border-y border-white/[0.09] bg-[#050505] px-5 py-5 text-[#f7f1e9] sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap gap-2">
        {serviceMenu.map((item) => (
          <span key={item} className="shrink-0 rounded-full border border-[#FF6801]/25 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/72">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProcessStrip() {
  return (
    <section className="bg-[#080706] px-5 py-10 text-[#f7f1e9] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="portfolio-kicker">
          <Sparkles className="h-3.5 w-3.5" /> Creative flow
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.09] sm:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step} className="bg-[#050505] p-4">
              <p className="font-syne text-2xl font-semibold text-[#FF6801]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/72">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillSetSection() {
  return (
    <section className="bg-[#050505] px-5 py-10 text-[#f7f1e9] sm:px-8 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-3xl">
          <p className="portfolio-kicker">
            <BadgeCheck className="h-3.5 w-3.5" /> Client-ready skill set
          </p>
          <h2 className="portfolio-display mt-4 text-3xl leading-[.95] sm:text-6xl md:mt-5">Creative skills, made visual.</h2>
        </div>
        <div className="mt-7 grid gap-3 md:mt-10 md:gap-px md:overflow-hidden md:border md:border-white/[0.09] md:bg-white/[0.09] md:grid-cols-2 xl:grid-cols-3">
          {skills.map(({ title, body, icon: Icon }) => (
            <article key={title} className="rounded-lg border border-white/[0.09] bg-[#090807] p-5 md:rounded-none md:border-0 md:p-6">
              <Icon className="h-6 w-6 text-[#FF6801] md:h-7 md:w-7" />
              <h3 className="mt-5 font-syne text-xl font-semibold text-white md:mt-6 md:text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58 md:mt-4 md:leading-7">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileWhatsAppBar() {
  return (
    <div className="fixed bottom-24 right-4 z-50 md:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#25D366]/60 bg-[#0b2b18]/90 px-4 text-center text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_14px_40px_rgba(37,211,102,.22)] backdrop-blur-xl"
      >
        <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
      </a>
    </div>
  );
}

function ClientProofStrip() {
  return (
    <section className="border-y border-white/[0.09] bg-[#080706] px-5 py-4 text-[#f7f1e9] sm:px-8 md:py-5 lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
        {overallStats.map(([label, value]) => (
          <div key={label} className="bg-[#050505] p-4 md:p-5">
            <p className="font-syne text-3xl font-semibold text-white md:text-4xl">{value}</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF6801]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PersonalBrandStory() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-16 text-[#f7f1e9] sm:px-8 lg:px-10 lg:py-24">
      <div className="portfolio-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="portfolio-kicker">
            <Sparkles className="h-3.5 w-3.5" /> Personal brand story
          </p>
          <h2 className="portfolio-display mt-5 text-4xl leading-[.95] sm:text-6xl">
            Fashion-trained taste. Commercial content.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/58">
            A concise profile for clients who want design, reels and social content with premium polish.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {serviceNarrative.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/[0.09] bg-white/[0.035] p-6 shadow-[0_22px_60px_rgba(0,0,0,.25)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF6801]">{item.eyebrow}</p>
              <h3 className="mt-4 font-syne text-2xl font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-5 text-sm leading-7 text-white/58">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  return (
    <section className="portfolio-archive-grid bg-[#080706] px-5 py-10 text-[#f7f1e9] sm:px-8 md:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="portfolio-kicker">
              <Camera className="h-3.5 w-3.5" /> Curated work highlights
            </p>
            <h2 className="portfolio-display mt-4 text-3xl leading-[.95] sm:text-6xl md:mt-5">Best pieces first.</h2>
            <p className="mt-4 text-sm leading-6 text-white/58 md:mt-6 md:text-base md:leading-7">
              Selected complete social grids for products, interiors and campaign work.
            </p>
          </div>
          <a href="#full-portfolio" className="portfolio-text-link hidden md:inline-flex">
            View full archive <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-7 flex gap-4 overflow-x-auto pb-2 md:mt-10 md:grid md:overflow-visible md:pb-0 md:grid-cols-2 xl:grid-cols-3">
          {featuredWork.map((item, index) => (
            <a
              key={`${item.title}-${item.asset.id}`}
              href={getPublicAssetHref(item.asset)}
              target="_blank"
              rel="noreferrer"
              className={`group min-w-[82vw] overflow-hidden rounded-lg border border-white/[0.09] bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,.36)] md:min-w-0 ${index === 0 ? "xl:row-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden bg-black ${index === 0 ? "aspect-[4/5]" : "aspect-[1.18]"}`}>
                <Image
                  src={getMediaSrc(item.asset)}
                  alt={`${item.title} by Howrah Shah`}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 31vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/8 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-[#FF6801]/45 bg-black/58 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#FF6801] backdrop-blur-md">
                  {item.category}
                </div>
                {item.asset.kind === "video" ? (
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md">
                    <Clapperboard className="h-4 w-4" />
                  </div>
                ) : null}
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-syne text-xl font-semibold leading-tight text-white md:text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58 md:mt-3">{item.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyHireSection() {
  return (
    <section className="bg-[#050505] px-6 py-16 text-[#f7f1e9] sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="portfolio-kicker">
            <BadgeCheck className="h-3.5 w-3.5" /> Why hire Howrah
          </p>
          <h2 className="portfolio-display mt-5 text-4xl leading-[.95] sm:text-6xl">Why clients choose Howrah.</h2>
          <p className="mt-6 text-base leading-7 text-white/58">
            Premium visual taste, fast execution and social-first thinking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="portfolio-button">
              <MessageCircle className="h-4 w-4" /> Send WhatsApp query
            </a>
            <a href={`mailto:${email}`} className="portfolio-text-link">
              <Mail className="h-4 w-4" /> Email portfolio inquiry
            </a>
          </div>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2">
          {clientReasons.map((reason, index) => (
            <div key={reason} className="bg-[#090807] p-5">
              <p className="font-syne text-3xl font-semibold text-[#FF6801]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-4 text-sm leading-7 text-white/66">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalClientCta() {
  return (
    <section id="full-portfolio" className="relative overflow-hidden border-y border-white/[0.09] bg-[#080706] px-5 py-10 text-center text-[#f7f1e9] sm:px-8 md:py-16 lg:px-10 lg:py-24">
      <div className="portfolio-glow absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60" />
      <div className="relative mx-auto max-w-4xl">
        <p className="portfolio-kicker justify-center">
          <MessageCircle className="h-3.5 w-3.5" /> Start with a direct WhatsApp query
        </p>
        <h2 className="portfolio-display mt-4 text-3xl leading-[.95] sm:text-6xl md:mt-5 lg:text-7xl">
          Want your brand to look this premium online?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/62 md:mt-6 md:text-base md:leading-7">
          Send a WhatsApp query for design, reels, shooting, social media or Meta Ads creative.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="portfolio-button">
            <MessageCircle className="h-4 w-4" /> WhatsApp {phoneDisplay}
          </a>
          <a href={phoneHref} className="portfolio-text-link">
            <Phone className="h-4 w-4" /> Call now
          </a>
        </div>
      </div>
    </section>
  );
}

function ArtisticExperiencePanel() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="absolute inset-x-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#FF6801]/70 to-transparent md:block" />
      <div className="absolute inset-x-16 bottom-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative min-h-[390px] overflow-hidden rounded-lg border border-[#FF6801]/30 bg-[linear-gradient(135deg,rgba(255,104,1,.12),rgba(255,255,255,.035)_34%,rgba(0,0,0,.62))] p-4 shadow-[0_30px_90px_rgba(0,0,0,.5)] md:min-h-[560px] md:p-6">
        <div className="howrah-scan absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6801]/20 md:h-[430px] md:w-[430px]" />
        <div className="howrah-ring absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF6801]/35 md:h-[360px] md:w-[360px]" />
        <div className="howrah-ring-reverse absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:h-[250px] md:w-[250px]" />
        <div className="absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF6801]/45 bg-black/50 p-3 text-center shadow-[0_0_80px_rgba(255,104,1,.18)] md:h-[132px] md:w-[132px] md:p-4">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/10">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF6801] md:text-[10px] md:tracking-[0.22em]">Portfolio</p>
            <p className="mt-1 font-syne text-3xl font-semibold text-white md:text-4xl">{portfolioAssets.length}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/48">assets</p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-2 md:gap-3">
          {overallStats.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-white/[0.09] bg-black/35 p-3 backdrop-blur-md md:p-4">
              <p className="font-syne text-2xl font-semibold text-white md:text-4xl">{value}</p>
              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#FF6801] md:text-[10px] md:tracking-[0.18em]">{label}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-14 grid grid-cols-2 gap-2 md:mt-24 md:gap-3">
          {proof.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[#FF6801]/20 bg-[#090807]/72 p-3 backdrop-blur-md md:p-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#FF6801] md:text-[10px] md:tracking-[0.18em]">{label}</p>
              <p className="mt-2 text-xs leading-4 text-white/78 md:text-sm md:leading-5">{value}</p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2 md:mt-5">
          {experienceSignals.map((signal) => (
            <span key={signal} className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/62 md:px-3 md:py-1.5 md:text-[10px] md:tracking-[0.14em]">
              {signal}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

function findAsset(category: string, matcher: (asset: PortfolioAsset) => boolean) {
  return portfolioAssets.find((asset) => asset.category === category && matcher(asset));
}

function getMediaSrc(asset: PortfolioAsset) {
  return asset.optimizedSrc ?? asset.posterSrc ?? asset.src;
}

function getPublicAssetHref(asset: PortfolioAsset) {
  return asset.playSrc ?? asset.optimizedSrc ?? asset.posterSrc ?? asset.src;
}
