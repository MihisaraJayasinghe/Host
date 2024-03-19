const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modulecode:{type:String, required:true}
  // other fields
});

const Modules = mongoose.model('Module', moduleSchema);

module.exports = Modules;