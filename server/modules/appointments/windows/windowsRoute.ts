import express from "express"
import {addWindow,getWindowsBydate} from './windowController'
const router = express.Router();

router.post('/:doctorId',addWindow)
router.get('/:date',getWindowsBydate)
export default router;