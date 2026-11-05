'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { extractWpDocumentParts } from "@/lib/wordpress/html";
import "./legacy-presentation.css";
import { usePathname } from "next/navigation";
import { getServiceTone } from "@/lib/service-tones";

// Layout effect on the client (no visible shift), plain effect on the server
// (avoids the "useLayoutEffect does nothing on the server" warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type WordPressContentProps = {
  html: string;
  className?: string;
  fallbackImage?: string;
  /**
   * When true, this block is the first content on the page and its hero may sit
   * under the fixed transparent header. We measure the first heading and add the
   * minimum top padding needed to clear the header (per-page correct: 0 on pages
   * whose hero already clears it, more on top-aligned heroes).
   */
  offsetFixedHeader?: boolean;
};

// Fixed header is 96px tall; clear it with a small visual buffer.
const HEADER_CLEARANCE = 112;

const SERVICE_CARD_IMAGE_POOL = [
  "/img/services/ad-concepts/growth-system-ad-concept.webp",
  "/img/services/ad-concepts/google-business-profile-ad-concept.webp",
  "/img/services/ad-concepts/meta-advertising-ad-concept.webp",
  "/img/services/ad-concepts/social-media-management-ad-concept.webp",
  "/img/services/ad-concepts/website-development-ad-concept.webp",
  "/img/services/ad-concepts/content-reels-ad-concept.webp",
  "/img/services/ad-concepts/ai-automation-ad-concept.webp",
  "/img/services/ad-concepts/lead-generation-ad-concept.webp",
  "/img/services/ad-concepts/brand-identity-ad-concept.webp",
  "/img/services/ad-concepts/software-development-ad-concept.webp",
  "/img/services/ad-concepts/growth-system-ad-concept.webp",
  "/img/services/ad-concepts/software-development-ad-concept.webp",
] as const;

function selectServiceCardImage(text: string, index: number) {
  const value = text.toLowerCase();
  const rules: Array<[RegExp, string]> = [
    [/\b(keyword-rich|description|search terms|buyer-intent questions|q and a)\b/i, "/img/services/ad-concepts/growth-system-ad-concept.webp"],
    [/\b(geo-tagged|photos|photo uploads|fresh image|weekly google posts|updates|events)\b/i, "/img/services/ad-concepts/content-reels-ad-concept.webp"],
    [/\b(review|reviews|trust signals|reputation)\b/i, "/img/services/ad-concepts/social-media-management-ad-concept.webp"],
    [/\b(citation|local seo|directories)\b/i, "/img/services/ad-concepts/growth-system-ad-concept.webp"],
    [/\b(profile audit|google business|local ranking|maps)\b/i, "/img/services/ad-concepts/google-business-profile-ad-concept.webp"],
    [/\b(landing page|landing pages|campaign page|campaign-focused)\b/i, "/img/services/ad-concepts/meta-advertising-ad-concept.webp"],
    [/\b(booking|appointment|lead capture|form flow|whatsapp)\b/i, "/img/services/ad-concepts/lead-generation-ad-concept.webp"],
    [/\b(seo-ready|seo optimized|technical seo|schema)\b/i, "/img/services/ad-concepts/growth-system-ad-concept.webp"],
    [/\b(google ads|search intent|search visibility|seo|rank|keyword)\b/i, "/img/services/ad-concepts/google-ads-ad-concept.webp"],
    [/\b(meta|facebook|instagram|paid social|retarget|campaign)\b/i, "/img/services/ad-concepts/meta-advertising-ad-concept.webp"],
    [/\b(social media|content calendar|community|posting|profile)\b/i, "/img/services/ad-concepts/social-media-management-ad-concept.webp"],
    [/\b(content|reels|video|photo|creative upload|posts)\b/i, "/img/services/ad-concepts/content-reels-ad-concept.webp"],
    [/\b(brand|identity|logo|guideline|visual system)\b/i, "/img/services/ad-concepts/brand-identity-ad-concept.webp"],
    [/\b(landing|website|websites|redesign|wordpress|page)\b/i, "/img/services/ad-concepts/website-development-ad-concept.webp"],
    [/\b(ecommerce|woocommerce|shopify|store|checkout|product)\b/i, "/img/services/ad-concepts/growth-system-ad-concept.webp"],
    [/\b(ai|automation|workflow|follow-up|crm|bot)\b/i, "/img/services/ad-concepts/ai-automation-ad-concept.webp"],
    [/\b(whatsapp|chat|message|booking|reminder)\b/i, "/img/services/ad-concepts/lead-generation-ad-concept.webp"],
    [/\b(app|saas|software|portal|system|dashboard)\b/i, "/img/services/ad-concepts/software-development-ad-concept.webp"],
  ];
  return rules.find(([pattern]) => pattern.test(value))?.[1] ?? SERVICE_CARD_IMAGE_POOL[index % SERVICE_CARD_IMAGE_POOL.length];
}

function diversifyServiceCardImages(html: string) {
  let index = 0;
  return html.replace(
    /<article\b(?=[^>]*\b(?:service-card|build-card)\b)[\s\S]*?<\/article>/gi,
    (card) => {
      const title = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? "";
      const alt = card.match(/<img\b[^>]*\balt=["']([^"']*)["'][^>]*>/i)?.[1] ?? "";
      const body = card.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "";
      const image = selectServiceCardImage(`${title} ${alt} ${body}`, index++);
      return card.replace(/(<img\b[^>]*\bsrc=)["'][^"']+["']/i, `$1"${image}"`);
    }
  );
}

function balanceDivTags(html: string) {
  let depth = 0;
  const balanced = html.replace(/<!--[\s\S]*?-->|<\/?div\b[^>]*>/gi, (tag) => {
    if (tag.startsWith('<!--')) return tag;
    if (/^<\/div/i.test(tag)) {
      if (depth === 0) return '';
      depth -= 1;
    } else {
      depth += 1;
    }
    return tag;
  });
  return balanced + '</div>'.repeat(depth);
}

export default function WordPressContent({
  html,
  className,
  fallbackImage = "/img/services/service-branding.webp",
  offsetFixedHeader = false,
}: WordPressContentProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Heavy regex processing of the (large) Elementor HTML — memoized so it runs
  // once per unique `html` instead of on every render/state change.
  const { styles, stylesheetHrefs, cleanBodyHtml, scriptsToRun } = useMemo(() => {
    const { bodyHtml, styles, stylesheetHrefs } = extractWpDocumentParts(html);

    // Only classic JavaScript should ever be executed. WordPress/Elementor pages
    // embed non-JS <script> blocks — JSON-LD structured data
    // (type="application/ld+json"), templating blocks (text/template, text/html),
    // bare JSON, etc. Running those as JS throws "Unexpected token ':'" and
    // surfaces as an unhandled overlay error. We strip every <script> from the
    // injected markup but only queue the executable ones.
    const isExecutableJs = (attrs: string): boolean => {
      const typeMatch = attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i);
      if (!typeMatch) return true; // no type attribute → classic JS
      const type = typeMatch[1].toLowerCase();
      return (
        type === "text/javascript" ||
        type === "application/javascript" ||
        type === "text/ecmascript" ||
        type === "application/ecmascript"
      );
    };

    const scriptsToRun: string[] = [];
    let cleanBodyHtml = bodyHtml.replace(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi,
      (_match, attrs: string, scriptContent: string) => {
        // Skip external (src=...) and non-JS scripts; only inline JS runs.
        if (!/\bsrc\s*=/i.test(attrs) && isExecutableJs(attrs)) {
          scriptsToRun.push(String(scriptContent).trim());
        }
        return "";
      }
    );

    // ── Accessibility / DOM normalisation ──
    cleanBodyHtml = cleanBodyHtml.replace(/<h4/g, "<h3").replace(/<\/h4>/g, "</h3>");
    cleanBodyHtml = cleanBodyHtml.replace(
      /<h3([^>]*)>\s*Animated Growth Engine\s*<\/h3>/gi,
      "<div$1>Animated Growth Engine</div>"
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<h3([^>]*)>\s*AI Support Hub\s*<\/h3>/gi,
      "<div$1>AI Support Hub</div>"
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<iframe\b(?![^>]*\btitle=)([^>]*)>/gi,
      '<iframe title="Embedded content" loading="lazy" $1>'
    );
    // Lazy-load + async-decode every WordPress image (cuts decode cost / scroll
    // image-pop jank on the long Elementor pages).
    cleanBodyHtml = cleanBodyHtml.replace(
      /<img\b(?![^>]*\bloading=)([^>]*?)>/gi,
      '<img loading="lazy" decoding="async" $1>'
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<img\b([^>]*?)\balt=["']\s*["']([^>]*)>/gi,
      '<img$1alt="Crea8iv Media website content visual"$2>'
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<img\b(?![^>]*\balt=)([^>]*?)>/gi,
      '<img alt="Crea8iv Media website content visual"$1>'
    );
    // Lottie: rename src → data-src so each animation initializes only when it
    // approaches the viewport (LottiePlayerLoader). Initializing all of them at
    // page load cost ~7s of mobile main-thread time.
    cleanBodyHtml = cleanBodyHtml.replace(
      /<lottie-player\b([^>]*?)\ssrc=/gi,
      "<lottie-player$1 data-src="
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /Widget not found![\s\S]*?(?:trustindex\.io[^<\s]*|business\.)/gi,
      ""
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<pre\b[^>]*\bclass=["'][^"']*\bti-widget\b[^"']*["'][^>]*>[\s\S]*?<\/pre>/gi,
      ""
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<template\b[^>]*\bid=["']trustindex-google-widget-html["'][^>]*>[\s\S]*?<\/template>/gi,
      ""
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<div\b[^>]*\bdata-id=["']65eb51f["'][^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
      ""
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<div\b[^>]*\bdata-template-id=["']trustindex-google-widget-html["'][^>]*>\s*<\/div>/gi,
      ""
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<div\b[^>]*\bdata-(?:src|css-url)=["'][^"']*trustindex[^"']*["'][^>]*>\s*<\/div>/gi,
      ""
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /<div\b[^>]*\bclass=["'][^"']*\bti-widget\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,
      ""
    );

    // WordPress pricing cards contain button > anchor, which creates nested
    // interactive controls. Keep the button's exact styling and move the URL to
    // a data attribute; hydration wires the same click behavior below.
    cleanBodyHtml = cleanBodyHtml.replace(
      /<button([^>]*)>\s*<a[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>\s*<\/button>/gi,
      '<button type="button" data-external-href="$2"$1><span>$3</span></button>'
    );
    cleanBodyHtml = cleanBodyHtml.replace(
      /(<a\b(?=[^>]*\bread_more\b)(?=[^>]*\bhref=["'])[^>]*\bhref=)["']\s*["']/gi,
      '$1"/growth-systems/"'
    );

    // ── Luxury Table & Data Enhancements ──
    cleanBodyHtml = cleanBodyHtml.replace(
      /<table\b([^>]*)>([\s\S]*?)<\/table>/gi,
      (_match, attrs, content) => {
        // Transform acronym bold tags inside <td> like <strong>SEO</strong> or <b>AEO</b> into luxury badges
        const enhancedContent = content.replace(
          /<td>\s*<(?:strong|b)>\s*([A-Z0-9\s/–-]{2,12})\s*<\/(?:strong|b)>\s*<\/td>/gi,
          '<td><span class="luxury-acronym-badge">$1</span></td>'
        );
        return `<div class="luxury-table-wrapper"><div class="luxury-table-scroll"><table${attrs}>${enhancedContent}</table></div><div class="luxury-table-hint"><span>Swipe horizontally to view full table</span></div></div>`;
      }
    );

    // Strip inline legacy fonts, colors, and fixed widths from post content elements to preserve dark theme
    cleanBodyHtml = cleanBodyHtml.replace(
      /(<(?:p|span|div|td|th|ul|ol|li)\b[^>]*)\bstyle=["']([^"']*)["']/gi,
      (match, tagHead, styleVal) => {
        const cleanedStyle = styleVal
          .replace(/(?:font-family|color|background-color)\s*:\s*[^;]+;?/gi, "")
          .replace(/(?:width|max-width)\s*:\s*\d+px;?/gi, "")
          .trim();
        return cleanedStyle ? `${tagHead} style="${cleanedStyle}"` : tagHead;
      }
    );

    // Purge empty paragraphs and orphan non-breaking spaces
    cleanBodyHtml = cleanBodyHtml.replace(/<p\b[^>]*>\s*(?:&nbsp;|\s)*<\/p>/gi, "");

    // Some older page snapshots still reference assets from the Astro mirror,
    // which is not part of this Next.js deployment. Keep those pages complete
    // with local branded fallbacks instead of shipping broken image requests.
    const replaceLegacyMirrorAssets = (value: string) => value
      .replace(/\/assets\/mirror\/images\.unsplash\.com\/[^"')\s]+/g, fallbackImage)
      .replace(/\/assets\/mirror\/crea8ivmedia\.com\/[^"')\s]+\.(?:svg|webp|png|jpe?g)/gi, fallbackImage)
      .replace(/\/assets\/mirror\/assets\d+\.lottiefiles\.com\/[^"')\s]+\.json/gi, "/img/robot.webp");

    cleanBodyHtml = diversifyServiceCardImages(cleanBodyHtml);

    // The legacy growth hero is missing one closing div before its section end.
    // HTML parsing closes it implicitly, which moves later React siblings out of
    // ContentShell and causes a hydration failure on /growth-systems/.
    cleanBodyHtml = cleanBodyHtml.replace(
      /(<section\b[^>]*\bclass=["'][^"']*\bcm-growth-hero\b[^"']*["'][^>]*>[\s\S]*?)(<\/section>)/i,
      "$1</div>$2"
    );

    // Legacy widget removal can leave orphan closing divs. In server HTML they
    // escape this opaque fragment and close React-owned wrappers, breaking
    // hydration of the following siblings. Keep the fragment self-contained.
    // Scripts/styles are already extracted above; ignore tags inside comments.
    cleanBodyHtml = balanceDivTags(cleanBodyHtml);

    return {
      styles: styles.map(replaceLegacyMirrorAssets),
      stylesheetHrefs,
      cleanBodyHtml: replaceLegacyMirrorAssets(cleanBodyHtml),
      scriptsToRun,
    };
  }, [html, fallbackImage]);

  // Hydration gates only the browser-only enhancements below. The actual page
  // content is server-rendered so it is immediately readable and crawlable.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Measure the first heading once the markup is injected and add only the top
  // padding needed to lift it clear of the fixed header. Runs in a layout effect
  // (before paint) so there is no visible shift, and re-runs on resize.
  useIsomorphicLayoutEffect(() => {
    if (!mounted || !offsetFixedHeader) return;
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      // Reset so we measure the hero's natural position, then compensate.
      el.style.paddingTop = "0px";

      // Find the topmost visible element that actually renders text (the hero
      // eyebrow/label or heading, whichever sits highest) so the whole hero
      // header clears the fixed navbar — not just the H1.
      let minTop = Infinity;
      const nodes = el.querySelectorAll(
        "h1, h2, h3, p, span, a, li, [class*='eyebrow'], [class*='tag'], [class*='label'], [class*='title']"
      );
      nodes.forEach((node) => {
        const text = (node.textContent || "").trim();
        if (!text) return;
        const rect = node.getBoundingClientRect();
        // Ignore zero-size and far-down elements (only care about the hero area).
        if (rect.height === 0 || rect.width === 0) return;
        if (rect.top > 600) return;
        if (rect.top < minTop) minTop = rect.top;
      });

      if (minTop === Infinity) {
        const first = el.firstElementChild;
        if (!first) return;
        minTop = first.getBoundingClientRect().top;
      }

      const clearance = window.innerWidth < 768 ? 88 : HEADER_CLEARANCE;
      const needed = minTop < clearance ? Math.ceil(clearance - minTop) : 0;
      el.style.paddingTop = `${needed}px`;
    };

    // Two passes: immediately, then after fonts/styles settle.
    measure();
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [mounted, offsetFixedHeader, html]);

  // Inject the per-page external stylesheet <link>s on the client. Most are
  // already loaded globally (deduped here); the inline <style> blocks that set
  // the section colours/backgrounds are rendered in JSX below so they are
  // present at first paint (no flash of unstyled / dark text).
  useEffect(() => {
    if (!mounted) return;
    const injected: HTMLElement[] = [];

    const existingHrefs = new Set(
      Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(
        (l) => (l as HTMLLinkElement).href
      )
    );
    stylesheetHrefs.forEach((href) => {
      const absolute = new URL(href, window.location.origin).href;
      // WordPress no longer serves this domain: every /wp-content|/wp-includes
      // plugin/theme stylesheet 404s (verified 2026-07-06). Skip them instead
      // of firing dead requests; the sections are styled by their SSR-inlined
      // <style> blocks.
      if (/\/wp-(content|includes)\//.test(new URL(absolute).pathname)) return;
      // The snapshot may contain a mirrored Font Awesome sheet, but the app
      // already loads the current icon CSS globally. Avoid a dead local mirror
      // request on every WordPress-rendered page.
      if (new URL(absolute).pathname.includes('/assets/mirror/cdnjs.cloudflare.com/')) return;
      if (existingHrefs.has(absolute)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute("data-wp-inline", "");
      document.head.appendChild(link);
      injected.push(link);
    });

    return () => {
      injected.forEach((el) => el.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, html]);

  // ── Mobile App-Like Enhancements ──
  // Convert specific vertical Elementor grids into horizontal swipe carousels on mobile
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const externalButtons = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>("[data-external-href]")
    );
    const openExternal = (event: Event) => {
      const href = (event.currentTarget as HTMLElement).dataset.externalHref;
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    };
    externalButtons.forEach((button) => button.addEventListener("click", openExternal));
    
    const headings = containerRef.current.querySelectorAll('h1, h2, h3, h4');
    headings.forEach((heading) => {
      const text = (heading.textContent || '').toLowerCase();
      if (
        text.includes('services') ||
        text.includes('portfolio') ||
        text.includes('case studies') ||
        text.includes('testimonials') ||
        text.includes('solutions') ||
        text.includes('industries') ||
        text.includes('features') ||
        text.includes('results') ||
        text.includes('process')
      ) {
        const parentSection = heading.closest('.elementor-section, .e-con');
        if (parentSection) {
          parentSection.classList.add('mobile-swipe-carousel');
        }
      }
    });
    return () => externalButtons.forEach((button) => button.removeEventListener("click", openExternal));
  }, [mounted, html]);

  // Run the WordPress inline scripts after jQuery + Elementor are available.
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      const win = window as unknown as Record<string, unknown>;
      if (win.jQuery || attempts > 50) {
        clearInterval(timer);

        if (!win.jQuery) {
          return;
        }

        scriptsToRun.forEach((code) => {
          if (!code) return;
          try {
            // Run via Function() rather than injecting a <script> element:
            // a syntax/runtime error here is a *catchable* exception, so one bad
            // inline script logs to the console instead of bubbling to
            // window.onerror and tripping the Next.js error overlay. Runs in the
            // global scope, so jQuery/Elementor globals stay available.
            new Function(code)();
          } catch (err) {
            console.error("WordPress inline script error:", err);
          }
        });

        const $ = win.jQuery as undefined | ((sel: unknown) => Record<string, unknown>);
        if ($) {
          try {
            const marquee = ($ as unknown as { fn?: { marquee?: unknown } }).fn?.marquee;
            if (marquee) ($("(.marquee-left)") as unknown as { marquee: (o: object) => void }).marquee({
                duration: 15000,
                gap: 50,
                delayBeforeStart: 0,
                direction: "left",
                duplicated: true,
              });
          } catch {
            /* marquee optional */
          }

          setTimeout(() => {
            try {
              const ef = win.elementorFrontend as undefined | { init?: () => void };
              ef?.init?.();
              window.dispatchEvent(new Event("resize"));
            } catch {
              /* elementor optional */
            }
          }, 400);
        }
      }
    }, 100);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, html, scriptsToRun.length]);

  return (
    <>
      {/* Per-page section styles — rendered server-side so colours/backgrounds
          are correct at first paint (no flash of dark/unstyled text). Style
          tags are deterministic and hydration-safe. */}
      {styles.map((css, i) => (
        <style key={`wp-style-${i}`} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <div
        ref={containerRef}
        data-service-tone={getServiceTone(pathname ?? "")}
        // wpcss-guard: kept visibility-hidden (layout preserved) until the
        // async WordPress stylesheets have loaded — see WordPressAssets.
        className={className ? `wpcss-guard legacy-content ${className}` : "wpcss-guard legacy-content"}
        suppressHydrationWarning
        // Keep the WordPress body in the initial HTML so search engines, AI
        // crawlers, and users see the real page before hydration. React treats
        // this subtree as opaque and suppresses warnings from legacy markup.
        dangerouslySetInnerHTML={{ __html: cleanBodyHtml }}
      />
    </>
  );
}
