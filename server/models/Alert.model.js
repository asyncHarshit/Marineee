import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    location: {
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
      },
      address: String,
      district: String,
      state: String,
      coastalZone: String,
      nearestLandmark: String,
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
