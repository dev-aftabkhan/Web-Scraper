require('dotenv').config();
const express = require('express');
const app = express();
const scraperRoutes = require('./routes/scraper.routes');
const htmlToJsonRoutes = require('./routes/htmlToJson');

app.use(express.json());
app.use('/api', scraperRoutes);
app.use('/api/convert', htmlToJsonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
