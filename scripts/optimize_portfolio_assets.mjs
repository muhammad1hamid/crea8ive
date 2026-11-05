import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "frontend", "public");
const manifestPath = path.join(root, "frontend", "src", "data", "local-portfolio.json");
const optimizedRoot = path.join(publicDir, "portfolio-optimized");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "pipe", encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} failed:\n${result.stderr || result.stdout}`);
  }
}

function publicPathToFile(src) {
  return path.join(publicDir, decodeURIComponent(src.replace(/^\//, "")));
}

function optimizedFile(asset, extension, suffix = "") {
  const original = decodeURIComponent(asset.src.replace(/^\/portfolio-assets\//, ""));
  const parsed = path.parse(original);
  return path.join(optimizedRoot, parsed.dir, `${parsed.name}${suffix}.${extension}`);
}

function publicOptimizedPath(file) {
  return `/${path.relative(publicDir, file).split(path.sep).map(encodeURIComponent).join("/")}`;
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function readImageSize(file) {
  const result = spawnSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file], { stdio: "pipe", encoding: "utf8" });
  if (result.status !== 0) return null;
  const width = Number(result.stdout.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(result.stdout.match(/pixelHeight:\s*(\d+)/)?.[1]);
  return width > 0 && height > 0 ? { width, height } : null;
}

function convertImage(input, output) {
  ensureDir(output);
  run("cwebp", [
    "-quiet",
    "-q",
    "78",
    "-resize",
    "1600",
    "0",
    input,
    "-o",
    output,
  ]);
}

function convertPdf(input, output) {
  ensureDir(output);
  const tmpPrefix = path.join(os.tmpdir(), `crea8iv-pdf-${process.pid}-${Math.random().toString(16).slice(2)}`);
  const tmpJpg = `${tmpPrefix}.jpg`;
  run("pdftoppm", ["-f", "1", "-singlefile", "-jpeg", "-r", "144", input, tmpPrefix]);
  convertImage(tmpJpg, output);
  fs.rmSync(tmpJpg, { force: true });
}

function convertVideo(input, posterOutput, mp4Output) {
  ensureDir(posterOutput);
  ensureDir(mp4Output);
  const tmpPoster = path.join(os.tmpdir(), `crea8iv-video-${process.pid}-${Math.random().toString(16).slice(2)}.jpg`);
  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-ss",
    "00:00:01",
    "-i",
    input,
    "-frames:v",
    "1",
    "-vf",
    "scale='min(1200,iw)':-2",
    tmpPoster,
  ]);
  convertImage(tmpPoster, posterOutput);
  fs.rmSync(tmpPoster, { force: true });
  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    input,
    "-vf",
    "scale='min(900,iw)':-2",
    "-c:v",
    "libx264",
    "-profile:v",
    "main",
    "-preset",
    "veryfast",
    "-crf",
    "28",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    mp4Output,
  ]);
}

let optimized = 0;
for (const asset of manifest.assets) {
  if (asset.category === "Blog Covers 2026 Premium") continue;
  const input = publicPathToFile(asset.src);
  if (!fs.existsSync(input)) {
    console.warn(`Missing source: ${asset.src}`);
    continue;
  }

  if (asset.kind === "image") {
    const output = optimizedFile(asset, "webp");
    if (!fs.existsSync(output)) convertImage(input, output);
    const size = readImageSize(output);
    asset.optimizedSrc = publicOptimizedPath(output);
    if (size) {
      asset.optimizedWidth = size.width;
      asset.optimizedHeight = size.height;
    }
    optimized += 1;
  }

  if (asset.kind === "pdf") {
    const output = optimizedFile(asset, "webp", "-cover");
    if (!fs.existsSync(output)) convertPdf(input, output);
    const size = readImageSize(output);
    asset.posterSrc = publicOptimizedPath(output);
    if (size) {
      asset.posterWidth = size.width;
      asset.posterHeight = size.height;
    }
    optimized += 1;
  }

  if (asset.kind === "video") {
    const posterOutput = optimizedFile(asset, "webp", "-poster");
    const mp4Output = optimizedFile(asset, "mp4", "-play");
    if (!fs.existsSync(posterOutput) || !fs.existsSync(mp4Output)) {
      convertVideo(input, posterOutput, mp4Output);
    }
    const size = readImageSize(posterOutput);
    asset.posterSrc = publicOptimizedPath(posterOutput);
    asset.playSrc = publicOptimizedPath(mp4Output);
    if (size) {
      asset.posterWidth = size.width;
      asset.posterHeight = size.height;
    }
    optimized += 1;
  }
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Optimized portfolio media entries: ${optimized}`);
