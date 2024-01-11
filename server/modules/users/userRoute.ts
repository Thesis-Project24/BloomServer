import express from 'express'
import {signUp,signIn,deleteAccount,updateInfo} from '../../modules/users/userController'
const router = express.Router();
router.post("/signup",signUp)
router.post("/signin",signIn)
router.put("/:userId",updateInfo)
router.delete("/:id",deleteAccount)
export default router;