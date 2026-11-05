#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(root, "project", "documentation", "blog-drafts");
const backgroundsDir = path.join(root, "project", "design-assets", "blog-thumbnail-backgrounds", "calendar-backlog-2026-09-24");
const uploadDir = path.join(root, "frontend", "public", "wp-content", "uploads", "2026", "09");
const cwebp = "/opt/homebrew/bin/cwebp";

fs.mkdirSync(draftsDir, { recursive: true });
fs.mkdirSync(backgroundsDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

const generatedDir = "/Users/mac/.codex/generated_images/01a0d238-ba29-7343-a5b4-6efece700d5f";

const posts = [
  {
    date: "2026-09-16",
    time: "12:00",
    title: "Modern Business Website Checklist",
    slug: "modern-business-website-checklist",
    keyword: "modern business website checklist",
    secondaries: ["business website checklist", "modern website requirements", "website launch checklist", "small business website checklist", "website redesign checklist"],
    intent: "Informational and commercial investigation",
    aiIntent: "Business owners want a practical checklist for judging whether their website is trustworthy, fast, useful, and ready to generate leads.",
    audience: "Founders, marketing managers, service businesses, ecommerce teams, and local companies planning a new website or redesign.",
    metaTitle: "Modern Business Website Checklist: 2026 Essentials",
    metaDescription: "Use this modern business website checklist to audit strategy, UX, content, SEO, speed, trust, conversion paths, and analytics before launch.",
    excerpt: "A modern business website needs more than a polished first screen. Use this checklist to audit strategy, UX, SEO, trust, performance, analytics, and conversion readiness.",
    coverAlt: "Business owner and strategist reviewing a modern website readiness checklist in a premium studio.",
    imagePrompt: "A hyper-realistic editorial scene for a modern business website checklist: business owner and web strategist reviewing wireframes, devices, and a checklist in a charcoal studio; no readable text.",
    background: "exec-7b61011e-fd01-4528-bd58-402d429e06fe.png",
    summary: "A modern business website is a sales, trust, and service system. It should explain the offer, answer buyer questions, work beautifully on mobile, load quickly, prove credibility, and measure the actions that matter.",
    sections: [
      ["Strategy before design", ["Define one primary business goal for each key page.", "Name the audience and the problem they are trying to solve.", "Map the next step visitors should take after reading.", "Remove pages that exist only because an old menu had space for them."]],
      ["First-screen clarity", ["Make the headline specific enough that a new visitor knows the offer in five seconds.", "Use a supporting sentence to name who it is for, what outcome they get, and what makes the offer credible.", "Keep the primary action visible without making every button compete.", "Show a proof cue near the first action when the decision carries risk."]],
      ["Content and proof", ["Explain deliverables, process, timelines, service area, and common objections.", "Use case studies, testimonials, photos, credentials, and policies where they reduce risk.", "Avoid claims such as best, premium, and world-class unless the page explains why.", "Keep content updated so dates, team details, prices, and examples do not undermine trust."]],
      ["UX and conversion path", ["Make navigation match customer intent instead of internal departments.", "Give every major page one clear primary CTA and useful secondary paths.", "Test contact, WhatsApp, booking, quote, and checkout flows on real phones.", "Make forms shorter at the first enquiry stage and ask for deeper detail later."]],
      ["SEO and AI search readiness", ["Use descriptive titles, headings, internal links, and schema where the page supports it.", "Add concise answer blocks for questions customers ask before buying.", "Write definitions and comparisons that can be cited without the whole page as context.", "Connect the page to related services and guides so topical authority is visible."]],
      ["Technical quality", ["Optimize images, fonts, scripts, caching, and layout stability.", "Check Core Web Vitals on important templates, not only the homepage.", "Use accessible contrast, labels, focus states, and touch targets.", "Track conversions, events, source quality, and forms so decisions are based on evidence."]],
    ],
    checklist: ["Clear offer above the fold", "Mobile-first layout", "Fast image delivery", "Useful internal links", "Credible proof", "Accessible forms", "Conversion tracking", "Search-friendly headings", "Schema where relevant", "Recent content review"],
    faqs: [
      ["What should every business website include?", "Every business website should include a clear offer, useful service or product pages, visible contact paths, proof, mobile-friendly design, fast loading, analytics, privacy details, and content that answers real buyer questions."],
      ["How often should a business website be reviewed?", "Review conversion paths and analytics monthly, content quarterly, and technical performance after every major design, plugin, tracking, or hosting change."],
      ["Is a modern design enough?", "No. A modern visual style can help, but the site also needs clear positioning, useful content, trust signals, speed, accessibility, SEO, and measurement."],
      ["What is the biggest website checklist mistake?", "The biggest mistake is checking visual polish while ignoring the buying journey. If visitors cannot understand the offer and take the next step easily, the design is not doing its job."],
    ],
  },
  {
    date: "2026-09-18",
    time: "12:00",
    title: "Core Web Vitals Guide",
    slug: "core-web-vitals-guide",
    keyword: "Core Web Vitals guide",
    secondaries: ["Core Web Vitals optimization", "LCP INP CLS", "website performance SEO", "page experience signals", "technical SEO performance"],
    intent: "Informational and technical investigation",
    aiIntent: "Business owners and marketers want a plain-English explanation of Core Web Vitals, what they affect, and how to prioritize fixes.",
    audience: "Website owners, marketers, SEO teams, developers, and agencies responsible for performance, rankings, UX, and conversion quality.",
    metaTitle: "Core Web Vitals Guide: LCP, INP, CLS and Fixes",
    metaDescription: "A practical Core Web Vitals guide covering LCP, INP, CLS, field data, lab tests, business impact, and prioritized performance fixes.",
    excerpt: "Core Web Vitals measure how quickly a page loads, responds, and stays stable. Learn what each metric means and how to prioritize fixes that affect users.",
    coverAlt: "Web strategist reviewing Core Web Vitals performance dashboards in a premium dark studio.",
    imagePrompt: "A hyper-realistic Core Web Vitals performance dashboard scene in a charcoal studio; abstract gauges and blurred non-readable UI, restrained orange accents.",
    background: "call_XPyS0hJpt0XsFpMgH1kcHjlk.png",
    summary: "Core Web Vitals are not just technical scores. They are signals that describe loading speed, responsiveness, and visual stability during the moments when a visitor decides whether to keep engaging.",
    sections: [
      ["What Core Web Vitals measure", ["Largest Contentful Paint measures how quickly the main content becomes useful.", "Interaction to Next Paint measures how quickly the page responds after a user action.", "Cumulative Layout Shift measures unexpected movement that makes the page feel unstable.", "Together, they describe whether a page feels ready, responsive, and dependable."]],
      ["Why they matter commercially", ["Slow and unstable pages waste paid traffic and organic visibility.", "Performance problems are felt most by mobile users, lower-end devices, and visitors on weaker connections.", "A page can look impressive in a design file and still feel heavy in a real buying moment.", "Fixing performance often improves trust, lead quality, and completion rates."]],
      ["Field data vs lab tests", ["Field data shows how real users experience the site across devices and networks.", "Lab tools help diagnose issues in a repeatable environment.", "Use both: field data for reality, lab data for debugging.", "Do not chase perfect scores on pages that do not matter to the business."]],
      ["LCP fixes", ["Serve the hero image in the right size and format.", "Reduce server response time and blocking scripts.", "Preload important above-the-fold assets carefully.", "Avoid making a giant video, slider, or third-party widget the main content."]],
      ["INP fixes", ["Reduce heavy JavaScript and long main-thread tasks.", "Delay nonessential third-party scripts.", "Keep menus, filters, forms, and checkout interactions light.", "Test real interactions instead of only first load."]],
      ["CLS fixes", ["Reserve dimensions for images, embeds, ads, and dynamic blocks.", "Avoid injecting banners above existing content after load.", "Use stable font loading strategies.", "Check mobile layouts where sticky bars and late content can shift the page."]],
    ],
    checklist: ["Review CrUX or field data", "Test page templates separately", "Optimize hero assets", "Audit third-party scripts", "Reduce unused JavaScript", "Reserve media dimensions", "Compress fonts", "Check mobile interactions", "Measure before and after fixes", "Tie metrics to conversions"],
    faqs: [
      ["Are Core Web Vitals a ranking factor?", "Core Web Vitals are part of Google's page experience signals. They are not the only ranking factor, but they matter because they affect user experience and can influence performance in competitive search results."],
      ["What are good Core Web Vitals scores?", "Good thresholds are LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1 for most real-user visits."],
      ["Should I optimize the homepage first?", "Start with the pages that affect revenue or search visibility most: landing pages, service pages, product pages, article templates, forms, and checkout or booking paths."],
      ["Can plugins hurt Core Web Vitals?", "Yes. Sliders, chat widgets, tracking scripts, page builders, review widgets, and unused plugin assets can slow loading, delay interaction, or shift layout."],
    ],
  },
  {
    date: "2026-09-21",
    time: "12:00",
    title: "Mobile First Website Design",
    slug: "mobile-first-website-design",
    keyword: "mobile first website design",
    secondaries: ["mobile-first design", "responsive web design", "mobile UX", "mobile website best practices", "mobile-first SEO"],
    intent: "Informational and commercial investigation",
    aiIntent: "Business owners want to understand why mobile-first design matters and what practical decisions make a website work better on phones.",
    audience: "Service businesses, ecommerce teams, local brands, marketers, founders, and designers planning a website redesign.",
    metaTitle: "Mobile First Website Design: Practical 2026 Guide",
    metaDescription: "Learn mobile-first website design principles for layout, speed, navigation, content, forms, SEO, accessibility, and conversion paths.",
    excerpt: "Mobile-first website design starts with the smallest, most common buying context and builds upward. Use this guide to make mobile journeys clearer, faster, and easier to complete.",
    coverAlt: "UX strategist reviewing mobile-first website layouts across phone, tablet, and laptop screens.",
    imagePrompt: "A premium mobile-first website design studio scene with phones, tablets, wireframes, no readable text, and restrained orange accents.",
    background: "call_eu2g8rGTnAKk4DGiMbpMmu4Q.png",
    summary: "Mobile-first website design means designing around the real constraints of phone users first: limited space, touch input, changing attention, slower connections, and a need for quick confidence.",
    sections: [
      ["What mobile-first really means", ["Mobile-first is not shrinking a desktop page.", "It means deciding what matters most when space, time, and attention are limited.", "The mobile layout should carry the core argument, not a reduced version of it.", "Desktop can then expand the experience with comparison tables, supporting proof, and richer layouts."]],
      ["Buyer behavior on phones", ["Mobile visitors often compare options quickly and return later.", "They may need directions, WhatsApp, booking, pricing, reviews, or proof more urgently than a long brand story.", "They use thumbs, not a mouse, so tap targets and spacing matter.", "Small delays or confusing form steps feel bigger on mobile."]],
      ["Mobile navigation", ["Use plain labels and keep the menu short.", "Put important actions near the thumb path without hiding content.", "Avoid menus that open several nested levels before showing useful pages.", "Make phone, WhatsApp, booking, and contact options easy to find."]],
      ["Content hierarchy", ["Lead with the outcome and audience.", "Break long explanations into scannable sections.", "Put proof near claims instead of burying it far below.", "Use accordions carefully; hiding every detail can make comparison harder."]],
      ["Forms and conversion paths", ["Ask only for information needed to respond to the first enquiry.", "Use correct keyboard types for phone, email, date, and number fields.", "Keep labels visible and error messages specific.", "Confirm what happens after submission and test the message delivery."]],
      ["SEO, speed, and accessibility", ["Google primarily evaluates mobile versions for indexing.", "Compress mobile images and avoid loading desktop-heavy assets.", "Use readable font sizes and accessible contrast.", "Check Core Web Vitals, structured data, and internal links on mobile templates."]],
    ],
    checklist: ["Five-second mobile offer test", "Thumb-friendly CTAs", "Short menu labels", "Readable text without zooming", "Fast hero image", "Visible proof", "Simple forms", "No content-blocking popups", "Accessible contrast", "Mobile analytics events"],
    faqs: [
      ["Is responsive design the same as mobile-first design?", "Responsive design adapts layouts across screen sizes. Mobile-first design starts with the mobile user's priorities and then expands for larger screens."],
      ["Why does mobile-first design help SEO?", "Mobile-first design helps SEO because Google primarily indexes the mobile version of a page, and mobile usability affects engagement, crawl clarity, and page experience."],
      ["What should appear first on a mobile homepage?", "The first mobile screen should make the offer, audience, value, and next step clear without requiring the visitor to open the menu or scroll through decorative content."],
      ["Should mobile pages be shorter?", "Not necessarily. They should be better organized. A mobile page can be long if sections are clear, fast, readable, and useful."],
    ],
  },
  {
    date: "2026-09-23",
    time: "12:00",
    title: "Website Speed Optimization",
    slug: "website-speed-optimization",
    keyword: "website speed optimization",
    secondaries: ["improve website speed", "website performance optimization", "speed up business website", "technical SEO speed", "page speed optimization"],
    intent: "Informational and problem-solving",
    aiIntent: "Business owners and marketers want a practical way to make a slow site faster without guessing or breaking the design.",
    audience: "Website owners, marketers, developers, ecommerce teams, local businesses, and agencies responsible for leads, rankings, and user experience.",
    metaTitle: "Website Speed Optimization: Practical Fixes That Matter",
    metaDescription: "A practical website speed optimization guide covering images, hosting, JavaScript, fonts, caching, Core Web Vitals, and conversion impact.",
    excerpt: "Website speed optimization is not about chasing a vanity score. It is about making key pages feel ready, responsive, and stable for the people most likely to buy.",
    coverAlt: "Web performance specialist optimizing website speed assets and performance dashboards in a premium dark studio.",
    imagePrompt: "A hyper-realistic website speed optimization scene with performance dashboards, compressed image workflow, and premium dark studio lighting.",
    background: "call_DkI5wkvR7renTlXaWf6wjwxR.png",
    summary: "Website speed optimization is the discipline of reducing friction between a visitor's intent and the page's usefulness. The best fixes focus on real templates, real devices, and real business actions.",
    sections: [
      ["Start with business-critical pages", ["Do not begin by optimizing every page equally.", "Identify the pages tied to paid campaigns, organic entry, booking, checkout, lead forms, and high-value services.", "Measure those templates first so the work improves revenue paths, not only lab scores.", "A slow article may be less urgent than a slow quote form that receives paid traffic."]],
      ["Images and media", ["Large images are one of the most common speed problems.", "Use modern formats, correct dimensions, compression, lazy loading below the fold, and sensible thumbnails.", "Avoid full-screen video backgrounds unless they are proven to improve conversion.", "Always check whether the largest visible element is heavier than it needs to be."]],
      ["JavaScript and third-party scripts", ["Tracking, chat, heatmaps, review widgets, ads, and page builders can all compete for the browser's attention.", "Remove scripts nobody uses.", "Delay nonessential scripts until after the first useful render.", "Keep interactive components light so menus, forms, filters, and carts respond quickly."]],
      ["Fonts and visual stability", ["Too many font families, weights, and late-loading files can slow rendering.", "Use fewer weights and preload only what is truly needed above the fold.", "Reserve image, embed, and ad dimensions so the layout does not jump.", "A stable page feels more professional and reduces misclicks."]],
      ["Hosting, caching, and delivery", ["Server response time shapes everything that follows.", "Use reliable hosting, CDN delivery where appropriate, page caching, asset caching, and clean redirects.", "Audit plugins and backend calls on CMS sites.", "For static or headless sites, confirm that deployment sends the current asset bundle with the HTML."]],
      ["Measure, fix, retest", ["Use field data for real user impact and lab tools for diagnosis.", "Change one cluster at a time so results are explainable.", "Track conversion events alongside speed improvements.", "Document what changed so future design or tracking work does not reintroduce the same problem."]],
    ],
    checklist: ["Prioritize revenue pages", "Compress hero images", "Serve WebP or AVIF", "Remove unused scripts", "Delay noncritical tags", "Optimize fonts", "Use caching", "Check mobile devices", "Retest Core Web Vitals", "Monitor after deployment"],
    faqs: [
      ["What is website speed optimization?", "Website speed optimization is the process of making pages load, respond, and remain stable faster by improving assets, code, hosting, caching, and user-facing templates."],
      ["What usually slows a website down?", "Common causes include oversized images, heavy JavaScript, too many third-party scripts, slow hosting, page builders, unoptimized fonts, render-blocking resources, and unstable embedded content."],
      ["Does page speed affect conversions?", "Yes. Slow or unstable pages interrupt trust and momentum, especially on mobile and paid traffic journeys where visitors compare options quickly."],
      ["Should I chase a perfect PageSpeed score?", "No. Use speed tools to diagnose problems, but prioritize improvements that make important pages faster and easier for real users to complete."],
    ],
  },
];

function quoteYaml(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function frontmatter(post) {
  const cover = `/wp-content/uploads/2026/09/${post.slug}-blog-thumbnail.webp`;
  return `---\ntitle: ${quoteYaml(post.title)}\nslug: ${quoteYaml(post.slug)}\npublish_date: "${post.date} ${post.time} PKT"\ncategory: "Web Development"\nprimary_keyword: ${quoteYaml(post.keyword)}\nsecondary_keywords:\n${post.secondaries.map((item) => `  - ${quoteYaml(item)}`).join("\n")}\nsearch_intent: ${quoteYaml(post.intent)}\nai_search_intent: ${quoteYaml(post.aiIntent)}\ntarget_audience: ${quoteYaml(post.audience)}\nsuggested_url: "https://crea8ivmedia.com/blog/${post.slug}/"\nmeta_title: ${quoteYaml(post.metaTitle)}\nmeta_description: ${quoteYaml(post.metaDescription)}\nog_title: ${quoteYaml(post.title)}\nog_description: ${quoteYaml(post.excerpt)}\ntwitter_title: ${quoteYaml(post.title)}\ntwitter_description: ${quoteYaml(post.excerpt)}\nschema_recommendations:\n  - "BlogPosting"\n  - "BreadcrumbList"\n  - "FAQPage when the visible FAQ is included"\ninternal_links:\n  - "/website-development/"\n  - "/contact/"\n  - "/blog/website-mistakes-that-kill-sales/"\n  - "/blog/custom-website-vs-wordpress/"\n  - "/blog/website-vs-landing-page/"\nexternal_references:\n  - "https://web.dev/vitals/"\n  - "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"\n  - "https://www.w3.org/WAI/WCAG22/quickref/"\n  - "https://developers.google.com/search/docs/appearance/structured-data/article"\nsuggested_cta: "Request a website strategy, performance, and conversion audit from CREA8IV MEDIA."\nfeatured_image_concept: ${quoteYaml(post.imagePrompt)}\nimage_prompt: ${quoteYaml(post.imagePrompt)}\ncover_image_url: "${cover}"\ncover_alt: ${quoteYaml(post.coverAlt)}\nimage_alt_text: ${quoteYaml(post.coverAlt)}\nexcerpt: ${quoteYaml(post.excerpt)}\nlinkedin_summary: ${quoteYaml(`${post.title} gives business owners a practical way to audit the website decisions that affect trust, speed, search visibility, and enquiries.`)}\nmedium_summary: ${quoteYaml(`A detailed practical guide for ${post.keyword}, with checklists, examples, technical considerations, and buyer-focused advice.`)}\ntwitter_thread_summary:\n  - ${quoteYaml(`${post.title} is not just a design topic; it affects trust and conversion.`)}\n  - ${quoteYaml("Start with real user intent, not internal preferences.")}\n  - ${quoteYaml("Fix the paths that affect enquiries, bookings, purchases, and organic visibility.")}\n  - ${quoteYaml("Measure the result before layering on more traffic.")}\nquora_answer_idea: ${quoteYaml(`What should businesses know about ${post.keyword}?`)}\nreddit_discussion_idea: ${quoteYaml(`Which ${post.keyword} fix actually improved your website results?`)}\nthreads_summary: ${quoteYaml(`${post.title}: a practical checklist for building pages that feel useful, fast, credible, and ready to convert.`)}\n---\n`;
}

function paragraphFor(post, sectionTitle, point, index) {
  const why = [
    "This matters because visitors make quick judgements from incomplete information. If the page does not answer the next obvious question, they create their own answer or leave.",
    "For a business website, this is not a cosmetic detail. It changes how much effort a buyer must spend before they feel confident enough to enquire, book, or buy.",
    "The practical test is simple: a person outside the company should understand the page without a sales call, a second tab, or a patient explanation from the team.",
    "A useful website makes the next step feel natural. It does not force people to decode jargon, wait for heavy assets, or guess whether the company can help.",
  ][index % 4];
  return `${point} ${why} In CREA8IV MEDIA audits, this is the kind of detail that separates a good-looking website from a commercially useful one. Treat "${sectionTitle.toLowerCase()}" as a working part of the customer journey, then check it on the pages that receive real traffic.`;
}

function article(post) {
  const toc = post.sections.map(([title], index) => `${index + 1}. ${title}`).join("\n");
  const sections = post.sections
    .map(([title, points]) => {
      const body = points.map((point, index) => paragraphFor(post, title, point, index)).join("\n\n");
      const list = points.map((point) => `- ${point}`).join("\n");
      return `## ${title}\n\n${body}\n\n### Practical checks\n\n${list}`;
    })
    .join("\n\n");
  const tableRows = post.sections
    .map(([title, points]) => `| ${title} | ${points[0]} | Check one live page and one mobile path before changing design details. |`)
    .join("\n");
  const checklist = post.checklist.map((item) => `- ${item}`).join("\n");
  const faqs = post.faqs.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n");
  const deepDive = post.sections
    .map(([title, points]) => {
      return `### ${title}: expert notes\n\nA mature website process does not treat ${title.toLowerCase()} as a one-time launch box. It treats it as a recurring quality signal. Before launch, document the decision. After launch, check analytics, form behaviour, search queries, and customer questions to see whether the decision still holds. If visitors repeatedly ask for information that the page should answer, the page is under-explaining. If visitors begin the path but do not finish it, the path is asking too much too soon.\n\nThe strongest version of this work is specific. Name the page, device, action, expected result, and owner. A vague task such as \"improve mobile\" is hard to verify. A concrete task such as \"make the service-page phone CTA visible after the proof block and track taps as a conversion\" can be tested. That is how website improvements become operational instead of decorative.\n\nUse the checklist below each time ${points[0].charAt(0).toLowerCase()}${points[0].slice(1)} comes up in planning. It keeps the conversation grounded in user value, commercial value, and technical reality at the same time.`;
    })
    .join("\n\n");

  return `# ${post.title}\n\n## Opening Hook\n\nA business website can look polished and still fail at the exact moment a serious buyer needs help. ${post.summary} The issue is rarely one dramatic mistake. It is usually a chain of small decisions: a vague headline, a heavy image, a hidden contact path, an unstable layout, or a missing piece of proof.\n\n## Introduction\n\n${post.title} is a practical topic because the website is often the first sales conversation a customer has with a company. A visitor arrives with a question, a worry, a comparison, or a deadline. The page either reduces that uncertainty or adds to it. For CREA8IV MEDIA clients, the most useful website improvements usually combine strategy, content, UX, technical performance, and measurement. One discipline alone rarely solves the whole journey.\n\nThis guide is written for business owners and marketing teams who want decisions they can use. It explains what to check, why it matters, how to spot weak points, and how to prioritize fixes. It is also structured for AI search and answer engines: concise definitions, practical tables, checklist language, and direct answers that can stand alone.\n\n## Table of Contents\n\n${toc}\n${post.sections.length + 1}. Comparison table\n${post.sections.length + 2}. Implementation checklist\n${post.sections.length + 3}. FAQ\n${post.sections.length + 4}. Conclusion\n\n## Direct Answer\n\n${post.summary} If you remember one thing, remember this: the best website decision is the one that makes a qualified visitor's next step easier to understand, easier to trust, and easier to complete.\n\n${sections}\n\n## Comparison Table\n\n| Area | What good looks like | How to verify |\n|---|---|---|\n${tableRows}\n\n## Implementation Checklist\n\nUse this checklist before launch, after a redesign, or when a page receives traffic but does not produce enough enquiries.\n\n${checklist}\n\n## Common Mistakes To Avoid\n\nDo not treat this work as a one-time design review. The site will change as campaigns, tracking scripts, services, pricing, seasonal offers, and customer expectations change. Every new script, image, form, or content block can improve the page or slow it down.\n\nDo not judge the experience only from a large desktop monitor. Review the same path on a phone, on a real connection, with the same level of patience a new customer would have. The most honest audit is often done away from the design tool.\n\nDo not separate SEO from user experience. Search systems increasingly reward pages that are clear, useful, technically accessible, and semantically well connected. A page that answers real questions in a structured way is better for users, Google, and AI answer engines.\n\n${deepDive}\n\n## FAQ\n\n${faqs}\n\n## Conclusion\n\n${post.title} is ultimately about reducing friction. The goal is not to decorate a website with more effects, plugins, or copy. The goal is to help the right visitor understand the offer, trust the business, and take the next step without confusion.\n\nIf your website gets traffic but does not produce the enquiries or sales it should, start with the checklist above. Pick the pages closest to revenue, check them on mobile, measure what happens, and fix the issues that make buyers hesitate. CREA8IV MEDIA can help with a focused audit, redesign, or full website build when you want the strategy, content, design, development, SEO, and measurement handled together.\n\n## Suggested CTA\n\nRequest a website strategy and performance audit from CREA8IV MEDIA.\n`;
}

function createDraft(post) {
  const filePath = path.join(draftsDir, `${post.date}-${post.slug}.md`);
  fs.writeFileSync(filePath, `${frontmatter(post)}\n${article(post)}`);
  return filePath;
}

function fontSizeFor(title) {
  if (title.length <= 24) return 68;
  if (title.length <= 34) return 60;
  return 54;
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function renderThumbnails() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  for (const post of posts) {
    const source = path.join(generatedDir, post.background);
    const backgroundPath = path.join(backgroundsDir, `${post.slug}.png`);
    const outWebp = path.join(uploadDir, `${post.slug}-blog-thumbnail.webp`);
    fs.copyFileSync(source, backgroundPath);
    const image = fs.readFileSync(backgroundPath).toString("base64");
    const titleSize = fontSizeFor(post.title);
    const html = `<!doctype html><html><head><style>
      *{box-sizing:border-box}body{margin:0;width:1280px;height:720px;overflow:hidden;background:#050505;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Arial,sans-serif}
      .frame{position:relative;width:1280px;height:720px}
      img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.86) 0%,rgba(0,0,0,.70) 28%,rgba(0,0,0,.18) 62%,rgba(0,0,0,.04) 100%),linear-gradient(180deg,rgba(0,0,0,.16) 0%,rgba(0,0,0,0) 48%,rgba(0,0,0,.28) 100%)}
      .copy{position:absolute;left:70px;bottom:74px;width:620px}
      .kicker{display:inline-flex;padding:10px 16px;border:1px solid rgba(252,106,3,.52);background:rgba(252,106,3,.14);border-radius:999px;color:#fff1e6;font-size:22px;font-weight:700;letter-spacing:0;text-shadow:0 3px 16px rgba(0,0,0,.55)}
      h1{margin:24px 0 0;color:#fff;font-size:${titleSize}px;line-height:1.02;font-weight:650;letter-spacing:0;text-wrap:balance;text-shadow:0 8px 34px rgba(0,0,0,.78),0 2px 2px rgba(0,0,0,.42)}
      .rule{width:104px;height:4px;margin-top:26px;border-radius:999px;background:linear-gradient(90deg,#FC6A03,rgba(255,255,255,.82));box-shadow:0 0 20px rgba(252,106,3,.48)}
    </style></head><body><main class="frame"><img src="data:image/png;base64,${image}" alt=""><div class="shade"></div><section class="copy"><div class="kicker">Website Growth</div><h1>${escapeHtml(post.title)}</h1><div class="rule"></div></section></main></body></html>`;
    await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 0 });
    const tmpPng = path.join("/private/tmp", `${post.slug}-thumbnail.png`);
    await page.screenshot({ path: tmpPng, type: "png" });
    execFileSync(cwebp, ["-quiet", "-q", "86", tmpPng, "-o", outWebp]);
    console.log(`${post.slug} -> ${outWebp}`);
  }

  await browser.close();
}

const draftPaths = posts.map(createDraft);
await renderThumbnails();

for (const draftPath of draftPaths) {
  const words = fs
    .readFileSync(draftPath, "utf8")
    .replace(/^---[\s\S]*?---/m, "")
    .split(/\s+/)
    .filter(Boolean).length;
  console.log(`${path.basename(draftPath)} words=${words}`);
}
