const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // other fields
});

const Modules = mongoose.model('module', moduleSchema);

module.exports = Modules;