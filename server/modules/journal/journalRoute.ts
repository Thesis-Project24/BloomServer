import express from 'express'
import { addPost, getAllPosts, getOnePost, removePost, updatePost } from './journalController';
const router = express.Router();
router.post('/addpost/:authorId',addPost)
router.get('/getall/:authorId',getAllPosts)
router.delete('/remove/:authorId/:id',removePost)
router.put('/update/all/:authorId/:id',updatePost)
router.get('/getone/:authorId/:id',getOnePost)
export default router