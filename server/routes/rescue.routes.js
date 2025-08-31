import express from "express";
import multer from "multer";
import path from "path";
import { getTeams, addTeam, deleteTeam,createRescueReport } from "../controllers/rescue.controller.js";
// import TeamManageemnt from ""
const router = express.Router();


router.get("/rescue-webdashboard", getTeams);
router.post("/rescue-webdashboard", addTeam);
router.delete("/rescue-webdashboard/:id", deleteTeam);


export default router;