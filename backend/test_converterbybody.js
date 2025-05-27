const axios = require('axios');
const fs = require('fs');

async function testGeminiConvert() {
  const html = fs.readFileSync('test.html', 'utf8'); // Your sample HTML input

  try {
    const response = await axios.post('http://localhost:3000/api/convert/body', {
      html: html
    });

    console.log('✅ Response from /api/convert/body:\n');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ Error during test:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testGeminiConvert();
