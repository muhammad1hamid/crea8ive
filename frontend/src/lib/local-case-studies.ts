export const localCaseStudies = {
  "health-clinics": {
    category: "Health Clinics",
    title: "Care brands built for trust.",
    eyebrow: "Health & aesthetics",
    intro: "A visual system for healthcare brands that needs to feel credible, warm, and easy to choose.",
    story: "From social content and educational posts to short-form video, the archive shows a consistent effort to make clinical expertise feel human and memorable.",
    services: ["Brand presence", "Social content", "Short-form video", "Campaign creative"],
  },
  "interiors-architects": {
    category: "Interiors & Architects",
    title: "Spaces with a point of view.",
    eyebrow: "Interiors & architecture",
    intro: "Design-led content systems for studios whose work deserves more than a gallery of finished projects.",
    story: "The archive brings together social grids, stories, reels, covers, brand references, and campaign material into a more coherent visual world for design-conscious audiences.",
    services: ["Creative direction", "Social systems", "Brand identity", "Reels & stories"],
  },
  "restaurants": {
    category: "Restaurants",
    title: "Desire, served visually.",
    eyebrow: "Food & hospitality",
    intro: "Campaign creative that turns a menu, a drink, or a moment into a reason to visit.",
    story: "The restaurant archive is built around motion, seasonal offers, product moments, and repeatable social formats that keep the brand present between visits.",
    services: ["Campaign creative", "Product content", "Reels", "Social media"],
  },
  "e-commerce": {
    category: "E Commerce",
    title: "Products with presence.",
    eyebrow: "E-commerce",
    intro: "A product-first creative system designed to make online buying feel clearer and more compelling.",
    story: "The collection combines grid previews and product-led creative into a consistent visual language that can support launches, offers, and everyday demand generation.",
    services: ["Product creative", "Social content", "Campaign systems", "Conversion design"],
  },
  "brand-guidelines": {
    category: "Brand Guidelines",
    title: "The rules behind recognition.",
    eyebrow: "Brand foundations",
    intro: "Guidelines and visual references that give a growing brand the confidence to look consistent everywhere.",
    story: "These materials show the strategic layer behind the output: identity references, logo rules, campaign directions, and the visual decisions that make a brand easier to remember.",
    services: ["Brand identity", "Guidelines", "Visual direction", "Campaign systems"],
  },
  "logo-identity": {
    category: "Logo",
    title: "Marks that carry the story.",
    eyebrow: "Identity design",
    intro: "A collection of logo explorations and identity marks created to give brands a distinct point of entry.",
    story: "The work spans wordmarks, symbols, and identity references—designed to stay recognizable across digital, social, and physical touchpoints.",
    services: ["Logo design", "Identity systems", "Art direction", "Brand applications"],
  },
  editorial: {
    category: "Blog Covers 2026 Premium",
    title: "Authority, made visible.",
    eyebrow: "Editorial systems",
    intro: "A premium visual language for ideas that need to travel through search, social, and AI discovery.",
    story: "The editorial collection turns practical marketing knowledge into a recognizable publishing system—consistent covers, clear topics, and a stronger signal of expertise.",
    services: ["Editorial design", "SEO content", "AI search visibility", "Content systems"],
  },
} as const;

export type LocalCaseStudySlug = keyof typeof localCaseStudies;

export const localCaseStudySlugs = Object.keys(localCaseStudies) as LocalCaseStudySlug[];
