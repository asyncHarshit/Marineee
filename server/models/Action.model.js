import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema(
  {
    authority: { type: mongoose.Schema.Types.ObjectId, ref: "Authority" },
    actionType: { type: String, enum: ["Alert", "Guideline"], required: true },
    message: { type: String, required: true },
    targetArea: { type: String, required: true },
    citizensNotified: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Action", ActionSchema);
