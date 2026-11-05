# Existing Website Audit

Audit date: 21 October 2026. This is the first controlled enhancement batch, not completion of the entire master brief.

Update: the subsequent approved sitewide design pass is implemented locally. See `FULL_DESIGN_REFINEMENT.md` for the current design status, 28-template coverage and remaining non-design limitations. The initial findings below are retained as baseline history, not current unresolved design defects.

## Baseline And Scope

- Next.js 16.4, React 19, TypeScript, CSS Modules, Tailwind, legacy global/WordPress styling and an existing static/PHP production deployment. Keep the stack and routes.
- Source inspected: site chrome, homepage sections, brand tokens, case-study systems, image viewer and project carousel. The local static export provides the reproducible rendered baseline; it is not a new production crawl.
- 239 sitemap entries inventoried. Every entry had a title, description, canonical and one H1. Existing JSON-LD parsed successfully. Syntax validation is not Google rich-result eligibility.
- 45 viewport checks across 13 routes; homepage at all nine requested widths. No document overflow, missing loaded images, sub-24px visible buttons or page errors observed in this sample. Lazy images outside the viewport are not fully covered by that check.
- Search Console, GA4, Bing data and field CWV: unavailable. No ranking, traffic, citation or conversion uplift asserted. No complete automated WCAG certification or end-to-end submission test performed.

## Verified Findings

| Priority | Location | Evidence | Decision |
| --- | --- | --- | --- |
| P1 | Homepage / Premium positioning | Desktop screenshot: body copy restricted to the second grid column in three narrow cards, causing excessive wrapping | Give body copy the full card width; restrained flat surface and predictable spacing |
| P2 | Homepage / quick actions | Repeated glossy surfaces and competing stylesheet declarations, including an important override | Remove the redundant override and scope the surface, readable copy and focus treatment |
| P2 | Shared case-study showcase | Non-home rail lacks region semantics / tabindex, despite mobile overflow | Name and focus the scrolling region in both variants |
| P2 | Website preview carousel | Button-triggered smooth scrolling is explicit even with reduced motion; pointer cancellation has no cleanup | Respect reduced motion and reset interrupted drag state |
| P2 | Global styles | Large stylesheet with repeated component overrides | Incremental ownership in modules; no risky global rewrite |

The hero composition, logos, client evidence, SEO text, legal copy, prices, routes and schema are preserved in this batch. Existing content that has not been editorially assessed is not described as optimised.

## Rollback

Pre-edit source/CMS/documentation archive: `/private/tmp/crea8iv-before-refinement-20261021.tar.gz`. Existing dirty STW/editorial work was preserved. This temporary archive is not durable off-machine backup. Restore only affected files after checking for later user changes; never reset the entire worktree. No deployment or Git push authorised by this batch.

## Remaining Phases

P1: review full mobile contact form and menus, error/success states and consent using a controlled test destination. P2: section-level visual/editorial review of unsampled routes, light-mode contrast audit, bundle/Lighthouse baseline and query-backed article prioritisation. P3: motion polish only where a demonstrated user problem remains. Search-impacting rewrites, merges and redirects need separate evidence and approval.
