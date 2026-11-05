# Migration Report

## Converted

- Public route inventory: 21 published WordPress pages.
- Public website architecture: Astro + Tailwind.
- Runtime WordPress page-content dependency: replaced with a checked-in snapshot.
- Public portal entry screen: reproduced from the observable PHP sign-in and audit-request registration workflow.
- Portal backend baseline: PHP 8 PDO, CSRF, sessions, validation, throttling, authentication, and roles.
- Portal frontend baseline: Vue 3 + Vite + Tailwind protected dashboard shell.
- Database: SQLite default with equivalent MySQL schema.

## Evidence Boundary

The workspace did not include the original portal source, protected dashboard screens, database export, user-role matrix, or authenticated API documentation. The public portal login page cannot reveal those protected workflows. They are therefore not claimed as parity-complete and must be imported and audited before production cutover.

The public WordPress pages include third-party embeds and assets. `scripts/snapshot_public_site.py` mirrors downloadable assets and records unresolved URLs. Social links, embeds, and intentional external integrations remain external by design.
