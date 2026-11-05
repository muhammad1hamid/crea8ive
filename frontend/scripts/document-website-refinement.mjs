import fs from 'node:fs/promises';
import path from 'node:path';

const dir = '../project/documentation/website-refinement-2026-10-21';
const root = '../reports/website-refinement-2026-10-21';
await fs.mkdir(dir, { recursive: true });
const inventory = JSON.parse(await fs.readFile(`${root}/before/route-inventory.json`, 'utf8'));
const rendered = JSON.parse(await fs.readFile(`${root}/before/rendered-audit.json`, 'utf8'));
const current = JSON.parse(await fs.readFile(`${root}/after/route-inventory.json`, 'utf8'));
let templateViews=[];
try { templateViews=JSON.parse(await fs.readFile(`${root}/templates-after/summary.json`,'utf8')).records; } catch { /* Template capture may not have run yet. */ }
const csv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
function purpose(route) {
  if (route === '/') return 'Agency discovery and project enquiry';
  if (route.startsWith('/blog')) return 'Editorial research and related service discovery';
  if (route.includes('case-studies') || route.includes('portfolio') || route.includes('results')) return 'Evaluate project evidence and implementation fit';
  if (route.startsWith('/tools')) return 'Complete a useful self-service assessment';
  if (route.includes('contact') || route.includes('consultation')) return 'Contact the agency or request consultation';
  if (route.includes('privacy') || route.includes('terms')) return 'Understand legal and privacy conditions';
  return 'Understand the existing offering or resource and choose a relevant next step';
}
const rows = [['Existing URL','Current target intent','Primary topic','Target keyword','Secondary topics','Related entities','Existing content gaps','Recommended improvements','Internal linking opportunities','Priority','Evidence']];
for (const page of inventory) rows.push([page.canonical,purpose(page.route),page.title,'Not established: requires query data','','Crea8iv Media','Not assessed editorially','Validate intent against Search Console before substantive changes','Review existing contextual destinations','P2','Hypothesis; no search-volume/ranking data available']);
await fs.writeFile(path.join(dir,'KEYWORD_MAP.csv'),rows.map(row=>row.map(csv).join(',')).join('\n')+'\n');
const clean = value => String(value).replaceAll('|','\\|').replaceAll('\n',' ');
const pages = ['# Page QA Report','','Generated from the baseline exported HTML, not a claim that every page received a visual or editorial review.','','| URL | Purpose | Metadata / H1 / schema syntax | Rendered coverage | Editorial status |','| --- | --- | --- | --- | --- |'];
const sections = ['# Section Improvement Matrix','','All server-rendered sections identified in sitemap HTML are listed below. Empty names remain unclassified; nothing is inferred from a class alone. Only the specifically identified components have been refined.','','| Page | Section | Current heading | Evidence / recommendation | Status |','| --- | --- | --- | --- | --- |'];
for (const page of inventory) {
  const widths = [...new Set([...rendered.observations,...templateViews].filter(row=>row.route===page.route).map(row=>row.width))].sort((a,b)=>a-b);
  const valid = page.title && page.description && page.canonical && page.h1.length===1 && page.schemas.every(schema=>schema.valid);
  pages.push(`| ${page.route} | ${purpose(page.route)} | ${valid ? 'Pass: limited automated checks' : 'Inspect inventory'} | ${widths.length ? widths.join(', ')+'px' : 'Not visually reviewed'} | Not rewritten; intent requires query data |`);
  for (const section of (current.find(row=>row.route===page.route)?.sections || page.sections)) {
    const implemented = (page.route==='/' && /home-premium-position|home-conversion-strip|home-industry|home-growth|diagnostic|creative|closing/.test(section.className)) || (/^\/(blog|website-development|google-ads|social-media-management|branding-and-creative|software-development|google-business-profile-growth|contact|consultation|pricing|locations|us|qatar)\//.test(page.route) && !/hero/.test(section.className));
    sections.push(`| ${page.route} | ${clean(section.id || section.className)} | ${clean(section.heading)} | ${implemented ? 'Shared component/template refinements applied; preserve content and inspect screenshots for this page family' : widths.length ? 'Page viewport captured; retain existing composition unless a specific issue is verified' : 'Current HTML inventory; retained existing layout, no individual visual sign-off'} | ${implemented ? 'Refined locally; representative QA, not individual section certification' : 'Preserved'} |`);
  }
}
await fs.writeFile(path.join(dir,'PAGE_QA_REPORT.md'),pages.join('\n')+'\n');
await fs.writeFile(path.join(dir,'SECTION_IMPROVEMENT_MATRIX.md'),sections.join('\n')+'\n');
const routes = new Set(inventory.map(page=>page.route));
const unresolved = [];
for (const page of inventory) for (const href of page.internalLinks) {
  const url = new URL(href,'https://crea8ivmedia.com');
  if (routes.has(url.pathname) || routes.has(`${url.pathname}/`)) continue;
  const file = path.join('out',decodeURIComponent(url.pathname));
  try { await fs.access(file); } catch { unresolved.push({ from:page.route, href, status:'Requires redirect/runtime review; not proven broken' }); }
}
await fs.writeFile(`${root}/internal-link-review.json`,JSON.stringify(unresolved,null,2));
console.log(JSON.stringify({ pages:inventory.length,currentSections:current.reduce((sum,page)=>sum+page.sections.length,0),redirectOrRuntimeLinksToReview:unresolved.length }));
