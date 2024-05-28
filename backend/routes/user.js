const express = require('express')
const {adminRegister, signup, login, myProfile, getProspectus, forgetpassword, changepassword, getUser, staffRegister } = require( '../controllers/user.js');
const Protect = require('../middleware/protect.js');


const router = express.Router();

router.post("/register", signup)
router.post("/adminregister", adminRegister)
router.post("/staffregister", staffRegister)
router.post("/login", login)
router.get("/profile", Protect, myProfile)
router.get("/user/:id", Protect, getUser)
router.post("/prospectus", getProspectus)
router.post("/forgetpassword", forgetpassword)
router.post("/changepassword", changepassword)

module.exports = router