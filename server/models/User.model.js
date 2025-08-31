import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    phoneNumber: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    language: String,
    location: {
      address: String,
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" }, // [lng, lat]
      },
      district: String,
      state: String,
      pincode: String,
    },
    points: { type: Number, default: 0 },
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Upload" }],
    alerts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alert" }],
    voiceAlerts: [{ type: mongoose.Schema.Types.ObjectId, ref: "VoiceAlert" }],
    fcmToken : {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
