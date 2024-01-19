import express from "express"
import {addOneWeek, addWindow,createSchedule,getWindowsBydate} from './windowController'
const router = express.Router();

router.post('/schedule/:doctorId',addWindow)
router.post('/createSchedule',createSchedule)
router.post('/week/:doctorId',addOneWeek)
router.get('/:date/:doctor',getWindowsBydate)
router.post('/:doctorId',addWindow)
export default router;