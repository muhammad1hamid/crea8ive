import pages from "../data/pages.json";
import { EXTRA_ROUTES } from "../data/site";
const SITE = "https://crea8ivmedia.com";
export function GET() {
  const snapshotUrls = pages.map((page) => page.slug === "home" ? "/" : `/${page.slug}/`);
  const urls = [...new Set([...snapshotUrls, ...EXTRA_ROUTES])]
    .map((path) => `<url><loc>${SITE}${path}</loc></url>`)
    .join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "Content-Type": "application/xml" } });
}
