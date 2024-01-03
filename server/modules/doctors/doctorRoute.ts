import express from "express"
import { addDoctor } from "./doctorController";
const router = express.Router();
router.post("/add",addDoctor);



export default router;