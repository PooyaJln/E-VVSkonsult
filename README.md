# E-VVSkonsult - Building Heat Loss Calculator

A comprehensive web application for calculating building heat loss during cold periods of the year. This full-stack application provides engineers and consultants with tools to analyze thermal performance of buildings through a hierarchical project structure.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

E-VVSkonsult is a proof-of-concept application designed to calculate building heat load during the cold period of the year. The application follows a hierarchical structure that mirrors real-world building organization:

```
Project → Building → Floor → Apartment → Room → Boundaries (Walls, Windows, etc.)
```

The system calculates heat loss by analyzing thermal properties of room boundaries including walls, floors, ceilings, and windows, providing detailed results at each level of the hierarchy.

## Features

### Current Features
- **Hierarchical Project Management**: Create and manage projects with nested building structures
- **Heat Loss Calculations**: Calculate room heat loss by analyzing boundary thermal properties
- **User Authentication**: Role-based access control with JWT authentication
- **CRUD Operations**: Full create, read, update, delete functionality for all entities
- **Responsive UI**: Modern React-based user interface with Material-UI components
- **RESTful API**: Comprehensive REST API for all operations
- **Database Integration**: MySQL database with Sequelize ORM

### Planned Features
- Object copying functionality for faster project setup
- Enhanced error handling and user feedback
- Advanced reporting and visualization
- Export capabilities

## Architecture

The application follows a modern full-stack architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React SPA)   │◄──►│  (Node.js API)  │◄──►│    (MySQL)      │
│                 │    │                 │    │                 │
│ • React Router  │    │ • Express.js    │    │ • Sequelize ORM │
│ • Material-UI   │    │ • JWT Auth      │    │ • Migrations    │
│ • Context API   │    │ • Passport.js   │    │ • Relationships │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Authentication**: JWT + Passport.js (Local Strategy)
- **Password Hashing**: bcrypt
- **Session Management**: express-session with connect-session-sequelize
- **Validation**: Custom validation middleware
- **Testing**: Jest, Mocha, Chai, Supertest
- **Development**: Nodemon
- **Containerization**: Docker

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM v6
- **UI Library**: Material-UI (@mui/material)
- **HTTP Client**: Axios
- **State Management**: React Context API + Custom Hooks
- **Icons**: FontAwesome, React Icons
- **Styling**: Styled Components, CSS
- **Build Tool**: Create React App

### Development & Deployment
- **Containerization**: Docker & Docker Compose
- **Code Quality**: ESLint, Prettier
- **API Testing**: Bruno Collections, VS Code REST Client
- **Version Control**: Git

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **Docker**: Version 20.x or higher (optional, for containerized setup)
- **Docker Compose**: Version 2.x or higher (optional)
- **MySQL**: Version 8.0 or higher (if not using Docker)

## Installation

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone git@github.com:PooyaJln/E-VVSkonsult.git
   cd E-VVSkonsult
   ```

2. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   cp backend/.env.example backend/.env
   # Edit the .env file with your configuration
   ```

3. **Start the database**
   ```bash
   docker-compose -f mysql-docker-compose.yml up -d
   ```

4. **Install dependencies and start services**
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Frontend (in a new terminal)
   cd frontend
   npm install
   npm start
   ```

### Option 2: Manual Setup

1. **Clone and install**
   ```bash
   git clone git@github.com:PooyaJln/E-VVSkonsult.git
   cd E-VVSkonsult
   ```

2. **Set up MySQL database**
   - Install MySQL 8.0
   - Create a database for the application
   - Note the connection details

3. **Backend setup**
   ```bash
   cd backend
   npm install
   # Configure .env file (see Configuration section)
   npm run dev
   ```

4. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

# Server Configuration
NODE_ENV=development
SERVER_PORT=5000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# Session Configuration
SESSION_SECRET=your_session_secret
```

### Frontend Configuration

The frontend automatically connects to the backend API. If you need to change the API endpoint, modify the axios configuration in the frontend source code.

## Usage

### Starting the Application

1. **Start the database** (if using Docker):
   ```bash
   docker-compose -f mysql-docker-compose.yml up -d
   ```

2. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

3. **Start the frontend**:
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:3000`

### User Workflow

1. **Authentication**: Sign up or log in to the application
2. **Create Project**: Start by creating a new project
3. **Add Buildings**: Add one or more buildings to your project
4. **Define Floors**: Add floors to each building
5. **Create Apartments**: Add apartments to each floor
6. **Add Rooms**: Create rooms within each apartment
7. **Define Boundaries**: Add walls, windows, and other boundaries to rooms
8. **Set Parameters**: Configure thermal parameters and temperatures
9. **View Results**: Analyze heat loss calculations at any level

### User Roles

- **Admin**: Full system access
- **Manager**: Project management capabilities
- **Engineer**: Standard user with calculation access

## API Documentation

### Authentication Endpoints

```http
POST /auth/signup
POST /auth/login
POST /auth/logout
GET  /auth/status
```

### Project Management

```http
GET    /projects/all          # Get all projects
POST   /projects/create       # Create new project
GET    /projects/:id          # Get single project
PATCH  /projects/:id          # Update project
DELETE /projects/:id          # Delete project
GET    /projects/:id/data     # Get complete project data
```

### Building Management

```http
GET    /buildings/all         # Get all buildings
POST   /buildings/create      # Create new building
GET    /buildings/:id         # Get single building
PATCH  /buildings/:id         # Update building
DELETE /buildings/:id         # Delete building
```

### Additional Endpoints

The API includes similar CRUD endpoints for:
- Floors (`/storeys`)
- Apartments (`/apartments`)
- Rooms (`/rooms`)
- Room Boundaries (`/roomBoundaries`)
- Thermal Parameters (`/thermalParameters`)
- Components (`/components`)
- Temperatures (`/temperatures`)

### Request/Response Examples

**Create Project**
```http
POST /projects/create
Content-Type: application/json

{
  "name": "Office Building Project",
  "description": "Heat loss analysis for new office building",
  "location": "Stockholm, Sweden"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Office Building Project",
    "description": "Heat loss analysis for new office building",
    "location": "Stockholm, Sweden",
    "owner_id": 1,
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

## Project Structure

```
E-VVSkonsult/
├── backend/                    # Node.js API server
│   ├── config/                # Configuration files
│   ├── connections/           # Database connections
│   ├── controllers/           # Route controllers
│   ├── middlewares/           # Custom middleware
│   ├── migrations/            # Database migrations
│   ├── models/                # Sequelize models
│   ├── routes/                # API routes
│   ├── test/                  # Backend tests
│   ├── utils/                 # Utility functions
│   ├── views/                 # EJS templates (legacy)
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
├── frontend/                   # React application
│   ├── public/                # Static assets
│   └── src/
│       ├── components/        # Reusable components
│       ├── contexts/          # React contexts
│       ├── hooks/             # Custom hooks
│       ├── layouts/           # Layout components
│       ├── pages/             # Page components
│       ├── templates/         # Template components
│       ├── App.js             # Main app component
│       └── index.js           # React entry point
├── httpRequests/              # API testing collections
├── db/                        # Database initialization
├── Dockerfile                 # Docker configuration
├── mysql-docker-compose.yml   # Database container setup
└── README.md                  # This file
```

## Database Schema

### Entity Relationships

```
User (1) ──── (N) Project
Project (1) ──── (N) Building
Building (1) ──── (N) Storey (Floor)
Storey (1) ──── (N) Apartment
Apartment (1) ──── (N) Room
Room (1) ──── (N) RoomBoundary

Project (1) ──── (N) ThermalParameter
Project (1) ──── (N) Component
Project (1) ──── (N) Temperature

Component (1) ──── (N) RoomBoundary
Temperature (1) ──── (N) RoomBoundary
Temperature (1) ──── (N) Room
```

### Key Models

- **User**: System users with role-based access
- **Project**: Top-level container for building analysis
- **Building**: Individual buildings within a project
- **Storey**: Floors within buildings
- **Apartment**: Apartment units within floors
- **Room**: Individual rooms for heat loss calculation
- **RoomBoundary**: Walls, windows, and other thermal boundaries
- **Component**: Thermal components with U-values
- **Temperature**: Temperature settings for different zones
- **ThermalParameter**: Project-specific thermal parameters

## Authentication

The application uses JWT-based authentication with the following features:

- **Local Strategy**: Username/password authentication via Passport.js

- **Role-Based Access**: Three user roles (Admin, Manager, Engineer)
- **Password Security**: bcrypt hashing for password storage
- **Session Management**: Express sessions with database storage

### Protected Routes

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## Development

### Running in Development Mode

```bash
# Backend with auto-reload
cd backend
npm run dev

# Frontend with hot reload
cd frontend
npm start
```

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Backend linting
cd backend
npm run lint

# Format code
npm run format
```

### Database Migrations

```bash
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm run test:mocha
npm run test:jest
```

### Frontend Tests

```bash
cd frontend
npm test
```

### API Testing

Use the provided HTTP request collections:

- **Bruno Collections**: Located in `httpRequests/brunoCollections/`
- **VS Code REST Client**: Located in `httpRequests/vsCodeRestClient/`

## Deployment

### Docker Deployment

1. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

2. **Production environment**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Manual Deployment

1. **Build frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Configure production environment**:
   - Set `NODE_ENV=production`
   - Configure production database
   - Set secure JWT secrets

3. **Start production server**:
   ```bash
   cd backend
   npm start
   ```

## Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check if MySQL is running
docker ps

# Check database logs
docker logs mysqlContainer

# Verify environment variables
cat backend/.env
```

**Port Conflicts**
- Backend default: `http://localhost:5000`
- Frontend default: `http://localhost:3000`
- MySQL default: `localhost:3306`

**Authentication Issues**
- Verify JWT secrets are set
- Check token expiration
- Ensure user roles are properly assigned

**Build Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Start the backend in debug mode:
```bash
cd backend
npm run debug
```

Then attach your debugger to `localhost:9229`.

## Credits

**Author**: Pooya.JLN

**Technologies**: Built with Node.js, React, MySQL, and modern web technologies.

---

For questions, issues, or contributions, please visit the [GitHub repository](https://github.com/PooyaJln/E-VVSkonsult).
