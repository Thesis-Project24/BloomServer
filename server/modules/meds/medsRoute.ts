import express from "express";
import { addMedication, deleteSchedule, scheduleMedication, updateSchedule } from "./medsController";
const router = express.Router();

router.post("/",addMedication)
router.post("/schedule",scheduleMedication)
router.put("/:id", updateSchedule)
router.delete("/:id", deleteSchedule)
export default router;