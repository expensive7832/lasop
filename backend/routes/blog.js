const express = require('express')
const { createArticle, getArticles, getArticleById, getBlogImages } = require('../controllers/blog.js')
const protect = require("./../middleware/protect.js")

const router = express.Router();

router.post("/create-article", protect, createArticle)
router.get("/getarticles",  getArticles)
router.get("/getarticle/:id",  getArticleById)
router.get("/blogimages/:id", getBlogImages)



module.exports = router