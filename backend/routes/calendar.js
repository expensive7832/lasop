const express = require('express')
const { addCalendar, updateCalendar, getCalendar, deleteCalendar, createEvent, getEvents} = require('../controllers/calendar.js')
const protect = require("./../middleware/protect.js")

const router = express.Router();


router.post("/addcalendar", protect,  addCalendar)
router.patch("/updatecalendar/:id", protect,  updateCalendar)
router.delete("/deletecalendar/:id", protect,  deleteCalendar)
router.get("/calendar", getCalendar)
router.post("/create-event", protect, createEvent)
router.get("/fetch-events",  getEvents)



module.exports = router