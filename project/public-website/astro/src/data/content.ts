/**
 * Prepares the WordPress snapshot HTML (pages.json) for rendering.
 *
 * Perf transforms (2026-07-06) — all design-preserving:
 *  - lottie-player script tags are stripped; BaseLayout lazy-injects the
 *    376KB player only when an animation approaches the viewport.
 *  - <lottie-player src> becomes data-src so each animation's JSON also loads
 *    on approach instead of at page load.
 *  - stylesheet <link>s (mirrored Font Awesome, extra Google Fonts like Sora)
 *    are deduplicated and made non-render-blocking via the media="print" flip
 *    (BaseLayout's inline script flips them to "all" once loaded; a noscript
 *    copy keeps no-JS rendering intact).
 *  - content images get loading="lazy" / decoding="async" (except the first,
 *    which may be above the fold on inner pages).
 */
export function prepareSnapshotHtml(html: string) {
  const seenScripts = new Set<string>();
  const seenSheets = new Set<string>();
  let firstImgSeen = false;

  let out = html.replace(
    /<script\b([^>]*\bsrc=["']([^"']+)["'][^>]*)>\s*<\/script>/gi,
    (tag, _attributes, src: string) => {
      if (/lottie-player/i.test(src)) return ""; // lazy-injected by BaseLayout
      if (seenScripts.has(src)) return "";
      seenScripts.add(src);
      return tag;
    },
  );

  out = out.replace(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi, (tag) => {
    const href = (tag.match(/\bhref=["']([^"']+)["']/i) || [])[1];
    if (!href || seenSheets.has(href)) return "";
    seenSheets.add(href);
    if (/\bmedia=/i.test(tag)) return tag;
    const asyncTag = tag.replace(/^<link/i, '<link media="print" data-async-css');
    return `${asyncTag}<noscript>${tag}</noscript>`;
  });

  out = out.replace(/<lottie-player\b([^>]*?)\ssrc=/gi, "<lottie-player$1 data-src=");

  out = out.replace(/<img\b(?![^>]*\bloading=)([^>]*)>/gi, (tag, attrs: string) => {
    if (!firstImgSeen) {
      firstImgSeen = true;
      return tag;
    }
    return `<img loading="lazy" decoding="async"${attrs}>`;
  });

  return out;
}
