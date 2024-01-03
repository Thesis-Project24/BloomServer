import express from "express"
import {addWindow} from './windowController'
const router = express.Router();

router.post('/',addWindow)
export default router;