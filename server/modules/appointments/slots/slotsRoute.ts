import express from "express"
import {addSlots,getSlots,getSlot,addWaitlist,getWaitlist} from './slotsController'
const router = express.Router();

router.post('/:windowId',addSlots)
router.get('/:windowId',getSlots)
router.get('/slot/:slotId',getSlot)
router.get('/waitlist/:slotId',getWaitlist)
router.put('/waitlist/:slotId',addWaitlist)
export default router;