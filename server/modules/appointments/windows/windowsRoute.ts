import express from "express"
import {addWindow,getWindowsBydate} from './windowController'
const router = express.Router();

router.post('/:id',addWindow)
router.get('/:date',getWindowsBydate)
export default router;