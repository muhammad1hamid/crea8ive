import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const source = await readFile(path.join(root, 'src/lib/website-portfolio.ts'), 'utf8');
const grids = JSON.parse(await readFile(path.join(root, 'src/data/portfolio-grid-assets.json'), 'utf8'));
const portfolioUrls = [...source.matchAll(/image: "([^"]+)"/g)].map(match => match[1]).concat(grids.map(item => item.optimizedSrc || item.src));
const homepageFiles = ['src/components/HomepageBelowHero.tsx', 'src/components/HeroSection.tsx', 'src/lib/client-logos.ts', 'src/app/(global)/page.tsx'];
const homepageSources = await Promise.all(homepageFiles.map(file => readFile(path.join(root, file), 'utf8')));
const homepageUrls = homepageSources.flatMap(text => [...text.matchAll(/["'](\/(?:img|assets|portfolio-optimized)\/[^"']+\.(?:webp|png|jpe?g))["']/g)].map(match => match[1]));
const urls = [...new Set([...portfolioUrls, ...homepageUrls])];
const live = process.argv.includes('--live');
const failures = [];
for (const url of urls) {
  try {
    await access(path.join(root, 'out', decodeURIComponent(url)));
    if (live) {
      const response = await fetch(`https://crea8ivmedia.com${url}`, { signal: AbortSignal.timeout(20000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`${response.status} ${response.headers.get('content-type')}`);
      const bytes = await response.arrayBuffer();
      if (!bytes.byteLength) throw new Error('Empty image response');
    }
  } catch (error) { failures.push(`${url}: ${error.message}`); }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Verified ${urls.length} homepage and portfolio images${live ? ' locally and live' : ' in export'}.`);
