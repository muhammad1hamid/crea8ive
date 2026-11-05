import { EXTERNAL_STYLESHEETS } from "@/lib/site-config";
import LottiePlayerLoader from "./LottiePlayerLoader";

// Legacy page styles are deliberately non-blocking. They support old
// WordPress snapshots, but the native React surfaces paint from globals.css.
const ASYNC_CSS_BOOTSTRAP = `(function(){
var d=document,ls=[].slice.call(d.querySelectorAll('link[data-wp-async-css]'));
var n=ls.length,done=0,fin=function(){d.documentElement.classList.add('wpcss-ready')};
if(!n){fin();return}
var one=function(){if(++done>=n)fin()};
ls.forEach(function(l){var go=function(){l.media='all';one()};
if(l.sheet){go()}else{l.addEventListener('load',go);l.addEventListener('error',one)}});
setTimeout(fin,3000);
})();`;

/**
 * Legacy WordPress/Elementor stylesheets, loaded WITHOUT blocking first paint.
 *
 * These ~30 sheets used to render as plain <link rel="stylesheet"> ahead of the
 * page markup, so the browser refused to paint anything until every one of them
 * (plus the cdnjs/Google Fonts CDNs) responded — the main cause of the slow,
 * flickering first 1–2 seconds. The hero and all React UI style themselves from
 * Tailwind/next-font/local CSS, so only the WordPress-rendered content needs
 * these sheets.
 *
 * Pattern: ship each link as media="print" (browsers fetch it at low priority
 * without blocking render), flip it to media="all" once loaded. While the
 * sheets load, WordPress content (`.wpcss-guard`, applied by WordPressContent)
 * is kept visibility-hidden — layout is preserved (no CLS), and the guard rule
 * only exists on pages that render this component. <noscript> restores the
 * classic blocking links and unhides the content for no-JS visitors/crawlers.
 */
export default function WordPressAssets() {
  return (
    <>
      <style>{`.wpcss-guard{visibility:visible}`}</style>
      {EXTERNAL_STYLESHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} media="print" data-wp-async-css="" suppressHydrationWarning />
      ))}
      <script dangerouslySetInnerHTML={{ __html: ASYNC_CSS_BOOTSTRAP }} />
      <noscript>
        <style>{`.wpcss-guard{visibility:visible !important}`}</style>
        {EXTERNAL_STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </noscript>
      <LottiePlayerLoader />
    </>
  );
}
