const fs = require("fs");
const path = require("path");
const { convertHTMLtoJSON } = require("../services/htmlToJsonService");

async function convertFromFile(req, res) {
  try {
    const html = fs.readFileSync(path.resolve("test.html"), "utf-8");
    const json = await convertHTMLtoJSON(html);
    fs.writeFileSync("template.json", JSON.stringify(json, null, 2));
    res.json({ success: true, json });
  } catch (error) {
    res.status(500).json({ error: error.message || "Conversion failed" });
  }
}

async function convertFromBody(req, res) {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: "HTML string is required" });

  try {
    const json = await convertHTMLtoJSON(html);
    res.json({ success: true, json });
  } catch (error) {
    res.status(500).json({ error: error.message || "Conversion failed" });
  }
}

module.exports = {
  convertFromFile,
  convertFromBody,
};
