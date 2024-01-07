import express from "express"
import { addDoctor , upDateDoc , getDoctors , getOneDoc } from "./doctorController";
const router = express.Router();
router.post("/add",addDoctor);
router.put("/update",upDateDoc)
router.get("/getAll",getDoctors)
router.get("/getOne/:id",getOneDoc)


export default router;