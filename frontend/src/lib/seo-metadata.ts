import { SITE_URL } from "@/lib/site-config";
import { pageSeoMetadataRecordSchema } from "@/lib/data-contracts";

export type PageSeoMetadata = {
  title: string;
  description: string;
  summary: string;
};

export const PAGE_METADATA: Record<string, PageSeoMetadata> = pageSeoMetadataRecordSchema.parse({
  home: {
    title: "Digital Marketing Agency in Rawalpindi | Crea8iv",
    description:
      "Work with a Rawalpindi digital marketing agency for Google Ads, Meta Ads, local SEO, websites and automation built to turn traffic into qualified leads.",
    summary:
      "Crea8iv Media is a digital marketing and software agency in Rawalpindi serving Islamabad and Pakistan-wide businesses with measurable growth systems.",
  },
  about: {
    title: "About Crea8iv Media | SEO, Ads & Creative Team",
    description:
      "Meet the Rawalpindi team behind Crea8iv Media's SEO, Google Ads, Meta Ads, content, automation and software delivery for Pakistan businesses.",
    summary:
      "Crea8iv Media combines performance marketing, creative strategy, automation and software development for businesses in Pakistan.",
  },
  "syed-qamar-abbas": {
    title: "Syed Qamar Abbas Biography | Founder & CEO of Crea8iv Media",
    description:
      "Definitive first-party biography of Syed Qamar Abbas, Founder and CEO of Crea8iv Media in Rawalpindi, Pakistan.",
    summary:
      "Syed Qamar Abbas is the Founder and CEO of Crea8iv Media, a Rawalpindi-based digital marketing and software agency focused on AI marketing, SEO, automation and business growth systems.",
  },
  "ai-search-optimization": {
    title: "AI Search Optimization Agency in Pakistan | Crea8iv Media",
    description:
      "Improve visibility in Google AI results with entity SEO, AEO, GEO, LLMO, schema, answer blocks and citation-ready content for Pakistan businesses.",
    summary:
      "Crea8iv Media helps businesses structure factual first-party content for search engines and AI-powered answer systems.",
  },
  blog: {
    title: "Digital Marketing Insights | Crea8iv Media",
    description:
      "Read practical Pakistan-focused guides on SEO, Google Ads, Meta Ads, local SEO, websites, WhatsApp marketing and AI search strategy.",
    summary:
      "The Crea8iv Media blog publishes practical, locally relevant digital marketing guidance for businesses across Pakistan.",
  },
  "branding-and-creative": {
    title: "Branding Agency Rawalpindi | Crea8iv Media",
    description:
      "Build a credible brand with logo design, visual identity, campaign creative and brand systems from Crea8iv Media in Rawalpindi.",
    summary:
      "Crea8iv Media creates logos, visual identities and campaign creative designed to build recognition, trust and conversion.",
  },
  careers: {
    title: "Digital Marketing Careers Rawalpindi | Crea8iv Media",
    description:
      "Explore digital marketing, creative, advertising and software career opportunities with the Crea8iv Media team in Rawalpindi.",
    summary:
      "Crea8iv Media offers hands-on career opportunities across marketing, design, paid media, content and software development.",
  },
  consultation: {
    title: "Marketing Consultation Rawalpindi | Crea8iv Media",
    description:
      "Book a focused digital marketing consultation to audit your current activity and map a practical growth plan for your business.",
    summary:
      "A Crea8iv Media consultation turns marketing problems, priorities and opportunities into a focused, measurable action plan.",
  },
  contact: {
    title: "Contact Crea8iv Media | SEO, Ads & Website Projects",
    description:
      "Contact Crea8iv Media in Bahria Town, Rawalpindi for SEO, Google Ads, Meta Ads, website development, automation and software projects.",
    summary:
      "Contact Crea8iv Media by phone, email or office visit to discuss a marketing, automation, website or software project.",
  },
  "privacy-policy": {
    title: "Privacy Policy | Crea8iv Media",
    description:
      "Read how Crea8iv Media collects, uses, stores and protects information submitted through its website, communications and services.",
    summary:
      "The Crea8iv Media Privacy Policy explains its approach to personal information, cookies, service providers, retention and privacy requests.",
  },
  "terms-and-conditions": {
    title: "Terms and Conditions | Crea8iv Media",
    description:
      "Read the terms governing use of the Crea8iv Media website, enquiries, proposals, digital marketing services and software projects.",
    summary:
      "The Crea8iv Media Terms and Conditions explain website use, service agreements, payments, intellectual property and user responsibilities.",
  },
  "content-creation": {
    title: "Content Creation Agency Rawalpindi | Crea8iv Media",
    description:
      "Get strategy-led reels, videos, social posts and campaign copy built to earn attention and support lead generation in Pakistan.",
    summary:
      "Crea8iv Media plans and produces reels, videos, social posts and copy for organic and paid campaigns.",
  },
  courses: {
    title: "AI Marketing Course Rawalpindi | Crea8iv Media",
    description:
      "Learn practical digital marketing and AI workflows through hands-on training from Crea8iv Media in Rawalpindi, Pakistan.",
    summary:
      "Crea8iv Media courses teach practical digital marketing and AI workflows through hands-on, locally relevant training.",
  },
  faqs: {
    title: "Digital Marketing FAQs Pakistan | Crea8iv Media",
    description:
      "Get clear answers about digital marketing strategy, pricing, timelines, paid ads, local SEO, content, websites and automation.",
    summary:
      "Crea8iv Media answers common questions about digital marketing services, costs, delivery and expected timelines in Pakistan.",
  },
  "google-ads": {
    title: "Google Ads Agency in Pakistan | Crea8iv Media",
    description:
      "Get more calls and leads from high-intent searches with Google Ads management, landing pages, conversion tracking and reporting in Rawalpindi, Islamabad and Pakistan.",
    summary:
      "Crea8iv Media manages search-led Google Ads campaigns that connect high-intent buyers with a measurable conversion path.",
  },
  "google-business-profile-growth": {
    title: "Google Business Profile Optimization Rawalpindi | Crea8iv Media",
    description:
      "Rank higher on Google Maps in Rawalpindi and Islamabad with Google Business Profile optimization, review growth, local SEO updates and conversion-focused profile management.",
    summary:
      "Crea8iv Media optimizes Google Business Profiles for stronger map-pack visibility, trust and local customer actions.",
  },
  "growth-systems": {
    title: "Growth Systems for Pakistan Brands | Crea8iv",
    description:
      "Connect SEO, paid ads, websites, content and automation into one measurable growth system for your business in Pakistan.",
    summary:
      "Crea8iv Media growth systems connect visibility, lead generation, conversion and automation into one measurable operating model.",
  },
  "khushal-salon": {
    title: "Khushal Salon WhatsApp Lead Strategy | Crea8iv Media",
    description:
      "See the WhatsApp-focused lead strategy developed by Crea8iv Media for Khushal Salon, including campaign and conversion planning.",
    summary:
      "This project outlines a WhatsApp-led customer acquisition strategy developed by Crea8iv Media for Khushal Salon.",
  },
  "meta-ads": {
    title: "Meta Ads Agency in Pakistan | Crea8iv Media",
    description:
      "Generate more Facebook, Instagram and WhatsApp leads with Meta Ads strategy, creative testing, retargeting and conversion tracking for Pakistan businesses.",
    summary:
      "Crea8iv Media manages Meta Ads campaigns across Facebook, Instagram and WhatsApp with testing and lead tracking.",
  },
  "our-services": {
    title: "Digital Marketing Services Rawalpindi | Crea8iv",
    description:
      "Explore SEO, paid ads, social media, content, branding, websites, automation and software services for Rawalpindi and Islamabad businesses.",
    summary:
      "Crea8iv Media provides integrated marketing, creative, automation, website and software development services.",
  },
  "our-team": {
    title: "Crea8iv Media Team | Marketing Experts Rawalpindi",
    description:
      "Meet the specialists delivering performance marketing, creative, local SEO, automation and software projects at Crea8iv Media.",
    summary:
      "The Crea8iv Media team combines strategy, media buying, content, design, automation and software expertise.",
  },
  pricing: {
    title: "Digital Marketing Pricing in Pakistan | Crea8iv Media",
    description:
      "Compare pricing for local SEO, social media, content, branding, Google Ads, Meta Ads and website development in Pakistan.",
    summary:
      "Crea8iv Media publishes starting prices in PKR for core digital marketing, creative, advertising and website services.",
  },
  results: {
    title: "Marketing Portfolio & Case Studies Pakistan | Crea8iv",
    description:
      "Review selected Crea8iv Media campaign systems, portfolio work and case studies across lead generation, branding and growth.",
    summary:
      "Crea8iv Media case studies show how structured campaigns and conversion systems are applied to specific business goals.",
  },
  "social-media-management": {
    title: "Social Media Management Rawalpindi | Crea8iv",
    description:
      "Build consistent visibility with strategy, reels, post design, publishing and community management for businesses in Rawalpindi, Islamabad and across Pakistan.",
    summary:
      "Crea8iv Media manages social strategy, content production, publishing and audience engagement for brands in Pakistan.",
  },
  "website-development": {
    title: "Website Development Company in Pakistan | Crea8iv Media",
    description:
      "Hire Crea8iv Media for fast, SEO-ready business websites, ecommerce websites, landing pages and redesigns for restaurants, clinics, architects, interiors and service brands in Pakistan.",
    summary:
      "Crea8iv Media builds mobile-friendly, SEO-ready business websites for Pakistan brands, combining design, development, conversion copy, portfolio proof and WhatsApp lead capture.",
  },
  "software-development": {
    title: "Software Development Company Pakistan | Crea8iv Media",
    description:
      "Build custom SaaS, CRM, ERP, mobile, web and AI applications with a software development company serving Rawalpindi, Islamabad and Pakistan.",
    summary:
      "Crea8iv Media designs and builds custom SaaS, CRM, ERP, mobile, web and AI applications for growing businesses.",
  },
  "software-products": {
    title: "PatientFlow & Custom Software | Crea8iv Media",
    description:
      "Explore PatientFlow clinic retention software and custom software development by Crea8iv Media, including patient follow-up and appointment workflows.",
    summary:
      "Crea8iv Media builds PatientFlow for patient retention and follow-up, alongside custom software for business operations.",
  },
});

export function pageUrl(slug: string) {
  return slug === "home" ? `${SITE_URL}/` : `${SITE_URL}/${slug}/`;
}
