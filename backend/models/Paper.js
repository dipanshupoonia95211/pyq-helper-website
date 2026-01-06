import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    subject: String,
    year: Number,
    semester: Number,
    type: String,
    fileUrl: String
  },
  { timestamps: true }
);

export default mongoose.model("Paper", paperSchema);
