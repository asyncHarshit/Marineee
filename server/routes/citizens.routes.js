import express from "express";
import { createUpload, createVoiceAlert, getAllUploads, getMyUploads, getMyVoiceAlerts } from "../controllers/citizen.controller.js";

const router = express.Router();

router.post("/voice-alert", createVoiceAlert);
router.post("/photo", createUpload);
router.post("/video", createUpload);
router.get("/voice-alert", getMyVoiceAlerts);
router.get("/get-upload", getMyUploads);
router.get("/uploads" , getAllUploads)

export default router;