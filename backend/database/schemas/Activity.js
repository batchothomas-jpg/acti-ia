import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  name: String,
  duration: Number,
  ageRange: String,
  material: [String],
  description: String,
  inclusion: String,
  variations: [String]
}, { timestamps: true });

export default mongoose.model("Activity", ActivitySchema);
