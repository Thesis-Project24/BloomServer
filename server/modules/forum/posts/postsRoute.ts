import express from 'express'
import { addF, addFlairToPost, downvotePost, getAllF, upvotePost,deletePost, getOneF } from './postsController';
const router = express.Router();

router.get("/",getAllF)
router.get("/:id",getOneF)
router.post("/:flair",addF)
router.put("/upvote",upvotePost)
router.put("/downvote",downvotePost)
router.put("/:postId/:flairId",addFlairToPost)
router.delete("/:id",deletePost)

export default router;
