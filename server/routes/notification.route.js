import express from 'express'
import {sendFirebaseNotification} from "../controllers/notification.controller.js"

const router = express.Router();

router.post('/send', sendFirebaseNotification);

export default router;
