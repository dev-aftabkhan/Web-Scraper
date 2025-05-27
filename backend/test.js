const axios = require('axios');

(async () => {
  const response = await axios.post('http://localhost:3000/api/scrape', {
    urls: ['https://www.workindia.in/jobs-in-jaipur/']
  });

  console.log('✅ Scraped Result:\n', JSON.stringify(response.data, null, 2));
})();
