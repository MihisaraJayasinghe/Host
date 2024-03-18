const express = require('express');
const router = express.Router();
const moduleController = require('../controller/modulecontroller');
const checkRole = require('../middleware/checkRole');

// Add module (only accessible to admins)
router.post('/', checkRole, moduleController.addModule);

// Edit module (only accessible to admins)
router.put('/:id', checkRole, moduleController.editModule);

// Delete module (only accessible to admins)
router.delete('/:id', checkRole, moduleController.deleteModule);

module.exports = router;