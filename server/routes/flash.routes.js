import express  from 'express'
import { flashGemini } from '../controllers/flash.controller.js';
import validatePostWithGemini from './validation.controller.js';

const router = express.Router();

router.post('/get',flashGemini);
router.post('/validate-post', validatePostWithGemini)

export default router;
