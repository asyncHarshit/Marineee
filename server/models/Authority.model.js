import mongoose from "mongoose";

const authoritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["analyst", "authority", "rescue_team"],
      default: "analyst",
    },
    language: { type: String, default: "en" },
    validatedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
    actionTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action" }],
    fcmToken : {
      type : String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Authority", authoritySchema);
