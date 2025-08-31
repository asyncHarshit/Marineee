// controllers/flash.controller.js
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client with API key from .env
const ai = new GoogleGenAI({ apiKey: "AIzaSyBSPhZJs53mpJKv5t1xXoENRBBYh1hql78" });

export const flashGemini = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Missing 'query' in request body",
      });
    }

    // Directly send plain text prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
    });

    // Extract text safely

    // console.log(response);

    const text =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    console.error("Error in flashGemini:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};
