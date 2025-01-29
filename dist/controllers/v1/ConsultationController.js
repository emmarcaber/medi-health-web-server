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
exports.deleteConsultation = exports.updateConsultation = exports.createConsultation = exports.getConsultationsByDoctor = exports.getConsultationsByPatient = exports.getSingleConsultation = exports.getConsultations = void 0;
const mongoose_1 = require("mongoose");
const ConsultationModel_1 = __importDefault(require("../../models/ConsultationModel"));
/**
 * Get all consultation entries
 * @param req
 * @param res
 */
const getConsultations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultations = yield ConsultationModel_1.default.find();
        res.status(200).json({ success: true, data: consultations });
    }
    catch (error) {
        res.status(500).json({ success: false, data: { message: error.message } });
    }
});
exports.getConsultations = getConsultations;
/**
 * Get a single consultation entry
 * @param req
 * @param res
 */
const getSingleConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.consultationId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid consulationId" } });
            return;
        }
        const consultation = yield ConsultationModel_1.default.findById(req.params.consultationId);
        if (!consultation) {
            res.status(404).json({ success: false, data: {} });
            return;
        }
        res.status(200).json({ success: true, data: consultation });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.getSingleConsultation = getSingleConsultation;
/**
 * Get all consultation entries by patient
 * @param req
 * @param res
 */
const getConsultationsByPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.patientId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid patientId" } });
            return;
        }
        const consultations = yield ConsultationModel_1.default.find({
            patient: req.params.patientId,
        });
        res.status(200).json({ success: true, data: consultations });
    }
    catch (error) {
        res.status(500).json({ success: false, data: { message: error.message } });
    }
});
exports.getConsultationsByPatient = getConsultationsByPatient;
/**
 * Get all consultation entries by doctor
 * @param req
 * @param res
 */
const getConsultationsByDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.doctorId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid doctorId" } });
            return;
        }
        const consultations = yield ConsultationModel_1.default.find({
            doctor: req.params.doctorId,
        });
        res.status(200).json({ success: true, data: consultations });
    }
    catch (error) {
        res.status(500).json({ success: false, data: { message: error.message } });
    }
});
exports.getConsultationsByDoctor = getConsultationsByDoctor;
/**
 * Create a new consultation entry
 * @param req
 * @param res
 */
const createConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consultation = new ConsultationModel_1.default(req.body);
        yield consultation.save();
        res.status(201).json({ success: true, data: consultation });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.createConsultation = createConsultation;
/**
 * Update a consultation entry
 * @param req
 * @param res
 */
const updateConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.consultationId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid consultationId" } });
            return;
        }
        const consultation = yield ConsultationModel_1.default.findByIdAndUpdate(req.params.consultationId, req.body, { new: true });
        if (!consultation) {
            res.status(404).json({ success: false, data: {} });
            return;
        }
        res.status(200).json({ success: true, data: consultation });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.updateConsultation = updateConsultation;
/**
 * Delete a consultation entry
 * @param req
 * @param res
 */
const deleteConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.consultationId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid consultationId" } });
            return;
        }
        const consultation = yield ConsultationModel_1.default.findByIdAndDelete(req.params.consultationId);
        if (!consultation) {
            res.status(404).json({ success: false, data: {} });
            return;
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.deleteConsultation = deleteConsultation;
//# sourceMappingURL=ConsultationController.js.map