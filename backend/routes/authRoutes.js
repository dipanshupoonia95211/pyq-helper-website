import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

/* ================= CREATE ADMIN ================= */
router.post("/create-admin", async (req, res) => {
  const { username, password, secret } = req.body;

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Invalid secret key" });
  }

  const exists = await Admin.findOne({ username });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    username,
    password: hashedPassword
  });

  res.json({ message: "Admin created successfully" });
});

export default router;
