import type { ServiceRevampConfig } from "@/components/resource/ServiceRevamp";
import { BUSINESS_DETAILS } from "@/lib/site-config";

export const socialMediaContent: ServiceRevampConfig = {
  slug: "social-media-management",
  hero: {
    breadcrumb: "Social Media Management",
    eyebrow: "Social media management · Rawalpindi & Islamabad",
    title: "Give every post",
    accent: "a job to do.",
    intro: "Build a recognisable presence with planned content, reels, captions and regular publishing. We connect your social profiles to what customers need to see before they message, call or book.",
    image: "/img/services/ad-concepts/social-media-management-ad-concept.webp",
    alt: "A phone showing a social feed surrounded by reel and post formats",
  },
  actions: [{ href: "#cta", label: "Plan My Content" }, { href: "#services", label: "Explore Services" }],
  sections: [
    {
      id: "social-media-management-visual-system",
      anchor: "services",
      eyebrow: "Content and account management",
      title: "From strategy",
      accent: "to a consistent feed.",
      intro: "We plan content for buyers in Rawalpindi, Islamabad, Bahria Town and surrounding areas. What works for a clinic, restaurant, ecommerce brand or consultancy depends on its audience and offer.",
      columns: 3,
      entries: [
        { title: "Content strategy", description: "Set positioning, audience priorities, offers and content pillars before planning the calendar.", icon: "service-orbit/01-strategy" },
        { title: "Graphic design", description: "Build a visual style for posts that people can recognise across your feed and campaigns.", icon: "service-orbit/04-branding" },
        { title: "Reels production", description: "Plan scripts and shots, then edit the footage with pacing and subtitles that suit the format.", icon: "connected-journey/02-explore" },
        { title: "Caption writing", description: "Use a clear opening, relevant story or evidence, and a next step that suits the platform.", icon: "connected-journey/04-enquire" },
        { title: "Hashtag research", description: "Choose relevant local and niche hashtags for the audience and subject of each post.", icon: "connected-journey/01-discover" },
        { title: "Scheduling and reporting", description: "Organise approvals and publishing, then review monthly reach, engagement, growth and enquiries.", icon: "connected-journey/05-follow-through" },
      ],
    },
    {
      id: "social-platforms",
      eyebrow: "Platform fit",
      title: "Match the format",
      accent: "to the audience.",
      columns: 4,
      entries: [
        { title: "Facebook", description: "Plan page, group, Marketplace and business profile content for local discovery and quick responses.", icon: "connected-journey/01-discover" },
        { title: "Instagram", description: "Build a recognisable mix of feed posts, reels, stories and highlights for visual brands.", icon: "service-orbit/04-branding" },
        { title: "TikTok", description: "Use short video, locally relevant trends and a clear opening to reach new audiences.", icon: "connected-journey/02-explore" },
        { title: "LinkedIn", description: "Publish expertise-led content for B2B teams, consultancies, founders and corporate brands.", icon: "connected-journey/03-trust" },
      ],
    },
  ],
  journey: {
    title: "Give attention",
    accent: "somewhere to go.",
    intro: "Plan how the viewer moves from a first impression to a clear action.",
    stages: [
      { title: "Open with a hook", description: "Make the first few seconds relevant with a clear subject and a strong visual.", image: "01-discover" },
      { title: "Name the problem", description: "Use examples and language your audience recognises from their own situation.", image: "02-explore" },
      { title: "Explain the offer", description: "Show what your service does and how it helps with that specific problem.", image: "04-enquire" },
      { title: "Show the evidence", description: "Use real results, customer reviews or a demonstration where they support the message.", image: "03-trust" },
      { title: "Make action easy", description: "Give the viewer a clear next step on WhatsApp, by phone or through a booking page.", image: "05-follow-through" },
    ],
  },
  process: {
    title: "Plan, approve, publish",
    accent: "and improve.",
    intro: "Know what will be published, how to review it and what the report will help you decide.",
    steps: [
      { title: "Review your profile", description: "Check your current content, audience, competitors and how potential buyers reach the team." },
      { title: "Plan the calendar", description: "Agree content pillars, formats and offers for the month. Share the calendar for review." },
      { title: "Create and publish", description: "Produce the agreed graphics, reels and copy. Incorporate feedback and publish approved content." },
      { title: "Review the response", description: "Review reach, engagement, audience growth and enquiries, then adjust the next content plan." },
    ],
    sequence: ["Write scripts and captions", "Design and edit", "Get approval", "Publish"],
  },
  scope: {
    unit: "/ platform",
    detail: "Scope depends on the number of platforms, content volume, production and engagement support. Standard plans include 4 reels and 8 posts per month. Premium plans can include up to 8 reels and 16 posts.",
    fit: "For businesses that need a consistent publishing rhythm, clearer messaging and content that supports sales conversations.",
    improves: ["Publishing rhythm", "Brand consistency", "Profile trust", "Campaign alignment", "Audience recall"],
    firstWeek: ["Review profiles and competitors", "Agree content pillars", "Plan the first monthly calendar"],
    auditLabel: "Social presence system",
  },
  articles: [
    { href: "/blog/google-search-console-social-platforms-pakistan-businesses/", title: "Google Search Console Now Tracks Social Platform Visibility", description: "Understand how social visibility fits into search and discovery reporting.", topic: "Discoverability", image: "/wp-content/uploads/2026/07/google-search-console-social-platforms-pakistan-businesses-blog-thumbnail-ai-regenerated-v4.webp" },
    { href: "/blog/instagram-marketing-pakistan/", title: "Instagram Marketing in Pakistan", description: "Plan stronger Instagram content before adding paid distribution.", topic: "Instagram", image: "/wp-content/uploads/2026/07/instagram-marketing-pakistan-blog-thumbnail-ai-regenerated-v4.webp" },
    { href: "/blog/social-media-marketing-strategies-for-small-business/", title: "Social Media Marketing Strategies for Small Business", description: "Connect platform choice, publishing rhythm and lead-focused planning.", topic: "Content planning", image: "/wp-content/uploads/2026/07/social-media-marketing-strategies-for-small-business-blog-thumbnail-ai-regenerated-v4.webp" },
  ],
  faqs: [
    { question: "Do you film reels on location?", answer: "On-location production is available in Rawalpindi and Islamabad. For remote clients, we can provide scripts, shot lists and editing support using footage captured by your team." },
    { question: "Can I approve content before it is published?", answer: "Yes. We share the monthly calendar for review. You can request edits before approval, and we publish the approved content on the agreed schedule." },
  ],
  closing: {
    title: "Build a content rhythm",
    accent: "your business can keep.",
    intro: "Tell us which platforms you use, who you want to reach and where you need help with planning, production or publishing.",
    actions: [
      { href: `https://wa.me/${BUSINESS_DETAILS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I’d like to discuss social media management.")}`, label: "Discuss My Content", newTab: true },
      { href: "/contact/", label: "Request a proposal" },
    ],
  },
};
