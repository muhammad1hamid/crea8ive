import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const CANONICAL_SITE_URL = "https://crea8ivmedia.com";
const TARGET_URL = (process.env.CRAWL_BASE_URL || CANONICAL_SITE_URL).replace(/\/$/, "");
const WP_API = `${CANONICAL_SITE_URL}/wp-json/wp/v2`;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = process.env.CRAWL_OUTPUT
  ? path.resolve(ROOT, process.env.CRAWL_OUTPUT)
  : path.resolve(ROOT, "../reports/SEO_CRAWL_2026-06-21.json");
const AXE_PATH = path.resolve(ROOT, "node_modules/axe-core/axe.min.js");

const stripHtml = (value = "") =>
  value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

async function wpCollection(type) {
  const response = await fetch(
    `${WP_API}/${type}?per_page=100&status=publish&_embed=1&_fields=id,slug,link,date,modified,title,excerpt,content,yoast_head_json`
  );
  if (!response.ok) throw new Error(`${type} request failed: ${response.status}`);
  return response.json();
}

function schemaTypes(value, types = new Set()) {
  if (!value || typeof value !== "object") return types;
  const type = value["@type"];
  if (Array.isArray(type)) type.forEach((item) => types.add(String(item)));
  else if (type) types.add(String(type));
  if (Array.isArray(value)) value.forEach((item) => schemaTypes(item, types));
  else Object.values(value).forEach((item) => schemaTypes(item, types));
  return types;
}

async function main() {
  const [pages, posts] = await Promise.all([wpCollection("pages"), wpCollection("posts")]);
  const routes = new Map([[`${TARGET_URL}/`, { source: "page", slug: "home" }]]);

  for (const page of pages) {
    routes.set(page.slug === "home" ? `${TARGET_URL}/` : `${TARGET_URL}/${page.slug}/`, {
      source: "page",
      slug: page.slug,
      wpId: page.id,
      wpModified: page.modified,
      wpWords: stripHtml(page.content?.rendered).split(/\s+/).filter(Boolean).length,
    });
  }
  for (const post of posts) {
    routes.set(`${TARGET_URL}/${post.slug}/`, {
      source: "post",
      slug: post.slug,
      wpId: post.id,
      wpModified: post.modified,
      wpWords: stripHtml(post.content?.rendered).split(/\s+/).filter(Boolean).length,
    });
  }
  routes.set(`${TARGET_URL}/software-development/`, { source: "native", slug: "software-development" });
  routes.set(`${TARGET_URL}/software-products/`, { source: "native", slug: "software-products" });
  routes.set(`${TARGET_URL}/privacy-policy/`, { source: "native", slug: "privacy-policy" });
  routes.set(`${TARGET_URL}/terms-and-conditions/`, { source: "native", slug: "terms-and-conditions" });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.setCacheEnabled(false);

  const results = [];
  for (const [url, source] of routes) {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.addScriptTag({ path: AXE_PATH });

    const dom = await page.evaluate(async () => {
      const text = (element) => (element?.textContent || "").replace(/\s+/g, " ").trim();
      const absolutePath = (href) => {
        try {
          const parsed = new URL(href, location.href);
          return parsed.origin === location.origin ? parsed.pathname.replace(/\/+$/, "") || "/" : null;
        } catch {
          return null;
        }
      };

      const schemas = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => {
        try {
          return { valid: true, data: JSON.parse(script.textContent || "{}") };
        } catch (error) {
          return { valid: false, error: String(error) };
        }
      });
      const axe = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });

      return {
        finalUrl: location.href,
        lang: document.documentElement.lang || null,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || null,
        openGraph: {
          title: document.querySelector('meta[property="og:title"]')?.getAttribute("content") || null,
          description: document.querySelector('meta[property="og:description"]')?.getAttribute("content") || null,
          image: document.querySelector('meta[property="og:image"]')?.getAttribute("content") || null,
        },
        twitter: {
          card: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content") || null,
          title: document.querySelector('meta[name="twitter:title"]')?.getAttribute("content") || null,
          description: document.querySelector('meta[name="twitter:description"]')?.getAttribute("content") || null,
          image: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content") || null,
        },
        headings: Array.from(document.querySelectorAll("h1,h2,h3")).map((heading) => ({
          level: Number(heading.tagName.slice(1)),
          text: text(heading).slice(0, 180),
        })),
        images: {
          total: document.images.length,
          missingAlt: Array.from(document.images).filter((image) => !image.hasAttribute("alt")).length,
          emptyAlt: Array.from(document.images).filter((image) => image.getAttribute("alt") === "").length,
          lazy: Array.from(document.images).filter((image) => image.loading === "lazy").length,
          eager: Array.from(document.images).filter((image) => image.loading === "eager").length,
        },
        links: {
          total: document.links.length,
          emptyAccessibleName: Array.from(document.links).filter(
            (link) => !text(link) && !link.getAttribute("aria-label") && !link.querySelector("img[alt]")
          ).length,
          internalPaths: Array.from(
            new Set(Array.from(document.links).map((link) => absolutePath(link.href)).filter(Boolean))
          ).sort(),
        },
        controls: {
          unlabeled: Array.from(document.querySelectorAll("input,select,textarea,button")).filter((control) => {
            if (control.getAttribute("aria-label") || control.getAttribute("aria-labelledby")) return false;
            if (control.id && document.querySelector(`label[for="${CSS.escape(control.id)}"]`)) return false;
            if (control.closest("label")) return false;
            if (control.tagName === "BUTTON" && text(control)) return false;
            if (control.getAttribute("type") === "hidden") return false;
            return true;
          }).length,
          iframesWithoutTitle: document.querySelectorAll("iframe:not([title])").length,
        },
        landmarks: {
          main: document.querySelectorAll("main").length,
          nav: document.querySelectorAll("nav").length,
          footer: document.querySelectorAll("footer").length,
        },
        schema: {
          blocks: schemas.length,
          invalidBlocks: schemas.filter((item) => !item.valid).length,
          payloads: schemas.filter((item) => item.valid).map((item) => item.data),
        },
        accessibility: axe.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          nodes: violation.nodes.length,
        })),
        renderedWords: text(document.querySelector("main")).split(/\s+/).filter(Boolean).length,
      };
    });

    const rawResponse = await fetch(url, { redirect: "follow" });
    const rawHtml = await rawResponse.text();
    const rawBody = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || rawHtml;
    const rawVisible = stripHtml(rawBody);
    const schemaTypeSet = new Set();
    dom.schema.payloads.forEach((payload) => schemaTypes(payload, schemaTypeSet));
    delete dom.schema.payloads;

    results.push({
      url,
      ...source,
      status: response?.status() || null,
      rawStatus: rawResponse.status,
      rawH1Count: (rawBody.match(/<h1\b/gi) || []).length,
      rawWords: rawVisible.split(/\s+/).filter(Boolean).length,
      ...dom,
      schema: { ...dom.schema, types: Array.from(schemaTypeSet).sort() },
    });
    console.log(`${response?.status() || "ERR"} ${url}`);
  }

  await browser.close();

  const routePaths = new Set(Array.from(routes.keys()).map((url) => new URL(url).pathname.replace(/\/+$/, "") || "/"));
  const incoming = Object.fromEntries(Array.from(routePaths, (route) => [route, 0]));
  const unknownInternalPaths = new Set();
  for (const result of results) {
    for (const internalPath of result.links.internalPaths) {
      if (routePaths.has(internalPath)) incoming[internalPath] += 1;
      else if (!internalPath.startsWith("/wp-") && !internalPath.startsWith("/_next")) unknownInternalPaths.add(internalPath);
    }
  }

  const broken = [];
  for (const internalPath of unknownInternalPaths) {
    const response = await fetch(`${TARGET_URL}${internalPath}`, { redirect: "manual" });
    if (response.status >= 400) broken.push({ path: internalPath, status: response.status });
  }

  const duplicateTitles = Object.entries(
    results.reduce((groups, item) => {
      (groups[item.title] ||= []).push(item.url);
      return groups;
    }, {})
  ).filter(([, urls]) => urls.length > 1);
  const duplicateDescriptions = Object.entries(
    results.reduce((groups, item) => {
      (groups[item.description || ""] ||= []).push(item.url);
      return groups;
    }, {})
  ).filter(([, urls]) => urls.length > 1);

  const report = {
    generatedAt: new Date().toISOString(),
    site: TARGET_URL,
    totals: { pages: pages.length, posts: posts.length, crawled: results.length },
    duplicateTitles,
    duplicateDescriptions,
    orphans: Object.entries(incoming).filter(([route, count]) => route !== "/" && count === 0),
    brokenInternalLinks: broken,
    results,
  };

  await fs.writeFile(OUTPUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
