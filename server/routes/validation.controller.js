import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with your API key

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBSPhZJs53mpJKv5t1xXoENRBBYh1hql78",
}); // Use a fast and capable model

export const validatePostWithGemini = async (req, res) => {
  console.log(process.env.GEMINI_API_KEY);

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message content is required." });
  }

  // Get current date and location for context. This is crucial for fact-checking.
  const currentDate = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD format
  const locationContext = "India"; // Your app's location context

  // This is the core of the feature: The prompt to Gemini.
  // We are instructing it to act as a moderator and provide a structured JSON response.
  const prompt = `
        You are a moderation and verification assistant for "WebCitizenDashBoard", a community safety app in Uttar Pradesh, India.
        Your task is to analyze a user's post and determine if it is a relevant and plausible alert.

        **Current Date:** ${currentDate}
        **User's General Location:** ${locationContext}
        **User's Post:** "${message}"

        Follow these steps:
        1.  **Content Analysis:** Is the post about a potential disaster (flood, fire, earthquake), environmental issue (pollution), public safety concern, or a request for help?
        2.  **Plausibility Check:** Based on your knowledge of real-world events up to today, assess if the claim in the post is plausible. For example, if the post says "flood in Mathura", check if there are any real, public reports of flooding in Mathura, Uttar Pradesh around this date. Acknowledge if you have no information.
        3.  **Final Decision:** Based on both steps, make a final decision. The post is "Relevant" only if it's on-topic AND plausible. If it's a generic request for help without a specific claim, consider it "Relevant". If it's off-topic (like a joke) or a specific claim that appears to be false based on public knowledge (e.g., claiming a tsunami in a landlocked city), classify it as "Irrelevant".

        **Your output MUST be a single, clean JSON object with two keys: "decision" and "reason". Do not add any other text or markdown formatting.**

        Example 1:
        Post: "Major fire near the main market in Agra."
        Your output: { "decision": "Relevant", "reason": "The post describes a plausible public safety concern." }

        Example 2:
        Post: "I saw a blue whale in the Gomti River in Lucknow."
        Your output: { "decision": "Irrelevant", "reason": "This claim is highly implausible as blue whales are saltwater ocean mammals." }
        
        Example 3:
        Post: "flood in mathura"
        Your output (assuming no news of flood): { "decision": "Irrelevant", "reason": "No public news or reports confirm a flood in Mathura at this time. The post may be inaccurate." }

        Example 4:
        Post: "i am wavy this is a joke"
        Your output: { "decision": "Irrelevant", "reason": "The post is off-topic and identified as a joke." }
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Get raw text from Gemini
    const rawText = response.text;

    // Clean possible markdown wrappers
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let jsonResult;
    try {
      jsonResult = JSON.parse(cleaned); // Expecting { decision, reason }
    } catch (err) {
      console.error("❌ Parsing error:", err, cleaned);
      jsonResult = {
        decision: "Irrelevant",
        reason:
          "The AI response could not be parsed into valid JSON. Defaulting to Irrelevant.",
      };
    }

    return res.json(jsonResult);
  } catch (error) {
    console.error("Error in Flash:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

};
export default validatePostWithGemini;
