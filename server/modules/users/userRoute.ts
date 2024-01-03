import express from 'express'
import {signUp} from '../../modules/users/userController'
const router = express.Router();
router.post("/signup",signUp)

export default router;