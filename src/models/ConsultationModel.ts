import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      default: "",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", consultationSchema);
