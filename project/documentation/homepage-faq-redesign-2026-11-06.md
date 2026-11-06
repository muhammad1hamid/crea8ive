# Homepage FAQ — Before we begin

Implemented the approved dual-theme FAQ reference: an editorial serif heading with orange italic emphasis, generated forest-green/ivory Q/A sculpture, capsule disclosures, and an orange-accented expanded panel with a layers icon. Desktop and tablet use two columns; mobile places the introduction and artwork above the questions.

## Content and behaviour

- The six questions and answers are unchanged, now stored in `frontend/src/data/homepage-faqs.ts`.
- `HomepageEditorial.tsx` continues to export that same data for the existing homepage FAQ schema. The schema, title, description, canonical and H1 exactly match the pre-change browser snapshot.
- `HomepageFaq.tsx` contains the server-rendered introduction and artwork. `PremiumFaqAccordion.tsx` is a reusable disclosure component accepting data, a unique ID prefix and an optional default-open index.
- The current page starts with all questions closed, matching the original implementation. The reference's website/SEO question is opened in the review screenshots. Each question can still open independently.
- Native details/summary controls work with Enter, Space and JavaScript disabled. With JavaScript, `aria-expanded` tracks the actual transition state and `aria-controls` references the answer region.
- Open/close height transitions last 320ms; answers and chevrons have restrained feedback. Rapid toggles cancel and reverse the current transition. Reduced motion removes animation and finishes an in-progress disclosure transition safely.
- One-time accordion entrance effects use native browser animation APIs and an IntersectionObserver. Animations, observers and listeners are cleaned up.

## Visual choices and scope

The supplied reference is the art direction; no random direction draw or external inspiration replaces it. Established body typography is retained and Georgia supplies the requested editorial serif treatment without another font download. The orange action token remains `#FF6801`; orange text on cream uses a darker readable shade.

The approved label, curved underline, capsule borders, subtle atmospheric gradients and light-theme shadows are deliberate exceptions to the design skill's general house style. Exceptions are annotated in the relevant source lines. The focused style lint passes with zero findings. Full-page Taste inspection was not used: its page-wide creative rules are outside this single locked-section brief and its unrestricted browser does not use the repository's request restrictions. The actual homepage was instead inspected through the project's read-only browser helper at all required widths and themes.

Only the FAQ component/data, its integration in HomepageEditorial, and its exclusion from the blanket homepage dark-surface rule changed. Hero, navigation, footer, article cards, founder section, other homepage sections, page metadata and dependency manifests are unchanged.

## Generated artwork

Generated with the built-in ImageGen tool as a new transparent-background image. The actual Q/A letters are part of the decorative object; all site copy remains HTML. The final selected WebP is **900 × 600px, 84,846 bytes**, retaining transparency and intrinsic dimensions. It is lazy-loaded below the fold.

Saved asset: `frontend/public/img/homepage/faq/folded-qa.webp`.

The exact prompt, tool mode and optimization details are in [the artwork record](homepage-faq-artwork-2026-11-06.json). No stock imagery or fabricated client evidence was introduced.

## Verification

- `npm run build` passed: 275 pages generated. Existing WordPress filesystem-tracing warnings and the Tailwind configuration module-format notice remain.
- `npm run typecheck` passed.
- `npm run lint` passed with zero errors and the same four pre-existing unused-function warnings in the Howrah Shah page and header.
- `npm run verify:site-data` passed with no failures.
- Focused Taste source lint passed after documenting the reference's explicit style exceptions.
- Browser checks passed at **320, 390, 768 and 1440px in both dark and light themes**. No horizontal overflow, clipped section elements or missing artwork.
- Questions, answers, heading, initial open states, FAQ schema and other homepage section text/links match the original browser snapshot exactly.
- Enter/Space toggles, visible focus, answer-region IDs, independent disclosures, rapid clicks, theme switching and dynamic reduced-motion cancellation passed.
- JavaScript-disabled mobile disclosure interaction passed; the website/SEO answer remains readable.
- Requests were limited to local static reads; no forms or production API calls were submitted.

[Responsive QA](../../reports/homepage-faq-2026-11-06/layouts.json) · [Interaction QA](../../reports/homepage-faq-2026-11-06/interactions.json)

[Desktop dark](../../reports/homepage-faq-2026-11-06/desktop-dark.png) · [Desktop light](../../reports/homepage-faq-2026-11-06/desktop-light.png) · [Mobile dark](../../reports/homepage-faq-2026-11-06/mobile-dark.png) · [Mobile light](../../reports/homepage-faq-2026-11-06/mobile-light.png)

## Visual review

ROUND 1

Seen in one second: a warm editorial FAQ, with the Q/A object anchoring the introduction.

Idea (one sentence): the conversation's questions and answers become a folded-paper object beside the actual disclosures.

Live thing: readable native FAQ disclosures with smooth enhancement.

Layout words by section: FAQ=editorial introduction / sculptural artwork / capsule disclosure stack.

Scores: design 7.5 · usability 8 · creativity 7 · content 10 → overall 7.9.

Caps applied: general house-style bans are superseded by the user's locked reference; original long copy is preserved.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. The global font rule makes questions too light on desktop; explicitly scope the question weight.
2. The keyboard ring crosses the expanded panel as a rectangle; move focus indication to the rounded disclosure container.
3. Mobile answers have too much left indentation; give answer copy the panel's full reading width below the question/icon.

ROUND 2

Seen in one second: bold readable questions, a clear open state, and consistent cream/forest-green artwork.

Idea (one sentence): the same folded-paper conversation anchors both theme versions.

Live thing: independently accessible native disclosures, enhanced with reversible height animation.

Layout words by section: FAQ=two columns on desktop/tablet / stacked intro, artwork and questions on mobile.

Scores: design 8 · usability 8.5 · creativity 7 · content 10 → overall 8.2.

Caps applied: the same explicit reference exceptions; narrow screens allow the unchanged heading and longer questions to wrap.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. No unresolved layout or interaction defect found in the final eight viewport/theme captures.
2. At 320px the longest questions span several lines; all text remains visible and touch targets grow naturally.
3. The original all-closed default differs from the open mockup example, intentionally following the prompt's default-state preservation rule.

The update is locally verified and prepared for GitHub; this report does not assert a production deployment.
