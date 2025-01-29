"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const patientDataSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
patientDataSchema.statics.paginateAndFilter = function (_a) {
    return __awaiter(this, arguments, void 0, function* ({ page = 1, limit = 10, startDate = null, endDate = null, filters = {}, baseUrl = "", }) {
        const query = Object.assign({}, filters);
        if (startDate && endDate) {
            query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const skip = (page - 1) * limit;
        const patientData = yield this.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const totalRecords = yield this.countDocuments(query);
        const totalPages = Math.ceil(totalRecords / limit);
        const hasMore = page < totalPages;
        const hasPrevious = page > 1;
        const nextLink = hasMore
            ? `${baseUrl}?page=${page + 1}&limit=${limit}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`
            : null;
        const previousLink = hasPrevious
            ? `${baseUrl}?page=${page - 1}&limit=${limit}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`
            : null;
        return {
            success: true,
            data: patientData,
            meta: Object.assign(Object.assign({ page,
                limit,
                totalRecords,
                totalPages }, (nextLink && { next: nextLink })), (previousLink && { previous: previousLink })),
        };
    });
};
const PatientData = mongoose_1.default.model("PatientData", patientDataSchema);
exports.default = PatientData;
//# sourceMappingURL=PatientDataModel.js.map