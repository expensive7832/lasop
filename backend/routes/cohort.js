const express = require('express')
const { createCohort, getCohort } = require('../controllers/cohort.js')
const protect = require("./../middleware/protect.js")

const router = express.Router();


router.post("/addchrt", protect, createCohort)
router.get("/getchrt", getCohort)


module.exports = router