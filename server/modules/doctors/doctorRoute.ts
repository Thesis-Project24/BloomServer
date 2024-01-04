import express from "express"
import { addDoctor , upDateDoc } from "./doctorController";
const router = express.Router();
router.post("/add",addDoctor);
router.put("/update",upDateDoc)


export default router;