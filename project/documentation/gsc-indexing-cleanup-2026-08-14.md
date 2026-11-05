# GSC Indexing Cleanup - 2026-08-14

Source export: `/Users/mac/Downloads/crea8ivmedia.com-Coverage-Drilldown-2026-08-14.zip`

## What The Export Shows

Google Search Console is reporting a large number of non-indexed URLs, but the sampled export is overwhelmingly historical spam and old WordPress surfaces, not current sitemap pages.

Export sample size: 1,000 URLs from `Table.csv`.

| Pattern | Count | Action |
| --- | ---: | --- |
| Gambling/casino spam URLs | 956 | Return `410 Gone` |
| Other one-level legacy paths | 32 | Mostly spam-like; covered by gambling pattern where applicable |
| Old WooCommerce/product/archive URLs | 7 | Return `410 Gone` |
| Real-looking old marketing URLs | 3 | Redirect to current canonical pages |
| Malformed hacked URL | 1 | Leave as 404/host-level cleanup |
| `connect.crea8ivmedia.com` | 1 | Requires separate subdomain handling if still active |

## Implemented Source Fixes

File changed: `frontend/public/.htaccess`

Rules added:

- Gambling/casino/spam URL pattern -> `410 Gone`
- Old `/product/`, `/product-tag/`, `/author/`, `/tag/`, `/category/` archive surfaces -> `410 Gone`
- `/digital-marketing-cost-pakistan/` -> `/pricing/`
- `/influencer-marketing-trends-2023-what-you-need-to-know/` -> `/blog/influencer-marketing-trends-2023-what-you-need-to-know/`
- `/services/explore-it-solution-services/` -> `/software-development/`

## GSC Next Steps

Do not validate all issues immediately. Validate only after the updated `.htaccess` is exported, deployed, and live URL checks confirm the expected status codes.

Recommended validation order:

1. `Not found (404)` - validate after spam URLs return `410 Gone`.
2. `Page with redirect` - validate after important legacy redirects return `301`.
3. `Alternate page with proper canonical tag` - lower priority; generally okay.
4. `Crawled - currently not indexed` - review only current, important pages from the sitemap.
5. `Discovered - currently not indexed` - request indexing only for priority canonical pages.

## URLs To Test After Deploy

Expected `410 Gone`:

- `https://crea8ivmedia.com/free-casino-games-win-cash/`
- `https://crea8ivmedia.com/best-online-casino-bonus-no-wagering-requirement/`
- `https://crea8ivmedia.com/product/winter-new-jacket/`
- `https://crea8ivmedia.com/tag/business/`
- `https://crea8ivmedia.com/category/web-development/`

Expected `301`:

- `https://crea8ivmedia.com/digital-marketing-cost-pakistan/` -> `https://crea8ivmedia.com/pricing/`
- `https://crea8ivmedia.com/influencer-marketing-trends-2023-what-you-need-to-know/` -> `https://crea8ivmedia.com/blog/influencer-marketing-trends-2023-what-you-need-to-know/`
- `https://crea8ivmedia.com/services/explore-it-solution-services/` -> `https://crea8ivmedia.com/software-development/`

## Deployment And Live Verification

Deployment completed on 2026-08-14 via:

- `npm run export` in `frontend`
- `bash scripts/deploy_to_hostinger.sh` from the project root

Live checks confirmed:

| URL | Result |
| --- | --- |
| `https://crea8ivmedia.com/free-casino-games-win-cash/` | `410 Gone` |
| `https://crea8ivmedia.com/best-online-casino-bonus-no-wagering-requirement/` | `410 Gone` |
| `https://crea8ivmedia.com/product/winter-new-jacket/` | `410 Gone` |
| `https://crea8ivmedia.com/tag/business/` | `410 Gone` |
| `https://crea8ivmedia.com/digital-marketing-cost-pakistan/` | `301` to `/pricing/`, then `200` |
| `https://crea8ivmedia.com/influencer-marketing-trends-2023-what-you-need-to-know/` | `301` to `/blog/influencer-marketing-trends-2023-what-you-need-to-know/`, then `200` |
| `https://crea8ivmedia.com/services/explore-it-solution-services/` | `301` to `/software-development/`, then `200` |
| `https://crea8ivmedia.com/sitemap.xml` | `200` |
| `https://crea8ivmedia.com/robots.txt` | `200` |

## Follow-Up GSC Exports Checked

Files checked:

- `/Users/mac/Downloads/crea8ivmedia.com-Coverage-Drilldown-2026-08-14 (1).zip`
- `/Users/mac/Downloads/crea8ivmedia.com-Coverage-Drilldown-2026-08-14 (2).zip`
- `/Users/mac/Downloads/crea8ivmedia.com-Coverage-Drilldown-2026-08-14 (3).zip`

### Export 1: Page With Redirect

Metadata:

- Sitemap: `All known pages`
- Issue: `Page with redirect`

Result:

- 1,000 / 1,000 sample URLs are old WordPress ID parameter URLs such as `https://crea8ivmedia.com/?p=7583`.
- Live verification confirmed `https://crea8ivmedia.com/?p=7583` returns `301` to `https://crea8ivmedia.com/`, then `200`.

Interpretation:

- This is expected exclusion behavior. Redirect URLs should not be indexed.
- Do not prioritize this as a ranking problem unless important URLs are redirecting to the wrong destination.
- Do not expect these URLs to become indexed; the goal is consolidation/removal from active crawling.

### Export 2: Blocked By Robots.txt

Metadata:

- Sitemap: `All known pages`
- Issue: `Blocked by robots.txt`

Result:

- 1,000 / 1,000 sample URLs are also old WordPress ID parameter URLs such as `https://crea8ivmedia.com/?p=6877`.
- Live verification confirmed `https://crea8ivmedia.com/?p=6877` returns `301` to `https://crea8ivmedia.com/`, then `200`.
- Live `robots.txt` does not block `/?p=` URLs.

Interpretation:

- This looks like stale/historical GSC data from the old WordPress setup.
- Because live robots no longer blocks these parameter URLs, Google can recrawl and see the `301`.
- This issue can be validated after GSC has had time to recrawl, but a failed validation immediately after deployment would not be surprising.

### Export 3: Crawled - Currently Not Indexed

Metadata:

- Sitemap: `All known pages`
- Issue: `Crawled - currently not indexed`

Result:

- Total sample rows: 612
- Old WordPress ID parameter URLs: 418
- Spam/gambling URLs: 188
- Other missed spam URLs: 3
- Current sitemap canonical URLs: 2
- Legacy `/services/` URL: 1

Current sitemap URLs in this report:

- `https://crea8ivmedia.com/blog/`
- `https://crea8ivmedia.com/blog/local-seo-for-salons-and-aesthetic-clinics-in-pakistan/`

Fixes added and deployed:

- Expanded spam `410 Gone` pattern to cover `craps`, `spin-palace`, and `withdrawal`.
- Added `301` redirect from `https://crea8ivmedia.com/services/` to `https://crea8ivmedia.com/our-services/`.

Live verification after deploy:

| URL | Result |
| --- | --- |
| `https://crea8ivmedia.com/services/` | `301` to `/our-services/`, then `200` |
| `https://crea8ivmedia.com/craps-machine-in-uk/` | `410 Gone` |
| `https://crea8ivmedia.com/spin-palace-withdrawal-uk/` | `410 Gone` |
| `https://crea8ivmedia.com/deposit-25-online-craps-uk/` | `410 Gone` |

Interpretation:

- This report is mostly old WordPress/spam memory, not current-site weakness.
- The only current canonical pages should be manually requested for indexing through URL Inspection.
- If those two pages remain excluded after fresh recrawl, improve internal links to them from homepage/service pages and refresh the blog post intro/schema/FAQ.

## Updated GSC Action Recommendation

Recommended next actions:

1. For `Not found (404)`: validate after 410 rules are live. This is the most important cleanup group.
2. For `Blocked by robots.txt`: validate after 24 to 72 hours because live robots no longer blocks the sampled `/?p=` URLs.
3. For `Page with redirect`: monitor, but do not treat as a critical issue. These old URLs are intentionally redirecting and should remain non-indexed.
4. For `Crawled - currently not indexed`: manually request indexing for `/blog/` and `/blog/local-seo-for-salons-and-aesthetic-clinics-in-pakistan/`; old/spam URLs should stay excluded.
5. For `Discovered - currently not indexed`: request indexing only for priority current pages, not old parameter URLs.

## Important Note

The current sitemap has 76 discovered pages and is successful in GSC. The 12.2K non-indexed count is mostly old/hacked URL memory. The KPI is not to index all 12.2K URLs; the KPI is to remove bad URL signals and get the current canonical sitemap pages indexed.
