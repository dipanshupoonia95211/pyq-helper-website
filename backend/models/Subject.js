import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  semester: String,
  branch: String
});

export default mongoose.model("Subject", subjectSchema);
