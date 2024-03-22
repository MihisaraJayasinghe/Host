const express = require('express');
const router = express.Router();
const moduleController = require('../controller/modulecontroller');
 
const checkRole = require('../middleware/checkRoleFaculty');
const checkFacultyIt = require('../middleware/checkFacultyit');
const checkFacultyEng = require('../middleware/checkFacultyEng');
const checkFacultyHs = require('../middleware/checkFacultyitHs');
 
// Add module (only accessible to admins)
// Add module (only accessible to admins of IT faculty)
router.post('/It', checkRole ,checkFacultyIt,  moduleController.addModule);
router.post('/Eng', checkRole ,checkFacultyEng,  moduleController.addModule);
router.post('/Hs', checkRole ,checkFacultyHs,  moduleController.addModule);
 
// Edit module (only accessible to admins)
router.put('/It/:id', checkRole ,checkFacultyIt,  moduleController.editModule);
router.put('/Eng/:id', checkRole ,checkFacultyEng,  moduleController.editModule);
router.put('/Hs/:id', checkRole ,checkFacultyHs,  moduleController.editModule);
 

// Delete module (only accessible to admins)
router.delete('/It/:id', checkRole ,checkFacultyIt,  moduleController.deleteModule);
router.delete('/Eng/:id', checkRole ,checkFacultyEng,  moduleController.deleteModule);
router.delete('/Hs/:id', checkRole ,checkFacultyHs,  moduleController.deleteModule);
 

module.exports = router;