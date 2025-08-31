import mongoose from "mongoose";

const voiceAlertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    audioUrl: { type: String, required: true },
    transcript: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("VoiceAlert", voiceAlertSchema);
