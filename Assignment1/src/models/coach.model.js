const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, default: 'coach' },
  assignedBatches: [{
    batchTiming: { type: String, required: true },
    maxStudents: { type: Number, default: 10 }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Coach', coachSchema); 