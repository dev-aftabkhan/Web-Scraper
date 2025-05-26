const { scrapePage } = require('../services/scraper.service');
const { loadTemplate } = require('../utils/templateLoader');

async function scrapeUrls(req, res) {
  const { urls } = req.body;
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of URLs in the request body.' });
  }

  try {
    const template = loadTemplate();
    const results = [];

    for (const url of urls) {
      console.log(`Scraping: ${url}`);
      const result = await scrapePage(url, template);
      results.push(result);
    }

    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error during scraping.' });
  }
}

module.exports = { scrapeUrls };
