import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    reporterType: { type: String, enum: ["User", "Analyst"], required: true },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "reporterType",
    }, // Dynamic reference
    description: { type: String, required: true },
    media: [{ type: String }], // URLs to photos/videos
    status: {
      type: String,
      enum: ["Pending", "Validated", "Rejected"],
      default: "Pending",
    },
    validatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Authority" },
    location: {
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
      },
      district: String,
      state: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
