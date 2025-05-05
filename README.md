# ContentFlow

ContentFlow is a simple CMS (Content Management System) built with **Node.js**, **Express**, and **TypeScript**. This application allows users to manage blog posts and content, with basic CRUD functionality (Create, Read, Update, Delete). It is designed to be scalable and extensible for future features, such as user authentication, categories, tags, and more.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [License](#license)

---

## Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Token) – optional feature for future implementations
- **Hashing**: bcrypt.js (for hashing passwords in the case of user management)
- **Other**: Inversify.js (for Dependency Injection, used in services)
  
---

## Features

- **User Management** (Basic functionality for user creation, reading, updating, and deleting)
- **Blog Post Management** (CRUD operations for blog posts with fields such as title and content)
- **Simple REST API** (for handling blog and user data via HTTP requests)
- **TypeScript for Type Safety**
- **MongoDB for persistence**

---

## Installation

Follow these steps to get your local development environment running.

### 1. Clone the repository

\`\`\`
git clone https://github.com/yourusername/ContentFlow.git
\`\`\`

### 2. Install dependencies

Navigate to the project folder and install the required dependencies:

\`\`\`
cd ContentFlow
npm install
\`\`\`

### 3. Set up environment variables

Create a `.env` file at the root of the project and add the following variables:

\`\`\`
MONGO_URI=mongodb://localhost:27017/contentflow
PORT=5000
JWT_SECRET=your-secret-key
\`\`\`

- `MONGO_URI`: Your MongoDB URI.
- `PORT`: The port your server will run on.
- `JWT_SECRET`: Secret key for JWT (this is needed if you want to add user authentication features later).

---

## Usage

### 1. Start the server

To start the server in development mode, use:

\`\`\`
npm run dev
\`\`\`

This will run the application on `http://localhost:5000` by default.

### 2. Use the API

The API provides endpoints for managing blog posts and users (as mentioned below). You can use tools like Postman or Insomnia to test the API.

---

## Project Structure

Here's a brief breakdown of the project's folder structure:

\`\`\`
/src
  ├── /config            # Database connection configuration
  │    └── db.ts         # MongoDB connection
  ├── /controllers       # API controllers that handle HTTP requests
  │    └── UserController.ts
  │    └── BlogController.ts
  ├── /models            # MongoDB schemas (Mongoose models)
  │    └── User.ts       # User model
  │    └── Blog.ts       # Blog model
  ├── /routes            # Express routes
  │    └── userRoutes.ts
  │    └── blogRoutes.ts
  ├── /services          # Business logic related to blog and user operations
  │    └── UserService.ts
  │    └── BlogService.ts
  ├── /middleware        # Middlewares (Error handling, authentication, etc.)
  │    └── errorMiddleware.ts
  ├── app.ts             # Express app setup
  ├── server.ts          # Entry point to start the server
  ├── /types             # TypeScript types and interfaces
  │    └── UserTypes.ts
  │    └── BlogTypes.ts
  └── /utils             # Helper utilities (like logging, etc.)
  │    └── logger.ts
\`\`\`

---

## API Endpoints

Here are the key API endpoints for interacting with the system.

### User Routes:

- **GET /api/users** - Get all users.
- **POST /api/users** - Create a new user.
- **GET /api/users/:id** - Get user by ID.
- **PUT /api/users/:id** - Update user by ID.
- **DELETE /api/users/:id** - Delete user by ID.

### Blog Routes:

- **GET /api/blogs** - Get all blogs.
- **POST /api/blogs** - Create a new blog.
- **GET /api/blogs/:id** - Get blog by ID.
- **PUT /api/blogs/:id** - Update blog by ID.
- **DELETE /api/blogs/:id** - Delete blog by ID.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Additional Notes

- **Authentication**: This project currently does not include user authentication. However, you can easily extend it by implementing JWT-based authentication or using third-party services like OAuth or Firebase Authentication.
  
- **Deployment**: For production, you can deploy this app using cloud services like **Heroku**, **AWS**, or **DigitalOcean**, and ensure you configure environment variables securely.