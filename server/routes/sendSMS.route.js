import express from "express";
import { sendSMS } from "../controllers/sendSMS.controller.js";

const router = express.Router();

// POST /api/send-sms
router.post("/send-sms", sendSMS);

export default router;
