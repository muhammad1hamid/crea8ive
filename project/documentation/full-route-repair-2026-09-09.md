# Complete route and permission repair — 9 September 2026

Initial sitemap audit: 188 URLs, 93 failures. Live SSH inspection confirmed Growth Systems and Our Services directories absent although export files existed. Selective deployments had not shipped the complete route set.

Published full export excluding unused original portfolio-assets archive (no original asset references found in exported img tags). 986 files / approximately 140 MiB, including all HTML routes, optimized images, static resources, sitemap, robots and public documents. Existing unrelated files retained; no rsync delete. Public HTML and routing rules backed up outside public_html to .pre-full-route-repair-20260909.tar.gz.

Second cause: public_html was mode 700, preventing web-server access. Restored public_html to 755. Deployment now explicitly sets the temporary staging root to 755 and public files/directories use 644/755. Confirmed public_html remains 755 after subsequent deployment. Private enquiry database outside public_html remains untouched.

Added DirectoryIndex index.html index.php and proper ErrorDocument 404. Added seven permanent legacy-route redirects to existing relevant pages. Unknown URL tested and correctly returned HTTP 404.

Added verify-live-routes.mjs: checks sitemap and internal anchor destinations, follows redirects and compares live/exported titles where applicable. Deployment runs fresh-export validation before upload and all live route checks before reporting success. This detects problems; it is not a guarantee against future hosting outages.

Validation: production build/type/lint passed; release verifier 188 routes, zero missing/duplicate titles. Post-repair live audit: 207 sitemap/internal-link URLs, zero failures. Browser confirmed Growth Systems renders. Permissions verified after follow-up deployment: root/directory 755, HTML 644. Last audit stored at frontend/.deploy/live-route-audit.json.

Manifests: full-route-repair-20260909-manifest.txt and legacy-route-fixes-20260909-manifest.txt in frontend/.deploy.
