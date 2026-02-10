import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  condition: String
}, { timestamps: true });

export default mongoose.model("Material", MaterialSchema);
