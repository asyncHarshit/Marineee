import express from 'express'
import { tokenProvider } from '../controllers/videoCall.controller.js';
const router = express.Router();

router.post('/token', tokenProvider);

export default router