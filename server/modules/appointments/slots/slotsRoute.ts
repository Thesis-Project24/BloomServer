import express from "express"
import {addSlots,getSlots,getSlot,addWaitlist} from './slotsController'
const router = express.Router();

router.post('/:windowId',addSlots)
router.get('/:windowId',getSlots)
router.get('/slot/:slotId',getSlot)
router.put('/waitlist/:slotId',addWaitlist)
export default router;