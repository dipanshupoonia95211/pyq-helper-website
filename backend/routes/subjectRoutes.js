import express from "express";
import Subject from "../models/Subject.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const subject = await Subject.create(req.body);
  res.json(subject);
});

router.get("/", async (req, res) => {
  res.json(await Subject.find());
});

export default router;
