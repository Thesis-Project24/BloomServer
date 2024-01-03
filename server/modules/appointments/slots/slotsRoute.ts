import express from "express"
import {addSlots} from './slotsController'
const router = express.Router();

router.post('/:windowId',addSlots)
export default router;