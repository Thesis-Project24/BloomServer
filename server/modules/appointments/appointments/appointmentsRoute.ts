import express from "express"
 import {addAppointmenent,updateApp} from "./appointmentsController"
const router = express.Router();
router.post("/add",addAppointmenent);
router.put("/updateFeedbackReview/:id",updateApp)

export default router;