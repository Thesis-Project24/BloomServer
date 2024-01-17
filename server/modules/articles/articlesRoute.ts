import express from "express"
import { createArticle, getAllArticles, getArticleById, getSavedArticle, saveArticle, searchArticles,deleteArticle } from "./articlesController";
const router = express.Router();

router.post("/saveArticle",saveArticle)
router.get("/getArticles",getAllArticles)
router.get("/getonearticle",getArticleById)
router.post("/postArticle",createArticle)
router.get("/savedArticles",getSavedArticle)
router.get("/searchArticle",searchArticles)
router.delete("/:id",deleteArticle)

export default router;