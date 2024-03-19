// controllers/moduleController.js

const Timeslot = require('../models/timeslot');

// Add module
exports.addtimeslot = async (req, res) => {
  try {
    const { Timestart , Day , Timeend } = req.body;
    const timeslot = await Timeslot.create({ Timestart , Day , Timeend });
    res.status(201).json({ message: 'timeslot added successfully', timeslot });
  } catch (error) {
    res.status(500).json({ message: 'Error adding timeslot', error: error.message });
  }
};

 