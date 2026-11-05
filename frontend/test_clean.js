const SITE_URL = "https://crea8ivmedia.com";
const WORDPRESS_SITE_URL = "https://crea8ivmedia.com";

function cleanWpHtml(html) {
  return html
    .replace(/https:\/\/darkgray-eland-964548\.hostingersite\.com/gi, WORDPRESS_SITE_URL)
    .replace(new RegExp(`href=["']${WORDPRESS_SITE_URL}/?`, "gi"), 'href="/')
    .replace(/href=["']growth["']/gi, 'href="/growth-systems/"');
}

async function test() {
  const res = await fetch('https://crea8ivmedia.com/wp-json/wp/v2/pages?slug=consultation');
  const pages = await res.json();
  const rawHtml = pages[0].content.rendered;
  
  // Find all hrefs in raw HTML
  const rawHrefs = Array.from(rawHtml.matchAll(/href=["']([^"']+)["']/g)).map(m => m[1]);
  console.log('Raw Hrefs in contact page:');
  console.log(rawHrefs);
  
  const cleanedHtml = cleanWpHtml(rawHtml);
  const cleanedHrefs = Array.from(cleanedHtml.matchAll(/href=["']([^"']+)["']/g)).map(m => m[1]);
  console.log('\nCleaned Hrefs in contact page:');
  console.log(cleanedHrefs);
}

test();
