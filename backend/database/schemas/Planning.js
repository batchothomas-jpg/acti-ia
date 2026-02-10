import mongoose from "mongoose";

const Block = new mongoose.Schema({
  day: String,
  timeSlot: String,
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" }
});

const PlanningSchema = new mongoose.Schema({
  weekStart: Date,
  blocks: [Block]
}, { timestamps: true });

export default mongoose.model("Planning", PlanningSchema);
