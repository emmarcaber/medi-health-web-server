import mongoose from "mongoose";
import { IPatientData, IPatientDataModel } from "../types/IPatientData";

const patientDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    glassesDrunk: {
      type: Number,
      default: 0,
    },
    stepsTaken: {
      type: Number,
      default: 0,
    },
    exercisesDone: {
      type: [String],
      default: [],
    },
    medicationsTaken: {
      type: {
        morning: {
          time: {
            type: String,
            default: "",
            trim: true,
          },
          items: [String],
        },
        afternoon: {
          time: {
            type: String,
            default: "",
            trim: true,
          },
          items: [String],
        },
        evening: {
          time: {
            type: String,
            default: "",
            trim: true,
          },
          items: [String],
        },
      },
      default: {},
    },

    foodsEaten: {
      type: {
        morning: {
          time: {
            type: String,
            default: "",
            trim: true,
          },
          items: [String],
        },
        afternoon: {
          time: {
            type: String,
            default: "",
            trim: true,
          },
          items: [String],
        },
        evening: {
          time: {
            type: String,
            default: "",
            trim: true,
          },
          items: [String],
        },
      },

      default: {},
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

patientDataSchema.statics.paginateAndFilter = async function ({
  page = 1,
  limit = 10,
  startDate = null,
  endDate = null,
  filters = {},
  baseUrl = "",
}) {
  const query: any = { ...filters };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const skip = (page - 1) * limit;
  const patientData = await this.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const totalRecords = await this.countDocuments(query);
  const totalPages = Math.ceil(totalRecords / limit);

  const hasMore = page < totalPages;
  const hasPrevious = page > 1;

  const nextLink = hasMore
    ? `${baseUrl}?page=${page + 1}&limit=${limit}${
        startDate ? `&startDate=${startDate}` : ""
      }${endDate ? `&endDate=${endDate}` : ""}`
    : null;

  const previousLink = hasPrevious
    ? `${baseUrl}?page=${page - 1}&limit=${limit}${
        startDate ? `&startDate=${startDate}` : ""
      }${endDate ? `&endDate=${endDate}` : ""}`
    : null;

  return {
    success: true,
    data: patientData,
    meta: {
      page,
      limit,
      totalRecords,
      totalPages,
      ...(nextLink && { next: nextLink }),
      ...(previousLink && { previous: previousLink }),
    },
  };
};

const PatientData = mongoose.model<IPatientData, IPatientDataModel>(
  "PatientData",
  patientDataSchema
);
export default PatientData;
