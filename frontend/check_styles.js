const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  try {
    await page.goto('http://localhost:3005/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    
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
      await growthSystemsBtn.hover();
      await new Promise(r => setTimeout(r, 500));
      
      const computed = await page.evaluate(() => {
        // Find the dropdown div. It's the sibling of the button's parent or inside.
        // Let's find any div with w-[320px] or absolute top-full
        const dropdowns = Array.from(document.querySelectorAll('div')).filter(el => el.className.includes('absolute') && el.className.includes('z-50'));
        if (dropdowns.length === 0) return 'No dropdown found';
        const dropdown = dropdowns[0];
        const style = window.getComputedStyle(dropdown);
        return {
          className: dropdown.className,
          styleAttr: dropdown.getAttribute('style'),
          borderColor: style.borderColor,
          borderWidth: style.borderWidth,
          borderStyle: style.borderStyle,
          display: style.display,
          opacity: style.opacity
        };
      });
      console.log('Computed Dropdown Styles:', computed);
    }
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();
