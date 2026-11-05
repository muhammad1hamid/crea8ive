#!/usr/bin/env node

import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(__filename);
const root = path.dirname(scriptsDir);
const frontendDir = path.join(root, "frontend");
const draftsDir = path.join(root, "project", "documentation", "blog-drafts");
const outDir = path.join(frontendDir, "out");

function parseArgs(argv) {
  const options = {
    slugs: [],
    skipExport: false,
    skipRss: false,
    skipDeploy: false,
    preflightOnly: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--slug") {
      const slug = argv[index + 1];
      if (!slug) throw new Error("--slug requires a value.");
      options.slugs.push(slug);
      index += 1;
      continue;
    }
    if (value.startsWith("--slug=")) {
      options.slugs.push(value.slice("--slug=".length));
      continue;
    }
    if (value === "--skip-export") {
      options.skipExport = true;
      continue;
    }
    if (value === "--skip-rss") {
      options.skipRss = true;
      continue;
    }
    if (value === "--skip-deploy") {
      options.skipDeploy = true;
      continue;
    }
    if (value === "--preflight-only") {
      options.preflightOnly = true;
      continue;
    }
    throw new Error(`Unknown argument: ${value}`);
  }

  if (!options.slugs.length) {
    throw new Error("Provide at least one --slug value.");
  }

  return options;
}

function parseFrontmatter(filePath) {
  const raw = readFileSync(filePath, "utf8");
  if (!raw.startsWith("---\n")) {
    throw new Error(`Draft is missing frontmatter: ${filePath}`);
  }
  const [, frontmatter] = raw.split("---\n", 3);
  const meta = {};
  let currentListKey = null;

  for (const line of frontmatter.split("\n")) {
    if (!line.trim()) continue;
    if (line.startsWith("  - ")) {
      if (!currentListKey) throw new Error(`Unexpected list item in ${filePath}: ${line}`);
      meta[currentListKey] ||= [];
      meta[currentListKey].push(line.slice(4).trim().replace(/^"|"$/g, ""));
      continue;
    }
    currentListKey = null;
    const separator = line.indexOf(":");
    if (separator === -1) throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!value) {
      meta[key] = [];
      currentListKey = key;
      continue;
    }
    meta[key] = value.replace(/^"|"$/g, "");
  }

  return meta;
}

function loadDraftMeta(slug) {
  const draftPath = findDraftPath(slug);
  const meta = parseFrontmatter(draftPath);
  if (meta.slug !== slug) {
    throw new Error(`Draft slug mismatch for ${draftPath}: expected "${slug}", found "${meta.slug}".`);
  }
  if (!meta.cover_image_url) {
    throw new Error(`Draft is missing cover_image_url: ${draftPath}`);
  }
  if (!meta.cover_alt) {
    throw new Error(`Draft is missing cover_alt: ${draftPath}`);
  }

  const publicPath = meta.cover_image_url.replace(/^https?:\/\/[^/]+/, "");
  const coverPath = path.join(frontendDir, "public", publicPath.replace(/^\//, ""));
  if (!existsSync(coverPath)) {
    throw new Error(`Cover image file not found for ${slug}: ${coverPath}`);
  }

  return { draftPath, meta, publicPath };
}

function findDraftPath(slug) {
  const names = readdirSync(draftsDir).filter((name) => name.endsWith(".md"));
  const matches = names.filter((name) => name.endsWith(`${slug}.md`));
  if (!matches.length) {
    throw new Error(`No draft file found for slug "${slug}" in ${draftsDir}.`);
  }
  if (matches.length > 1) {
    throw new Error(`Multiple draft files found for slug "${slug}": ${matches.join(", ")}`);
  }
  return path.join(draftsDir, matches[0]);
}

async function runCommand(command, args, options = {}) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd || root,
      stdio: "inherit",
      env: { ...process.env, ...(options.env || {}) },
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve({ ms: Date.now() - started });
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} exited with code ${code ?? "unknown"}`));
    });
  });
}

function buildManifest(slugs, metas) {
  const items = new Set([
    "blog/index.html",
    "blog/index.txt",
    "blog/page",
    "sitemap.xml",
    "rss.xml",
    "feed.xml",
  ]);

  for (const slug of slugs) {
    items.add(path.posix.join("blog", slug));
  }

  for (const { publicPath } of metas) {
    items.add(publicPath.replace(/^\//, ""));
  }

  return [...items];
}

function validateManifestEntries(entries) {
  for (const entry of entries) {
    const absolute = path.join(outDir, entry);
    if (!existsSync(absolute)) {
      throw new Error(`Expected export path is missing: ${absolute}`);
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const metas = options.slugs.map((slug) => loadDraftMeta(slug));
  const timings = [];

  if (!options.skipDeploy) {
    const result = await runCommand("bash", ["scripts/deploy_to_hostinger.sh", "--check"], { cwd: root });
    timings.push({ step: "preflight", seconds: Number((result.ms / 1000).toFixed(1)) });
    if (options.preflightOnly) {
      console.log(
        JSON.stringify(
          {
            ok: true,
            mode: "preflight-only",
            slugs: options.slugs,
            timings,
          },
          null,
          2
        )
      );
      return;
    }
  }

  if (!options.skipExport) {
    const result = await runCommand("npm", ["run", "export"], { cwd: frontendDir });
    timings.push({ step: "export", seconds: Number((result.ms / 1000).toFixed(1)) });
  }

  if (!options.skipRss) {
    const result = await runCommand("node", ["scripts/test-rss-feed.mjs"], { cwd: frontendDir });
    timings.push({ step: "rss", seconds: Number((result.ms / 1000).toFixed(1)) });
  }

  const manifestEntries = buildManifest(options.slugs, metas);
  validateManifestEntries(manifestEntries);

  let manifestPath = "";
  if (!options.skipDeploy) {
    const tempDir = mkdtempSync(path.join(os.tmpdir(), "crea8iv-seo-publish-"));
    manifestPath = path.join(tempDir, "deploy-manifest.txt");
    writeFileSync(`${manifestPath}`, `${manifestEntries.join("\n")}\n`, "utf8");
    const result = await runCommand("bash", ["scripts/deploy_to_hostinger.sh", "--manifest", manifestPath], { cwd: root });
    timings.push({ step: "deploy", seconds: Number((result.ms / 1000).toFixed(1)) });
    rmSync(tempDir, { recursive: true, force: true });
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        slugs: options.slugs,
        drafts: metas.map((item) => item.draftPath),
        manifestEntries,
        timings,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
