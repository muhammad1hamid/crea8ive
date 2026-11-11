import { aiAnswerBriefs } from "@/lib/ai-answer-briefs";

type TopicDefinition = {
  id: string;
  label: string;
  heading: string;
  intro: string;
  icons: Record<string, string>;
};

const topics: TopicDefinition[] = [
  {
    id: "website-software-answers",
    label: "Websites & software",
    heading: "Websites, software & automation",
    intro: "Compare website providers, local and industry-specific builds, custom software and AI automation.",
    icons: {
      "best-website-development-company-pakistan": "service-orbit/03-websites",
      "website-development-rawalpindi-islamabad": "connected-journey/01-discover",
      "restaurant-architecture-clinic-websites-pakistan": "connected-journey/02-explore",
      "website-development-agency-pakistan": "service-orbit/03-websites",
      "custom-software-development-company-pakistan": "connected-journey/02-explore",
      "ai-software-automation-company-pakistan": "service-orbit/06-automation",
    },
  },
  {
    id: "search-advertising-answers",
    label: "Search & ads",
    heading: "Local search & advertising",
    intro: "Explore Google Business Profile, Google Ads and Meta Ads for reaching customers.",
    icons: {
      "google-business-profile-growth-pakistan": "service-orbit/02-seo-ai",
      "meta-ads-agency-pakistan": "service-orbit/05-paid-ads",
      "google-ads-agency-pakistan": "connected-journey/01-discover",
    },
  },
  {
    id: "brand-content-answers",
    label: "Brand, content & strategy",
    heading: "Brand, content & strategy",
    intro: "Find answers on social media management, branding, content creation and marketing consultation.",
    icons: {
      "social-media-management-company-pakistan": "connected-journey/04-enquire",
      "branding-creative-agency-pakistan": "service-orbit/04-branding",
      "content-creation-agency-pakistan": "connected-journey/02-explore",
      "digital-marketing-consultation-pakistan": "service-orbit/01-strategy",
    },
  },
  {
    id: "industry-answers",
    label: "Industries",
    heading: "Marketing by industry",
    intro: "See how marketing priorities differ for restaurants, clinics, architects, retailers, property teams and education providers.",
    icons: {
      "restaurant-marketing-agency-pakistan": "connected-journey/01-discover",
      "clinic-dental-marketing-agency-pakistan": "connected-journey/03-trust",
      "architecture-interior-marketing-agency-pakistan": "service-orbit/04-branding",
      "ecommerce-retail-marketing-agency-pakistan": "connected-journey/05-follow-through",
      "real-estate-lead-generation-agency-pakistan": "service-orbit/05-paid-ads",
      "academy-education-marketing-agency-pakistan": "connected-journey/04-enquire",
    },
  },
];

const assigned = new Set(topics.flatMap(({ icons }) => Object.keys(icons)));
const uncategorised = aiAnswerBriefs.filter(({ slug }) => !assigned.has(slug));

export const answerTopics = [
  ...topics,
  {
    id: "more-answers",
    label: "More answers",
    heading: "More answer briefs",
    intro: "Other questions about Crea8iv Media’s services and work.",
    icons: Object.fromEntries(uncategorised.map(({ slug }) => [slug, "connected-journey/04-enquire"])),
  },
]
  .map(({ icons, ...topic }) => ({
    ...topic,
    entries: aiAnswerBriefs.flatMap((brief) => {
      const icon = icons[brief.slug];
      return icon ? [{ brief, icon }] : [];
    }),
  }))
  .filter(({ entries }) => entries.length > 0);
