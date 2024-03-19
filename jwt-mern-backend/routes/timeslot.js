const express = require('express');
const router = express.Router();
const timeslotcontroller = require('../controller/timeslotcontroller');
const checkRole = require('../middleware/checkRole');

// Add module (only accessible to admins)
router.post('/', checkRole, timeslotcontroller.addtimeslot);

 


module.exports = router;