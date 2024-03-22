const express = require('express');
const router = express.Router();
const facultycontroller = require('../controller/facultycontroller');
const checkRoleadmine = require('../middleware/checkRoleadminedit');

// Add module (only accessible to admins)
router.post('/', checkRoleadmine, facultycontroller.addfaculty);

// Edit module (only accessible to admins)
router.put('/editfacul/:id', checkRoleadmine, facultycontroller.editfaculty);


// Delete module (only accessible to admins)
router.delete('/:id', checkRoleadmine, facultycontroller.deletefaculty);

router.get('/getallfaculty', checkRoleadmine, facultycontroller.getAllfaculty);


module.exports = router;