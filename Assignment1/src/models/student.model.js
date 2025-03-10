const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  batchTiming: { type: String, required: true },
  coachAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
  role: { type: String, default: 'student' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema); 