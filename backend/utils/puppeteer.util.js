const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const launchBrowser = async () => {
  const browser = await puppeteer.launch({ headless: true });
  return browser;
};

module.exports = {
  launchBrowser,
  puppeteer
};
