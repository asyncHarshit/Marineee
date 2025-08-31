import mongoose from "mongoose";

const AnalystSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "analyst" },
    pastDatasets: [
      {
        datasetType: {
          type: String,
          enum: ["satellite", "social_media", "other"],
          required: true,
        },
        source: String,
        dateRange: String,
        gapDetected: { type: Boolean, default: false },
        notes: String,
      },
    ],
    socialMediaAnalysis: [
      {
        platform: {
          type: String,
          enum: ["twitter", "facebook", "instagram", "news"],
          required: true,
        },
        content: String,
        credibilityScore: { type: Number, min: 0, max: 100 },
        flagged: { type: Boolean, default: false },
      },
    ],
    reports: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        validatedData: [
          { type: mongoose.Schema.Types.ObjectId, ref: "Upload" },
        ], // Fixed ref
        generatedAt: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["draft", "submitted", "validated"],
          default: "draft",
        },
      },
    ],
    submittedToAuthority: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Authority" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Analyst", AnalystSchema);
