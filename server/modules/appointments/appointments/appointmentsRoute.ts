import express from "express"
 import {addAppointmenent,updateAppStatus,updateAppFeedbackReview} from "./appointmentsController"
const router = express.Router();
router.post("/add",addAppointmenent);
router.put("/updateStatus",updateAppStatus)
router.put("/updateFeedbackReview",updateAppFeedbackReview)

export default router;