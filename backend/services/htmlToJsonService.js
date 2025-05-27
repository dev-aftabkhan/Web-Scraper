const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Clean fragile selectors
function cleanSelector(selector) {
  return selector.replace(/:nth-child\(\d+\)/g, '').trim();
}

// Process Gemini's raw output to clean JSON
function processGeminiOutput(rawJsonString) {
  try {
    const cleanedText = rawJsonString
      .replace(/```json\s*/gi, '')
      .replace(/```/g, '')
      .trim();


    let json = JSON.parse(cleanedText);
    json = json.map(entry => ({
      ...entry,
      selector: cleanSelector(entry.selector || ''),
      attribute: entry.attribute || 'text',
    }));
    return json;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini. Raw text:\n", rawJsonString);
    throw new Error("Gemini output parsing failed.");
  }
}

// Core logic: Convert HTML string to structured JSON
async function convertHTMLtoJSON(htmlTemplate) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash-latest" });

  const prompt = `Convert the following HTML to a structured JSON array with this format:
[
  {"name": "fieldName", "selector": "CSS selector", "attribute": "text or href"}
]
Be precise and avoid using ':nth-child()' unless absolutely necessary. Prefer generic class-based selectors. HTML:

${htmlTemplate}`;

  try {
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();

    console.log("✨ Raw Output From Gemini:\n", rawText);

    const processed = processGeminiOutput(rawText);
    return processed;
  } catch (error) {
    console.error("❌ Error during generation:", error);
    throw error;
  }
}

module.exports = {
  convertHTMLtoJSON,
};
