const express = require('express')
const Protect = require('../middleware/protect.js');
const { addStaff, fetchStaffInfo } = require('../controllers/staff.js');


const router = express.Router();


router.post("/addstaff", Protect, addStaff)
router.get("/fetchstaff/:id", Protect, fetchStaffInfo)

module.exports = router