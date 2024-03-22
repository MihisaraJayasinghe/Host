const express = require('express');
const router = express.Router();
const Timetable = require('../models/TimeTable');
const Faculty = require('../models/Faculty');
const Module = require('../models/module');
const checkRoleadminedit =  require('../middleware/checkRoleadminedit')

const Timeslot = require('../models/timeslot');

router.post('/add',checkRoleadminedit, async (req, res) => {
  try {
    const { facultyName, moduleName, location, labAvailability, timeslotData, day } = req.body;

    // Check if the Faculty exists or create a new one
    let faculty = await Faculty.findOne({ name: facultyName });
    if (!faculty) {
      faculty = await Faculty.create({ name: facultyName });
    }

    let module = await Module.findOne({ name: moduleName.name, modulecode: moduleName.modulecode ,faculty: facultyName });
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
      location: location,
      labAvailability: labAvailability,
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


      const formattedTimetables = [];

      timetables.forEach((timetable, index) => {
        const timetableFormatted = {
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
          location: timetable.location,
          labAvailability: timetable.labAvailability
        };
  
        formattedTimetables.push(timetableFormatted);
  
        // Add a divider between each timetable except for the last one
        if (index !== timetables.length - 1) {
          const divider = {
            divider: '..........................................................................'
          };
          formattedTimetables.push(divider);
        }
      });
  
      res.status(200).json({ timetables: formattedTimetables });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving timetables', error: error.message });
    }
  });

  router.put('/edit/:id', checkRoleadminedit, async (req, res) => {
    try {
      const timetableId = req.params.id;
      const { facultyName, moduleName, location, labAvailability, timeslotData, day } = req.body;
  
      // Find the timetable by ID
      let timetable = await Timetable.findById(timetableId);
      if (!timetable) {
        return res.status(404).json({ message: 'Timetable not found' });
      }
  
      // Check if the Faculty exists or create a new one
      let faculty = await Faculty.findOne({ name: facultyName });
      if (!faculty) {
        faculty = await Faculty.create({ name: facultyName });
      }
  
      let module = await Module.findOne({ name: moduleName.name, modulecode: moduleName.modulecode, faculty: facultyName });
      if (!module) {
        module = await Module.create(moduleName);
      }
  
      // Check if the Timeslot exists or create a new one
      let timeslot = await Timeslot.findOne({ Timestart: timeslotData.Timestart, Day: timeslotData.Day, Timeend: timeslotData.Timeend });
      if (!timeslot) {
        timeslot = await Timeslot.create(timeslotData);
      }
  
      // Update the timetable
      timetable.faculty = faculty._id;
      timetable.module = module._id;
      timetable.location = location;
      timetable.labAvailability = labAvailability;
      timetable.timeslot = timeslot._id;
      timetable.day = day;
  
      // Save the updated timetable to the database
      await timetable.save();
  
      res.status(200).json({ message: 'Timetable updated successfully', timetable });
    } catch (error) {
      res.status(500).json({ message: 'Error updating timetable', error: error.message });
    }
  });

  
  
module.exports = router;