const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function scrapePage(url, template) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36'
  );

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const data = await page.evaluate((template) => {
      const result = {};

      template.forEach(item => {
        try {
          let elements = Array.from(document.querySelectorAll(item.selector));
          
          if (item.filterText) {
            elements = elements.filter(el =>
              el.textContent.trim() === item.filterText
            );
          }

          if (elements.length > 0) {
            if (item.sibling === true) {
              const siblingTexts = elements.map(el =>
                el.nextElementSibling ? el.nextElementSibling.textContent.trim() : ''
              );
              result[item.name] = siblingTexts.filter(Boolean);
            } else if (item.attribute === 'text') {
              result[item.name] = elements.map(el => el.innerText.trim());
            } else {
              result[item.name] = elements.map(el => el.getAttribute(item.attribute));
            }
          } else {
            result[item.name] = [];
          }
        } catch (err) {
          result[item.name] = [];
        }
      });

      return result;
    }, template);

    await browser.close();
    return { url, data };
  } catch (error) {
    await browser.close();
    return { url, error: error.message };
  }
}

module.exports = { scrapePage };
