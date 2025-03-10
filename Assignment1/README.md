# Elite Cricket Academy Management System

A comprehensive management system for the Elite Cricket Academy, built with Angular and MongoDB. This system provides role-based access for Administrators, Coaches, and Students with tailored features for each role.

## Features

### Role-Based Access

- **Admin Dashboard**: Manage students, coaches, view reports, and system settings
- **Coach Dashboard**: Manage assigned students, schedule training sessions, provide feedback
- **Student Dashboard**: View courses, assignments, track progress, and manage schedule

### Modern UI/UX

- Built with Angular Material for a polished, responsive design
- Intuitive navigation with role-specific views
- Visually appealing dashboards with informative components
- Real-time data updates between UI and MongoDB

## Technology Stack

- **Frontend**: Angular 16, Angular Material, RxJS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/elite-cricket-academy.git
   cd elite-cricket-academy
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/elite-cricket-academy
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:4200`

## Usage

### Default Login Credentials

- **Admin**:
  - Email: admin@example.com
  - Password: Admin@123

- **Coach**:
  - Email: coach@example.com
  - Password: Coach@123

- **Student**:
  - Email: student@example.com
  - Password: Student@123

## Admin Features

- **Dashboard**: View key metrics and system status
- **Manage Students**: Add, edit, and remove student accounts
- **Manage Coaches**: Add, edit, and remove coach accounts
- **Reports**: Generate and view various reports
- **System Settings**: Configure system parameters

## Coach Features

- **Dashboard**: View assigned students and schedule
- **My Students**: Manage and track student progress
- **Schedule**: Manage training sessions and availability
- **Provide Feedback**: Give feedback to students
- **Training Plans**: Create and manage training plans

## Student Features

- **Dashboard**: View upcoming sessions and announcements
- **My Courses**: Access enrolled courses and materials
- **Assignments**: View and submit assignments
- **My Progress**: Track performance and improvement
- **My Schedule**: View upcoming training sessions

## Real-time Data Synchronization

The system features real-time data updates between the UI and MongoDB, ensuring that all users see the most current information. Changes made by administrators or coaches are immediately reflected in the student view.

## Error Handling

Robust error handling is implemented throughout the application, with user-friendly error messages and appropriate fallback mechanisms to ensure a smooth user experience.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Angular Team for the excellent framework
- MongoDB for the flexible database solution
- All contributors to this project
