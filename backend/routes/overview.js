const express = require('express')
const { getTotalStudents, getTotalApplicants, getTotalGraduate } = require("./../controllers/overview.js")


const router = express.Router();


router.get("/totalstudents", getTotalStudents)
router.get("/totalapplicants", getTotalApplicants)
router.get("/totalgraduate", getTotalGraduate)


module.exports = router;