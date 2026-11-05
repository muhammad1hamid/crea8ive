import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "out");
const siteOrigin = "https://crea8ivmedia.com";
const ignoredDirs = new Set(["_next", "img", "assets", "wp-content", "portfolio-assets", "portfolio-optimized"]);

async function collectHtml(directory, files = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory() && !ignoredDirs.has(entry.name)) await collectHtml(file, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(file);
  }
  return files;
}

function localPath(reference) {
  if (!reference || reference.startsWith("#")) return null;
  let url;
  try {
    url = new URL(reference, siteOrigin);
  } catch {
    return null;
  }
  if (url.origin !== siteOrigin) return null;
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.includes("\0")) return null;
  return pathname;
}

async function existsOnDisk(pathname) {
  const direct = path.resolve(out, `.${pathname}`);
  if (direct !== out && !direct.startsWith(`${out}${path.sep}`)) return false;
  const candidates = [direct];
  if (!path.extname(pathname)) candidates.push(path.join(direct, "index.html"), `${direct}.html`);
  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return true;
    } catch {}
  }
  return false;
}

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
try {
  const page = await browser.newPage();
  const htmlFiles = await collectHtml(out);
  const missing = new Map();
  const largeMedia = new Map();
  const pageIssues = [];
  let referencesChecked = 0;

  for (const file of htmlFiles) {
    const route = `/${path.relative(out, file).replace(/(?:^|\/)index\.html$/, "")}`;
    const html = await readFile(file, "utf8");
    const data = await page.evaluate((source) => {
      const doc = new DOMParser().parseFromString(source, "text/html");
      const links = [...doc.querySelectorAll("a[href]")].map((item) => item.getAttribute("href"));
      const assets = [
        ...[...doc.querySelectorAll("img[src],script[src],source[src],video[src],video[poster],link[rel=stylesheet][href]")]
          .map((item) => item.getAttribute("src") || item.getAttribute("poster") || item.getAttribute("href")),
        ...[...doc.querySelectorAll("img[srcset],source[srcset]")]
          .flatMap((item) => (item.getAttribute("srcset") || "").split(",").map((candidate) => candidate.trim().split(/\s+/)[0])),
      ];
      const schemaErrors = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap((item) => {
        try { JSON.parse(item.textContent || ""); return []; }
        catch { return ["Invalid JSON-LD"]; }
      });
      return {
        title: doc.title.trim(),
        description: doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || "",
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
        h1Count: doc.querySelectorAll("h1").length,
        imagesMissingAlt: doc.querySelectorAll("img:not([alt])").length,
        schemaErrors,
        links,
        assets,
      };
    }, html);

    const issues = [];
    if (!data.title) issues.push("Missing title");
    const isNotFoundPage = route === "/404" || route === "/404.html";
    if (!isNotFoundPage && !data.description) issues.push("Missing description");
    if (!isNotFoundPage && !data.canonical) issues.push("Missing canonical");
    if (data.h1Count !== 1) issues.push(`${data.h1Count} H1 headings`);
    if (data.imagesMissingAlt) issues.push(`${data.imagesMissingAlt} images missing alt`);
    issues.push(...data.schemaErrors);
    if (issues.length) pageIssues.push({ route, issues });

    for (const [kind, references] of [["link", data.links], ["asset", data.assets]]) {
      for (const reference of references) {
        const pathname = localPath(reference);
        if (!pathname || pathname.startsWith("/admin/") || pathname.startsWith("/app/")) continue;
        referencesChecked++;
        if (!(await existsOnDisk(pathname))) {
          const entry = missing.get(pathname) || { path: pathname, kind, pages: [] };
          if (entry.pages.length < 5 && !entry.pages.includes(route)) entry.pages.push(route);
          missing.set(pathname, entry);
        } else if (kind === "asset" && /\.(?:png|jpe?g|webp|avif|mp4|webm)$/i.test(pathname)) {
          if (!largeMedia.has(pathname)) largeMedia.set(pathname, (await stat(path.resolve(out, `.${pathname}`))).size);
        }
      }
    }
  }

  const result = {
    pagesScanned: htmlFiles.length,
    referencesChecked,
    notExportedReferences: [...missing.values()].sort((a, b) => a.path.localeCompare(b.path)),
    pageIssues,
    largestReferencedMedia: [...largeMedia.entries()]
      .sort((a, b) => b[1] - a[1]).slice(0, 20)
      .map(([file, bytes]) => ({ file, kib: Math.round(bytes / 1024) })),
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.notExportedReferences.some((item) => item.kind === "asset") || pageIssues.some((item) => item.issues.some((issue) => issue.startsWith("Invalid")))) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
