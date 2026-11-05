# Crea8iv Media Visual Colour Audit and Implementation Plan

Date: 15 October 2026
Status: Planning only. No production design, content, or deployment changed.

## 1. Decision

The concern is justified: orange is repeated across backgrounds, navigation outlines, cards, icons, tags, heading accents, hover glows, and CTAs. The issue is not the brand orange itself. Too many unrelated elements share the same emphasis, making important actions compete with decoration.

Recommended direction: retain the black/charcoal identity and recognizable orange, introduce quieter neutral surfaces, use the existing green selectively, and let actual client work provide colour diversity. This is a refinement, not a rebrand. Do not assign an arbitrary new colour to every section.

## 2. Audit Coverage and Limits

Reviewed live representative templates at 1440px and 390px: homepage, website development, case-study archive, Home Studio Interiors, tools archive, and the AI-ready website article. Also inspected the homepage in light mode and the shared stylesheet. Initial desktop homepage navigation returned a browser-verification screen; it is excluded from visual conclusions. The subsequent homepage light-mode capture rendered correctly, and mobile homepage captures rendered correctly. Other inspected templates rendered their content.

This is a representative visual/code audit, not a full-site accessibility certification, analytics review, or evidence of conversion loss. Pricing, contact, location, software, Qatar, footer states, and every interactive state require the rollout QA below. The local source contains earlier uncommitted changes; they must be preserved.

## 3. Evidence and Priority

| Priority | Finding | Evidence | Proposed correction |
|---|---|---|---|
| High | Warm orange/brown atmospheric backgrounds recur across different page purposes | Homepage identity section, website-development hero, case archive, tools hero, article hero | Neutral page backgrounds; remove decorative orange washes rather than merely dimming text |
| High | Navigation, action, icons, badges, and card borders compete | Desktop archive navigation outline and CTA; six orange mobile homepage service icons; tools filter outlines | Orange primary action and selected state; neutral navigation, inactive filters, metadata and card outlines |
| High | Palette needs separate dark/light text rules | Brand orange on cream calculates at 2.77:1 | Do not use unchanged orange as small text on cream; choose tested dark text or an accessible accent-text variant |
| Medium | Reading styles differ between native and legacy pages | Website-development typography versus native case/article pages; broad font-weight override in CSS | Scope typography roles; raise body/label weight where needed without discarding the display identity |
| Medium | Existing green is available but not consistently assigned a purpose | `--brand-green: #0C5446` exists alongside orange primary and accent tokens | Green supporting panels with light text, dark green text on light surfaces; not dark green text on black |
| Medium | Hover effects repeat orange even where not meaningful | Shared `.lux-card:hover`, icon drop shadows, collage and navigation rules | Neutral elevation and crisp focus indication; selected and interactive states stay explicit |
| Medium | Colour rules are difficult to maintain | Global `!important`, raw orange RGBA values, home/portfolio local palettes, later override layers | Introduce semantic roles and migrate component families; avoid another universal override |

Relevant code: `frontend/src/app/globals.css`, including root tokens near line 29, shared card hover near 226, homepage styling near 2678, global typography near 4880, icon shadow near 4963, and final navigation/collage styles near 6060. Line numbers are approximate and may move.

## 4. Palette Roles

| Role | Proposed colour/use | Restrictions |
|---|---|---|
| Main dark canvas | Existing near-black `#080808` | No large orange radial wash behind normal content |
| Section surface | Neutral charcoal, starting candidate `#121212` | Differentiate sections with spacing, dividers, composition and imagery too |
| Raised surface | Neutral charcoal, starting candidate `#1A1A1A` | Use only for genuine cards, menus, tools and dialogs |
| Main dark-theme text | Existing cream `#FCFAEE` | Headings and important numbers, not a cream background everywhere |
| Supporting text | Starting candidate `#C7C7C7` on dark surfaces | Verify actual rendered backgrounds; do not dim paragraphs with opacity |
| Brand action | Existing orange `#FF6801` | Primary actions, selected controls and restrained identity details |
| Supporting brand colour | Existing green `#0C5446` | Selected supporting bands, light-theme text, verified success states with labels |
| Light-theme canvas | Existing cream plus clean white surfaces | Avoid turning the whole site beige; use neutral text and clear separation |
| Borders | Theme-specific neutral lines | Orange is not the default frame colour |

These are role proposals, not a measured orange percentage target. Visual review should confirm that content and the primary action are noticed before decorative accents. Do not replace every orange element with green.

### Contrast Rules

Calculated opaque palette pairs, not an automated measurement of all rendered elements:

| Pair | Ratio | Implication |
|---|---|---|
| Orange / cream | 2.77:1 | Fails normal and large-text minimums |
| White / orange | 2.90:1 | Avoid white button labels on this orange |
| Near-black / orange | 6.90:1 | Suitable starting point for primary button labels |
| Green / cream | 8.45:1 | Useful for light-theme text |
| Green / near-black | 2.26:1 | Not suitable for small dark-theme text or essential icons |

Target at least 4.5:1 for normal text and 3:1 for qualifying large text. Gradients, transparency, disabled states, focus indicators and image overlays need separate testing. Thin type can remain difficult to read even when nominal contrast passes. Reference: [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## 5. Whole-Website Treatment

| Area | Planned treatment |
|---|---|
| Header and navigation | Neutral border, neutral inactive links, clear active underline/state, single orange primary CTA; quieter theme control |
| Homepage hero | Preserve logo, robot and core imagery; remove competing warm UI glows; neutral service-chip icons and borders; preserve clear primary/secondary CTA hierarchy |
| Homepage brand/client section | Neutral gallery presentation so client logos carry their own colour; remove the broad brown/orange backdrop |
| Services | Clear text-first hierarchy, consistent stroke icons, restrained accent details; separate offer, deliverables, process and proof through layout rather than repeated orange panels |
| Results and statistics | Large neutral numbers, readable labels/date/source; green only for supported positive change; neutral for unknown/no comparison; never invent improvement |
| Process | Numbered steps and connectors with neutral text; selected/current step may use orange; no six identical glowing containers |
| Case-study archive | Quiet neutral cards and borders; preserve full uncropped screenshots, Black Petals inclusion, visual desktop scale and mobile carousel behaviour |
| Individual case studies | Neutral reading areas; original client artwork untouched; screenshots edge-to-edge without cropping; retain Home Studio grids and desktop/mobile showcase |
| Blog archive and articles | Neutral reading canvas and metadata, clear underlined links, limited callouts; existing orange artwork can remain without an additional orange page wash |
| Tools | Utilitarian controls, neutral unselected filters, orange selected filter; remove decorative glows and use labelled, factual result states |
| Pricing | Comparable neutral columns, one restrained recommended marker, readable inclusions; do not highlight every plan orange |
| Contact and consultation | Readable labels, neutral inputs, high-contrast focus and error feedback, one submit action; distinguish consultation from implementation by wording as well as style |
| Footer | Neutral navigation, lighter social icon treatment; no large orange glow behind repetitive links |
| Locations, international and Qatar | Apply shared semantic roles where appropriate, but review separate templates individually; preserve regional content and URLs |
| Software and platform pages | Use the same action/text/border roles; retain genuine product colours inside product images |

### Example Homepage Rhythm

Neutral dark hero -> neutral client-work gallery -> charcoal service band -> restrained green supporting proof band where justified -> neutral image-led case studies -> quiet editorial/FAQ area -> final orange primary CTA on a neutral surface.

This is a composition guide, not a requirement for alternating coloured panels. Page sections remain unframed; only repeated items, dialogs and genuine tools become cards.

## 6. Iconography, Type and Mobile

- Use existing Lucide icons with consistent optical size and stroke; default to readable neutral icons. Remove blanket orange icon shadows. Keep platform marks in their genuine colours.
- Keep unfamiliar icon-only actions labelled for assistive technology and provide tooltips; do not replace clear consultation CTAs with ambiguous symbols.
- Preserve the current font family initially. Test body weight around 400 and labels around 450-500 as scoped candidates; keep display styles intentional rather than enforcing one thin weight everywhere.
- Start mobile body copy at 16px with approximately 1.55-1.7 line height. Avoid tiny widely spaced uppercase explanatory text. Keep editorial lines comfortably bounded on desktop.
- Maintain at least 44px practical tap-target dimensions for key controls; spacing and focus must remain visible independently of colour.
- Mobile sticky bar: one primary orange action and a quieter secondary action. Preserve safe-area spacing, close behaviour and keyboard clearance; do not cover content.
- Preserve horizontal carousels, accessible arrow controls and full image ratios. Do not turn tall artwork into cropped thumbnails to shorten pages.
- Validate 320, 390, 768, 1024 and 1440px, 200% zoom, dark/light theme, reduced motion, keyboard focus and touch states.

## 7. Engineering Approach

1. Inventory theme sources: shared CSS, Tailwind classes, component inline styles, legacy WordPress snapshots and regional templates. Record before screenshots and route metadata.
2. Define semantic tokens for page/surface/raised background, primary/secondary text, neutral border, action background/text, accent text, success/error and focus. Keep raw brand tokens stable.
3. Separate decorative accent from action colour. Do not globally change `--primary` to green: this could unintentionally alter CTA/focus meaning across legacy templates.
4. Migrate Header, buttons, cards, badges, icons and sticky navigation first, then page families. Retire conflicting rules only after their replacement is verified.
5. Scope legacy snapshot changes. Avoid global selectors that recolour every SVG, span, heading or image. Do not recolour client logos/screenshots or apply image filters as a shortcut.
6. Introduce targeted component styles and visual regression coverage. Do not add another large `!important` override layer or do unrelated framework migration.

## 8. Phased Delivery and Acceptance

### Phase 1: Direction Approval

Produce staging-only previews for homepage desktop/mobile, one service, and one case study. Review neutral surfaces, orange density, icon treatment, type weight and CTA hierarchy together. Approve the direction before the full rollout.

### Phase 2: Shared System

Implement semantic tokens, header/navigation, action variants, borders, icon defaults and mobile sticky rules. Test both themes and legacy templates before merging.

### Phase 3: Page Families

Roll out homepage and services, case studies, blog/tools, then pricing/contact/footer and regional/software pages. Preserve existing content, links, case-study media and analytical events. Refresh screenshots after each family.

### Phase 4: QA and Controlled Release

- Pass lint, TypeScript, production build and existing schema, route and UI regression gates.
- Compare all important templates at defined viewports; test actual cards, menus, filters, forms, carousels, sticky bars and calculators.
- Verify text/non-text contrast, keyboard focus, labels, image readability, no horizontal page overflow and no content obscured by sticky controls.
- Preserve URLs, canonical tags, metadata, schema, heading hierarchy, internal links, indexability, sitemap, analytics events and contact destinations. Colour changes alone do not establish SEO or AI-ranking gains.
- Compare repeatable before/after Lighthouse runs and CSS/JS output. Do not add animation/dependencies or claim a performance improvement without measurement.
- Deploy only an approved build with a known rollback artifact. Perform live checks after cache refresh; do not equate a local preview with production completion.

## 9. Post-Release Evaluation

Compare a stable baseline and follow-up window, segmented by device and landing page: consultation/implementation CTA clicks, form completions, qualified enquiries, carousel engagement, and available field performance data. Review Clarity recordings for missed controls, repeated taps or sticky overlap where access is available. Traffic mix and seasonality can affect results; do not promise a percentage lift from a colour refresh.

Definition of done: recognizably Crea8iv, much quieter surrounding UI, distinct content hierarchy, accessible colour/state combinations, preserved client imagery, unchanged SEO structure and working conversion paths across desktop/mobile.
