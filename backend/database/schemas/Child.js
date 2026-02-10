import mongoose from "mongoose";

const ChildSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profile: String
}, { timestamps: true });

export default mongoose.model("Child", ChildSchema);
