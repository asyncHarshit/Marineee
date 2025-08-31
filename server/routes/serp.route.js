// routes.js
import express from "express";
import { getDisasterNews } from "../controllers/serp_news.controller.js";
import { getDisasterTweets } from "../controllers/serp_tweet.controller.js";

const router = express.Router();
router.get("/disasters", getDisasterNews);
router.get("/twitter", getDisasterTweets);


export default router;
