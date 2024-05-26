const express = require('express')
const { uploadSyllabus, retrieveSyllabus } = require('./../controllers/syllabus')
const  protect  = require("./../middleware/protect")

const router = express.Router();


router.post("/addsyllabus", protect, uploadSyllabus )
router.get("/retrievesyllabus", retrieveSyllabus)

module.exports = router