const express = require('express');
const router = express.Router();
const { scrapeUrls } = require('../controller/scraper.controller');

router.post('/scrape', scrapeUrls);

module.exports = router;
