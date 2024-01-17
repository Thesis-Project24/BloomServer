import express from 'express';
import { addComment, deleteComment, getCommentsByPost, getCommentsByTaggedUser } from './commentsController';
const router = express.Router();

router.get("/:id",getCommentsByPost)
router.get("/:postId/:tagId",getCommentsByTaggedUser)
router.post("/",addComment)
router.delete("/:id",deleteComment)


export default router;