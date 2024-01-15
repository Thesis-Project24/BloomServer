import express from "express"
import { createArticle, getAllArticles, getSavedArticle, saveArticle, searchArticles } from "./articlesController";
const router = express.Router();

router.post("/saveArticle",saveArticle)
router.get("/getArticles",getAllArticles)
router.post("/postArticle",createArticle)
router.get("/savedArticles",getSavedArticle)
router.get("/searchArticle",searchArticles)

export default router;