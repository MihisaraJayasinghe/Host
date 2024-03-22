const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student','faculty'], required: true },
  Faculty: { type: String, enum: ['It', 'Eng','Hs','admin'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;