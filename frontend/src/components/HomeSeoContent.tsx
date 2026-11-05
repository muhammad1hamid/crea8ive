import Link from "next/link";
import GoogleReviewsShowcase from "@/components/GoogleReviewsShowcase";
import { SOCIAL_LINKS } from "@/lib/social-links";

const FAQS = [
  {
    q: "What does a digital marketing agency in Rawalpindi actually do?",
    a: "A digital marketing agency builds the full system that helps your business get found, trusted, and contacted. At Crea8iv Media, that includes Google Ads, Meta Ads, local SEO, website development, branding, content creation, and AI automation tailored for businesses in Rawalpindi, Islamabad, and across Pakistan.",
  },
  {
    q: "Which services does Crea8iv Media offer for lead generation?",
    a: "We combine Google Ads, Meta Ads, Google Business Profile optimization, landing pages, social media content, branding, and WhatsApp-first funnels. The goal is not random traffic. The goal is qualified leads you can track, follow up with, and turn into revenue.",
  },
  {
    q: "Are Google Ads or Meta Ads better for lead generation in Pakistan?",
    a: "They solve different parts of growth. Google Ads captures high-intent buyers who are already searching, while Meta Ads creates demand, builds awareness, and brings people into your funnel. Most businesses in Rawalpindi and Islamabad get stronger results when both channels work together.",
  },
  {
    q: "Can local SEO help businesses in Rawalpindi and Islamabad get more leads?",
    a: "Yes. Local SEO improves your visibility on Google Maps and in local search results, which turns nearby searches into calls, WhatsApp messages, direction requests, and booked consultations. It is one of the highest-leverage channels for service businesses targeting local demand.",
  },
  {
    q: "How much does digital marketing cost in Pakistan?",
    a: "Pricing depends on the channel, market, and scope. At Crea8iv Media, Google Business Profile management starts from PKR 20,000/month, social media management from PKR 10,000 per platform, monthly creatives from PKR 30,000, Google Ads and Meta Ads management from PKR 25,000/month, and websites from PKR 70,000.",
  },
];

const GROWTH_SYSTEMS = [
  { label: "Google Business Profile Growth", href: "/google-business-profile-growth" },
  { label: "Social Media Management", href: "/social-media-management" },
  { label: "Meta Ads Management", href: "/meta-ads" },
  { label: "Google Ads Campaigns", href: "/google-ads" },
  { label: "Website Development", href: "/website-development" },
  { label: "Branding & Creative", href: "/branding-and-creative" },
  { label: "Content Creation", href: "/content-creation" },
  { label: "Digital Marketing Consultation", href: "/consultation" },
  { label: "AI Search Optimization", href: "/ai-search-optimization" },
  { label: "Software Development", href: "/software-development" },
];

const INDUSTRIES = [
  { label: "Restaurants, cafes and beverage brands", href: "/industries/restaurants-cafes" },
  { label: "Clinics, dental and aesthetic practices", href: "/industries/clinics-dental" },
  { label: "Architecture, interiors and home improvement brands", href: "/industries/architects-interiors" },
  { label: "Ecommerce and retail brands", href: "/industries/ecommerce-retail" },
  { label: "Real estate, builders and property teams", href: "/industries/real-estate-builders" },
  { label: "Education, academies and course brands", href: "/industries/education-academies" },
];

const DIFFERENTIATORS = [
  "Performance-first strategy built around leads, not vanity metrics",
  "WhatsApp-focused funnels that match how buyers in Pakistan actually convert",
  "Local market understanding across Rawalpindi, Islamabad, and wider Pakistan",
  "In-house design, content, paid ads, SEO, websites, and automation under one team",
];

const RESOURCES = [
  { label: "AI Visibility Target Query Map", href: "/ai-visibility-targets/" },
  { label: "AI Answer Briefs for Pakistan Service Searches", href: "/answers/" },
  { label: "Website Portfolio Case Studies", href: "/website-portfolio/" },
  { label: "Facebook and Instagram Ads Guide", href: "/blog/facebook-instagram-ads-pakistan-guide/" },
  { label: "Google Business Profile Optimization Checklist", href: "/blog/google-business-profile-optimization-checklist/" },
  { label: "Digital Marketing Cost in Pakistan", href: "/blog/digital-marketing-cost-pakistan/" },
];

const AI_VISIBILITY_LINKS = [
  {
    label: "Service answer briefs",
    href: "/service-answer-briefs.md",
    detail: "Direct Q&A blocks for Google Business Profile, social media, ads, websites, branding, content and consultation.",
  },
  {
    label: "Industry solution index",
    href: "/industry-pages.md",
    detail: "Structured niche coverage for restaurants, clinics, interiors, ecommerce, real estate and education brands.",
  },
  {
    label: "AI facts JSON",
    href: "/crea8iv-ai-facts.json",
    detail: "Parseable company, service, proof and citation facts for AI systems and search agents.",
  },
  {
    label: "Deployment checklist",
    href: "/ai-visibility-deployment-checklist",
    detail: "Final upload, indexing and monitoring checklist after the production deployment goes live.",
  },
];

export default function HomeSeoContent() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://crea8ivmedia.com/#webpage-home-seo",
        url: "https://crea8ivmedia.com/",
        name: "Rawalpindi Digital Marketing Agency | Crea8iv Media",
        description:
          "Crea8iv Media helps businesses in Rawalpindi, Islamabad, and across Pakistan generate qualified leads through Google Ads, Meta Ads, local SEO, websites, branding, content, and AI automation.",
        about: { "@id": "https://crea8ivmedia.com/#business" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="native-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto my-4 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <section className="home-seo-content px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[920px]">
          <p className="lux-eyebrow mb-4">Digital Growth, Explained</p>
          <h2 className="font-orbitron text-[clamp(1.7rem,3.8vw,2.6rem)] font-bold leading-tight text-white">
            Digital Marketing Agency in Rawalpindi for Google Ads, Meta Ads, Local SEO, Websites, and AI Automation
          </h2>

          <div className="mt-6 space-y-4 font-inter text-base leading-relaxed text-white/70">
            <p>
              Crea8iv Media is a digital marketing agency in Rawalpindi helping businesses in Rawalpindi,
              Islamabad, and across Pakistan generate qualified leads through{" "}
              <Link href="/google-ads" className="text-[#FF6801] hover:text-[#FF6801]">
                Google Ads
              </Link>
              ,{" "}
              <Link href="/meta-ads" className="text-[#FF6801] hover:text-[#FF6801]">
                Meta Ads
              </Link>
              ,{" "}
              <Link href="/google-business-profile-growth" className="text-[#FF6801] hover:text-[#FF6801]">
                local SEO
              </Link>
              ,{" "}
              <Link href="/website-development" className="text-[#FF6801] hover:text-[#FF6801]">
                websites
              </Link>
              ,{" "}
              <Link href="/branding-and-creative" className="text-[#FF6801] hover:text-[#FF6801]">
                branding
              </Link>
              , content systems, AI search visibility, and AI automation.
            </p>

            <p>
              We do not treat marketing like disconnected services. We build structured growth systems that
              help businesses attract the right audience, convert attention into qualified leads, and scale
              with more clarity, stronger reporting, and better conversion paths.
            </p>

            <p>
              Whether you need more WhatsApp leads, stronger Google Maps visibility, higher-performing landing
              pages, or a clearer paid ads strategy, our role is simple: turn marketing into a measurable
              business asset instead of a guessing game.
            </p>

            <p>
              If you are looking for a digital marketing agency in Rawalpindi or Islamabad that understands
              local intent, premium brand positioning, and performance-driven execution, Crea8iv Media brings
              strategy, creative, media buying, SEO, and automation together under one roof.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 border-l-2 border-[#FF6801] pl-4">
            <div className="text-sm">
              <p className="font-orbitron font-semibold text-white">Strategy & Content by Syed Qamar Abbas</p>
              <p className="font-inter text-[13px] text-white/50">
                Founder & CEO, Crea8iv Media
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="lux-card p-6">
              <h3 className="font-orbitron text-lg font-semibold text-white">Growth Systems We Build</h3>
              <ul className="mt-4 space-y-3">
                {GROWTH_SYSTEMS.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-1 text-[#FF6801]">→</span>
                    <Link
                      href={item.href}
                      className="font-inter text-sm leading-relaxed text-white/75 transition-colors hover:text-[#FF6801]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lux-card p-6">
              <h3 className="font-orbitron text-lg font-semibold text-white">Best Fit Industries</h3>
              <ul className="mt-4 space-y-3">
                {INDUSTRIES.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-1 text-[#FF6801]">→</span>
                    <Link
                      href={item.href}
                      className="font-inter text-sm leading-relaxed text-white/75 transition-colors hover:text-[#FF6801]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lux-card mt-4 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="lux-eyebrow mb-2">AI Visibility Architecture</p>
                <h3 className="font-orbitron text-lg font-semibold text-white">
                  Source pages built for Google, AI assistants, and buyers
                </h3>
              </div>
              <Link
                href="/ai-visibility-targets"
                className="font-inter text-sm font-semibold text-[#FF6801] underline decoration-[#FF6801]/40 underline-offset-4 hover:decoration-[#FF6801]"
              >
                View query map
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {AI_VISIBILITY_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all hover:border-[#FF6801]/60 hover:bg-[#FF6801]/10"
                >
                  <span className="font-orbitron text-sm font-semibold text-white">{item.label}</span>
                  <span className="mt-2 block font-inter text-xs leading-relaxed text-white/58">{item.detail}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="lux-card mt-4 p-6">
            <h3 className="font-orbitron text-lg font-semibold text-white">Why Businesses Choose Crea8iv Media</h3>
            <ul className="mt-4 space-y-3">
              {DIFFERENTIATORS.map((item) => (
                <li key={item} className="flex items-start gap-3 font-inter text-sm leading-relaxed text-white/75">
                  <span className="mt-1 text-[#FF6801]">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/growth-systems"
              className="hero-chip inline-flex items-center justify-center rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-5 py-3 text-sm text-white/90 shadow-[0_0_15px_rgba(255,104,1,0.1)] transition-all duration-300 hover:border-[#FF6801] hover:text-white hover:shadow-[0_0_25px_rgba(255,104,1,0.3)]"
            >
              See Growth Systems
            </Link>
            <Link
              href="/contact"
              className="hero-chip inline-flex items-center justify-center rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-5 py-3 text-sm text-white/90 shadow-[0_0_15px_rgba(255,104,1,0.1)] transition-all duration-300 hover:border-[#FF6801] hover:text-white hover:shadow-[0_0_25px_rgba(255,104,1,0.3)]"
            >
              Book Strategy Call
            </Link>
            <Link
              href="/pricing"
              className="hero-chip inline-flex items-center justify-center rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-5 py-3 text-sm text-white/90 shadow-[0_0_15px_rgba(255,104,1,0.1)] transition-all duration-300 hover:border-[#FF6801] hover:text-white hover:shadow-[0_0_25px_rgba(255,104,1,0.3)]"
            >
              View Pricing
            </Link>
            <a
              href={SOCIAL_LINKS.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-chip inline-flex items-center justify-center rounded-full border border-[#FF6801]/50 bg-[#1a0b02]/60 px-5 py-3 text-sm text-white/90 shadow-[0_0_15px_rgba(255,104,1,0.1)] transition-all duration-300 hover:border-[#FF6801] hover:text-white hover:shadow-[0_0_25px_rgba(255,104,1,0.3)]"
            >
              Leave a Google Review
            </a>
          </div>

          <h3 className="mt-14 font-orbitron text-xl font-bold text-white">Client Reviews</h3>
          <GoogleReviewsShowcase />

          <h3 className="mt-14 font-orbitron text-xl font-bold text-white">Frequently Asked Questions</h3>
          <div className="mt-6 space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="lux-card p-6">
                <h4 className="font-orbitron text-[15px] font-semibold text-white">{faq.q}</h4>
                <p className="mt-2 font-inter text-sm leading-relaxed text-white/65">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
            <p className="lux-eyebrow mb-2">Related Resources</p>
            <h3 className="font-orbitron text-xl font-bold text-white">Keep learning</h3>
            <ul className="mt-5 space-y-3">
              {RESOURCES.map((item) => (
                <li key={item.href} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-[#FF6801]">
                    →
                  </span>
                  <Link
                    href={item.href}
                    className="font-inter text-[15px] leading-snug text-white/85 underline decoration-white/15 underline-offset-4 transition-colors hover:text-[#FF6801] hover:decoration-[#FF6801]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
