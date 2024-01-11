import express from "express"
 import {addAppointmenent,updateAppointmenent} from "./appointmentsController"
const router = express.Router();
router.post("/add",addAppointmenent);
router.put("/update/:id",updateAppointmenent)

export default router;