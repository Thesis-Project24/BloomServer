import express from "express"
import { addFlair } from "./flairsController";
const router = express.Router();
router.post("/",addFlair)

export default router;