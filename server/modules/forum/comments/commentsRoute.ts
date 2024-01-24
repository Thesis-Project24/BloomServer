import express from 'express';
import { addComment, deleteComment, editComment, editTagcomment, getCommentsByPost, getCommentsByTaggedUser } from './commentsController';
const router = express.Router();

router.get("/:id",getCommentsByPost)
router.get("/:postId/:tagId",getCommentsByTaggedUser)
router.post("/",addComment)
router.delete("/:id",deleteComment)
router.put("/:id",editComment)
router.put("/:id",editTagcomment)

export default router;