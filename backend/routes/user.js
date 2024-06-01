const express = require('express')
const {adminRegister, signup, login, myProfile, getProspectus, forgetpassword, changepassword, getUser, staffRegister, getAllUsers, searchUser, updateRole } = require( '../controllers/user.js');
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
router.get("/allusers", Protect, getAllUsers)
router.get("/search", searchUser)
router.post("/updaterole", updateRole)

module.exports = router