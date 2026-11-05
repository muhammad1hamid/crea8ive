import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const base = process.env.VERIFY_BASE || 'http://localhost:3012';
const redirects = JSON.parse(fs.readFileSync('src/data/qatar-redirects.json','utf8'));
const slugs = ['locations','us','uk','canada','australia','uae','saudi-arabia','qatar'];
const sitemap = fs.readFileSync('out/sitemap.xml','utf8');
const apache = fs.readFileSync('public/.htaccess','utf8');
assert(!sitemap.includes('/qa/'), 'Legacy Qatar URLs in sitemap');
assert(!fs.existsSync('out/qa'), 'Old Qatar pages still exported');
const titles = new Set();
for (const slug of slugs) {
  const html = fs.readFileSync(path.join(root,'out',slug,'index.html'),'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${slug}: H1 count`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title),`${slug}: duplicate/missing title`); titles.add(title);
  assert(html.includes(`rel="canonical" href="https://crea8ivmedia.com/${slug}/"`),`${slug}: canonical`);
  assert(html.includes('hrefLang="en-QA"') || html.includes('hrefLang="en-qa"') || html.includes('hreflang="en-QA"'),`${slug}: hreflang`);
  assert(!html.includes('href="/qa/'),`${slug}: old internal link`);
  assert(sitemap.includes(`https://crea8ivmedia.com/${slug}/`),`${slug}: sitemap missing`);
}
for (const [from,to] of Object.entries(redirects)) {
  assert(apache.includes(to.replace('#','?%{QUERY_STRING}#')),`${from}: Apache target missing`);
  for (const variant of new Set([from,from.replace(/\/$/,'')])) {
    const response = await fetch(`${base}${variant}?utm_source=migration-test`,{redirect:'manual'});
    assert.equal(response.status,301,`${variant}: expected 301`);
    const location = new URL(response.headers.get('location'),base);
    const expected = new URL(to,base);
    assert.equal(location.pathname,expected.pathname);
    assert.equal(location.hash,expected.hash);
    assert.equal(location.searchParams.get('utm_source'),'migration-test');
  }
  const target = new URL(to,base);
  const response = await fetch(target,{redirect:'manual'});
  assert.equal(response.status,200,`${to}: target must resolve without a chain`);
  if (target.hash) assert((await response.text()).includes(`id="${target.hash.slice(1)}"`),`${to}: missing anchor`);
}
assert.equal((await fetch(`${base}/qa/not-a-real-page/`,{redirect:'manual'})).status,404);
console.log(`PASS: ${slugs.length} market routes, ${Object.keys(redirects).length} redirect mappings, canonical/hreflang/sitemap/anchors; no legacy export.`);
