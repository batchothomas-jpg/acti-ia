import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 1 },

  // 🔐 CENTRE LIÉ AU MATÉRIEL
  center: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model("Material", materialSchema);
