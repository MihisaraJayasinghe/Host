// controllers/moduleController.js

const Module = require('../models/module');

// Add module
exports.addModule = async (req, res) => {
  try {
    const { name } = req.body;
    const module = await Module.create({ name });
    res.status(201).json({ message: 'Module added successfully', module });
  } catch (error) {
    res.status(500).json({ message: 'Error adding module', error: error.message });
  }
};

// Edit module
exports.editModule = async (req, res) => {
  // Implementation
};


exports.getAllModules = async (req, res) => {
    try {
      const modules = await Module.find();
      res.status(200).json({ modules });
    } catch (error) {
      res.status(500).json({ message: 'Error getting modules', error: error.message });
    }
  };
  
// Delete module
exports.deleteModule = async (req, res) => {
  try {
    const moduleId = req.params.id; // Get the module ID from the URL parameters
    const deletedModule = await Module.findByIdAndDelete(moduleId);
    if (!deletedModule) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting module', error: error.message });
  }
};