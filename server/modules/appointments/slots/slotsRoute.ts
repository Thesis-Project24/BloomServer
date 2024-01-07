import express from "express"
import {addSlots,getSlots,getSlot} from './slotsController'
const router = express.Router();

router.post('/:windowId',addSlots)
router.get('/:windowId',getSlots)
router.get('/slot/:slotId',getSlot)
export default router;