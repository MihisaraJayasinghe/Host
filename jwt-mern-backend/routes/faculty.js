const express = require('express');
const router = express.Router();
const facultycontroller = require('../controller/facultycontroller');
const checkRole = require('../middleware/checkRole');

// Add module (only accessible to admins)
router.post('/', checkRole, facultycontroller.addfaculty);

// Edit module (only accessible to admins)
router.put('/editfacul/:id', checkRole, facultycontroller.editfaculty);

// Delete module (only accessible to admins)
router.delete('/:id', checkRole, facultycontroller.deletefaculty);

router.get('/getallfaculty', checkRole, facultycontroller.getAllfaculty);


module.exports = router;