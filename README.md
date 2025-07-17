# JWT Authentication API

A Node.js REST API implementing **user authentication and authorization using JWT Bearer Tokens**, built with **Express.js**, **Mongoose**, and **bcryptjs**, following the MVC pattern.

---

## 🚀 **Features**

- User registration with hashed password
- User login with JWT generation
- Protected route to get current user info
- Password hashing using bcrypt
- JWT-based authentication middleware
- MongoDB integration with Mongoose
- Clean MVC project structure
- Environment variable configuration with dotenv

---

## 📁 **Project Structure**


jwt-authentication-api/
│
├── config/
│ └── db.js
│
├── controllers/
│ └── authController.js
│
├── middlewares/
│ └── authMiddleware.js
│
├── models/
│ └── User.js
│
├── routes/
│ └── authRoutes.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md




🔗 API Endpoints
📌 Register User
URL: /api/auth/register

Method: POST

Body (JSON):

{
  "username": "nk",
  "email": "nk@example.com",
  "password": "StrongPassword123",
  "age": 21,
  "gender": "Male",
  "bio": "Backend developer and learner."
}



Success Response (201):


{
  "success": true,
  "msg": "User registered successfully",
  "user": {
    "id": "64d8...",
    "username": "nk",
    "email": "nk@example.com",
    "age": 21,
    "gender": "Male",
    "bio": "Backend developer and learner."
  }
}


📌 Login User
URL: /api/auth/login

Method: POST

Body (JSON):


{
  "email": "nk@example.com",
  "password": "StrongPassword123"
}


Success Response (200):

{
  "success": true,
  "msg": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
}


📌 Get Current User Info (Protected)
URL: /api/auth/me

Method: GET

Headers:


| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer \<token\_here> |


Success Response (200):



{
  "success": true,
  "user": {
    "id": "64d8...",
    "username": "nk",
    "email": "nk@example.com",
    "age": 21,
    "gender": "Male",
    "bio": "Backend developer and learner."
  }
}



🔒 Authentication
All protected routes require a valid JWT token in the Authorization header:

Authorization: Bearer <token>


