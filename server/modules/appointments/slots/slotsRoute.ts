import express from "express"
import {addSlots,getSlots,getSlot} from './slotsController'
const router = express.Router();

router.post('/:windowId',addSlots)
router.get('/slot/:slotId',getSlot)
router.get('/:windowId',getSlots)
export default router;