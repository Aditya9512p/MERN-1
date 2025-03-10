const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Admin = require('./models/admin.model');
const Coach = require('./models/coach.model');
const Student = require('./models/student.model');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elite-cricket-academy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Coach.deleteMany({}),
      Student.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      username: 'admin',
      password: adminPassword,
      fullName: 'System Administrator',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created');

    // Create test coach
    const coachPassword = await bcrypt.hash('coach123', 10);
    const coach = new Coach({
      username: 'coach1',
      password: coachPassword,
      fullName: 'John Smith',
      specialization: 'Batting',
      experience: 10,
      email: 'john.smith@example.com',
      phoneNumber: '1234567890',
      assignedBatches: [
        { batchTiming: 'Morning (6:00 AM - 8:00 AM)', maxStudents: 10 },
        { batchTiming: 'Evening (4:00 PM - 6:00 PM)', maxStudents: 10 }
      ]
    });
    await coach.save();
    console.log('Test coach created');

    // Create test student
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = new Student({
      username: 'student1',
      password: studentPassword,
      fullName: 'Jane Doe',
      age: 18,
      email: 'jane.doe@example.com',
      phoneNumber: '0987654321',
      batchTiming: 'Morning (6:00 AM - 8:00 AM)',
      coachAssigned: coach._id
    });
    await student.save();
    console.log('Test student created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 