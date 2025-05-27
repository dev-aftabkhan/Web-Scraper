const express = require('express');
const router = express.Router();
const { convertFromFile, convertFromBody } = require('../controller/htmlToJsonController');

// POST /api/convert/file → reads test.html file
router.post('/file', convertFromFile);

// POST /api/convert/body → accepts HTML in body
router.post('/body', convertFromBody);

module.exports = router;
