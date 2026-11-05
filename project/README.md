# Crea8iv Media Portable Migration

This package separates the public marketing site from the client portal:

- `public-website/astro`: static Astro + Tailwind website generated from a checked-in WordPress snapshot.
- `client-portal/php`: PHP entry point, authentication, CSRF, rate limiting, API endpoints, and PDO database layer.
- `client-portal/vue`: Vue 3 + Vite + Tailwind protected dashboard frontend.
- `database`: SQLite/MySQL migrations and public-content snapshots.
- `scripts`: repeatable content snapshot and asset mirror tooling.
- `documentation`: migration, deployment, security, API, and validation notes.

Start with [documentation/INSTALLATION.md](documentation/INSTALLATION.md).
