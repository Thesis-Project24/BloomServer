import express from 'express'
import { creatHabit } from './habitsController';
const router = express.Router();

router.post("/createhabit",creatHabit)
export default router;