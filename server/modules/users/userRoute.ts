import express from 'express'
import {signUp,signIn,deleteAccount,updateInfo,getOne, getallusers, getOneUserByUserName} from '../../modules/users/userController'
const router = express.Router();
router.post("/signup",signUp)
router.post("/signin",signIn)
router.put("/:userId",updateInfo)
router.delete("/:id",deleteAccount)
router.get("/:userId",getOne)
router.get("/",getallusers)
router.get("/getUserIdByUsername/:username",getOneUserByUserName)
export default router;