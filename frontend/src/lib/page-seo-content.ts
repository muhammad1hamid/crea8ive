/**
 * AEO / SEO content appended to the BOTTOM of existing service pages.
 * The Elementor design above is never touched — this only adds extractable,
 * AI-citable answer blocks + FAQ schema beneath it.
 */

export type Faq = { q: string; a: string };
export type RelatedLink = { href: string; label: string; description: string };

export type PageSeo = {
  eyebrow: string;
  heading: string;
  intro: string; // 40–60 word "what is X" answer block (AEO snippet target)
  serviceName: string;
  price: string;
  faqs: Faq[];
  relatedLinks?: RelatedLink[];
};

export const PAGE_SEO_CONTENT: Record<string, PageSeo> = {
  "meta-ads": {
    eyebrow: "Meta Ads — Explained",
    heading: "Meta Ads in Rawalpindi & Islamabad",
    serviceName: "Meta Ads Management",
    price: "25000",
    intro:
      "Meta Ads are paid Facebook, Instagram, Messenger and WhatsApp campaigns run through Meta Ads Manager. For Rawalpindi & Islamabad businesses, they're the fastest way to put a qualified buyer in your WhatsApp — when the offer, targeting and funnel are built correctly.",
    faqs: [
      { q: "How much do Meta Ads cost in Pakistan?", a: "Meta Ads management at Crea8iv Media starts from PKR 25,000/month plus ad spend. Most Rawalpindi & Islamabad businesses need a minimum ad budget of PKR 20,000–50,000/month to generate consistent, qualified leads." },
      { q: "How quickly will I see results from Meta Ads?", a: "Most campaigns produce leads within the first 7–14 days. The first 2–4 weeks are a learning phase; after that we optimize weekly to lower cost per lead and grow volume." },
      { q: "Do Meta Ads work for WhatsApp lead generation?", a: "Yes — it's our specialty. We build click-to-WhatsApp campaigns that send qualified buyers straight to your inbox, then add ManyChat automation for an instant 24/7 reply." },
      { q: "What's the minimum budget to run Meta Ads?", a: "We recommend PKR 20,000–50,000/month in ad spend for Rawalpindi & Islamabad businesses, plus the management fee. Smaller budgets work for testing but need more time to optimize." },
      { q: "What's the difference between boosting a post and Meta Ads?", a: "Boosting is basic reach with limited targeting. Professional Meta Ads use full Ads Manager — custom audiences, conversion objectives, A/B testing and retargeting — which is what actually drives qualified leads." },
      { q: "Why choose Crea8iv Media for Meta Ads in Rawalpindi?", a: "We're a Rawalpindi-based performance agency that builds WhatsApp-first lead systems, not just ads. We connect strategy, creative, tracking, landing pages and follow-up so Meta Ads leads are easier to measure and scale." },
    ],
    relatedLinks: [
      {
        href: "/blog/how-real-estate-businesses-in-pakistan-get-leads-from-facebook-ads/",
        label: "How Real Estate Businesses in Pakistan Get Leads from Facebook Ads",
        description: "A practical example of how Meta campaigns turn attention into inquiries and sales conversations.",
      },
      {
        href: "/blog/how-much-should-a-business-spend-on-meta-ads-in-pakistan/",
        label: "Meta Ads Budget in Pakistan: 2026 Guide",
        description: "Use a practical management-fee and ad-spend breakdown before setting a Meta Ads budget.",
      },
      {
        href: "/blog/whatsapp-automation-for-clinics-booking-follow-up-and-reminders/",
        label: "WhatsApp Automation for Clinics: Booking, Follow-Up and Reminders",
        description: "A practical follow-up example for businesses that need Meta Ads leads to convert faster after the click.",
      },
    ],
  },
  "google-ads": {
    eyebrow: "Google Ads — Explained",
    heading: "Google Ads in Rawalpindi & Islamabad",
    serviceName: "Google Ads Management",
    price: "25000",
    intro:
      "Google Ads can reach people actively searching for your service in Rawalpindi, Islamabad and other markets. We connect search intent, relevant ads, landing pages and conversion tracking so you can judge the enquiries your campaign generates.",
    faqs: [
      { q: "How much do Google Ads cost in Pakistan?", a: "Management starts from PKR 25,000 per month, with media spend separate. The media budget depends on the service, location, competition and the amount of data needed to evaluate the campaign." },
      { q: "Are Google Ads better than Facebook Ads?", a: "Google Search reaches people already looking for a service. Meta helps introduce the offer to new audiences and bring previous visitors back. The right mix depends on where your customers are in their buying journey." },
      { q: "How fast do Google Ads start working?", a: "Ads can begin serving after approval. The timing of enquiries depends on search demand, budget and the landing page. We review search terms, tracking and bids after launch to see what needs adjusting." },
      { q: "What is a good cost per lead on Google Ads in Pakistan?", a: "A useful target depends on the service, competition and the value of a qualified enquiry. We review the cost and quality of calls and form submissions together before recommending budget changes." },
      { q: "Do you build the landing page too?", a: "Yes. We can build or improve the landing page so it matches the ad, works on mobile and gives visitors a clear path to call, message or enquire." },
    ],
    relatedLinks: [
      {
        href: "/blog/google-ads-cost-in-pakistan-for-doctors-clinics-and-aesthetic-brands/",
        label: "Google Ads Cost in Pakistan for Clinics",
        description: "Review a practical management-fee and media-spend framework before planning a clinic or aesthetic campaign.",
      },
      {
        href: "/blog/google-conversational-search-ads-pakistan-businesses/",
        label: "Conversational Search Ads for Pakistan Businesses",
        description: "A high-intent guide to the search behavior changes affecting Google Ads strategy right now.",
      },
      {
        href: "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/",
        label: "SEO Cost in Pakistan: What Businesses Should Expect to Pay",
        description: "Helpful for comparing when to invest in Google Ads first and when SEO should support it.",
      },
    ],
  },
  "google-business-profile-growth": {
    eyebrow: "Google Business Profile — Explained",
    heading: "Rank on Google Maps in Rawalpindi & Islamabad",
    serviceName: "Google Business Profile Optimization",
    price: "20000",
    intro:
      "Google Business Profile (GBP) optimization is the process of ranking your business in the Google Maps 'map pack' for local searches. For Rawalpindi & Islamabad businesses, ranking in the top 3 drives calls, direction requests and WhatsApp leads from buyers nearby.",
    faqs: [
      { q: "How long does it take to rank on Google Maps in Rawalpindi?", a: "With proper GBP optimization, most Rawalpindi & Islamabad businesses reach the top 3 of the map pack within 4–8 weeks. Competitive categories take longer but follow the same system." },
      { q: "What is the Google map pack?", a: "The map pack is the block of three local businesses Google shows at the top of Maps and search results. Ranking there is the single highest-value position for a local business." },
      { q: "How do I get more Google reviews?", a: "We set up a review system — a WhatsApp/QR link and a simple ask script — so happy customers leave reviews consistently. Steady reviews are a major ranking and trust signal." },
      { q: "Do GBP posts actually help ranking?", a: "Yes. Regular, geo-tagged GBP posts signal activity to Google and keep your profile fresh — part of our weekly optimization." },
      { q: "Can you manage my Google Business Profile for me?", a: "Yes. We fully manage GBP — optimization, posts, review replies, Q&A and reporting — so you stay visible and convert local searches into leads." },
    ],
    relatedLinks: [
      {
        href: "/blog/google-business-profile-for-restaurants-in-islamabad-full-setup-guide/",
        label: "Google Business Profile for Restaurants in Islamabad",
        description: "A full local-SEO setup example that shows how profile structure supports map-pack visibility.",
      },
      {
        href: "/blog/google-business-profile-optimization-checklist-for-restaurants-in-islamabad/",
        label: "Google Business Profile Optimization Checklist",
        description: "A focused checklist for improving profile quality, freshness, and local conversion signals.",
      },
      {
        href: "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/",
        label: "SEO Cost in Pakistan: 2026 Pricing Guide",
        description: "Compare local SEO scope, Google Business Profile work, and the factors that change a realistic monthly investment.",
      },
    ],
  },
  "social-media-management": {
    eyebrow: "Social Media Management — Explained",
    heading: "Social Media Management in Rawalpindi & Islamabad",
    serviceName: "Social Media Management",
    price: "10000",
    intro:
      "Social media management is the done-for-you running of your Facebook, Instagram and TikTok — strategy, content, posting and engagement. For Rawalpindi & Islamabad brands, it builds authority and keeps you top-of-mind so paid ads convert better.",
    faqs: [
      { q: "How much does social media management cost in Pakistan?", a: "Social media management at Crea8iv Media starts from PKR 10,000/platform. Packages scale with the number of platforms, posts, reels and the level of strategy and engagement included." },
      { q: "How many posts will you make per month?", a: "It depends on the package, but a typical plan includes a mix of feed posts, reels and stories each week — built around a content strategy, not random posting." },
      { q: "Do you create reels and video content?", a: "Yes. Short-form reels are core to growth in Pakistan — we script, edit and publish scroll-stopping reels designed to build reach and authority." },
      { q: "Will social media alone generate leads?", a: "Organic social builds trust and authority, which makes everything else convert better. For consistent lead volume, we pair it with Meta Ads and a WhatsApp funnel." },
      { q: "Which platforms should my business be on?", a: "For most Rawalpindi & Islamabad businesses, Instagram + Facebook are essential, with TikTok added for reach. We focus on the platforms where your buyers actually are." },
    ],
    relatedLinks: [
      {
        href: "/blog/google-search-console-social-platforms-pakistan-businesses/",
        label: "Google Search Console Now Tracks Social Platform Visibility",
        description: "Shows why social content now matters more directly for discoverability and search reporting.",
      },
      {
        href: "/blog/instagram-marketing-pakistan/",
        label: "Instagram Marketing in Pakistan",
        description: "A practical guide to building stronger Instagram visibility before adding paid distribution.",
      },
      {
        href: "/blog/social-media-marketing-strategies-for-small-business/",
        label: "Social Media Marketing Strategies for Small Business",
        description: "Useful for connecting weekly posting, platform choice, and lead-focused content planning.",
      },
    ],
  },
  "website-development": {
    eyebrow: "Website Development — Explained",
    heading: "Website Development Company in Pakistan",
    serviceName: "Website Development",
    price: "70000",
    intro:
      "Crea8iv Media is a website development company in Pakistan that builds fast, mobile-friendly, SEO-ready websites for restaurants, clinics, architecture firms, interior brands, ecommerce stores and service businesses. Each website connects premium design, conversion copy, technical SEO, portfolio proof and WhatsApp lead capture.",
    faqs: [
      { q: "Who builds business websites in Pakistan?", a: "Crea8iv Media builds business websites in Pakistan for service companies, restaurants, clinics, architects, interior brands, ecommerce stores and local businesses that need a clearer online presence, better SEO structure and more qualified WhatsApp or form enquiries." },
      { q: "How much does a business website cost in Islamabad or Rawalpindi?", a: "Website development at Crea8iv Media starts from PKR 70,000. Most business websites in Islamabad or Rawalpindi land between PKR 70,000 and 150,000 depending on page count, copy, integrations, booking flows and whether ecommerce is included." },
      { q: "What should I look for in a website design company in Islamabad?", a: "Look for speed, mobile UX, SEO structure, conversion thinking and post-launch support. A strong website design company should explain how the site will help you rank, capture leads and support Google Ads or Meta Ads after launch." },
      { q: "Do you build WordPress, landing pages and ecommerce websites?", a: "Yes. We build WordPress business websites, campaign landing pages, ecommerce stores and custom lead-generation pages. The right build depends on whether your priority is local SEO, paid traffic, bookings or online sales." },
      { q: "Will my website be SEO-ready and fast?", a: "Yes. We build clean, fast pages with proper headings, internal-link support, schema and conversion sections so your site is ready for organic search and paid traffic from day one." },
      { q: "Can you build websites for restaurants, architects, clinics and interior brands?", a: "Yes. Crea8iv Media has website and portfolio experience across hospitality, healthcare, architecture, interiors, ecommerce and service businesses. We use each niche's buyer journey to shape the homepage, services, proof, calls to action and local SEO structure." },
      { q: "Can you redesign my existing website without losing leads?", a: "Yes. We handle website redesign projects by preserving what already works, improving speed and message clarity, and adding stronger CTA, WhatsApp and form flows so the new site converts better than the old one." },
      { q: "Do you offer WhatsApp and lead-capture integration?", a: "Yes. Click-to-WhatsApp, forms, enquiry routing and CRM-friendly lead capture are standard when a business wants the website to act like a sales asset rather than an online brochure." },
    ],
    relatedLinks: [
      {
        href: "/playbooks/plan-business-website-pakistan/",
        label: "How to Plan a Business Website in Pakistan",
        description: "A step-by-step website planning checklist covering audience, offer, pages, proof, SEO, WhatsApp and launch QA.",
      },
      {
        href: "/playbooks/website-redesign-seo-migration-pakistan/",
        label: "Website Redesign SEO Migration Checklist",
        description: "A practical checklist for redesigning a website without losing important URLs, rankings, leads or tracking.",
      },
      {
        href: "/answers/best-website-development-company-pakistan/",
        label: "AI Answer Brief: Website Development Company in Pakistan",
        description: "A short, citation-ready answer for AI assistants and buyers comparing website partners in Pakistan.",
      },
      {
        href: "/answers/restaurant-architecture-clinic-websites-pakistan/",
        label: "AI Answer Brief: Niche Business Websites",
        description: "Direct answer coverage for restaurant, architecture, interior, clinic and ecommerce website searches.",
      },
      {
        href: "/compare/website-development-company-vs-freelancer-pakistan/",
        label: "Website Company vs Freelancer in Pakistan",
        description: "A comparison page for buyers deciding between a freelancer and a full website development company.",
      },
      {
        href: "/compare/wordpress-vs-custom-website-pakistan/",
        label: "WordPress vs Custom Website in Pakistan",
        description: "A practical comparison for choosing the right website platform and development path.",
      },
      {
        href: "/guides/best-website-development-company-pakistan/",
        label: "Best Website Development Company in Pakistan",
        description: "A buyer guide for evaluating portfolio proof, SEO structure, mobile UX, pricing and support before hiring a website team.",
      },
      {
        href: "/guides/website-development-cost-pakistan/",
        label: "Website Development Cost in Pakistan",
        description: "A practical pricing guide for scoping business websites, ecommerce, WhatsApp lead paths and SEO-ready builds.",
      },
      {
        href: "/blog/best-website-design-company-in-islamabad-what-to-look-for/",
        label: "Best Website Design Company in Islamabad: What to Look For",
        description: "A buyer-intent guide covering how to evaluate design quality, SEO structure, and conversion thinking.",
      },
      {
        href: "/blog/seo-cost-in-pakistan-what-businesses-should-actually-expect-to-pay/",
        label: "SEO Cost in Pakistan for Businesses Planning a New Site",
        description: "Useful when the website rebuild also needs search visibility, local landing pages, and content depth.",
      },
      {
        href: "/blog/lead-generation-for-builders-and-architects-in-pakistan/",
        label: "Lead Generation for Builders and Architects in Pakistan",
        description: "A commercial-intent example of how website structure, ads, and conversion paths need to work together.",
      },
    ],
  },
  "branding-and-creative": {
    eyebrow: "Branding & Creative — Explained",
    heading: "Branding & Creative in Rawalpindi & Islamabad",
    serviceName: "Branding and Creative Design",
    price: "50000",
    intro:
      "Branding and creative design is the system of logo, colors, typography and visual identity that makes your business look credible and premium. For Rawalpindi & Islamabad brands, strong branding builds instant trust and makes every ad and post perform better.",
    faqs: [
      { q: "How much does branding cost in Pakistan?", a: "Branding and creative packages at Crea8iv Media start from PKR 50,000. The investment depends on scope — logo only, full identity system, or ongoing creative for campaigns." },
      { q: "What's included in a brand identity package?", a: "A typical identity includes logo, color palette, typography, brand guidelines and key templates — everything you need to look consistent across every channel." },
      { q: "Why does branding matter for lead generation?", a: "Buyers decide in seconds whether you look trustworthy. Premium, consistent branding raises perceived value, so your ads, website and social all convert at a higher rate." },
      { q: "Can you refresh my existing brand?", a: "Yes. We can modernize and tighten your existing brand without losing recognition — a refresh rather than a full rebuild when that's the right call." },
    ],
  },
  "content-creation": {
    eyebrow: "Content Creation — Explained",
    heading: "Content Creation in Rawalpindi & Islamabad",
    serviceName: "Content Creation",
    price: "30000",
    intro:
      "Content creation is producing the reels, posts, videos and copy that build your brand and drive leads. For Rawalpindi & Islamabad businesses, scroll-stopping content is what earns attention, builds authority and feeds both organic and paid campaigns.",
    faqs: [
      { q: "How much does content creation cost in Pakistan?", a: "Content creation at Crea8iv Media starts from PKR 30,000/month. Packages scale with the volume of reels, posts, shoots and copywriting included each month." },
      { q: "Do you handle video shooting and editing?", a: "Yes. From concept and scripting to shooting and editing, we produce reels and short-form video designed to perform on Instagram, Facebook and TikTok." },
      { q: "How often should a business post content?", a: "Consistency beats volume. For most businesses, a planned mix of a few high-quality posts and reels per week outperforms daily random posting." },
      { q: "Can content be used for ads too?", a: "Yes. We create content that doubles as ad creative — so the same reels and posts build organic reach and fuel paid campaigns." },
    ],
  },
  "consultation": {
    eyebrow: "Consultation — Explained",
    heading: "Marketing Consultation in Rawalpindi & Islamabad",
    serviceName: "Digital Marketing Consultation",
    price: "20000",
    intro:
      "A marketing consultation is a focused strategy session where we audit your current marketing and map a clear growth plan. For Rawalpindi & Islamabad businesses, it replaces guesswork with a roadmap built around your offer, market and goals.",
    faqs: [
      { q: "What happens in a marketing consultation?", a: "We audit your current marketing, identify what's leaking budget or attention, and give you a prioritized growth roadmap — covering ads, SEO, content and automation specific to your business." },
      { q: "Is the first consultation free?", a: "Yes. We offer a free discovery call to understand your goals and see if we're a fit, then a deeper paid strategy session if you want a full roadmap." },
      { q: "Who is a consultation for?", a: "It's for business owners who are spending on marketing without clear results, or who are ready to grow but unsure where to start. You leave with a concrete plan either way." },
      { q: "Do I have to hire you after a consultation?", a: "No. The roadmap is yours to keep and execute however you like. Many clients choose to work with us, but there's no obligation." },
    ],
  },
};
