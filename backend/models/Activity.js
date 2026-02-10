import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    family: String,
    group: String,
    children: Number,
    duration: Number,
    theme: String,
    mechanic: String,

    materials: [String],

    objectives: [String],

    steps: [
      {
        title: String,
        content: String,
      },
    ],

    variants: [
      {
        title: String,
        content: String,
      },
    ],

    vigilance: String,

    // 🔒 CENTRE AUTOMATIQUE
    center: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
