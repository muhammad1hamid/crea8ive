import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root = path.resolve(import.meta.dirname, '../..');
const dir = path.join(root, 'reports/consulting-editorial');
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const mod = { exports: {} }; cache.set(file, mod.exports);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function('require','exports','module',code)(id => id.includes('authority-data') ? { FOUNDER: { name: 'Syed Qamar Abbas' } } : load(path.resolve(path.dirname(file), id + '.ts')), mod.exports, mod);
  return mod.exports;
}
const { ARTICLE_TREATMENTS, CASE_TREATMENTS, CONSULTING_DISCIPLINES } = load(path.join(root,'frontend/src/lib/consulting-editorial.ts'));
const audit = JSON.parse(fs.readFileSync(path.join(dir,'live-source-audit.json'),'utf8'));
const rows = audit.records.filter(r => r.url.startsWith('https://crea8ivmedia.com/')).map(r => {
  const slug = r.url.split('/').filter(Boolean).at(-1);
  const article = r.url.includes('/blog/'); const t = (article ? ARTICLE_TREATMENTS : CASE_TREATMENTS)[slug];
  const flags = ['Individual author, reviewer and personal project responsibilities are not established by a template credit.'];
  if (/statistics|cost|spend|trends|2026|overviews-ads|conversational|social-platforms/.test(slug)) flags.push('Reconfirm dated platform availability, pricing, statistics and third-party claims against primary sources before relying on them. Existing article statements are not validated by this editorial addition.');
  if (!article) flags.push('Any historical strategy role, measured outcome and measurement period require approved project records.');
  return { url:r.url, topic:r.title, audience:t?.audience || 'Editorial review pending', businessProblem:t?.question || '', discipline:t?.discipline || 'No consulting referral recommended', evidence: article ? t?.evidence?.context || 'No matching project proof asserted; use the practical checks in the article.' : t?.evidence || '', credit:article ? 'Agency editorial responsibility; no named writer or review record supplied in local Markdown.' : 'Crea8iv Media delivery; no individual responsibility attributed.', destination:t?.discipline ? CONSULTING_DISCIPLINES[t.discipline].url : '', addition:t?.question || 'Pending', factsToConfirm:flags.join(' '), status:t ? 'Prepared' : 'Pending', sourceStatus:r.status };
});
for (const [slug, t] of Object.entries(CASE_TREATMENTS)) {
  const url = `https://crea8ivmedia.com/case-studies/${slug}/`;
  if (rows.some((row) => row.url === url)) continue;
  rows.push({
    url,
    topic: `${t.client} case study`,
    audience: t.audience,
    businessProblem: t.question,
    discipline: t.discipline,
    evidence: t.evidence,
    credit: 'Crea8iv Media delivery; no individual responsibility attributed.',
    destination: CONSULTING_DISCIPLINES[t.discipline].url,
    addition: t.question,
    factsToConfirm: 'Local case-study route prepared for deployment. Any historical strategy role, measured outcome and measurement period require approved project records.',
    status: 'Prepared',
    sourceStatus: 'local-export',
  });
}
fs.writeFileSync(path.join(dir,'content-map.json'),JSON.stringify({date:'2026-09-30',sourceAudit:audit.checkedAt,rows},null,2));
const columns=Object.keys(rows[0]);
fs.writeFileSync(path.join(dir,'content-map.csv'),[columns,...rows.map(r=>columns.map(c=>r[c]))].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n');
fs.writeFileSync(path.join(dir,'content-map.md'),'# Consulting Editorial Content Map\n\nReviewed live inventory: '+rows.length+' substantive pages. Source texts and destinations are retained in live-source-audit.json. Prepared does not mean deployed.\n\n'+rows.map(r=>'## '+r.topic+'\n- URL: '+r.url+'\n- Audience: '+r.audience+'\n- Business question / addition: '+r.addition+'\n- Discipline: '+r.discipline+'\n- Evidence: '+r.evidence+'\n- Attribution: '+r.credit+'\n- Destination: '+(r.destination || 'None')+'\n- Confirmation: '+r.factsToConfirm+'\n- Status: '+r.status+'\n').join('\n'));
console.log(JSON.stringify({pages:rows.length,prepared:rows.filter(r=>r.status==='Prepared').length,pending:rows.filter(r=>r.status==='Pending').length}));
