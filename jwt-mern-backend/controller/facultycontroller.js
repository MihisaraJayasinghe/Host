// controllers/moduleController.js

const Faculty = require('../models/Faculty');

// Add module
exports.addfaculty = async (req, res) => {
  try {
    const { name } = req.body;
    const faculty = await Faculty.create({ name });
    res.status(201).json({ message: 'faculty added successfully', faculty });
  } catch (error) {
    res.status(500).json({ message: 'Error adding faculty', error: error.message });
  }
};

// Edit module
exports.editfaculty = async (req, res) => {
    try {
        const facultyId = req.params.id;
        const { name } = req.body;
    
        // Check if the faculty exists
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
          return res.status(404).json({ message: 'Faculty not found' });
        }
    
        // Update faculty fields
        faculty.name = name;
    
        // Save the updated faculty
        await faculty.save();
    
        res.status(200).json({ message: 'Faculty updated successfully', faculty });
      } catch (error) {
        res.status(500).json({ message: 'Error updating faculty', error: error.message });
      }
};


exports.getAllfaculty = async (req, res) => {
    try {
      const faculty = await Faculty.find();
      res.status(200).json({ faculty });
    } catch (error) {
      res.status(500).json({ message: 'Error getting faculty', error: error.message });
    }
  };
  
// Delete module
exports.deletefaculty = async (req, res) => {
  try {
    const facultyId = req.params.id; // Get the module ID from the URL parameters
    const deletedfaculty = await Module.findByIdAndDelete(facultyId);
    if (!deletedfaculty) {
      return res.status(404).json({ message: 'faculty not found' });
    }
    res.status(200).json({ message: 'faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting faculty', error: error.message });
  }
};