# Homepage design reference and reuse guide

Owner direction recorded 2026-11-09. Source inspected at `765de4f`.

## Intent and scope

The approved homepage is the visual reference for revamping the rest of the public website, including navigation pages and subpages. A request to "revamp this page" means adapt the relevant homepage components to that page's content and purpose. It does not mean invent a fresh visual language or reproduce the entire homepage on every route.

Keep cards, buttons, colours, type, emphasis, borders, spacing, image treatment and interaction behaviour consistent. Choose the existing pattern that best explains each section. Maintain interest through relevant content, imagery and a considered sequence of existing section types, not unrelated card designs.

Work on one requested page at a time. This guide records the future direction; recording it does not initiate a site-wide redesign. The approved homepage and its hero remain unchanged. Within a requested page, adapt its hero and replace its old card presentation with suitable homepage patterns by default, unless the owner names parts to retain. Keep the underlying content, destinations and useful behaviour. Existing 3D carousel instances elsewhere remain untouched until their page is in scope.

The owner's default request is a **revamp**: improve the complete page using the established homepage system. A different design language or broader redesign is a separate instruction. Do not keep unsuitable legacy cards merely because they already exist, and do not interpret replacing their presentation as permission to delete their message.

## Content, card balance and page composition

- Start with the requested page's existing content. Do not write an unrelated replacement sales pitch. Light editing for clarity and concision is authorised as part of the revamp, but the complete message must survive: services, benefits, distinctions, qualifications, process details, facts and useful contextual links.
- If one card becomes much longer than its peers, first correct layout, spacing and responsive behaviour, then remove repetition and tighten the wording where useful. Preserve every material point. Keep comparable cards at equal heights within a row with consistent padding, image ratios and aligned actions; use grid/flex stretching and content-driven sizing instead of clipping text or setting brittle fixed heights.
- Do not equalize cards by deleting qualifications, adding filler, hiding essential text behind ellipses, reducing body text below the approved readable scale, or forcing identical heights across unrelated content types and all breakpoints.
- Reuse the actual homepage button treatments, heading/paragraph hierarchy, theme, emphasis and appropriate animations, not just its card outline. Keep a clear primary action and a quieter secondary action where useful.
- Prefer centred containers, balanced hero/section compositions and centrally aligned headings, short introductions and CTAs where suitable. Keep long paragraphs, lists, forms and detailed comparisons aligned for comfortable reading. Central alignment is a preference for the composition, not a reason to harm scanning or mobile usability.
- Adapt the requested page's hero to its actual subject and existing H1 meaning. Apply the shared language through the rest of the page: section grouping/order where helpful, whitespace, card choice, typography, relevant images and consistent actions. Do not invent a new hero style on every page.
- Aim for a professional, premium, organized and visually appealing result that makes the next step easy. Conversion is a design objective; do not claim a conversion lift without evidence. Add useful supporting details or interactions only where existing content and the page's purpose justify them, rather than adding features to fill space.

## Read the existing sources first

All paths below are relative to the repository root. Source components and their CSS remain authoritative; this guide is an index, not a second copy of their implementation.

| Reference | Source | Use and constraints |
| --- | --- | --- |
| Homepage assembly | `frontend/src/app/(global)/page.tsx`, `frontend/src/components/HomepageBelowHero.tsx` | Locate approved sections and their wrappers. Preserve the hero and protected SEO fields. |
| How buyers decide | `frontend/src/components/ui/how-it-works.tsx`, `frontend/src/components/homepage-buyer-journey.module.css`, `BuyerJourneyMotion.tsx`; `CustomerReality` in `HomepageBelowHero.tsx` | Owner-approved cinematic journey from 11 November 2026. Three supplied transparent illustrations form an open sequence with an orange connection path. The component accepts `features: { title, description }[]`. The heading remains in `CustomerReality`. |
| How it connects | `frontend/src/components/HomepageConnectedJourney.tsx`, `frontend/src/components/homepage-connected-journey.module.css` | Compact numbered cards, colourful dimensional icon images, orange rules and a connected process layout. Card markup and stage data are currently inside this section component. |
| Insights | `frontend/src/components/HomepageEditorial.tsx`, `frontend/src/components/homepage-editorial.module.css` | Reference for repeated Insights/related-reading sections, including spacing, tags, heading and link treatment. The homepage wrapper also renders `HomepageFaq`; do not accidentally duplicate FAQs elsewhere. |
| Reusable Insights card | `frontend/src/components/ui/notched-project-card.tsx`, `frontend/src/components/ui/notched-project-card.module.css` | Already separate. Import `NotchedProjectCard` for the same notched cover, circular arrow, tags, title and description. Change props, not the card design. |
| Buttons and text links | `frontend/src/components/homepage-connected-journey.module.css` (`cta`); `frontend/src/components/homepage-editorial.module.css` (`allInsights`); `.home-lux-button` / `.home-lux-link` in `frontend/src/app/globals.css` | Select the matching existing action treatment. Preserve shape, hierarchy, typography, arrow, hover and focus. `frontend/src/components/ui/Button.tsx` also exists, but its legacy token/class names alone do not establish a visual match. |
| Other relevant approved sections | `frontend/src/components/HomepageDeliveryProcess.tsx`, `HomepageFaq.tsx`, `HomepageFinalCTA.tsx`, `HomepageCreativeShowcase.tsx`, `HomepageClientStories.tsx`, `industry-showcase.module.css` | Reuse the appropriate source instead of inventing parallel FAQ, process, enquiry or evidence designs. Inspect fixed content and IDs before moving a whole section to another page. |
| Shared identity and global type | `frontend/src/styles/brand-tokens.css`, `frontend/src/app/globals.css` | Use existing tokens and the full cascade. Do not add another font or palette system. |
| Homepage surface context | `frontend/src/components/homepage-surfaces.module.css`, `homepage-background-rhythm.module.css`, `agency-body.module.css` | Component appearance also depends on parent variables and theme rules. Copying a card class without its palette context is not faithful reuse. |

## Typography to preserve

The owner restored the initial imported hero typography on 11 November 2026. The initial repository commit `3c8fce1` defines **Arial, Helvetica, sans-serif** in `PremiumHero.css`, with **600** for headings and **400** for reading copy. Use this family throughout the website. `--font-primary`, `--font-display`, `--font-accent` and `--font-body` share it. The legacy `--font-syne`, `--font-orbitron` and `--font-inter` names remain compatibility aliases.

`src/styles/site-typography.css` enforces these weights and the shared family in the first CSS layer, including headings that previously selected a serif. Keep this layer ahead of legacy overrides. Component heading sizes and responsive spacing still come from the relevant homepage pattern.

Use "How buyers decide" as the default hierarchy for new matching sections:

| Role | Existing reference |
| --- | --- |
| Section heading | Current buyer journey `.heading h2` uses 52px, weight 600 and 1.15 line-height, with 46px at 1024-1279px, 40px at 768-1023px, 32px below 768px and 28px below 360px. The legacy `how-it-works.module.css` heading remains in use on Locations. |
| Heading emphasis | Existing orange italic `<em>` and its underline treatment, where appropriate. Preserve meaning and avoid forcing this into every heading. |
| Introductory paragraph | `.lead`: 17px / 1.65 on desktop, 16px / 1.65 on mobile; reading copy uses the global 400 weight. |
| Journey step heading | `.stepTitle h3` uses 32px / 1.2, weight 600 on desktop, 26px at 1024-1279px, 30px on tablet, 27px on mobile and 25px below 360px. |
| Journey description | 16px / 1.6 on desktop, 15px at compact desktop and mobile sizes; weight 400. |
| Eyebrow, number and stage label | Retain the component's own bold weight, scale, tracking and responsive rules. Do not make paragraph text bold to imitate a heading. |

Other approved component families keep their existing hierarchy: the connected cards use 21px bold headings and 15px / 1.6 copy on desktop; the Insights card uses its existing 600-weight title and 14px / 1.65 description. Consistency does not require flattening these distinct roles to a single font size.

Global rules include `!important` typography overrides. Inspect the complete cascade, font loading and both themes when implementing a page; do not infer the rendered font or weight from a Tailwind class or a legacy variable name alone. This record is based on source inspection, not a new browser/computed-style verification.

## Colours, surfaces and cards

- Primary brand orange: `--crea8iv-orange` / `--brand-orange`, **#FF6801**. Preserve existing cream, green, dark surfaces, muted copy and focus tokens.
- The buyer journey keeps its orange artwork and typography. Its copy uses light ink on the dark canvas and dark ink on the white light-mode section.
- The buyer journey has three unframed illustrations, numbered headings and a continuous glowing path. Desktop runs horizontally and tablet/mobile below 1024px use a vertical sequence. Preserve the supplied artwork and transparent padding. Entrances and the single light pulse play once and respect reduced motion.
- Connected cards retain numbered orange badges, dimensional icon images, restrained borders/shadows, 23px radius and connecting rules. Keep their mobile layout and light-theme card contrast.
- Insights retains the existing 16:10 notched cover, 24px desktop / 20px mobile cover radius, circular action, tags and copy hierarchy. Match the `surface` prop to the surrounding section so the cutout blends correctly.
- `homepage-background-rhythm.module.css` defines the dark homepage canvas using the founder and office palette. Light mode preserves the approved green sections: client logos, creative work, industries, client project evidence, Insights and FAQs. Keep the original green **#064b3b** and a subtle horizontal gradient with matching edges between adjacent green sections. The buyer journey uses a white **#FFFFFF** background in light mode. Other light sections use the warm cream canvas. Keep corner circles and heavy glows removed. Cards and artwork retain their own surfaces.
- 3D carousel/perspective/tunnel cards are **not** default reusable patterns. This exclusion concerns the card interaction/layout, not the approved 3D-style icon artwork. Do not remove existing instances without a page-specific request.

## Existing artwork: reuse before generating

Assets are local files under `frontend/public`; use the corresponding root-relative image URL.

| Family | Directory | Available assets |
| --- | --- | --- |
| How it connects icons | `frontend/public/img/homepage/connected-journey/` | `01-discover.webp`, `02-explore.webp`, `03-trust.webp`, `04-enquire.webp`, `05-follow-through.webp` |
| Buyer illustrations currently referenced | `frontend/public/img/homepage/buyer-journey/` | `01-find-brand-v2.webp`, `02-check-brand-v2.webp`, `03-decide-brand-v2.webp` |
| Supporting service icons | `frontend/public/img/homepage/service-orbit/` | `01-strategy.webp`, `02-seo-ai.webp`, `03-websites.webp`, `04-branding.webp`, `05-paid-ads.webp`, `06-automation.webp` |

Choose an existing asset when its meaning fits the page. Reusing a relevant icon is preferable to regenerating the same concept. Use purposeful images and visual explanations wherever they help convey the page's content, rather than relying on text alone or adding decorative clutter.

When a missing concept needs new digital-marketing artwork, tell the owner what image is needed and request their reference before generation. The owner intends to supply references. Continue independent content/layout/component work while waiting; do not generate a speculative final concept or treat a temporary placeholder as approved art. Once the reference arrives, inspect it and match the approved colourful dimensional family, lighting, framing and background treatment using the image-generation workflow. Do not copy unlicensed reference material into the site; use supplied artwork directly only when appropriate for its intended use.

Do not replace the approved illustrations with generic line icons just for convenience. Functional arrows, controls and small interface symbols may continue using existing Lucide icons. Keep actual platform/product logos authentic.

No new image generation is needed merely to prepare a page or this reference guide.

## Reusable code and page-content boundary

1. Import an existing suitable component first. Keep its CSS Module and source assets as the single implementation rather than copying them into a new page.
2. For embedded patterns, extract presentation into a shared component under `frontend/src/components/ui/` (or an existing appropriate shared location) as part of the first requested page that needs it. Keep the homepage's markup, appearance and behaviour equivalent. Separate title, description, image, link, label and relevant stage/tone data into typed props or page-owned data.
3. Be explicit about present limitations: `HowItWorks` currently has three fixed stage labels, images and destinations; extra features are ignored. Changing its titles alone does not change those destinations. `HomepageConnectedJourney` currently hardcodes its five stages, heading, CTA and IDs. These are reference implementations, not already fully configurable page-neutral APIs.
4. Do not transplant homepage-only anchors, heading IDs or fixed links onto another route. Give repeated sections unique IDs and meaningful page-specific destinations while preserving appearance and SEO intent.
5. Repeated Insights sections must use `NotchedProjectCard` and the matching section treatment. Change article content, links, topics and imagery; do not design a second Insights card.
6. Do not build a large component framework or refactor every page in advance. Extract the actual repeated pattern once, preserve compatible homepage defaults, then reuse it. No new dependency is needed just to reuse these patterns.
7. Keep retrieval economical: read this index, the selected component/CSS, the target page and relevant tokens. Broaden inspection only where dependencies or findings require it. Avoid repeated image generation, duplicate CSS and whole-site rebuilds for documentation-only edits.

## Applying a future page revamp

- Identify the requested page, its existing message, metadata, links and functional interactions. Replace old card presentation with appropriate homepage patterns unless the owner names exceptions. Include its hero and lower sections in the revamp.
- Preserve URLs, metadata title/description, H1 meaning, canonicals, indexing, schema facts and useful contextual links. Light copy concision is authorised when the complete message survives; substantive factual/content changes, invented claims and metadata rewrites are outside that standing permission.
- Keep the existing homepage components and animations as the starting point. Preserve keyboard equivalents, visible focus, semantic headings and reduced-motion support; avoid gratuitous motion or extra dependencies.
- Optimize relevant images with appropriate formats, intrinsic dimensions, responsive sizes and meaningful alt text. Preserve genuine client images/logos and avoid adding large decorative assets that slow the page. Do not lazy-load the main hero image.
- Use a scoped branch and a focused diff. Do not commit, push or deploy without authorisation.
- Check the affected page and shared homepage consumers at 320px, 390px, 768px and 1440px, in relevant themes. Verify headings, paragraph readability, icons, image aspect ratios, buttons, keyboard focus, reduced motion and overflow. Do not submit production enquiries.
- Run relevant checks from `frontend/README.md`. Report any unavailable browser evidence or backend verification plainly; a passing build does not certify forms, email or bookings.

## Status of this reference

This change records the owner's design direction and maps existing reusable source/assets. It does not alter the homepage, extract embedded components yet, generate artwork, or revamp any route. Actual extraction and visual comparison belong to the first requested page implementation that needs them.

## Homepage clarity updates — 11 November 2026

- The homepage delivery process uses four compact cards with simple colourful icons and grey connectors through their centres. `HomepageProcessFlow.tsx` highlights each card, then passes a soft highlight along its connector to the next step. It pauses offscreen, while the tab is hidden, on desktop hover and through the visible pause control. Reduced motion keeps a static sequence. Desktop reads Understand → Plan → Build & Launch → Learn & Improve from left to right. Compact screens show the same complete sequence vertically. Preserve the qualification that review and refinement depend on ongoing management being included. Other service-page process variants retain their existing presentation.
- Service selection uses simple colourful icons. Paid Ads displays authentic Google Ads and Meta logos. The other choices use the existing Lucide workflow, target, search, globe and palette symbols with distinct colours. Preserve the service cards, their links, compact dialogs and existing orbit behaviour.
