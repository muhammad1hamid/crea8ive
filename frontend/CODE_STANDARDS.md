# Frontend Code Standards

## Package boundaries

The repository intentionally uses two npm packages: the root package contains shared automation tooling, and `frontend` contains the Next.js application. Each package owns its own `package.json` and lockfile. Install dependencies from the package being changed and commit its matching lockfile.

## Change discipline

- Keep route, content, design-system and integration changes within their existing ownership boundaries.
- Validate external, CMS and authored data before it reaches rendering or structured data.
- Use shared types and schemas for repeated data contracts; keep business facts evidence-backed.
- Prefer accessible HTML, stable responsive dimensions, optimized images and server rendering where interactivity is not needed.
- Keep secrets out of source, build output and logs. Use the existing server-side environment configuration.

## Required local checks

Run `npm run qa:release` from `frontend` before preparing a static release. It checks framework conventions, package and data contracts, lint, TypeScript, export routes and required portfolio assets. ESLint currently allows the reduced 72-warning baseline; the configured ceiling prevents new warnings from silently expanding it. Reduce the ceiling as existing warnings are safely resolved; do not silence rules to make the count fall.

Use `npm run lint` for ESLint CLI checks and `npm run typecheck` for the application TypeScript check. Review generated route and asset reports when a check fails; do not suppress a failure without documenting why.
