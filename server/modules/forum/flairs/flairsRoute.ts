import express from "express"
import { addFlair,deleteFlair,getFlairs } from "./flairsController";
const router = express.Router();

router.get("/",getFlairs)
router.post("/",addFlair)
router.delete("/:id",deleteFlair)

export default router;