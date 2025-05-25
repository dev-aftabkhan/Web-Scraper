const fs = require('fs');
const path = require('path');
const { scrapePage } = require('../services/scraper.service');

const TEMPLATE_PATH = path.resolve(__dirname, '../template.json');
const template = JSON.parse(fs.readFileSync(TEMPLATE_PATH, 'utf-8'));

const scrapeHandler = async (req, res) => {
  const { urls } = req.body;
  if (!Array.isArray(urls)) {
    return res.status(400).json({ error: 'URLs must be an array.' });
  }

  const results = [];
  for (const url of urls) {
    const result = await scrapePage(url, template);
    results.push(result);
  }

  // Save to file as well
  fs.writeFileSync(
    path.resolve(__dirname, '../scraped_data.json'),
    JSON.stringify(results, null, 2)
  );

  res.status(200).json(results);
};

module.exports = {
  scrapeHandler
};
