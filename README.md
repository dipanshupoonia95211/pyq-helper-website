# pyq-helper-website

📘 PYQ Helper – Full Stack Project

PYQ Helper is a full-stack web application that allows students to easily view and download Previous Year Question Papers (PYQs), while providing a secure Admin Dashboard to upload and manage academic resources.

This project is built using HTML, CSS, Vanilla JavaScript, Node.js, Express, and MongoDB.

🚀 Features Overview
👨‍🎓 Student Portal

View Previous Year Question Papers

Search & filter by:

Subject

Year

Semester

Paper Type

View PDF in new tab

Download PDF directly

Clean, responsive, student-friendly UI

🔐 Admin Portal

Secure Admin Login (JWT-based)

Upload question papers (PDF only)

Manage uploaded papers

View & download uploaded PDFs

Logout functionality

Protected routes (unauthorized access blocked)

🛠️ Tech Stack
Frontend

HTML

CSS

Vanilla JavaScript

Fetch API

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcryptjs (password hashing)

multer (file uploads)

📁 Project Structure
pyq-helper-website/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Paper.js
│   │   └── Subject.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── paperRoutes.js
│   │   └── subjectRoutes.js
│   ├── uploads/
│   │   └── papers/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── frontend/
│   ├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── main.js
│   ├── index.html
│   ├── login.html
│   ├── admin.html
│   └── README.md
│
└── README.md

⚙️ Environment Setup
Backend .env file

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

📦 Installation Steps
1️⃣ Clone the Repository
git clone https://github.com/your-username/pyq-helper-website.git
cd pyq-helper-website

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Start Backend Server
npm run dev


Backend will run at:

http://localhost:5000

4️⃣ Run Frontend (Static)
cd frontend
npx http-server


Frontend will run at:

http://localhost:8080

🌐 Application Links (Local)
Page	URL
Student Home	http://localhost:8080/index.html

Admin Login	http://localhost:8080/login.html

Admin Dashboard	http://localhost:8080/admin.html

Backend API	http://localhost:5000
🔐 Authentication Flow

Admin logs in via /api/auth/login

Password is verified using bcrypt

JWT token is returned and stored in localStorage

Token is required for:

Uploading papers

Viewing admin dashboard

Logout clears token and redirects to login page

📄 File Handling

Only PDF files are allowed

Files are stored in:

backend/uploads/papers/


Public access:

http://localhost:5000/uploads/papers/<filename>.pdf

📌 API Endpoints Summary
🔑 Auth APIs
Method	Endpoint	Description
POST	/api/auth/login	Admin login
POST	/api/auth/create-admin	Create admin (use once)
📚 Paper APIs
Method	Endpoint	Access
GET	/api/papers/public	Public
POST	/api/papers	Admin
DELETE	/api/papers/:id	Admin
🔒 Security Notes

Passwords are hashed (bcrypt)

JWT used for authentication

Admin routes protected by middleware

create-admin route should be disabled in production

Always use HTTPS when deployed

🌍 Deployment Guide
Recommended Hosting

Frontend → Netlify / GitHub Pages

Backend → Render / Railway

Database → MongoDB Atlas

Production Checklist

Update API URLs in frontend JS

Set environment variables in hosting dashboard

Enable CORS properly

Use HTTPS

👨‍🎓 Target Users

College & university students

Admins managing academic resources

Educational institutions

📄 License

This project is built for educational and academic use.

❤️ Author

PYQ Helper
Built with ❤️ for students
