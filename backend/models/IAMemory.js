import mongoose from "mongoose";

const iaMemorySchema = new mongoose.Schema({
  family: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String, // maternelle | primaire
    required: true
  },
  mechanic: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("IAMemory", iaMemorySchema);
