import express from 'express'
import {signUp,signIn,deleteAccount} from '../../modules/users/userController'
const router = express.Router();
router.post("/signup",signUp)
router.post("/signin",signIn)
router.delete("/:id",deleteAccount)
export default router;