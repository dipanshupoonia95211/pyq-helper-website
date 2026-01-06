PYQ Helper – Backend

This is the backend service for the PYQ Helper application.
It provides secure APIs for admin authentication, uploading question papers, and serving Previous Year Question Papers (PYQs) to students.

Built using Node.js, Express, MongoDB, and JWT authentication.

🚀 Features

Admin authentication using JWT

Secure password hashing with bcrypt

Upload and manage PYQ PDFs

Public API for students to view & download papers

Protected admin routes

MongoDB database integration

File upload handling using multer

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT (JSON Web Tokens)

bcryptjs

multer

📁 Project Structure
backend/
├── config/
│   └── db.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── Admin.js
│   ├── Paper.js
│   └── Subject.js
├── routes/
│   ├── authRoutes.js
│   ├── paperRoutes.js
│   └── subjectRoutes.js
├── uploads/
│   └── papers/
├── .env
├── package.json
├── server.js
└── README.md

⚙️ Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📦 Installation
cd backend
npm install

▶️ Run the Server
Development mode (recommended)
npm run dev

Production mode
node server.js


Server will start on:

http://localhost:5000

🔐 Authentication Flow

Admin logs in using username & password

Passwords are hashed using bcrypt

On successful login, a JWT token is returned

Token must be sent in Authorization header for protected routes

Example:

Authorization: Bearer <token>

📌 API Endpoints
🔑 Auth Routes
Method	Endpoint	Description
POST	/api/auth/login	Admin login
POST	/api/auth/create-admin	Create admin (restricted)
📄 Paper Routes
Method	Endpoint	Description
GET	/api/papers/public	Get all papers (students)
POST	/api/papers	Upload paper (admin only)
DELETE	/api/papers/:id	Delete paper (admin only)
📂 File Access

Uploaded PDFs are served statically:

/uploads/papers/<filename>.pdf


Example:

http://localhost:5000/uploads/papers/sample.pdf

🔒 Security Notes

Passwords are never stored in plain text

JWT tokens protect admin routes

create-admin route should be disabled in production

Always use HTTPS in production

🧪 Testing APIs

Use Postman or frontend fetch() calls.

Example login request:

POST /api/auth/login
{
  "username": "admin",
  "password": "password123"
}

🌍 Deployment

Recommended hosting:

Backend → Render

Database → MongoDB Atlas

Make sure to:

Add environment variables in hosting dashboard

Update frontend API URLs to production backend URL

👨‍🎓 Use Case

This backend is designed for:

College students accessing PYQs

Admins managing academic resources

Secure academic content distribution

📄 License

This project is created for educational purposes.

✨ Author

PYQ Helper Backend
Built with ❤️ for students