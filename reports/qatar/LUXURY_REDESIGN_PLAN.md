# Qatar design revision — shared Crea8iv navigation, stronger visual identity

Status: implemented locally, 20 September 2026. Delivery report: `luxury/REDESIGN_REPORT.md`. The plan below records the approved direction.

## Design objective

Make Qatar feel like the premium international expression of the existing Crea8iv brand. Preserve the recognizable Pakistan navigation and brand orange. Increase visual impact through confident typography, original brand artwork, controlled contrast, larger project imagery and a more deliberate page rhythm.

The current Qatar UI has a separate two-row navigation, a text-heavy opening, a boxed process diagram and repeated equal-weight cards. These compete for attention and make different sections feel alike. The revision should establish one focal point per section and make the portfolio and business proposition immediately visible.

## 1. Use the actual shared navigation

Reuse `frontend/src/components/layout/Header.tsx`; do not recreate a lookalike Qatar header. Keep the Pakistan logo treatment, menu geometry, dropdown behavior, active states, sticky behavior and mobile drawer.

Extend it with optional market/language/link configuration. Existing Pakistan defaults must remain unchanged. The current navigation categories are Home, Qatar, Solutions, Platforms, Results, Plans, Insights and About. Keep the same recognizable categories, with a compact Pakistan/Qatar market control and English/Arabic language control. Avoid displaying Qatar twice as both a destination and an active market control when configured for Qatar.

Map Home to `/qa/`; Solutions to `/qa/services/`; Results to `/qa/work/`; Plans to `/qa/pricing/`; Insights to `/qa/insights/`; About to `/qa/about/`; contact CTAs to `/qa/contact/`. Map each service to its actual Qatar equivalent. Shared platforms and company proof retain their real global destinations and clear labels. Arabic links use real translated counterparts; English-only destinations are explicitly labeled.

Extract reusable header styles and dependencies instead of importing the entire Pakistan page stylesheet into Qatar. Preserve keyboard operation, focus restoration, escape-to-close, touch behavior and RTL alignment. Theme controls must affect the Qatar content as well as the header; otherwise configure the shared header for the supported Qatar theme rather than exposing an ineffective toggle.

## 2. A distinctive first screen

Proposed headline:

**Built to be seen. Designed to grow.**

Supporting copy:

Crea8iv connects AI visibility, creative, customer acquisition and automation for ambitious businesses in Qatar.

Primary action: **Plan My Growth**. Secondary action: **Explore Our Work**.

Use an asymmetrical editorial composition: oversized headline, tightly edited supporting copy and a large original sculptural brand visual based on Crea8iv's existing mark. Black/graphite surfaces, warm ivory typography and a concentrated orange highlight. The artwork is brand expression, not evidence of a client project or a Qatar office.

Move the four-step process diagram below the opening. Keep meaningful copy and CTAs server-rendered. Use an optimized still image on mobile; any motion is brief, subtle, reduced-motion aware and outside the critical rendering path.

## 3. Luxury through composition

- Retain Crea8iv orange; use it intentionally for actions and selected details.
- Deep charcoal, warm ivory and restrained tonal surfaces create depth without excessive glow.
- A distinctive display treatment for headlines, highly readable body type, and an Arabic type pairing with comparable weight and presence. Verify font licensing before adding assets.
- Broader whitespace, stronger section contrast, fewer visible borders and fewer identical cards.
- Use large editorial numbers and compact supporting labels only where they communicate process—not invented statistics.
- Vary the layout: full-width statement, two-column story, image-led project, compact service menu, final consultation invitation.

## 4. Homepage sequence

1. Shared navigation and bold visual hero.
2. Concise positioning statement connecting visibility, acquisition and follow-up.
3. Selected work: two or three large existing permission-cleared Crea8iv projects, accurately labeled by market and scope.
4. Four connected capabilities: AI visibility; acquisition; brand/content; websites/automation/software.
5. Qatar industry journeys: a curated set with an accessible path to all nine sectors.
6. Production capability: strong visual treatment using only cleared assets; professional experience remains distinct from company commissions.
7. Engagement process: discover, design, launch, improve.
8. Useful diagnostic tools: compact invitation rather than another oversized card wall.
9. Focused FAQs and a substantial closing consultation section.

Global proof is clearly identified as global proof. Do not fill a luxury design with invented logos, ratings, awards, office imagery, client results or counters.

## 5. Extend the visual system across the section

Services receive tailored opening copy and relevant art direction, followed by clear deliverables and process. Industry pages foreground the customer's buying journey. Work pages emphasize imagery, roles and scope. Pricing keeps a confident proposal-based presentation. Tools and forms prioritize calm readability and uncluttered interaction; no sticky CTA may cover inputs. Arabic gets deliberate composition and spacing, not merely reversed alignment.

## Delivery order

1. Refactor the shared header with backward-compatible defaults and Qatar route mapping.
2. Build the revised English homepage and the responsive/Arabic equivalent as the design reference.
3. Apply the approved-in-code visual system to the shared service, industry, article, pricing, tool and contact templates.
4. Replace placeholder design scaffolding with optimized, licensed or original assets; do not add unverified business proof.
5. Refresh the local preview, screenshots and delivery evidence. Publishing remains a separate authorized release action.

## Acceptance criteria

- The Qatar header visibly and behaviorally matches the Pakistan component.
- No accidental Pakistan service destinations in a Qatar journey; shared destinations are intentional.
- The first screen has a clear proposition, strong brand visual and two distinct actions.
- Existing 95 Qatar routes and 188 baseline HTML routes remain intact.
- English/Arabic language tags, reciprocal alternates, canonical URLs and schema remain valid.
- Dropdowns, mobile drawer, language switching and keyboard navigation work in both directions.
- Check 375, 430, 768, 1024, 1440 and 1920px, including forms/tools and light mode if retained.
- No overflow, obscured controls, fake metrics or autoplay-heavy hero.
- Build, typecheck, lint, route checks and affected form/tool regressions pass. Measure the new resource budget against the current 108 kB first-load JS estimate and justify any increase.
