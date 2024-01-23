import express from 'express'
import {signUp,signIn,deleteAccount,updateInfo,getOne} from '../../modules/users/userController'
const router = express.Router();
router.post("/signup",signUp)
router.post("/signin/:role",signIn)
router.put("/update/:userId",updateInfo)
router.delete("/:id",deleteAccount)
router.get("/:userId",getOne)
export default router;