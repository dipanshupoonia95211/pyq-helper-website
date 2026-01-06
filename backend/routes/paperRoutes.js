import express from "express";
import Paper from "../models/Paper.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ===========================
   📥 UPLOAD (ADMIN ONLY)
=========================== */
router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("file"),
  async (req, res) => {
    try {
      const { subject, year, semester, type } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "PDF file required" });
      }

      const paper = new Paper({
        subject,
        year,
        semester,
        type,
        filePath: `/uploads/${req.file.filename}`
      });

      await paper.save();

      res.status(201).json({
        message: "Paper uploaded successfully",
        paper
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

/* ===========================
   📄 ADMIN VIEW (PROTECTED)
=========================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: "Failed to load papers" });
  }
});

/* ===========================
   📄 PUBLIC VIEW (STUDENTS)
=========================== */
router.get("/public", async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: "Failed to load papers" });
  }
});

/* ===========================
   🗑️ DELETE (ADMIN ONLY)
=========================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // ✅ Correct absolute path
    const filePath = path.join(
      path.resolve(),      // backend root
      paper.filePath       // uploads/filename.pdf
    );

    // ✅ Delete file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // ✅ Delete DB record
    await paper.deleteOne();

    res.json({ message: "Paper deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete paper" });
  }
});


export default router;
