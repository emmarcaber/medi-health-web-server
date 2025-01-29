import mongoose from "mongoose";

const hospitalStaySchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    admissionDate: {
      type: Date,
      default: null,
    },
    dischargeDate: {
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

export default mongoose.model("HospitalStay", hospitalStaySchema);
