# Portfolio grid release — 9 September 2026

Published to https://crea8ivmedia.com/results/ and https://crea8ivmedia.com/website-portfolio/.

- Shared website card grid across homepage, Results and Website Portfolio: 1 column on mobile, 2 on tablet, 3 on desktop. Equal media aspect ratios and aligned card footers. Removed the duplicated animated carousel and oversized featured card.
- CO3 links use https://co3premiumliquids.com/ (HTTP 200 confirmed).
- Social archive uses 14 full grid previews. Individual social posts, reel players and reel filters are removed from the public portfolio. Original media source files remain archived; this release does not erase the owner's originals.
- Individual website and Results detail URLs redirect to their respective collection grids. Redirect bridges are noindex, and detail URLs were removed from the sitemap. Related internal proof references point to the collection.
- No YouTube integration yet. Await user-supplied playlist URLs/access; do not invent playlists or publish placeholders.
- Earlier registration proof and saved-enquiry release shipped in the same scoped deployment.

Validation: TypeScript/build/lint passed; release verifier passed with 188 sitemap routes, no missing routes and no duplicate titles. Browser visual checks covered desktop and 390px mobile. Checked generated portfolio output has no video elements, retains CO3 live link, and exposes only grid-preview social assets. Hostinger cache purge was necessary; public Results page now visibly shows the new collection.

Deployment manifests: frontend/.deploy/registration-assets-20260909-manifest.txt and frontend/.deploy/registration-leads-20260909-manifest.txt. Existing public pages backed up outside public_html in .registration-backup-20260909 and .portfolio-backup-20260909. Old hashed assets retained to preserve pages outside this scoped release. Registration/footer updates on unrelated, non-deployed routes will ship with their next deliberate release.

Live checks passed for homepage, Results, Website Portfolio, Company Verification, Contact, About and Pricing; both detail redirect examples and certificate SHA-256 comparisons passed. A synthetic enquiry was saved with reference CM-2FFD7A31AC21, verified in private storage and removed after QA. No email notifications were sent.
