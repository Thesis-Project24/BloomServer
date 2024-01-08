import express from 'express'
import { assignHabit, assignMultipleHabits, creatHabit, deleteHabit, getAllHabits, getAllHabitsFromUser, postSatisfaction } from './habitsController';
const router = express.Router();

router.post("/createhabit",creatHabit)
router.post("/assignHabit",assignHabit)
router.post("/assignMultiHabits",assignMultipleHabits)
router.get("/getHabits/:id",getAllHabitsFromUser)
router.get("/getAllHabits",getAllHabits)
router.put("/satisHabit",postSatisfaction)
router.delete("/deleteAssignedHabit",deleteHabit)
export default router;