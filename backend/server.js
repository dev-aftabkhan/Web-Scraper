require('dotenv').config();
const express = require('express');
const app = express();
const scraperRoutes = require('./routes/scraper.routes');

app.use(express.json());
app.use('/api', scraperRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
