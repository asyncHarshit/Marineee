import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prompt = `
    Give me ocean-related disasters and weather events (hurricanes, tsunamis, cyclones) in India 
    for August 30, 2025.

    Return ONLY a valid JavaScript array of objects, no extra text.
    Each object must have:
    id, date, text, tags (array), location (array), source, url.
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    let insights = [];
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      const raw = data.candidates[0].content.parts[0].text.trim();
      try {
        // Expecting Gemini to return an array string: [ {...}, {...} ]
        insights = JSON.parse(raw);
      } catch (err) {
        console.error("❌ Parsing error:", err, raw);
      }
    }

    res.json(insights); // <-- sends a real array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});

export default router;
