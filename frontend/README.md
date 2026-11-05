# Crea8iv Media public website

Next.js App Router, React and TypeScript. Public production pages are statically exported to `out/`; Hostinger also provides separate PHP endpoints. Work in this frontend, not the archived experiments or other applications in the repository.

## Team Setup and Protected Rules

Use Node 22 (matching CI), run `npm ci` here, then `npm run dev`. Obtain environment configuration through the team's private channel; never commit secrets. Read root `AGENTS.md`, `DESIGN.md` and local `AGENTS.md` first.

## Release QA

`npm run qa:release` runs the existing standards, site-data, lint, type, static export, release, schema, Qatar and portfolio checks. Use `npm run export` for the Hostinger static release. Do not increase the existing six-warning lint allowance to hide new warnings.

The release gate also rejects sitemap entries that are missing, redirected, non-canonical, blocked for Googlebot, marked noindex, or have invalid/future modification dates. Run `node scripts/verify-indexing.mjs` after exporting to inspect these checks separately. Reviewed permanent aliases live in `src/data/legacy-redirects.json`; Next.js, the Node static server, sitemap generation and legacy content-link cleanup use this registry. Keep equivalent Hostinger rules in `public/.htaccess` aligned. Do not add a migration without matching content intent and URL evidence.

After exporting:

```sh
npx puppeteer browsers install chrome
npm run qa:browser
```

Linux CI uses `--install-deps` for browser system dependencies. `CHROME_PATH` selects an installed browser; macOS Chrome is detected automatically, otherwise Puppeteer's managed Chrome is used.

The portable pilot owns a temporary-port static server, does not reuse your preview and does not inherit production API configuration. Browser requests are restricted to local static reads. It covers seven routes at 390/768/1440px, compares server-rendered and hydrated SEO fields, and runs the STW interaction suite at four widths in both themes. It never submits real enquiries.

Evidence: `../reports/browser-pilot/` (override with `QA_OUTPUT_DIR`). Review screenshots manually. This is not a WCAG certification, pre-change SEO baseline comparison or proof of backend/email/booking delivery. Historical QA scripts may depend on dated local reports; use the portable pilot in CI.

## Handoff

Use a focused branch, describe intended behaviour and protected fields, run checks and request independent review. Push/publish/deploy only with authorisation; production releases need a rollback backup and separate live verification. No Gemini integration or paid calls are enabled. See root `project/documentation/agent-delivery-phase-1.md` for integration checkpoints.

GitHub Actions retains browser screenshots and the JSON report for seven days, including failed runs. The browser gate first runs request-policy unit tests; it is not a security boundary for arbitrary untrusted code execution.
