import mongoose from "mongoose";

const HeatMapSchema = new mongoose.Schema(
  {
    location: {
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
      },
      district: String,
      state: String,
      pincode: String,
    },
    radiusInDangerZone: { type: Number, required: true }, // in km
    intensity: { type: Number, required: true }, // severity level
    reportIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

export default mongoose.model("HeatMap", HeatMapSchema);
