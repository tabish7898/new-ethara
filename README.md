# ProManage - Full-stack Project Management Application

A full-stack project management web application built with the MERN stack (MongoDB, Express, React, Node.js). 
Users can create projects, manage teams, assign tasks, and track project progress with role-based access control.

## 🚀 Features
- **Authentication & Authorization**: JWT-based login/signup, role-based access (Admin/Member).
- **Project Management**: Create, view, and manage projects.
- **Task Management**: Create tasks, assign to members, track status and priorities.
- **Dashboard**: Overview of total projects, tasks, completed/pending/overdue metrics.
- **Responsive UI**: Built with React and Tailwind CSS for a modern, sleek interface.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios, React Router, Vite.
- **Backend**: Node.js, Express.js, JWT, Bcrypt.
- **Database**: MongoDB, Mongoose.

## 📦 Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repository
\`\`\`bash
git clone <repository_url>
cd <project_directory>
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
Create a \`.env\` file in the \`backend\` directory:
\`\`\`
PORT=5000
MONGO_URI=mongodb://localhost:27017/project_management
JWT_SECRET=yoursupersecretjwtkey
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
\`\`\`
Start the frontend development server:
\`\`\`bash
npm run dev
\`\`\`

## 📚 API Documentation

### Auth
- \`POST /api/auth/register\` - Register a new user
- \`POST /api/auth/login\` - Login user
- \`GET /api/auth/users\` - Get all users (Admin only)

### Projects
- \`GET /api/projects\` - Get all projects (filtered by role)
- \`POST /api/projects\` - Create a project (Admin only)
- \`GET /api/projects/:id\` - Get single project
- \`PUT /api/projects/:id\` - Update project
- \`DELETE /api/projects/:id\` - Delete project

### Tasks
- \`GET /api/tasks\` - Get all tasks
- \`POST /api/tasks\` - Create a task
- \`PUT /api/tasks/:id\` - Update a task
- \`DELETE /api/tasks/:id\` - Delete a task

## 🗄️ Database Schema Design
- **User**: name, email, password, role ('Admin', 'Member')
- **Project**: name, description, deadline, priority, status, owner (User Ref), members (Array of User Refs)
- **Task**: title, description, priority, status, dueDate, project (Project Ref), assignedTo (User Ref), createdBy (User Ref)

## 🌐 Deployment
- **Backend & DB**: Ready to be deployed on Railway (add a \`Procfile\` or railway.json if needed, and connect MongoDB Atlas).
- **Frontend**: Ready to be deployed on Vercel. Ensure \`VITE_API_URL\` is set to the backend's production URL.
