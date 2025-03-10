const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('./controllers');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elite-cricket-academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Import models
const Admin = require('./models/admin.model');
const Coach = require('./models/coach.model');
const Student = require('./models/student.model');

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in any collection
    const [admin, coach, student] = await Promise.all([
      Admin.findOne({ username }),
      Coach.findOne({ username }),
      Student.findOne({ username })
    ]);

    const user = admin || coach || student;

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        fullName: user.fullName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// User routes
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/users/:username', async (req, res) => {
  try {
    const user = await getUser(req.params.username);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put('/api/users/:username', async (req, res) => {
  try {
    const user = await updateUser(req.params.username, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/users/:username', async (req, res) => {
  try {
    await deleteUser(req.params.username);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Employee routes
app.post('/api/employees', async (req, res) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await getEmployee(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await updateEmployee(req.params.id, req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    await deleteEmployee(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Student routes
app.get('/api/students', authenticateToken, async (req, res) => {
  try {
    const students = await Student.find()
      .select('-password')
      .populate('coachAssigned', 'fullName');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

app.post('/api/students', authenticateToken, async (req, res) => {
  try {
    const { password, ...studentData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const student = new Student({
      ...studentData,
      password: hashedPassword,
      role: 'student'
    });
    
    await student.save();
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Error creating student' });
    }
  }
});

app.put('/api/students/:id', authenticateToken, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student' });
  }
});

app.delete('/api/students/:id', authenticateToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Error deleting student' });
  }
});

// Coach routes
app.get('/api/coaches', authenticateToken, async (req, res) => {
  try {
    const coaches = await Coach.find().select('-password');
    res.json(coaches);
  } catch (error) {
    console.error('Error fetching coaches:', error);
    res.status(500).json({ message: 'Error fetching coaches' });
  }
});

app.post('/api/coaches', authenticateToken, async (req, res) => {
  try {
    const { password, ...coachData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Add default batch timings if not provided
    if (!coachData.assignedBatches || coachData.assignedBatches.length === 0) {
      coachData.assignedBatches = [
        { batchTiming: 'Morning (6:00 AM - 8:00 AM)', maxStudents: 10 },
        { batchTiming: 'Evening (4:00 PM - 6:00 PM)', maxStudents: 10 }
      ];
    }
    
    const coach = new Coach({
      ...coachData,
      password: hashedPassword,
      role: 'coach'
    });
    
    await coach.save();
    res.status(201).json({ message: 'Coach created successfully' });
  } catch (error) {
    console.error('Error creating coach:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Error creating coach' });
    }
  }
});

app.put('/api/coaches/:id', authenticateToken, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    const coach = await Coach.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');
    
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    
    res.json(coach);
  } catch (error) {
    console.error('Error updating coach:', error);
    res.status(500).json({ message: 'Error updating coach' });
  }
});

app.delete('/api/coaches/:id', authenticateToken, async (req, res) => {
  try {
    // First check if coach has any assigned students
    const studentsCount = await Student.countDocuments({ coachAssigned: req.params.id });
    if (studentsCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete coach with assigned students. Please reassign students first.' 
      });
    }
    
    const coach = await Coach.findByIdAndDelete(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting coach:', error);
    res.status(500).json({ message: 'Error deleting coach' });
  }
});

// Batch routes
app.get('/api/batches', authenticateToken, async (req, res) => {
  try {
    const coaches = await Coach.find().select('fullName assignedBatches');
    const students = await Student.find().select('batchTiming');
    
    const batches = [];
    coaches.forEach(coach => {
      coach.assignedBatches.forEach(batch => {
        const studentCount = students.filter(s => s.batchTiming === batch.batchTiming).length;
        batches.push({
          timing: batch.batchTiming,
          coach: coach.fullName,
          maxStudents: batch.maxStudents,
          studentCount: studentCount
        });
      });
    });
    
    res.json(batches);
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ message: 'Error fetching batches' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
