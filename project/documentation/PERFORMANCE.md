# Performance Report

The source WordPress homepage previously loaded Elementor and theme assets at runtime, with the earlier audit recording 49 CSS files, 63 JS files, and about 4.45 MB of sampled CSS/JS. The Astro layer removes WordPress as a runtime content dependency and statically emits the public routes.

Current baseline optimizations:

- Static HTML route generation
- Local content snapshot
- Downloadable asset mirroring utility
- Responsive images preserved from source markup
- Reduced-motion fallback
- Minimal native header and footer JavaScript
- Sitemap and robots output

Run Lighthouse against the deployed build after the asset mirror report reaches zero required failures.
