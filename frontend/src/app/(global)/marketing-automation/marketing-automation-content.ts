import { caseStudyItems, marketingAutomationPage } from "@/lib/growth-pages";

export const automationCases = caseStudyItems.slice(0, 4).map((study) => ({
  ...study,
  image: study.href === "/case-studies/real-estate-architecture/"
    ? "/img/portfolio/websites/hassan-nawaz-architects-website-showcase.webp"
    : study.image,
}));

export const capabilityIcons: Record<string, string> = {
  "WhatsApp Lead Handling": "/img/homepage/connected-journey/04-enquire.webp",
  "Clinic and Booking Automation": "/img/homepage/connected-journey/03-trust.webp",
  "CRM and Reactivation": "/img/homepage/service-orbit/06-automation.webp",
};

export const automationStages = [
  {
    title: "Capture",
    description: "Bring in WhatsApp enquiries from your ads, website, Google Maps or social content.",
    image: "01-discover",
  },
  {
    title: "Reply",
    description: "Use a WhatsApp Business auto-reply to acknowledge messages, including after hours.",
    image: "04-enquire",
  },
  {
    title: "Route",
    description: "Ask qualifying questions, record the lead in your CRM and route it to the right branch or team.",
    image: "02-explore",
  },
  {
    title: "Confirm",
    description: "Send a booking confirmation and appointment reminders to help reduce no-shows.",
    image: "03-trust",
  },
  {
    title: "Follow up",
    description: "Follow up after visits, ask for reviews and reconnect with leads that went quiet.",
    image: "05-follow-through",
  },
];

const insightTopics = ["Clinic automation", "Lead generation", "Meta Ads"];

export const relatedArticles = (marketingAutomationPage.relatedInsights ?? []).map((article, index) => ({
  ...article,
  image: `/wp-content/uploads/2026/07/${article.href.split("/")[2]}-blog-thumbnail-ai-regenerated-v4.webp`,
  topic: insightTopics[index],
}));

export const automationFaqs = [
  {
    question: "Can WhatsApp reply when our team is closed?",
    answer: "Yes. An after-hours reply can acknowledge the enquiry and collect the details your team needs. Agree who will pick up the conversation and how it should be routed.",
  },
  {
    question: "Can clinics and salons use this for appointments?",
    answer: "Yes. Booking confirmations, appointment reminders and post-visit follow-ups can help clinics, salons, consultants and service businesses reduce manual work and missed appointments.",
  },
  {
    question: "How does this help with leads that have gone quiet?",
    answer: "A CRM pipeline gives your team a place to see which leads still need a response. A follow-up schedule helps the team revisit missed enquiries and reconnect with older leads.",
  },
  {
    question: "What should we decide before choosing software?",
    answer: "Map how enquiries arrive, what information your team needs and who owns each handoff. Agree on exceptions, such as when a conversation should go directly to a person.",
  },
];
