import mongoose from "mongoose";

// This is an embedded sub-document, so it doesn't need its own model.
const rescueReportSchema = new mongoose.Schema({
  rescuedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photo: { type: String }, // link to cloud storage
  location: {
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
    district: String,
    state: String,
    pincode: String,
  },
  rescueDate: { type: Date, default: Date.now },
  safeZone: {
    name: { type: String },
    location: {
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: [Number], // [longitude, latitude]
      },
      district: String,
      state: String,
      pincode: String,
    },
  },
  remarks: { type: String },
  reportedToAuthority: { type: Boolean, default: false },
});

const coastalRescueTeamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    members: [{ name: String, role: String, contact: String }],
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    assignedAlerts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alert" }],
    rescuedReports: [rescueReportSchema], // Embedded reports
  },
  { timestamps: true }
);

export default mongoose.model("CoastalRescueTeam", coastalRescueTeamSchema);
