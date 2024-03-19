const mongoose = require('mongoose');

const facultyschema = new mongoose.Schema({
  name: { type: String, required: true },
  // other fields
});

const Faculty = mongoose.model('Faculty', facultyschema);  

module.exports = Faculty;  