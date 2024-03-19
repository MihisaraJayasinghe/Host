const express = require('express');
const router = express.Router();
const Timetable = require('../models/TimeTable');
const Faculty = require('../models/Faculty');
const Module = require('../models/module');

const Timeslot = require('../models/timeslot');

router.post('/add', async (req, res) => {
  try {
    const { facultyName, moduleName, timeslotData, day } = req.body;

    // Check if the Faculty exists or create a new one
    let faculty = await Faculty.findOne({ name: facultyName });
    if (!faculty) {
      faculty = await Faculty.create({ name: facultyName });
    }

    let module = await Module.findOne({ name: moduleName.name, modulecode: moduleName.modulecode });
    if (!module) {
      module = await Module.create(moduleName);
    }

    // Check if the Timeslot exists or create a new one
    let timeslot = await Timeslot.findOne({ Timestart: timeslotData.Timestart, Day: timeslotData.Day, Timeend: timeslotData.Timeend });
    if (!timeslot) {
      timeslot = await Timeslot.create(timeslotData);
    }

    // Create a new timetable entry
    const timetable = new Timetable({
      faculty: faculty._id,
      module: module._id,
      timeslot: timeslot._id,
      day: day,
    });

    // Save the timetable to the database
    await timetable.save();

    res.status(201).json({ message: 'Timetable created successfully', timetable });
  } catch (error) {
    res.status(500).json({ message: 'Error creating timetable', error: error.message });
  }






  
  
});
router.get('/getAll', async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate('faculty', 'name') // Only populate the name field for faculty
      .populate('module', 'name modulecode') // Only populate the name and modulecode fields for module
      .populate('timeslot', 'Timestart Day Timeend'); // Only populate the Timestart, Day, and Timeend fields for timeslot


      const formattedTimetables = timetables.map(timetable => {
        return {
          day: timetable.day,
          timeslot: {
            Timestart: timetable.timeslot.Timestart,
            Day: timetable.timeslot.Day,
            Timeend: timetable.timeslot.Timeend
          },
          faculty: timetable.faculty.name,
          module: {
            name: timetable.module.name,
            modulecode: timetable.module.modulecode
          },
          
           
        };
      });
  
      // Send the formatted timetables as a response
      res.status(200).json({ timetables: formattedTimetables });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving timetables', error: error.message });
    }
  });


module.exports = router;