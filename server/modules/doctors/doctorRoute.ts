import express from "express"
import { addDoctor , upDateDoc , getDoctors , getOneDoc , getDocSpecialist , getDocGender } from "./doctorController";
const router = express.Router();
router.post("/add",addDoctor);
router.put("/update",upDateDoc)
router.get("/getAll",getDoctors)
router.get("/getOne/:id",getOneDoc)
router.get("/specialty/:specialty",getDocSpecialist)
router.get("/gender/:gender",getDocGender)





export default router;