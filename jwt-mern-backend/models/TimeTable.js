const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  timeslot: { type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot' },
  day: { type: String, required: true },
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;