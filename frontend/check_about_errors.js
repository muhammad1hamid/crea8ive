const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:3005/about', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();
