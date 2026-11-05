# Crea8iv dual-market audit and implementation plan

20 September 2026. Audit completed before application edits. Local source is the authority for the unpublished Qatar experience; production home was also read. Existing changes throughout the workspace predate this task and must be retained.

## 1. Pakistan design assessment
The established black/orange identity, robot hero, floating social icons, pill navigation, rounded CTAs, service grids and substantial portfolio remain the visual source of truth. The live homepage content confirms this architecture. The existing local export on port 3118 shows a serious regression: main hero utilities (grid, typography, spacing) are missing while Qatar styles render correctly. Investigate explicit Tailwind configuration isolation, not a hero redesign. Existing audit reports are historical evidence, not current passes.

## 2. Qatar assessment
95 existing routes (80 English, 15 Arabic according to the existing implementation register), shared Header, server-rendered catalogue, separate en-QA/ar-QA roots, reciprocal alternates and careful team attribution provide a strong foundation. Current hero uses an orange/ivory sculpture, Arial plus Georgia, an abstract headline, and Plan My Growth. Good negative space, but the market offer is insufficiently explicit. Homepage lacks the requested interactive growth journey and dedicated AI-discovery narrative. Services/industries use largely identical text/card structures. Team portfolio uses approved stills, not playable video sources.

## 3–4. Pakistan preservation and polish
Preserve robot asset/composition, logo, orange #FF6801, established typography direction, navigation, page architecture, URLs and real portfolio. Restore utility styles if build isolation is responsible. Improve reduced-motion behavior, focus/target sizes, heading wrapping and customer-facing wording. Homepage currently exposes internal implementation guidance ("SEO-safe premium image system" and instructions about preserving URLs). Replace that wording within its existing composition. Audit service, tools, industry, blog, about, contact and city templates rather than replace them.

## 5–6. Qatar keep/rebuild
Keep routes, entity facts, sources, Arabic content, form persistence contract, tracking, tools, approved media, attribution and shared navigation. Rebuild the hero, add the connected system, AI-visibility and software/acquisition storytelling, improve contextual service CTAs and industry treatment. Expand the portfolio's visual hierarchy without claiming historical corporate contracts.

## 7. Three hero concepts
1. **Growth Network (selected):** dark Qatar-inspired architectural geometry crossed by a restrained orange path; real HTML labels connect discovery, acquisition and operations. Clear offer and stable CTA.
2. Cinematic Qatar Business: approved Doha production still with discreet real service annotations. Strong local relevance but potential tourism association and image-rights dependence.
3. AI Visibility System: abstract search-to-answer-to-enquiry composition. Most technical, but less market-specific and risks looking like a fabricated software dashboard.

## 8. Recommended homepage direction
Growth Network with charcoal/black, white, brand orange and restrained warm neutrals. Large concise sans-serif heading, architectural hero art, capability strip, interactive system, AI visibility, acquisition/automation/software, team production, selected corporate work, industries, process, insights/tools, FAQs and audit CTA. No fake metrics or interface screenshots.

## 9. Motion
Content always visible in HTML. One short 600–800ms transform-only hero entrance, stable CTAs, focus/hover/tap stage selection, no autoplay stage cycling. CSS for straightforward effects; existing Motion only when necessary. GSAP available for choreography but no mandatory pinned sections or heavy scroll runtime. Reduced motion removes entrances, parallax and ambient loops. No scroll hijacking.

## 10. Imagery
Use built-in image generation for original Qatar-inspired architectural concept art; distinguish concept from actual project imagery. Inspect for wrong landmarks, text, artifacts and false location claims. Desktop/mobile responsive crops, WebP, explicit dimensions, eager hero only. Keep approved production stills. No video fabricated from stills; add playback only when approved source files exist. Store new media in public/images/qatar/{hero,services,industries,portfolio,insights,generated}. Document prompts and provenance.

## 11. Skill mapping
- ai-developer-agent: milestones, implementation and validation.
- skill-creator: concise repository-specific dual-market skill.
- imagegen: generated architectural assets and inspection.
- react-best-practices: discovered in local Vercel plugin cache; apply compatible React 18 / Next 14 rules for server components, small client boundaries and bundle discipline.
- frontend-design, ui-ux-pro-max, design-taste-frontend, gpt-taste, redesign-existing-projects: not found in installed skill roots/cache search. Do not claim use or install unverified packages. Their names are optional audit candidates, not blockers to the supplied design brief.
- Official GSAP skill not found; discovered HyperFrames GSAP reference is animation-composition specific, not official website workflow. Use installed GSAP only if justified.
- No callable shadcn/21st.dev MCP found. Existing primitives suffice.
- Next AGENTS points to bundled docs which are absent in installed Next 14.2.33. Consult versioned official Next 14 documentation instead.

## 12–13. Libraries
Use existing Next 14, React 18, TypeScript, Tailwind 3, existing icons and motion packages only as needed. Add no npm dependency. Do not add Convex, Three.js, WebGL, React Native, another UI kit, smooth-scroll engine, tracking loader or video library. Three/Lenis are already dependencies: do not import into Qatar.

## 14. Performance risks
Unoptimized Next images mean sizes alone do not produce variants: explicitly emit responsive source sets. Large global CSS, duplicated Tailwind processing, portfolio image payload, client navigation and excessive motion are primary risks. Route-isolate Qatar code. Historical first-load Qatar JS was 147kB, not a new measurement. Measure fresh local builds/resources; production LCP/CLS/INP cannot be certified from localhost or historical Lighthouse JSON.

## 15. SEO
Preserve all existing useful URLs, including /qa/services/, /qa/ai-visibility/, /qa/automation/, /qa/software/, /qa/industries/, /qa/work/, /qa/insights/, /qa/contact/. Preserve existing 188-page Pakistan baseline. Keep canonical/hreflang reciprocal only for real counterparts, research noindex, one organization identity, truthful schema and sitemap segmentation. Match visible headline and schema. No fabricated ratings, Qatar office, registration, study findings or ranking guarantees. Existing schema supports Organization, WebSite, Service, Article and BreadcrumbList. Do not invent VideoObject for still-only assets.

## 16. Accessibility
Check keyboard menu, skip links, stage controls, 44px touch targets, form labels/errors, contrast, zoom/reflow and reduced motion. Arabic needs logical spacing, appropriate line height and correctly ordered flow. Keep explanatory content usable without JavaScript. Existing contact form is lengthy; preserve backend required fields until contract validated. Honor contextual service selection. Do not submit to production during QA.

## 17. Architecture
Shared brand tokens stylesheet → independent global and Qatar roots. Existing shared Header stays. QatarHome composes server-rendered hero/media/capability/content sections and a small QatarGrowthSystem client island. QatarPage preserves catalogue content and adds route-specific visual modules. QatarContact retains durable endpoint and attribution. CSS remains route-specific. Project skill stored in docs/skills/crea8iv-dual-market/SKILL.md (portable project artifact).

## 18. Exact order
0 audit and baseline; 1 skill audit; 2 project skill; 3 shared tokens/config isolation; 4 shared focus/navigation polish; 5 Pakistan hero preservation; 6 Pakistan content/service polish; 7 mobile/motion; 8 Qatar SEO baseline; 9 selected visual concept; 10 hero; 11 homepage; 12 services; 13 AI visibility; 14 interactive automation; 15 portfolio; 16 industries; 17 Arabic; 18 media QC; 19 SEO/link/schema validation; 20 forms/CTAs; 21 resource/build performance; 22 accessibility; 23 browser/mobile QA; 24 screenshots at 375/430/768/1024/1440/1920; 25 final evidence and limitations. No deployment or commit is implied.

## 19. Likely files
frontend/src/app/globals.css; components/HeroSection.tsx/.css; HomepageBelowHero.tsx; qatar/QatarHome.tsx, QatarPage.tsx, QatarLayout.tsx, QatarContact.tsx, QatarTeamWork.tsx; new QatarGrowthSystem and visual sections; qatar CSS; data/qatar/catalogue.ts and arabic.json; new shared tokens; responsive images; focused verification scripts and documentation. Do not touch existing unrelated changes.

## 20. Assets
Generate Qatar growth-network desktop and portrait-safe hero art; supporting service/industry concept artwork only where it adds explanatory value. Keep actual team portfolio photography as evidence. Prompts should cover AI visibility, automation, content production, real estate, construction, healthcare and restaurants; do not represent generated interiors as an actual Qatar location or client.

## Audit scope and open evidence
Source inspection covers framework, both designs, components, CSS, animation, assets, SEO, Arabic, forms, CTAs, attribution, schema, sitemap/canonical/hreflang. Initial desktop screenshots captured from existing export. Full responsive, page speed, functional and visual evidence follows implementation; no unsupported pass is claimed here. Qatar official phone remains unverified: retain clearly labelled Pakistan contact fallback. Arabic editorial approval and real-user Core Web Vitals remain external checks.

Sources: local source files above; reports/qatar/IMPLEMENTATION_REPORT.md; reports/qatar/luxury/REDESIGN_REPORT.md; https://crea8ivmedia.com/ ; https://nextjs.org/docs/14/app/building-your-application/rendering/client-components . Live /qa/ could not be retrieved by the web reader; do not confuse unpublished local pages with production.
