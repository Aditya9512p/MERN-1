const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, default: 'admin' },
  email: String,
  phoneNumber: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema); 