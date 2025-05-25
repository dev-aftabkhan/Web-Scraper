const fs = require('fs');
const { launchBrowser } = require('../utils/puppeteer.util');

async function scrapePage(url, template) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36'
  );

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const data = await page.evaluate((template) => {
      const result = {};

      template.forEach((item) => {
        const elements = document.querySelectorAll(item.selector);
        if (elements.length > 0) {
          if (item.attribute === 'text') {
            result[item.name] = Array.from(elements).map((el) =>
              el.innerText.trim()
            );
          } else {
            result[item.name] = Array.from(elements).map((el) =>
              el.getAttribute(item.attribute)
            );
          }
        } else {
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

module.exports = {
  scrapePage
};
