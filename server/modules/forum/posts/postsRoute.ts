import express from 'express'
import { addF, addFlairToPost, downvotePost, getAllF, upvotePost,deletePost, getOneF, searchUsers, addForum } from './postsController';

const router = express.Router();

router.get("/",getAllF)
router.post("/add",addForum)
router.get('/searchUsers', searchUsers);
router.get("/:id",getOneF)
router.post("/:flair",addF)
router.put("/upvote",upvotePost)
router.put("/downvote",downvotePost)
router.put("/:postId/:flairId",addFlairToPost)
router.delete("/:id",deletePost)
export default router;
