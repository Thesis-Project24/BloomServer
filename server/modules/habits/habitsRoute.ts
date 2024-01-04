import express from 'express'
import { assignHabit, creatHabit, getAllHabitsFromUser, postSatisfaction } from './habitsController';
const router = express.Router();

router.post("/createhabit",creatHabit)
router.post("/assignHabit",assignHabit)
router.get("/getHabits/:id",getAllHabitsFromUser)
router.put("/satisHabit",postSatisfaction)
export default router;