const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
  Timestart: { type: String, required: true },
  Day: { type: String, required: true },
  Timeend: { type: String, required: true },
  // other fields
});

const Timeslot = mongoose.model('Timeslot', timeslotSchema);  

module.exports = Timeslot;  