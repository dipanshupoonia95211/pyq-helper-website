import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import paperRoutes from "./routes/paperRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

dotenv.config();

const app = express();

/* --------------------------------
   Fix __dirname for ES Modules
--------------------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* --------------------------------
   Middleware
--------------------------------- */
app.use(cors({
  origin: "*", // frontend access (change to domain in production)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------
   Static Files (PDF access)
   IMPORTANT: frontend uses this
--------------------------------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* --------------------------------
   API Routes
--------------------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/subjects", subjectRoutes);

/* --------------------------------
   Health Check
--------------------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "PYQ Helper Backend is running 🚀"
  });
});

/* --------------------------------
   MongoDB Connection
--------------------------------- */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
});

/* --------------------------------
   Server Start
--------------------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
