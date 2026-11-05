const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  try {
    await page.goto('http://localhost:3005/about', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshot_about.png' });
    console.log('Saved screenshot_about.png');
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();
