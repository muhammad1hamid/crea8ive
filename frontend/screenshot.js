const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for desktop
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Capture Live Site
  try {
    await page.goto('https://crea8ivmedia.com/', { waitUntil: 'networkidle2' });
    // Hide wpadminbar if any
    await page.evaluate(() => {
      const wpbar = document.getElementById('wpadminbar');
      if (wpbar) wpbar.style.display = 'none';
    });
    // Wait for animations
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshot_live.png' });
    console.log('Saved screenshot_live.png');
  } catch (err) {
    console.error('Failed to capture live site:', err);
  }

  // 2. Capture Local Site
  try {
    await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'screenshot_local.png' });
    console.log('Saved screenshot_local.png');
  } catch (err) {
    console.error('Failed to capture local site:', err);
  }

  await browser.close();
})();
