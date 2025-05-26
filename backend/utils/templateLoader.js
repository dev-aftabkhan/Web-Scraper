const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.resolve(__dirname, '../template.json');

function loadTemplate() {
  const raw = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  return JSON.parse(raw);
}

module.exports = { loadTemplate };
