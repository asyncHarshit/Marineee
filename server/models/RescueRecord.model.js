import mongoose from "mongoose";

const RescueRecordSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    operationDate: { type: Date, required: true },
    location: {
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
      },
      district: String,
      state: String,
      pincode: String,
    },
    notes: { type: String },
    photo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("RescueReport", RescueRecordSchema);
