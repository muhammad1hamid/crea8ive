# Controlled AI delivery: Phase 1

Date: 2026-10-23. Scope: repository rules, design contract and a portable frontend QA pilot. No production/UI/content changes or paid model calls are part of this phase.

## Acceptance
- Architecture and brand unchanged; no new dependency.
- Existing release gates remain mandatory. Portable browser checks run after export in GitHub Actions.
- Browser checks compare exported/hydrated title, description, canonical, robots, Open Graph title, H1 and JSON-LD. This detects hydration drift, not every semantic/schema eligibility issue.
- Seven routes at three sizes plus the existing STW eight theme/viewport combinations; image viewer, Escape/focus and enquiry-dialog checks.
- No real lead submissions or claims of backend/email/booking verification. Screenshots need human review.

## Gemini checkpoint (not enabled)
Confirm an authorised account, provider terms, client-data permission and budget before adding an adapter. Keep model name configurable and credentials server-side. Begin with redacted inputs and read-only allowlists; do not upload the entire repository or secret files.

Each task records scope, model/version, input sources, files, checks, usage, reviewer and release decision. Proposed pilot ceiling: USD 50 total, with per-task caps, timeouts, cancellation and at most three repair attempts. This is not an authorised charge.

Evaluate on the same bounded tasks against the existing workflow: accepted-task cost, review time and regression rate. Independent review is required. Preview Computer Use needs a disposable environment without production sessions. Never assume prompt-injection immunity.

## Later phases
Read-only GSC/GA4 exports or OAuth need separate setup and approval. Retain 1-2 new articles/month; prioritise evidence-led refreshes. Redirects, Ads writes, publication, client security scans and deployment need explicit authorisation. Keep implementation, prepared strategy and verified results distinct.

## Verification completed
- `npm run qa:release`: passed. Fresh export has 241 sitemap routes, no missing routes or duplicate titles; 518 JSON-LD blocks checked with zero schema regressions. Existing redirect and portfolio checks passed.
- `npm run qa:browser`: passed. Twelve request-policy tests, 21 representative route/viewport checks and eight STW theme/viewport combinations; zero uncaught browser errors.
- STW: eight internal links, five incoming page links, sitemap inclusion, image loading, image zoom, Escape/focus and enquiry-dialog behaviour passed. No form was submitted.
- Focused ESLint and `git diff --check`: passed. Full lint retains six pre-existing unused-function warnings, not new failures.
- Representative homepage mobile and STW desktop screenshots were visually inspected. CI has been configured but has not run remotely in this phase.
- The pre-existing topical-authority article increases the local export from the previous 240-route release to 241. Its source/content was not changed by this task. No production deployment or Git push was performed.
