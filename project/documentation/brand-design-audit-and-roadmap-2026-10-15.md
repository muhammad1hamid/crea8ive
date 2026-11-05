# Crea8iv Media: Brand Design Audit and Improvement Roadmap

Date: 2026-10-15
Status: design proposal only. No website source changes made for this audit.
Review basis: current local production export at localhost:4173, desktop/mobile screenshots, homepage composition, shared card styles, and representative page templates. This is not a claim that every URL or every interactive state has been manually audited.

## 1. Executive Diagnosis

Crea8iv has valuable real client work, a recognisable orange brand accent, full screenshot assets, working conversion paths, and useful service content. The opportunity is not another cosmetic colour pass. It is a clearer art direction and a stronger order of evidence.

The current presentation combines several competing styles: a glossy robot-led hero, orange-glow concept art, utilitarian service icons, dark bordered card grids, editorial portfolio screenshots, and quieter light-theme panels. Each can work individually; together they do not yet form one consistent marketing-agency identity.

Recommended direction: **a proof-led creative and performance agency**. Real work leads; typography establishes hierarchy; category colour helps navigation; brand orange marks decisions. Generated artwork supports explanation rather than substitutes for proof.

These are design judgments and hypotheses, not measured conversion-loss claims. No current Clarity recordings, heatmaps, or session-level data were inspected during this audit.

## 2. Findings and Remedies

| Priority | Observed issue | Why it matters | Proposed remedy |
| --- | --- | --- | --- |
| P1 | The homepage hero's large robot, glowing platform, and floating panels dominate the visual area. | The first impression communicates AI illustration more strongly than actual agency capability. | Retain the mascot as a secondary brand asset or assistant. Use real client website/social work as the primary hero visual, behind the existing HTML headline and CTAs. |
| P1 | The rendered homepage places website previews and detailed case studies after the final CTA in `src/app/(global)/page.tsx`. | Visitors encounter lengthy explanation before the strongest inspectable work. | Move a curated project-proof section directly after the hero/trust strip. Keep all existing copy and internal links in the remaining sections. |
| P1 | Eight service images share a black/orange glow treatment even though their icons now differ in colour. | Imagery still makes the page feel orange-heavy and services look interchangeable. | Create a distinct, consistent visual brief per service using actual outputs and category accents. Replacing icons alone is insufficient. |
| P1 | Multiple sections repeat bordered cards containing a label, image/icon, paragraph, tags, and arrow. | Similar visual weight weakens reading order and creates a catalogue feeling. | Reserve cards for projects and tools; use open service rows, a process diagram, an editorial founder layout, and an unframed trust strip. |
| P1 | A fixed assistant overlaps the mobile quick-action region in the sampled viewport; sticky CTAs add another fixed layer. | Useful controls and text compete for limited space. | Define shared overlay offsets and safe-area rules. Keep one dominant persistent conversion control; prevent the assistant from covering focused or actionable content. |
| P2 | The case-study archive heading consumes much of the first desktop viewport before project cards appear. | The page says it has proof before letting people inspect that proof. | Keep the exact heading text but reduce its display size, constrain line length, and tighten introductory spacing. Show useful project media earlier. |
| P2 | Full screenshots are now uncropped, but landscape and portrait previews create very different card heights. | Correct media fitting does not by itself create a composed portfolio. | Use deliberate wide/narrow project layouts on desktop and natural-ratio media on mobile. Do not force matching heights by stretching or cropping screenshots. |
| P2 | Social-grid thumbnails contain many tiny posts, making the work difficult to inspect at card size. | The existence of work is visible, but its quality and details are harder to judge. | Show a full-grid overview with an accessible enlarge view; accompany it with selected individual posts. Keep all supplied images available. |
| P2 | Small uppercase labels, pill chips, sequence numbers, and repeated micro-tags add competing detail. | Decorative metadata demands attention without always helping decisions. | Keep relevant labels in a calmer typographic style; use numbering only for actual sequences. Preserve meaningful text while simplifying its presentation. |
| P2 | Mobile repeats intro-copy plus horizontal-card patterns across several sections. | Carousels shorten vertical stacks but can hide choices and become repetitive. | Use carousels for visual galleries; use compact lists or a two-column grid for comparable service/action choices. Add position and keyboard controls where appropriate. |
| P2 | Generic metrics mix portfolio inventory and operating-system counts with commercial proof. | Different metric types can appear equally meaningful. | Preserve the figures and wording but group them clearly as capabilities/inventory versus documented client outcomes. Show source and date for outcome metrics. |
| P2 | The inspected core and legacy style files contain extensive `!important` overrides. | Later design changes can become inconsistent between templates and themes. | Migrate touched components to shared tokens and scoped variants; remove obsolete overrides incrementally after parity checks, not in a site-wide rewrite. |
| P2 | Some sampled pages show a second floating theme toggle in addition to the header control. | Duplicate controls add visual noise and inconsistent placement. | Keep one accessible theme control per viewport, retaining the same persisted preference. |
| P2 | The website-development hero uses nested blueprint/phone/score panels, including a prominent `92+` performance score without evidence visible in that sampled area. | A concept can be mistaken for measured proof, while the nested panels compete with the headline. | Replace the decorative panel stack with genuine work. Verify the score's source separately; do not silently change its wording during this design-only pass or reuse it in generated art. |
| P2 | The contact page devotes a large opening visual to a glowing support robot while the enquiry form starts lower on the page. | Decorative explanation delays the task the visitor came to complete. | Place the existing form and human contact details earlier, retaining all copy; reduce the robot to a secondary illustration or remove only its decorative artwork. |

## 3. SEO and Content Protection Contract

The design upgrade must not rewrite SEO content as a side effect.

- Freeze visible article/service copy, heading wording, facts, statistics, captions, and existing meaningful image alternatives.
- Preserve URL paths, canonical URLs, redirects, metadata, robots directives, sitemap inclusion, and internal-link destinations.
- Preserve heading semantics and their logical reading order; do not replace headings with text embedded in images.
- Reorder complete sections only where the HTML reading order remains logical. Do not use CSS-only visual reordering that conflicts with keyboard or screen-reader order.
- Do not hide important copy to make a page shorter. Improve columns, spacing, typography, and section composition instead.
- Keep supported structured data equivalent to visible facts. Add no ratings, client outcomes, or fabricated evidence.
- Capture route-level text, heading, link, and metadata inventories before changes; compare after export and investigate every difference.
- For new artwork, keep essential labels in HTML. Decorative assets use appropriate empty alternatives; meaningful new assets receive factual descriptions.

## 4. Brand and Colour System

Keep the current logo and core orange. Do not give every section an unrelated palette.

### Proposed roles

| Role | Proposed colour | Use |
| --- | --- | --- |
| Brand action | Existing orange, approximately `#FF6801` | Main conversion actions and a few recognisable brand details. |
| Dark canvas | `#101214` | Primary dark surface with restrained depth, not a continuous brown/orange wash. |
| Light canvas | `#F5F7F8` | Clean light-mode surface, without yellow/beige tint dominating the page. |
| Main ink | `#182126` / `#F3F6F7` | Light/dark text roles. |
| Secondary ink | `#526169` / `#B4BEC4` | Body and supporting information; validate against actual surfaces. |
| Category accents | Existing blue, teal, gold, pink, violet, green families | Icons, diagram nodes, small rules, and selected highlights. |

Treat hex values as proposed tokens, not already approved contrast results. Validate each foreground/background pairing, including hover, disabled, and focus states.

Design rule: a section gets one main category accent plus existing brand actions. Multiple colours belong in a meaningful multi-service diagram or authentic client artwork, not arbitrary decoration. Platform logos retain their recognisable colours; decorative service categories are not presented as official platform marks.

## 5. Typography, Spacing, and Components

- Keep existing brand typefaces initially; establish a consistent scale before considering font replacement.
- Proposed desktop sizes: hero 52-64px, section headings 32-40px, card titles 18-22px, body 16-18px.
- Proposed mobile sizes: hero 34-40px, section headings 26-30px, card titles 17-20px, body 16px. Test long words and headings at 320px.
- Use explicit breakpoint sizes, not viewport-width font scaling. Use zero letter spacing except where an existing brand asset itself requires otherwise.
- Keep body measures around 55-75 characters where layout permits. Avoid long paragraphs spanning an entire wide screen.
- Standard spacing steps: 8, 12, 16, 24, 32, 48, 64, 96px. Mobile sections generally use 40-56px vertical padding, with exceptions for actual content.
- Use a shared desktop content maximum and 20-24px mobile gutters. Edge-to-edge means media fills its intended frame, not that text touches the viewport edge.
- Use 6-8px radius for cards, one quiet border, and shadows only where elevation is meaningful. No nested decorative cards.
- Make tools identifiable by function, not a new decorative treatment for every card. Keep comparison facts aligned.
- Use one Lucide stroke style for UI icons; use actual platform marks only for platforms. Avoid tinting every arrow and paragraph.

## 6. Homepage Composition

Proposed reading order, retaining current copy and destinations:

1. Header and existing hero headline/copy/CTAs with an actual-work visual.
2. Compact client identity/trust strip.
3. Selected project proof: website, social/brand, and documented performance examples.
4. Service overview with a clear visual hierarchy rather than eight identical promotional tiles.
5. Existing premium positioning and buyer-diagnostic content in a quieter, compact layout.
6. Existing industry section with real client work as the visual anchor.
7. Connected growth process as one clear, accessible diagram, with all existing explanatory text retained.
8. Free tools presented as a useful secondary resource, not another competing main offer.
9. Existing capability metrics, founder, and location content.
10. Final consultation/implementation choices, then footer.

Do not duplicate case-study sections to achieve this. Move or compose existing components and keep all current project links reachable. The exact order should be reviewed in a wireframe before implementation.

## 7. Inner-Page Design Rules

### Services

Preserve the SEO introduction and headings. Give each service a relevant real output, a clear deliverables layout, supporting work, process, existing FAQs, and the current conversion path. Replace ornamental dashboards with actual examples or plainly illustrative diagrams.

### Case-study archive

Use a compact introduction and larger inspectable project media. Separate client work from agency-owned products through visible classification. Keep Black Petals and all existing projects accessible. Avoid adding decorative filters unless the archive has enough items to benefit.

### Individual case studies

Use a project summary, clear role/scope, dated evidence, full website screenshots, combined desktop/mobile showcase, readable metrics, and full social-grid galleries. Image enlargement must support keyboard close, Escape, focus return, and useful captions. Do not fabricate results to make the layout more impressive.

### Blog and articles

Preserve every article's text and heading structure. Improve reading measure, paragraph rhythm, table overflow, diagrams, screenshot captions, and related-content presentation. Keep any contents navigation usable without letting it dominate the article. Do not generate text-heavy infographics that merely repeat the article.

### Tools, contact, and pricing

Keep calculation and form behaviour unchanged. Make labels, inputs, outcomes, errors, and next actions clearly distinct. Reduce decorative sections near task completion. Avoid letting a global assistant or sticky CTA cover form controls or calculator results.

## 8. Visual Production Brief

Real client work should supply most portfolio imagery. Generated assets are for explanations and brand storytelling, not supposed campaign screenshots, testimonials, offices, team photos, or analytics results.

| Visual | Recommended treatment | Source and constraint |
| --- | --- | --- |
| Main hero | Composed real website, mobile view, and one social example, with clean space for the existing HTML headline. | Actual approved assets; generate only supporting environment if needed. No giant robot or illegible miniature dashboard as the main proof. |
| Website development | A real desktop/mobile website pair with sharp, readable UI. | Capture current client pages at appropriate dimensions; composite them in code/design software, not image generation that distorts the UI. |
| Branding | Logo construction, typography, colour application, and genuine touchpoints. | Use approved client identity assets. Show a coherent identity rather than floating generic logo tiles. |
| Social content | Full grid plus selected individual post/reel details. | Use supplied Venn Dental, Buildscape, Ajwad Naturals, Home Studio and other relevant work with permission and accurate client labels. |
| Google Ads | A factual acquisition journey or authenticated, redacted campaign evidence. | Blue/gold/green accents where relevant. No generated budget, lead, CPA, or ROAS figures. |
| SEO/local visibility | Website-to-search-to-local-enquiry diagram and genuine dated evidence where available. | Teal/green accents; do not illustrate a fictional ranking as a real result. |
| Automation | An understandable enquiry-to-qualification-to-team-handoff diagram. | Violet/teal nodes, semantic HTML labels. Mark conceptual flows as illustrative when not documenting a particular implementation. |
| Founder/team | Real, consistently lit photography, showing the people behind the work. | Obtain genuine photos rather than generating a team or office. |

### Generation art direction

For explanatory illustrations: restrained editorial 3D or photographed materials, clear focal subject, natural soft lighting, limited category accent, useful negative space, and an intentional composition. Exclude orange neon rings, floating robots, bokeh blobs, random platform panels, fake text, and invented analytics. Do not force every visual into the same scene.

Prepare separate desktop and mobile crops for illustrative images. Preserve intrinsic ratios for evidence screenshots. Suggested production shapes: 16:9 wide project scenes, 4:3 service illustrations, 4:5 social details. Do not crop a supplied full social-grid screenshot to force these ratios.

## 9. Mobile and Interaction Plan

- Keep the existing headline legible and the first action reachable; reduce decorative hero height rather than squeezing all content into one screen.
- Use horizontal carousels for visual portfolios, not every explanatory block. Provide a clear next-item cue and accessible controls.
- Preserve all grid images in a gallery; users can enlarge them without enduring long vertical stacks.
- Maintain at least 44px interactive targets as a project standard, with clear focus indication and separation.
- Ensure sticky controls respect device safe areas and never obscure the last content row, form validation, or active inputs.
- Use motion only to explain transitions or focus attention. Respect reduced-motion settings; avoid autoplay that moves essential content away.
- Test at 320, 390, 430, 768, 1024, and 1440px, plus one wide desktop viewport.

## 10. Implementation Phases

### Phase 1: Design baseline and approval

Capture current routes, text/metadata inventories, screenshots, and functional checks. Produce two homepage art-direction frames: real-work-led primary recommendation, and a restrained mascot-supporting alternative. Design mobile first, then desktop. Approve the hero, service layout, and one case-study composition before broad coding.

### Phase 2: Shared foundation

Implement colour roles, typography, spacing, card variants, media rules, and overlay-safe behaviour. Refactor only the components needed for the approved design. Retain existing SEO and event contracts.

### Phase 3: Homepage and visual assets

Recompose existing sections, introduce actual-work-led imagery, replace generic orange service artwork, and refine mobile choices. Keep all existing copy and project links. Test after each component group.

### Phase 4: Template rollout

Apply the approved system to archive/detail case studies, native and legacy service pages, articles, tools, contact and pricing. Do not assume a global CSS override is sufficient. Check light/dark and long-content examples for each template.

### Phase 5: Release and measurement

Compare all SEO/content inventories, export and validate routes/schema/assets, complete keyboard/mobile QA, and compare performance against the same-device baseline. Deploy only after approved review. Measure enquiry completion and useful interactions after release; do not promise ranking or conversion lifts from visual changes alone.

## 11. Release Acceptance

- No unexplained visible-copy, heading-wording, metadata, canonical, URL, or internal-link losses.
- No screenshot/grid evidence cropped, stretched, or replaced with generated proof.
- No overlap, clipped text, horizontal page overflow, or unreachable carousel item at tested widths.
- Shared components use approved tokens and variants, with scoped legacy exceptions documented.
- CTA, menu, forms, calculator, theme, media enlargement, and analytics interactions remain functional.
- Text contrast checked against final surfaces; keyboard focus visible; reduced-motion behaviour checked.
- Images have stable dimensions, correct loading priority, responsive sources, and efficient formats.
- Lab performance compared with baseline under identical conditions; investigate regressions. No current field-performance improvement is claimed.
- Review at least one complete representative page per template, not only first-viewport screenshots.

## 12. Recommended First Deliverable

Approve **one mobile homepage and one desktop homepage visual draft**, plus a real-work hero composition and one representative service visual. This resolves art direction before another whole-site restyling pass. The subsequent implementation can then follow an approved system rather than accumulating more overrides.
