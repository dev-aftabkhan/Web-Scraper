const express = require('express');
const router = express.Router();
const { scrapeHandler } = require('../controller/scraper.controller');

router.post('/scrape', scrapeHandler);

module.exports = router;
