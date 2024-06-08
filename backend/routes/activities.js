const express = require('express')
const {Test, getMos, getCenter, getCohort, getCourse, Receipt, getReceipt, confirmReceipt, getApplicants, getlearningstatus, getStudentByLearningModeStatus , getAllCourse, getLearningStatus } = require('../controllers/activities.js')
const Protect = require('../middleware/protect.js')
const router = express.Router();

router.get("/getmos", getMos)
router.get("/getlearningstatus", getLearningStatus)
router.get("/getcenter", getCenter)
router.get("/getcohort", getCohort)
router.get("/getcourse", getCourse)
router.get("/getallcourse", getAllCourse)
router.get("/getlearningstatus", getlearningstatus)
router.post("/receipt/:id", Protect, Receipt)
router.get("/getreceipt", getReceipt)
router.get("/confirmreceipt/:id/:userid", Protect, confirmReceipt)
router.get("/getapplicants", getApplicants)
router.get("/getapplicantsbylearningmodestatus", getStudentByLearningModeStatus)

module.exports = router

