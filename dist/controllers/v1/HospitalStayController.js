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
exports.deleteHospitalStay = exports.updateHospitalStay = exports.createHospitalStay = exports.getHospitalStaysByPatient = exports.getAllHospitalStays = exports.getSingleHospitalStay = void 0;
const mongoose_1 = require("mongoose");
const HospitalStayModel_1 = __importDefault(require("../../models/HospitalStayModel"));
/**
 * Get a single hospital stay entry
 * @param req
 * @param res
 */
const getSingleHospitalStay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.hospitalStayId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid hospitalStayID" } });
            return;
        }
        const hospitalStay = yield HospitalStayModel_1.default.findById(req.params.hospitalStayId);
        if (!hospitalStay) {
            res.status(404).json({ success: false, data: {} });
            return;
        }
        res.status(200).json({ success: true, data: hospitalStay });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.getSingleHospitalStay = getSingleHospitalStay;
/**
 * Get all hospital stay entries
 * @param req
 * @param res
 */
const getAllHospitalStays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hospitalStays = yield HospitalStayModel_1.default.find();
        res.status(200).json({ success: true, data: hospitalStays });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.getAllHospitalStays = getAllHospitalStays;
/**
 * Get all hospital stay entries by patient
 * @param req
 * @param res
 */
const getHospitalStaysByPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.patientId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid patientID" } });
            return;
        }
        const hospitalStays = yield HospitalStayModel_1.default.find({
            patient: req.params.patientId,
        });
        res.status(200).json({ success: true, data: hospitalStays });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.getHospitalStaysByPatient = getHospitalStaysByPatient;
/**
 * Create a new hospital stay entry
 * @param req
 * @param res
 */
const createHospitalStay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hospitalStay = new HospitalStayModel_1.default(req.body);
        yield hospitalStay.save();
        res.status(201).json({ success: true, data: hospitalStay });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.createHospitalStay = createHospitalStay;
/**
 * Update a hospital stay entry
 * @param req
 * @param res
 */
const updateHospitalStay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.hospitalStayId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid hospitalStayID" } });
            return;
        }
        const hospitalStay = yield HospitalStayModel_1.default.findByIdAndUpdate(req.params.hospitalStayId, req.body, { new: true });
        if (!hospitalStay) {
            res.status(404).json({ success: false, data: {} });
            return;
        }
        res.status(200).json({ success: true, data: hospitalStay });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.updateHospitalStay = updateHospitalStay;
/**
 * Delete a hospital stay entry
 * @param req
 * @param res
 */
const deleteHospitalStay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.hospitalStayId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid hospitalStayID" } });
            return;
        }
        const hospitalStay = yield HospitalStayModel_1.default.findByIdAndDelete(req.params.hospitalStayId);
        if (!hospitalStay) {
            res.status(404).json({ success: false, data: {} });
            return;
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(400).json({ success: false, data: { message: error.message } });
    }
});
exports.deleteHospitalStay = deleteHospitalStay;
//# sourceMappingURL=HospitalStayController.js.map