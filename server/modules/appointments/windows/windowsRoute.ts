import express from "express"
import {addWindow,createSchedule,getWindowsBydate} from './windowController'
const router = express.Router();

router.post('/:doctorId',addWindow)
router.get('/schedule',createSchedule)
router.get('/:date',getWindowsBydate)
export default router;