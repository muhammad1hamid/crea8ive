import { access, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { auditIndexing } from "./lib/indexing-audit.mjs";

const root = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(root, "out");
const sourceRoots = [path.join(root, "src"), path.join(root, "public"), path.join(root, "next.config.js")];
const ignoredDirectories = new Set([".deploy", ".next", "node_modules", "out", "portfolio-assets"]);

async function newestMtime(target) {
  const targetStat = await stat(target);
  if (!targetStat.isDirectory()) return targetStat.mtimeMs;

  // Export temporarily moves runtime-only directories and restores them after
  // rendering. Directory mtimes change without source content changing.
  let newest = 0;
  for (const entry of await readdir(target, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    newest = Math.max(newest, await newestMtime(path.join(target, entry.name)));
  }
  return newest;
}

async function exists(target) {
  try {
    await access(target, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function routeFile(url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/") return path.join(outputDir, "index.html");
  const relativePath = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, "");
  // Public discoverability assets such as llms.txt and services.md are real
  // files, while application routes use trailing-slash index.html output.
  return path.extname(relativePath)
    ? path.join(outputDir, relativePath)
    : path.join(outputDir, relativePath, "index.html");
}

function readTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim() ?? "";
}

async function main() {
  if (!(await exists(outputDir))) throw new Error("Missing frontend/out. Run npm run export first.");

  const outputIndex = path.join(outputDir, "index.html");
  if (!(await exists(outputIndex))) throw new Error("Static export is missing out/index.html.");

  const newestSource = Math.max(...(await Promise.all(sourceRoots.map(newestMtime))));
  const outputMtime = (await stat(outputIndex)).mtimeMs;
  if (outputMtime < newestSource) throw new Error("Static export is stale: source files are newer than out/index.html.");

  const sitemapPath = path.join(outputDir, "sitemap.xml");
  const sitemap = await readFile(sitemapPath, "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (!urls.length) throw new Error("No URLs found in out/sitemap.xml.");

  const missing = [];
  const titleRoutes = new Map();
  for (const url of urls) {
    const file = routeFile(url);
    if (!(await exists(file))) {
      missing.push(new URL(url).pathname);
      continue;
    }

    const title = readTitle(await readFile(file, "utf8"));
    if (!title) continue;
    const routes = titleRoutes.get(title) ?? [];
    routes.push(new URL(url).pathname);
    titleRoutes.set(title, routes);
  }

  if (missing.length) throw new Error(`Missing exported routes:\n${missing.join("\n")}`);

  const duplicateTitles = [...titleRoutes.entries()].filter(([, routes]) => routes.length > 1);
  if (duplicateTitles.length) {
    const details = duplicateTitles.map(([title, routes]) => `${title}: ${routes.join(", ")}`).join("\n");
    throw new Error(`Duplicate HTML titles found:\n${details}`);
  }

  const redirects = JSON.parse(await readFile(path.join(root, "src/data/legacy-redirects.json"), "utf8"));
  const qatarRedirects = JSON.parse(await readFile(path.join(root, "src/data/qatar-redirects.json"), "utf8"));
  const indexing = await auditIndexing(outputDir, redirects, qatarRedirects);
  if (indexing.errors.length) throw new Error(`Indexing release checks failed:\n${indexing.errors.join("\n")}`);

  let gitCommit = "unavailable";
  try {
    gitCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {}

  const manifest = {
    generatedAt: new Date().toISOString(),
    gitCommit,
    routeCount: urls.length,
    checks: {
      freshExport: true,
      allSitemapRoutesPresent: true,
      duplicateTitles: 0,
      sitemapCanonicalAndIndexable: true,
      reviewedRedirects: indexing.reviewedRedirects,
    },
  };

  await writeFile(path.join(outputDir, "release-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  process.stdout.write(`Release verified: ${urls.length} routes, 0 missing, 0 duplicate titles.\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
