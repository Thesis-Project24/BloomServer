import express from "express";
import { addMedication, scheduleMedication } from "./medsController";
const router = express.Router();

router.post("/",addMedication)
router.post("/schedule",scheduleMedication)
export default router;