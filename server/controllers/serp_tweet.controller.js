// controllers/serp_tweet.controller.js
import { getJson } from "serpapi";

export const getDisasterTweets = async (req, res) => {
  try {
    console.log("➡️ Reached getDisasterTweets route");

    const query =
      "cyclone OR earthquake OR hurricane OR flood OR landslide OR wildfire India site:x.com";

    const json = await getJson({
      engine: "google",
      q: query,
      location: "India",
      hl: "en",
      gl: "in",
      api_key: process.env.SERPAPI_KEY,
    });

    console.log("🔍 Raw SerpAPI response received");

    let results = [];

    // If SerpAPI provides twitter_results
    if (json.twitter_results && json.twitter_results.length > 0) {
      results = json.twitter_results.map((tweet) => ({
        link: tweet.link,
        text: tweet.snippet, // full text already provided here
        date: tweet.date,
      }));
    }

    // Otherwise fallback to organic_results
    else if (json.organic_results && json.organic_results.length > 0) {
      results = json.organic_results
        .filter((item) => item.link && item.link.includes("x.com"))
        .map((item) => ({
          link: item.link,
          text: item.title, // title is what SerpAPI gives
          displayed_link: item.displayed_link,
        }));
    }

    if (results.length > 0) {
      return res.status(200).json({ success: true, results });
    } else {
      return res.status(404).json({ success: false, message: "No X.com results found." });
    }
  } catch (error) {
    console.error("❌ Error fetching X.com data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
