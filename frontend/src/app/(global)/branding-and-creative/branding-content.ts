import type { ServiceRevampConfig } from "@/components/resource/ServiceRevamp";
import { BUSINESS_DETAILS } from "@/lib/site-config";

export const identityProjects = [
  { title: "CO3 Premium", body: "An identity carried through product visuals, the website and campaign assets.", image: "/img/case-studies/co3-premium-liquid-shop/co3-brand-guideline-cover.webp", previewImage: "/img/homepage/creative-work/co3-landscape-v2.webp", alt: "CO3 Premium brand system and visual applications", href: "/case-studies/co3-premium-liquid-shop/", linkLabel: "View CO3 Premium case study" },
  { title: "Home Studio Interiors", body: "An interiors identity applied to the website, content and customer enquiries.", image: "/img/case-studies/home-studio-interiors/home-studio-brand-guideline-cover.webp", alt: "Home Studio Interiors brand guideline cover", href: "/case-studies/home-studio-interiors/", linkLabel: "View Home Studio Interiors case study" },
  { title: "The Smile Xperts", body: "A visual system for a dental practice, built around clarity and patient trust.", image: "/img/case-studies/the-smile-xperts/the-smile-xperts-brand-guideline-cover.webp", alt: "The Smile Xperts brand guideline cover", href: "/case-studies/the-smile-xperts/", linkLabel: "View The Smile Xperts case study" },
];

export const brandingContent: ServiceRevampConfig = {
  slug: "branding-and-creative",
  hero: {
    breadcrumb: "Branding & Creative",
    eyebrow: "Branding and creative design · Rawalpindi & Islamabad",
    title: "Build an identity",
    accent: "buyers recognise.",
    intro: "Bring your logo, colour, typography and creative assets into one system. We design an identity that reflects how you want to be seen and works across websites, social posts, print, packaging and ads.",
    image: "/img/services/ad-concepts/brand-identity-ad-concept.webp",
    alt: "A logo mark, colour palette, packaging and social card using the same visual identity",
  },
  actions: [{ href: "#cta", label: "Build My Brand" }, { href: "#pricing", label: "See Pricing" }],
  sections: [
    {
      id: "branding-and-creative-visual-system",
      eyebrow: "The identity system",
      title: "Every piece",
      accent: "belongs together.",
      intro: "We design for real use, from a business card or billboard to packaging, a fast-scrolling feed and a small WhatsApp profile image.",
      columns: 4,
      entries: [
        { title: "Brand discovery", description: "Map your audience, positioning, competitors and tone before starting visual design.", icon: "service-orbit/01-strategy" },
        { title: "Logo system", description: "Create the primary logo, secondary mark and icon variation for different uses.", icon: "service-orbit/04-branding" },
        { title: "Colour palette", description: "Define primary, secondary and neutral colours with HEX, RGB and CMYK references.", icon: "connected-journey/02-explore" },
        { title: "Typography", description: "Set heading, body and accent type with practical guidance for each format.", icon: "connected-journey/03-trust" },
        { title: "Business cards", description: "Supply clean, print-ready business card files and a digital proof.", icon: "connected-journey/02-explore" },
        { title: "Social brand kit", description: "Create profile and cover visuals, post templates and story templates.", icon: "connected-journey/04-enquire" },
        { title: "Brand guidelines", description: "Give designers, marketers and your team a practical reference for using the identity.", icon: "connected-journey/03-trust" },
        { title: "Optional applications", description: "Add letterhead, email signatures, brochures, packaging or campaign assets to match your scope.", icon: "connected-journey/05-follow-through" },
      ],
    },
    {
      id: "branding-fit",
      eyebrow: "Who it suits",
      title: "An identity for",
      accent: "your stage of growth.",
      intro: "We work with startups, established businesses and personal brands, including clinics, restaurants, retail and real estate teams in Rawalpindi and Islamabad.",
      compact: true,
      entries: [
        { title: "New businesses", description: "Create a credible first identity to use from launch." },
        { title: "Growth-stage teams", description: "Tighten an existing identity as your offer or market position develops." },
        { title: "Experts and professionals", description: "Give coaches, consultants and specialists a consistent visual presence." },
        { title: "Retail and packaging", description: "Design for shelf presence and a recognisable range across products." },
      ],
    },
  ],
  process: {
    title: "Agree the direction",
    accent: "before building the system.",
    intro: "A clear brief sets the direction. We test how the chosen identity works in the formats you use every day.",
    steps: [
      { title: "Understand the brand", description: "Review your current materials, customers, market position and the touchpoints you need to improve." },
      { title: "Present concepts", description: "Show three initial logo concepts, agree a direction and refine it through the two included revision rounds." },
      { title: "Build the applications", description: "Apply the identity to agreed formats and check it at small and large sizes, in print and on screens." },
      { title: "Hand over the files", description: "After full payment, hand over agreed source files and print-ready and web-ready exports, with guidelines where included." },
    ],
    sequence: ["Build logo variations", "Apply colour and type", "Test agreed formats", "Prepare files"],
  },
  scope: {
    unit: "",
    detail: "Choose your scope based on where the identity needs to appear. Additional applications or revisions can be agreed separately.",
    fit: "For businesses that need a consistent identity before investing more in a website, packaging, social content or advertising.",
    improves: ["Logo direction", "Visual language", "Brand consistency", "Presentation and perceived value", "Campaign readiness"],
    firstWeek: ["Audit your current identity", "Define brand personality", "Prepare visual directions"],
    auditLabel: "Identity system",
    packages: [
      { title: "Brand Package", price: "PKR 50,000", description: "A visual foundation for businesses that need the essentials.", features: ["Logo design", "Colour palette", "Typography direction", "Business card design"] },
      { title: "Brand Identity", price: "PKR 85,000", description: "A fuller identity for digital, print and social channels.", features: ["Everything in the Brand Package", "Social media brand kit", "Brand guidelines document", "Expanded usage system"] },
      { title: "Brand System", price: "PKR 130,000+", description: "A broader visual system for your website and campaigns.", features: ["Full identity system", "Website design direction", "Ad creative templates", "Broader brand assets"] },
    ],
  },
  articles: [],
  faqs: [
    { question: "How many logo concepts and revisions are included?", answer: "The first presentation includes three unique logo concepts. After selection, two revision rounds are included. Additional revisions can be agreed if needed." },
    { question: "Do I own the final design files?", answer: "After full payment, you receive ownership of your design files, including vector source files, print-ready PDFs and web-ready PNG assets." },
    { question: "Can you match our current brand for a partial refresh?", answer: "Yes. We can use your existing brand guidelines, logo files, colours and reference assets to align new design work with the current identity." },
  ],
  closing: {
    title: "Make your brand",
    accent: "easier to recognise.",
    intro: "Share where your brand appears today and what needs to change. We’ll discuss a scope that fits your business and the formats you need.",
    actions: [
      { href: `https://wa.me/${BUSINESS_DETAILS.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Crea8iv Media, I’d like to discuss branding and creative design.")}`, label: "Discuss My Branding", newTab: true },
      { href: "/contact/", label: "Request a proposal" },
    ],
  },
};
