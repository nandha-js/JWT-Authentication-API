# JWT Authentication API

A Node.js API for user authentication and authorization using **Bearer tokens (JWT)**, built with **Express.js** and **MongoDB (Mongoose)**, following the **MVC architecture**.

---

## 🚀 **Features**

- User registration with password hashing
- User login with JWT generation
- Protected route to get user info using JWT middleware
- Follows clean MVC pattern
- MongoDB database integration with Mongoose
- Environment variable configuration using dotenv

---

## 📁 **Project Structure**

project/
├── controllers/
│ └── authController.js
├── middlewares/
│ └── authMiddleware.js
├── models/
│ └── User.js
├── routes/
│ └── authRoutes.js
├── config/
│ └── db.js
├── app.js
├── package.json
└── .env


📬 API Endpoints
➡️ Register User
URL: /api/auth/register

Method: POST

Body (JSON):
{
  "username": "nk",
  "email": "nk@example.com",
  "password": "StrongPassword123"
}

Response:  

{
  "success": true,
  "msg": "User registered successfully",
  "user": {
    "id": "60dd...",
    "username": "nk",
    "email": "nk@example.com"
  }
}


➡️ Login User
URL: /api/auth/login

Method: POST

Body (JSON):
{
  "email": "nk@example.com",
  "password": "StrongPassword123"
}

Response:

{
  "success": true,
  "msg": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
}


➡️ Get Current User Info
URL: /api/auth/me

Method: GET

Headers: Authorization: Bearer <token>


{
  "success": true,
  "user": {
    "id": "60dd...",
    "username": "nk",
    "email": "nk@example.com"
  }
}

