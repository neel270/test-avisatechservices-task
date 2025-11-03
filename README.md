# Full Stack Task Management Application

A comprehensive full-stack task management application built with Node.js, Express, MySQL, React, Redux Toolkit, and TypeScript.

## 🚀 Features

### Backend Features
- ✅ **User Authentication** - JWT-based authentication with bcrypt password hashing
- ✅ **Task Management** - Complete CRUD operations for tasks
- ✅ **Role-Based Access Control** - Admin and User roles with different permissions
- ✅ **File Uploads** - Support for task attachments
- ✅ **Input Validation** - Express-validator for request validation
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **Database Migrations** - Sequelize migrations for version control
- ✅ **TypeScript** - Fully typed backend

### Frontend Features
- ✅ **React 19** - Latest React with hooks
- ✅ **Redux Toolkit** - State management
- ✅ **React Query** - Server state management
- ✅ **React Router v6** - Client-side routing
- ✅ **Formik + Yup** - Form handling and validation
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **TypeScript** - Fully typed frontend

## 📁 Project Structure

```
test-avisatechservices-task/
├── server/                  # Backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── database.ts # Database connection
│   │   │   └── env.ts      # Environment variables
│   │   ├── controllers/    # Request handlers
│   │   │   ├── authController.ts
│   │   │   └── taskController.ts
│   │   ├── middleware/     # Custom middleware
│   │   │   ├── auth.ts     # JWT authentication
│   │   │   └── validation.ts
│   │   ├── models/         # Sequelize models
│   │   │   ├── User.ts
│   │   │   ├── Tasks.ts
│   │   │   └── index.ts
│   │   ├── routes/         # API routes
│   │   │   ├── auth.ts
│   │   │   └── tasks.ts
│   │   ├── migrations/     # Database migrations
│   │   ├── seeders/        # Database seeders
│   │   ├── app.ts          # Express app setup
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── frontend/               # Frontend application
    ├── src/
    │   ├── components/     # React components
    │   ├── contexts/       # React contexts
    │   ├── hooks/          # Custom hooks
    │   ├── services/       # API services
    │   ├── store/          # Redux store
    │   ├── App.tsx         # Main app component
    │   └── main.tsx        # Entry point
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── .env.example
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS
- **Rate Limiting**: express-rate-limit
- **Logging**: Morgan

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Server State**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Forms**: Formik
- **Validation**: Yup
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd test-avisatechservices-task
```

### 2. Backend Setup

#### Navigate to server directory
```bash
cd server
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` file with your configuration (see [Backend Environment Variables](#backend-environment-variables))

#### Create MySQL database
```bash
mysql -u root -p
CREATE DATABASE task_management;
exit;
```

#### Run migrations
```bash
npm run db:migrate
```

#### Start the server
```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start
```

The backend server will start at `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to frontend directory (from root)
```bash
cd frontend
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` file (see [Frontend Environment Variables](#frontend-environment-variables))

#### Start the development server
```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

## 🔧 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=task_management
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_LOGGING=false

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**Important Notes:**
- Change `JWT_SECRET` to a strong random string in production
- Update database credentials according to your MySQL setup
- Set `NODE_ENV=production` for production deployment
- Configure `CORS_ORIGIN` to your frontend URL

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Task Management
VITE_APP_VERSION=1.0.0
```

**Important Notes:**
- Update `VITE_API_URL` to match your backend URL
- All Vite environment variables must be prefixed with `VITE_`

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` - Filter by status (pending, in_progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive docs",
      "status": "in_progress",
      "priority": "high",
      "dueDate": "2025-11-10T00:00:00.000Z",
      "createdAt": "2025-11-03T00:00:00.000Z",
      "updatedAt": "2025-11-03T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2025-11-15"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  dueDate DATE,
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Helmet** - Security headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Prevent brute force attacks
- **Input Validation** - Express-validator
- **SQL Injection Prevention** - Sequelize ORM parameterized queries

## 📝 Available Scripts

### Backend Scripts
```bash
npm run dev              # Start development server with hot reload
npm start                # Start production server
npm run build            # Build TypeScript to JavaScript
npm run lint             # Run ESLint
npm run db:migrate       # Run database migrations
npm run db:migrate:undo  # Undo last migration
```

### Frontend Scripts
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🐛 Troubleshooting

### Database Connection Issues
1. Verify MySQL is running: `systemctl status mysql`
2. Check database credentials in `.env`
3. Ensure database exists: `SHOW DATABASES;`
4. Check user permissions: `SHOW GRANTS FOR 'user'@'localhost';`

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration time
- Clear browser localStorage and login again

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Built with ❤️ using Node.js, React, and TypeScript**
