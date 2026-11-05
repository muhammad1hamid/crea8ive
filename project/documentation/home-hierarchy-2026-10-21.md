# Proof-Led Homepage Hierarchy

## Implemented Structure

The hero composition and its copy remain unchanged. Below it, the homepage now has nine coordinated bands instead of fifteen independent sections:

1. Compact client identity strip.
2. Featured Buildscape project with an inspectable genuine screenshot, existing scope description and case-study action; supporting client website gallery below it.
3. Website Development, Google Ads and SEO/AI Visibility as the three primary services. The seven remaining existing services keep their descriptions and links in compact supporting rows. Existing positioning copy and principles remain within this band.
4. Case-study evidence, now separated from the website gallery by the service architecture.
5. Business-problem diagnostics, existing quick actions and a native expandable free-tool area.
6. Creative evidence and industry examples grouped together.
7. Three-stage process with existing delivery-proof content.
8. Founder and office/location information together.
9. Project enquiry as the main closing action; the free audit remains available as a secondary action.

The featured project is not duplicated in the supporting gallery. Service text no longer depends on a mobile carousel: primary services stack as readable rows, while project and creative galleries retain horizontal browsing. No unsupported client results, fabricated imagery or new performance figures were introduced.

## Content Mapping And SEO

The pre-change homepage HTML and 240-route inventory are saved under `reports/home-hierarchy-2026-10-21/before/`. Automated checks confirm that all original paragraph strings, headings and link destinations remain in the server-rendered homepage HTML. New primary-service descriptions and the featured-project presentation add context without removing existing content.

Titles, descriptions, canonicals, robots directives, H1s, JSON-LD and internal-link sets remain unchanged across the 240-route baseline. Link order changes on the homepage are intentional; link destinations remain intact. Tools are a native details disclosure, not client-fetched content. No URL or sitemap routing changes were made.

## Verification

- Production export passes; lint has no errors and the same six pre-existing warnings.
- 12 hierarchy checks across both themes and 360, 390, 768, 1024, 1440 and 1920px widths pass.
- Featured-image enlargement and Escape dismissal, native tools disclosure keyboard controls, primary/supporting service counts, project deduplication and enquiry destination pass.
- Navigation and interaction regression: 16 viewport/theme checks plus 12 normal/reduced-motion hover checks pass.
- Existing rendered audit: 45 responsive samples, no horizontal overflow or browser errors, and no invalid JSON-LD syntax.
- Mobile and desktop screenshots were inspected. A legacy mobile rule forcing service carousels was corrected so the new primary services remain readable vertical rows.

Preview: `http://localhost:4183/`. No production deployment or Git push was performed for this request. Form delivery, conversion uplift and field Core Web Vitals are not claimed by these local checks.

## Rollback

The source checkpoint is `/private/tmp/crea8iv-before-home-hierarchy-20261021.tar.gz`. Restore only this task's changes if required; preserve the wider dirty worktree and existing editorial updates.
