# Secure Auth System

## Setup Instructions

1. Clone or unzip the project
2. Run `npm install` to install dependencies
3. Create a `.env` file and add:
   ```
   DB_URI=mongodb://localhost:27017/secure_auth_db
   JWT_SECRET=mysecretkey
   PORT=5000
   ```
4. Start the server:
   ```
   node server.js
   ```

## Features Implemented

- User registration and login with validation
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (`user`, `moderator`, `admin`)
- Public and protected routes
- User profile management
- Role update (admin only)

## Endpoints

| Method | Route              | Access           |
|--------|--------------------|------------------|
| GET    | /api/public        | Everyone         |
| GET    | /api/protected     | Authenticated    |
| GET    | /api/moderator     | Moderator/Admin  |
| GET    | /api/admin         | Admin only       |
| POST   | /api/auth/register | Public           |
| POST   | /api/auth/login    | Public           |
| GET    | /api/user/profile  | Authenticated    |
| PUT    | /api/user/profile  | Authenticated    |
| PUT    | /api/user/:id/role | Admin only       |