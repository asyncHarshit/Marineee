// controllers/news.controller.js
import { getJson } from "serpapi";

export const getDisasterNews = async (req, res) => {
  try {
    getJson({
      engine: "google_news_light",
     q: "disaster OR earthquake OR flood OR cyclone OR landslide OR wildfire site:.in in English",
      location: "India",
      gl: "in",
      hl: "en",
      api_key: process.env.SERPAPI_KEY,
    }, (json) => {
      const news = json.news_results?.map(item => ({
        title: item.title,
        description: item.snippet,
        source: item.source,
        url: item.link,
        date: item.date
      })) || [];

      console.log("🇮🇳 India Disaster News:", news);

      res.json({ disasters: news });
    });
  } catch (error) {
    console.error("Error fetching India disaster news:", error);
    res.status(500).json({ error: "Failed to fetch India disaster news" });
  }
};
