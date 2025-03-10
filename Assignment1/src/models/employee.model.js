const mongoose = require('mongoose');

// Employee schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
});

// Create Employee model
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
