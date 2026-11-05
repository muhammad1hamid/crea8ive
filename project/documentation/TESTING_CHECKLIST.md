# Testing Checklist

## Automated

- [ ] Run `python3 scripts/snapshot_public_site.py --skip-assets`
- [ ] Run `npm run build` in `public-website/astro`
- [ ] Run `php client-portal/php/install.php`
- [ ] Run `php -l` across PHP source files
- [ ] Run `npm run build` in `client-portal/vue`

## Manual Before Cutover

- [ ] Compare all 21 public routes at mobile, tablet, desktop, and wide breakpoints.
- [ ] Verify local assets listed in `ASSET_MIRROR_REPORT.md`.
- [ ] Submit a portal audit request and confirm the `leads` row.
- [ ] Verify invalid login, valid login, logout, CSRF rejection, and rate limiting.
- [ ] Import the original protected portal source/database export and audit every authenticated screen.
- [ ] Run Lighthouse, accessibility checks, broken-link crawling, and schema validation on staging.
