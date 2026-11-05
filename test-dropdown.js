const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle0' });
  
  // Hover over the button
  await page.hover('text=Growth Systems');
  await page.waitForTimeout(500); // wait for animation
  
  // Evaluate the visibility and bounding box of the dropdown
  const dropdownInfo = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Growth Systems'));
    if (!btn) return 'Button not found';
    
    const dropdown = btn.nextElementSibling;
    if (!dropdown) return 'Dropdown sibling not found';
    
    const rect = dropdown.getBoundingClientRect();
    const computed = window.getComputedStyle(dropdown);
    
    let clippedBy = null;
    let parent = dropdown.parentElement;
    while(parent && parent !== document.body) {
       const pStyle = window.getComputedStyle(parent);
       if (pStyle.overflow !== 'visible' && pStyle.overflow !== 'clip' /* actually clip does clip */) {
          clippedBy = { tag: parent.tagName, className: parent.className, overflow: pStyle.overflow };
          break;
       }
       if (pStyle.overflowX !== 'visible' || pStyle.overflowY !== 'visible') {
          clippedBy = { tag: parent.tagName, className: parent.className, overflowX: pStyle.overflowX, overflowY: pStyle.overflowY };
          break;
       }
       parent = parent.parentElement;
    }

    return {
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      opacity: computed.opacity,
      visibility: computed.visibility,
      display: computed.display,
      pointerEvents: computed.pointerEvents,
      clippedBy
    };
  });
  
  console.log(JSON.stringify(dropdownInfo, null, 2));
  await browser.close();
})();
