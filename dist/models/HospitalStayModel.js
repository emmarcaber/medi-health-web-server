"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hospitalStaySchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("HospitalStay", hospitalStaySchema);
//# sourceMappingURL=HospitalStayModel.js.map