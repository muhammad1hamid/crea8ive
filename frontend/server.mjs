import { createServer } from "node:http";
import { createReadStream, existsSync, statSync, readFileSync } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const outDir = process.env.OUT_DIR || path.join(__dirname, "out");
const qatarRedirects = JSON.parse(readFileSync(path.join(outDir, 'qatar-redirects.json'), 'utf8'));
const siteUrl = process.env.SITE_URL || "https://crea8ivmedia.com";
const phpApiOrigin = process.env.PHP_API_ORIGIN || "https://php-api.crea8ivmedia.com";
const patientflowOrigin = process.env.PATIENTFLOW_ORIGIN || "https://patientflow.crea8ivmedia.com";
const assetOrigin = process.env.ASSET_ORIGIN || "";
const assetVersion = process.env.ASSET_VERSION || "20260819";
const noIndex = process.env.NO_INDEX === "true";

// The same reviewed aliases are used by Next.js and sitemap generation.
const legacyRedirects = JSON.parse(readFileSync(path.join(__dirname, "src/data/legacy-redirects.json"), "utf8"));

const gonePattern =
  /(casino|slots?|blackjack|roulette|poker|baccarat|bookmaker|sportsbook|gambl|wager|jackpot|bingo|keno|craps|scratch-cards|fruit-machine|rummy|andar-bahar|sic-bo|megaways|zimpler|neosurf|flexepin|paysafe|payid|unlimluck|dream-catcher|cash-spins|free-spins|spin-palace|withdrawal|no-deposit|^\/(?:product|product-tag|author|tag|category)\/)/i;

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    ...(noIndex ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    ...headers,
  });
  res.end(body);
}

function redirect(res, location, status = 301) {
  send(res, status, "", { Location: location, "Cache-Control": "no-cache" });
}

function resolveStaticFile(pathname) {
  const cleanPath = pathname.replace(/^\/+/, "");
  const directPath = path.resolve(outDir, cleanPath);
  if (!directPath.startsWith(path.resolve(outDir) + path.sep) && directPath !== path.resolve(outDir)) return null;
  if (/\.php$/i.test(directPath)) return null;

  if (existsSync(directPath) && statSync(directPath).isFile()) {
    return directPath;
  }

  if (pathname.endsWith("/")) {
    const indexPath = path.join(outDir, cleanPath, "index.html");
    if (existsSync(indexPath) && statSync(indexPath).isFile()) {
      return indexPath;
    }
  }

  const htmlPath = path.join(outDir, `${cleanPath}.html`);
  if (existsSync(htmlPath) && statSync(htmlPath).isFile()) {
    return htmlPath;
  }

  return null;
}

function serveStatic(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const immutable = filePath.includes(`${path.sep}_next${path.sep}static${path.sep}`);
  const media = /\.(avif|webp|png|jpe?g|gif|svg|ico|mp4|webm|mp3|wav|woff2?)$/i.test(filePath);
  const html = ext === ".html";
  const compressible = /\.(?:html|css|js|json|txt|xml|svg|md)$/i.test(filePath);
  const acceptsGzip = String(req.headers["accept-encoding"] || "").split(",").some(value => {
    const [encoding, ...parameters] = value.trim().toLowerCase().split(";").map(part => part.trim());
    return encoding === "gzip" && !parameters.some(parameter => /^q=0(?:\.0*)?$/.test(parameter));
  });
  const gzip = compressible && acceptsGzip;


  res.writeHead(200, {
    "Content-Type": contentTypes.get(ext) || "application/octet-stream",
    ...(compressible ? { Vary: "Accept-Encoding" } : {}),
    ...(gzip ? { "Content-Encoding": "gzip" } : {}),
    "Cache-Control": immutable
      ? "public, max-age=31536000, immutable"
      : media
        ? "public, max-age=31536000"
        : html
          ? "no-cache, must-revalidate"
          : "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    ...(noIndex ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
  });

  if (req.method === "HEAD") { res.end(); return; }
  const source = createReadStream(filePath);
  const done = error => { if (error && !res.destroyed) res.destroy(error); };
  if (gzip) pipeline(source, createGzip(), res, done);
  else pipeline(source, res, done);
}

async function proxyPhpApi(req, res, url) {
  const upstreamPath = url.pathname.replace(/^\/app\/?/, "/");
  const upstreamUrl = new URL(`${upstreamPath}${url.search}`, phpApiOrigin);
  const headers = new Headers(req.headers);

  headers.set("host", upstreamUrl.host);
  headers.set("x-forwarded-host", req.headers.host || "crea8ivmedia.com");
  headers.set("x-forwarded-proto", "https");

  try {
    const upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method || "GET") ? undefined : req,
      duplex: ["GET", "HEAD"].includes(req.method || "GET") ? undefined : "half",
      redirect: "manual",
    });

    const responseHeaders = {};
    upstream.headers.forEach((value, key) => {
      if (!["content-encoding", "content-length", "transfer-encoding"].includes(key.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });

    res.writeHead(upstream.status, responseHeaders);

    if (req.method === "HEAD" || !upstream.body) {
      res.end();
      return;
    }

    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error) {
    send(res, 502, "Bad Gateway", { "Content-Type": "text/plain; charset=utf-8" });
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", siteUrl);
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { send(res,400,"Bad Request"); return; }
  if (pathname.includes("\0")) { send(res,400,"Bad Request"); return; }

  if (pathname === "/node-health") {
    send(res, 200, JSON.stringify({ ok: true, app: "crea8iv-media-public", mode: "node" }), {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    return;
  }

  if (url.searchParams.has("p") || url.searchParams.has("page_id") || url.searchParams.has("attachment_id")) {
    redirect(res, pathname === "/" ? "/" : `${pathname}?`, 301);
    return;
  }

  if (gonePattern.test(pathname)) {
    send(res, 410, "Gone", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  if (pathname === "/clinic" || pathname.startsWith("/clinic/")) {
    const patientflowPath = pathname.replace(/^\/clinic\/?/, "/") || "/login";
    redirect(res, new URL(`${patientflowPath}${url.search}`, patientflowOrigin).toString(), 302);
    return;
  }

  if (pathname === "/portfolio-assets" || pathname.startsWith("/portfolio-assets/")) {
    send(res, 410, "Gone", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  if (assetOrigin && (pathname === "/portfolio-optimized" || pathname.startsWith("/portfolio-optimized/"))) {
    const assetUrl = new URL(`${pathname}${url.search}`, assetOrigin);
    if (assetVersion && !assetUrl.searchParams.has("v")) {
      assetUrl.searchParams.set("v", assetVersion);
    }
    redirect(res, assetUrl.toString(), 302);
    return;
  }

  if (pathname === "/app" || pathname.startsWith("/app/")) {
    await proxyPhpApi(req, res, url);
    return;
  }

  const qatarTarget = qatarRedirects[pathname] || qatarRedirects[`${pathname.replace(/\/+$/, '')}/`];
  if (qatarTarget) {
    const destination = new URL(qatarTarget, siteUrl);
    destination.search = url.search;
    redirect(res, `${destination.pathname}${destination.search}${destination.hash}`, 301);
    return;
  }
  // Removed Qatar paths must never fall through to stale exported files.
  if (/^\/qa(?:\/|$)/.test(pathname)) {
    send(res, 404, 'Not Found', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }
  const legacyTarget = legacyRedirects[`${pathname.replace(/\/+$/, "")}/`];
  if (legacyTarget) {
    redirect(res, `${legacyTarget}${url.search}`, 301);
    return;
  }

  // Retired collection-detail pages must redirect before stale exported HTML.
  if (/^\/(?:website-portfolio|results)\/[^/]+\/?$/.test(pathname)) {
    const collection = pathname.startsWith("/website-portfolio/") ? "/website-portfolio/" : "/results/";
    redirect(res, `${collection}${url.search}`, 301);
    return;
  }

  if (pathname === "/enquiries/submit.php") {
    if (!process.env.ENQUIRY_PHP_ORIGIN) {
      send(res, 503, JSON.stringify({error:"Enquiry storage is not configured for this host. Please email info@crea8ivmedia.com."}), {"Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store"});
      return;
    }
    const upstream = new URL(url.pathname, process.env.ENQUIRY_PHP_ORIGIN);
    try {
      const response = await fetch(upstream, {method:req.method, headers:{"Content-Type":req.headers["content-type"] || "", Origin:req.headers.origin || ""}, body:["GET","HEAD"].includes(req.method||"GET")?undefined:req, duplex:"half", signal:AbortSignal.timeout(15000), redirect:"error"});
      send(res,response.status,await response.text(),{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});
    } catch { send(res,503,JSON.stringify({error:"Unable to save enquiry. Please retry."}),{"Content-Type":"application/json; charset=utf-8"}); }
    return;
  }
  if (/\.php$/i.test(pathname)) { send(res,404,"Not Found"); return; }

  const filePath = resolveStaticFile(pathname);
  if (filePath) {
    serveStatic(req, res, filePath);
    return;
  }

  if (!pathname.endsWith("/")) {
    const slashPath = `${pathname}/`;
    if (resolveStaticFile(slashPath)) {
      redirect(res, `${slashPath}${url.search}`, 301);
      return;
    }
  }

  const notFoundPath = path.join(outDir, "404.html");
  if (existsSync(notFoundPath)) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
    createReadStream(notFoundPath).pipe(res);
    return;
  }

  send(res, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
}).listen(port, () => {
  console.log(`Crea8iv Media public Node app listening on :${port}`);
  console.log(`Serving static export from ${outDir}`);
});
