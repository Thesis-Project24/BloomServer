import express from 'express'
import { addF, addFlairToPost, addForum, downvotePost, getAllF, upvotePost } from './postsController';
import { addPost } from '../../journal/journalController';
const router = express.Router();

router.get("/",getAllF)
router.post("/:flair",addF)
router.put("/upvote",upvotePost)
router.put("/downvote",downvotePost)
router.put("/:postId/:flairId",addFlairToPost)
router.post("/createpost",addForum)

export default router;
