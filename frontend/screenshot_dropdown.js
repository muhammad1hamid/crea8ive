const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  try {
    await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    // Hover on "Growth Systems" button
    // Find button with text containing "Growth Systems"
    const elements = await page.$$('button');
    let growthSystemsBtn = null;
    for (const el of elements) {
      const text = await page.evaluate(element => element.textContent, el);
      if (text.includes('Growth Systems')) {
        growthSystemsBtn = el;
        break;
      }
    }
    
    if (growthSystemsBtn) {
      console.log('Found Growth Systems button, hovering...');
      await growthSystemsBtn.hover();
      await new Promise(r => setTimeout(r, 1000)); // wait for dropdown animation
      await page.screenshot({ path: 'screenshot_dropdown_local.png' });
      console.log('Saved screenshot_dropdown_local.png');
    } else {
      console.log('Growth Systems button NOT found!');
    }
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();
