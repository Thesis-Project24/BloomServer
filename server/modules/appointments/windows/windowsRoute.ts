import express from "express"
import {addWindow,createSchedule,getWindowsBydate} from './windowController'
const router = express.Router();

router.post('/schedule/:doctorId',addWindow)
router.post('/createSchedule',createSchedule)
router.post('/week/:doctorId',addOneWeek)
router.get('/:date/:doctor',getWindowsBydate)
router.post('/:doctorId',addWindow)
router.get('/schedule',createSchedule)
router.get('/:date',getWindowsBydate)
export default router;