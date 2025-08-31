import mongoose from "mongoose"

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true, // Team names should be unique
    trim: true,
  },
  teamLeader: {
    type: String,
    required: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
    enum: ['Water Rescue', 'Medical Emergency', 'High Angle Rescue', 'Marine Operations'], // Enforce specific values
  },
  numberOfMembers: {
    type: Number,
    required: true,
    min: 2, // Minimum 2 member
    default: 2,
  },
  status: { type: String, default: "Available" },
  location: { type: String, default: "New Station" },
  lastDeployment: { type: String, default: new Date().toISOString() },
  contact: { type: String, default: "+1-000-000-0000" },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Team = mongoose.model('Team', teamSchema);

export default Team;