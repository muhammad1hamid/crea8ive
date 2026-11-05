# Crea8iv Media: Evidence-Based Improvement Plan

Prepared: 14 October 2026. Source crawl: 13 October 2026.
Scope: planning and diagnosis only. No website code changes or deployment performed in this audit.

## Evidence and Coverage

Reviewed all six supplied CSVs, three screenshots, current Next.js source, current static output, and sampled live URLs.
The screenshots are Semrush Site Audit and Google Rich Results Test, not Microsoft Clarity or Ahrefs reports.
Both domain mega exports contain 100 rows. Crea8iv's crawl hit its 100-page limit with JavaScript rendering disabled.
The recent deployment checked 276 sitemap/internal-link URLs. That is a different population from this crawl.
This report is a sample audit, not a claim that every website page has been audited.
No Search Console clicks, rankings, GA4 conversions, or Clarity recordings/heatmaps were supplied.

| Finding | Verified interpretation | Priority |
| --- | --- | --- |
| Site Health 95%; AI Search Health 94% | Screenshot scores, not Google ranking or AI citation metrics | Baseline |
| 26 schema failures | 26 invalid items across 17 URLs; detailed export contains 47 field-level rows | High |
| 188 broken external-link checks | Repeated link checks across 90 pages, not 188 unique broken URLs/pages | High |
| 87 low text/HTML warnings | 87 of the 90 HTML pages checked; inspect markup weight before adding copy | Medium |
| 8 pages with one incoming link | Six HTML URLs plus two Markdown resources in this sample | Medium |
| 14 content-not-optimized notices | Tool-generated heuristics requiring editorial review | Medium |
| 6 H1/title equality warnings | Matching H1 and title is not itself a demonstrated ranking defect | Low |
| 1 blocked URL | PatientFlow login; private account access should remain protected | Expected |
| 2 HSTS notices | Validate canonical-host HTTPS policy before rollout | Medium |

The pages export reports 99 HTTP 200 responses and one HTTP 301. It lists 90 self-canonical pages, nine without canonicalization data, and one canonical to another page. Non-HTML resources require separate treatment.
No 4xx/5xx, broken internal links, duplicate titles, duplicate content, missing H1, missing meta descriptions, or broken image errors were reported in Crea8iv's sample.
Crawl depth is 0-2 throughout this sample. Basic discovery is already working.
HTML load times range from 0.275 to 0.561 seconds, median 0.285 seconds. These are crawler response measurements, not LCP, INP or CLS.

## Phase 1: Shared Schema and Link Repairs

### Case study schema

Five Organization items use an unsupported industry property:
Black Petals, CO3, Hassan Nawaz Architects, Home Studio Interiors, and The Smile Xperts.
Source: frontend/src/components/PremiumCaseStudyPage.tsx, JsonLd(), about.industry.
Live Home Studio HTML still contains the property.
Keep the industry as visible copy and describe the client with supported properties. Move subject context to the Article's appropriate description/keywords/about representation.
Do not substitute an unsupported property elsewhere.

### Tools and software schema

21 Software App items fail two field checks each: offers and aggregateRating/review.
Distribution: ten apps embedded on /tools/, ten individual tool URLs, and one app on /software-products/.
Sources: tools/page.tsx, tools/[slug]/page.tsx, software-products/page.tsx. Also inspect platforms/page.tsx outside the sampled error list.
Live /tools/ and /tools/seo-audit/ still contain application markup without offers.

Distinguish Schema.org validity from Google software-app rich-result eligibility.
For the tools directory, describe the visible collection using CollectionPage and ItemList with linked page entries.
For genuinely free standalone tools, offers.price=0 is supportable if the visible page confirms free access.
Ratings must come from genuine, visible, attributable evidence. Never invent stars or customer reviews.
If review evidence is absent, accept non-eligibility for software rich results or use a truthful WebPage representation where that best describes the page. A zero-price Offer alone does not solve the rating requirement.
Do not declare paid/custom software free when public pricing is unknown.

### Organization image warning

The supplied Rich Results screenshot shows valid items with one OPTIONAL image warning.
SiteSchema.tsx sets logo on Organization and image on LocalBusiness; add a supported image to the Organization entity.
This is a cleanup task, not a critical indexing error.
Keep stable entity IDs and consolidate duplicated declarations where they describe the same entity.

### Shared external links

The export does not identify individual failing destinations, so retrieve that issue's destination/status report during implementation.
Across the sampled HTML files, shared external URLs appear on 90 pages. Repair central definitions before per-page edits.
Confirmed issue: social-links.ts publishes a Blogger management URL, which redirects to Google sign-in.
Replace it with a verified public blog URL, or remove the public navigation entry pending a valid destination.
Cake Art Academy's HTTP link redirects to HTTPS; update central references to the verified canonical destination.
Sampled xtempora.org and Ajwad Naturals respond 200. Ajwad's small response is not proof of a fully usable page; browser validation is needed.
Separate 404/5xx/DNS failures, redirects, authentication destinations, and bot-blocked 403/429 responses.
Do not remove legitimate social profiles simply because a crawler was denied.
Acceptance: every public shared link opens a useful public destination; all confirmed broken destinations corrected.

## Phase 2: Reliable Measurement Before Conversion Experiments

DeferredAnalytics.tsx waits 18 seconds plus a possible idle delay, or loads after user intent. Scroll waits another 2.5 seconds.
Short passive visits may leave before GA4/Clarity initialize; dashboard engagement may therefore be biased.
Use a measured early, consent-aware initialization strategy; keep heavier optional widgets deferred.
Test a short visit, first-click outbound exit, scroll, SPA route transition, form completion and returning session.

analytics-events.ts pushes dataLayer events and sends gtag events. Verify the actual GTM container before deciding whether this duplicates collection.
Verify one GA4 page_view and one business event per action.
The first Meta load injects fbevents.js but only initializes fbq if it already exists. Confirm who installs/initializes the queue and pixel; do not assume injection alone creates tracking.
The event helper POSTs to /api/analytics/event. The live GET probe returns 404; no static public handler was found.
Verify POST routing/backend availability and implement a supported event collector or use the confirmed analytics destination. A click event is not proof that an enquiry was stored.

Use one event vocabulary: consultation_cta_click, implementation_cta_click, whatsapp_click, form_start, form_submit_success, form_error, tool_start, tool_result, case_study_open, carousel_next.
Track location, page type and tool/client slug; avoid sending names, phone numbers, emails or message bodies to analytics.
Use Clarity custom events/tags to segment meaningful behaviour after verifying collection.
Set outcomes around qualified enquiries, booked consultations and proposals, with clicks and tool results as supporting metrics.

Needed Clarity baseline: previous 30 days, device/source/page segments, scroll heatmaps and click heatmaps for home/services/tools/contact; recordings around rage clicks, dead clicks, quick backs and unsuccessful forms.
No actual Clarity session rates or behaviour trends are claimed in this report.

## Phase 3: Structure, Content and Internal Links

Organize primary navigation and service journeys around Website Development, SEO/AI Visibility, and Google Ads/Acquisition.
Supporting services remain accessible through relevant contexts.
Use service -> relevant case study -> related guide/tool -> consultation or implementation enquiry paths.
Do not add indiscriminate sitewide links to address a single incoming-link warning.

Improve contextual incoming links to:
- /ai-visibility-growth/ from AI search and a relevant guide.
- /blog/aeo-vs-seo/ from AI search explanatory content.
- Restaurant GBP checklist from hospitality/GBP pages.
- General GBP checklist from local SEO and relevant guides.
- Dentist Maps guide from clinic and local SEO content.
- /tools/patient-retention-roi-calculator/ from PatientFlow and clinic content.

Two flagged URLs are Markdown resources: deployment-ai-visibility-checklist.md and website-development.md.
Review the sitemap's 28 machine-readable entries and decide their search purpose deliberately.
Prefer canonical HTML pages in the primary page sitemap; keep useful machine resources accessible through appropriate discovery paths.
Do not blanket-block Markdown resources before inspecting canonical/noindex strategy and existing traffic.

Review the 14 content notices page-by-page. Several are commercial pages and case studies, not blogs.
Add specific scope, audience, process, proof, constraints and direct answers only where missing.
Keep the user's editorial policy: refresh existing articles first; publish one or two genuinely new articles per month.
Merge/redirect only after comparing intent, Search Console performance, backlinks and destination relevance.
Avoid deleting content based on a heuristic score alone.

## Phase 4: Cards, Tools and Mobile Experience

ToolCard currently nests a framed image inside a padded rounded card, uses object-cover, and clamps descriptions.
Use a single media frame, natural screenshot proportions and object-contain for evidence screenshots.
Decorative editorial images can use intentional crops; screenshots and client grids must preserve important content.
Keep card titles readable, benefits concise, category recognizable and the action explicit.
Use lucide tool icons and consistent 44px minimum action targets.
Desktop: retain a clear three-column tools directory and consistent card rhythm.
Mobile: existing CSS already uses horizontal snap scrolling with 15.5rem cards. Improve carousel controls, visible next-card cue, keyboard access and position feedback; do not rebuild it as a long vertical stack.
Allow category buttons to reveal selected state semantically and remain usable at large text sizes.

Tool journey: useful input -> clearly explained result -> optional relevant enquiry.
Show calculation assumptions, validation errors, units and limits beside the result.
Avoid implying that self-assessment tools query actual Google rankings, private GBP data or AI platforms.
Offer separate consultation and implementation paths with page-appropriate wording.

Case studies: full uncropped website evidence, complete content grids, readable metric units/date ranges and evidence captions.
Show Black Petals in archive and related-work journeys; keep its US market and USD figures distinct from Pakistani clients.
Use one coherent mobile sticky action system; verify actual mounted widgets and coordinates before changing it.
Prevent CTA/chat/assistant overlays from covering forms, carousel controls or article text.
Blogs: shorten repetitive supporting panels where they interrupt reading; retain useful contents, contextual proof and one relevant next action.
These visual proposals should be validated against Clarity and screenshots before broad rollout.

## Phase 5: Markup and Performance

Current exported homepage: 375,894 HTML bytes, about 151,259 bytes of inline RSC payload and 1,844 elements.
It contains 117 external anchor instances including repeated global/logo links.
These measurements identify possible weight; they do not prove poor Core Web Vitals.
Reduce repeated carousel markup, duplicated global content, unnecessary serialized data and route-wide widget cost.
Use existing route/template boundaries, centralized link/schema data, and reusable card primitives.
Keep meaningful content server-rendered and accessible.
Do not inflate word count to chase text/HTML ratio.
Measure real mobile LCP/INP/CLS and field data before and after changes.
Targets: LCP <=2.5s, INP <=200ms, CLS <=0.1 at the relevant field-data percentile where data is available.
Validate HSTS on HTTPS canonical and alternate hosts before adopting a policy; do not preload until subdomain readiness is established.

## Separate Buildscape Backlog

Buildscape sample: 32 pages with duplicate descriptions; four with long titles; six invalid schema items across four URLs; 76 broken external-link checks across 71 pages; six one-link pages; 20 blocked URLs.
Treat as a separate client scope and repository. Classify blocked URLs before changing robots rules.
Use its detailed schema and external-destination exports before selecting fixes.
No Buildscape changes are included in this Crea8iv planning task.

## Execution and Acceptance

Suggested sequence, subject to scope: days 1-2 full crawl baseline/shared schema/link fixes; days 3-5 measurement and contextual links; week 2 pilot card/tools/case-study UX; weeks 3-4 performance and prioritized content refresh.
Increase crawl capacity above the full current URL population (e.g. 1,000), include sitemap discovery, and run raw-HTML plus JS-rendered checks where needed.
Preserve URLs, confirmed functionality, content evidence and brand identity through incremental releases.
Run schema vocabulary checks plus Google Rich Results Test; evaluate eligibility separately from general semantic validity.
Test desktop/mobile, enlarged text, keyboard navigation, carousels, actual form success and analytics event delivery.
Deploy a verified release and rerun the full crawl under comparable settings.
Acceptance: no unsupported schema properties; no invented ratings; all confirmed public-link failures fixed; important HTML pages have relevant incoming links; conversion events arrive once; no clipped evidence or overlay collisions.
Use tool health scores as diagnostics. Business success is qualified leads, booked calls, proposals and closed revenue where attributable.

## References

- Google SoftwareApplication requirements: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Schema.org Organization vocabulary: https://schema.org/Organization
- Microsoft Clarity client API: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
- Google AI features guidance: https://developers.google.com/search/docs/appearance/ai-features
