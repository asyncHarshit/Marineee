import express from "express";
import {
  createPost,
  getPosts,
  likePost,
  addComment,
  sharePost,
  getCommunityStats,
  getUserActivity,
  getUserRank,
} from "../controllers/community.controller.js";

const router = express.Router();

// Posts routes
router.get("/", getPosts);
router.post("/", createPost);
router.post("/:id/like", likePost);
router.post("/:id/comment", addComment);
router.post("/:id/share", sharePost);

// Stats and user info routes
router.get("/stats", getCommunityStats);
router.get("/activity/:userId", getUserActivity);
router.get("/rank/:userId", getUserRank);

export default router;
