const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const Employee = require('./models/employee.model');
const Student = require('./models/student.model');
const Coach = require('./models/coach.model');
const Admin = require('./models/admin.model');

// User Registration
const createUser = async (userData) => {
  const { username, password, role = 'student', ...rest } = userData;
  
  // Check if user already exists
  const existingUser = await Promise.all([
    Student.findOne({ username }),
    Coach.findOne({ username }),
    Admin.findOne({ username })
  ]).then(results => results.find(result => result));

  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user based on role
  let user;
  switch (role.toLowerCase()) {
    case 'student':
      user = new Student({ username, password: hashedPassword, role, ...rest });
      break;
    case 'coach':
      user = new Coach({ username, password: hashedPassword, role, ...rest });
      break;
    case 'admin':
      user = new Admin({ username, password: hashedPassword, role, ...rest });
      break;
    default:
      throw new Error('Invalid role');
  }

  await user.save();
  return { username: user.username, role: user.role };
};

// User Login
const loginUser = async (username, password) => {
  // Find user in any collection
  const user = await Promise.all([
    Student.findOne({ username }),
    Coach.findOne({ username }),
    Admin.findOne({ username })
  ]).then(results => results.find(result => result));

  if (!user) {
    throw new Error('User not found');
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    username: user.username,
    role: user.role,
    token
  };
};

// Get all users
const getAllUsers = async () => {
  return await User.find({}).select('-password');
};

// Get user by ID
const getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

// Update user
const updateUser = async (username, updates) => {
  const user = await Promise.all([
    Student.findOne({ username }),
    Coach.findOne({ username }),
    Admin.findOne({ username })
  ]).then(results => results.find(result => result));

  if (!user) {
    throw new Error('User not found');
  }

  // Don't allow role or username updates
  delete updates.role;
  delete updates.username;

  // Hash password if it's being updated
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  Object.assign(user, updates);
  await user.save();

  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

// Delete user
const deleteUser = async (username) => {
  const result = await Promise.all([
    Student.findOneAndDelete({ username }),
    Coach.findOneAndDelete({ username }),
    Admin.findOneAndDelete({ username })
  ]).then(results => results.find(result => result));

  if (!result) {
    throw new Error('User not found');
  }
};

// Student-specific operations
const getAllStudents = async () => {
  return await User.find({ role: 'student' }).select('-password');
};

// Coach-specific operations
const getAllCoaches = async () => {
  return await User.find({ role: 'coach' }).select('-password');
};

// Get students assigned to a coach
const getStudentsByCoach = async (coachId) => {
  const coach = await User.findById(coachId);
  if (!coach || coach.role !== 'coach') {
    throw new Error('Coach not found');
  }
  
  return await User.find({ 
    role: 'student',
    assignedCoach: coachId 
  }).select('-password');
};

// Create Employee
const createEmployee = async (employeeData) => {
  const employee = new Employee(employeeData);
  await employee.save();
  return employee;
};

// Get Employee
const getEmployee = async (id) => {
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new Error('Employee not found');
  }
  return employee;
};

// Update Employee
const updateEmployee = async (id, updateData) => {
  const employee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
  if (!employee) {
    throw new Error('Employee not found');
  }
  return employee;
};

// Delete Employee
const deleteEmployee = async (id) => {
  const result = await Employee.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Employee not found');
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllStudents,
  getAllCoaches,
  getStudentsByCoach,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};