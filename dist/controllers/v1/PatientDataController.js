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
exports.deletePatientData = exports.updatePatientData = exports.createPatientData = exports.getSinglePatientData = exports.getPatientDataByPatient = exports.getAllPatientData = void 0;
const mongoose_1 = require("mongoose");
const PatientDataModel_1 = __importDefault(require("../../models/PatientDataModel"));
/**
 * Get all patient data with optional filters and pagination
 * @param request Request
 * @param res Response
 */
const getAllPatientData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, startDate, endDate } = req.query;
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
        const patientData = yield PatientDataModel_1.default.paginateAndFilter({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            startDate: startDate,
            endDate: endDate,
            filters: {},
            baseUrl,
        });
        res.status(200).json({ success: true, data: patientData });
    }
    catch (err) {
        res.status(500).json({ success: false, data: { message: err.message } });
    }
});
exports.getAllPatientData = getAllPatientData;
/**
 * Get all patient data for a specific patient with optional filters and pagination
 * @param req
 * @param res
 * @returns json
 */
const getPatientDataByPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const { page, limit, startDate, endDate } = req.query;
    try {
        if (!(0, mongoose_1.isValidObjectId)(patientId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid patientID" } });
            return;
        }
        const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
        const patientData = yield PatientDataModel_1.default.paginateAndFilter({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            startDate: startDate,
            endDate: endDate,
            filters: { user: patientId },
            baseUrl,
        });
        res.status(200).json({ success: true, data: patientData });
    }
    catch (err) {
        res.status(500).json({ success: false, data: { message: err.message } });
    }
});
exports.getPatientDataByPatient = getPatientDataByPatient;
/**
 * Get a single patient data entry
 * @param req
 * @param res
 * @returns json
 */
const getSinglePatientData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId, dataId } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(patientId) || !(0, mongoose_1.isValidObjectId)(dataId)) {
            res.status(400).json({
                success: false,
                data: { message: "Invalid patientId or dataID" },
            });
            return;
        }
        const patientData = yield PatientDataModel_1.default.findOne({
            _id: dataId,
            user: patientId,
        });
        if (!patientData) {
            res
                .status(404)
                .json({ success: false, data: { message: "Patient data not found" } });
            return;
        }
        res.status(200).json({ success: true, data: patientData });
    }
    catch (err) {
        res.status(500).json({ success: false, data: { message: err.message } });
    }
});
exports.getSinglePatientData = getSinglePatientData;
/**
 * Create a new patient data entry
 * @param req
 * @param res
 */
const createPatientData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, glassesDrunk, stepsTaken, exercisesDone, medicationsTaken, foodsEaten, } = req.body;
    try {
        const user = req.user;
        let patientData = yield PatientDataModel_1.default.findOne({
            user: user._id,
            date
        });
        if (patientData) {
            patientData.glassesDrunk = glassesDrunk;
            patientData.stepsTaken = stepsTaken;
            patientData.exercisesDone = exercisesDone;
            patientData.medicationsTaken = medicationsTaken;
            patientData.foodsEaten = foodsEaten;
            yield patientData.save();
            res.status(200).json({ success: true, data: patientData });
            return;
        }
        patientData = new PatientDataModel_1.default({
            user: user._id,
            date,
            glassesDrunk,
            stepsTaken,
            exercisesDone,
            medicationsTaken,
            foodsEaten,
        });
        yield patientData.save();
        res.status(201).json({ success: true, data: patientData });
    }
    catch (err) {
        res.status(500).json({ success: false, data: { message: err.message } });
    }
});
exports.createPatientData = createPatientData;
/**
 * Update a specific patient data entry
 * @param req
 * @param res
 * @returns
 */
const updatePatientData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const { date, glassesDrunk, stepsTaken, exercisesDone, medicationsTaken, foodsEaten, } = req.body;
    try {
        const user = req.user;
        if (!(0, mongoose_1.isValidObjectId)(patientId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid patientID" } });
            return;
        }
        const patientData = yield PatientDataModel_1.default.findOne({
            _id: patientId,
            user: user._id,
        });
        if (!patientData) {
            res
                .status(404)
                .json({ success: false, data: { message: "Patient data not found" } });
            return;
        }
        patientData.date = date;
        patientData.glassesDrunk = glassesDrunk;
        patientData.stepsTaken = stepsTaken;
        patientData.exercisesDone = exercisesDone;
        patientData.medicationsTaken = medicationsTaken;
        patientData.foodsEaten = foodsEaten;
        yield patientData.save();
        res.status(200).json({ success: true, data: patientData });
    }
    catch (err) {
        res.status(500).json({ success: false, data: { message: err.message } });
    }
});
exports.updatePatientData = updatePatientData;
/**
 * Delete a specific patient data entry
 * @param req
 * @param res
 */
const deletePatientData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    try {
        const user = req.user;
        if (!(0, mongoose_1.isValidObjectId)(patientId)) {
            res
                .status(400)
                .json({ success: false, data: { message: "Invalid patientID" } });
            return;
        }
        const patientData = yield PatientDataModel_1.default.findOne({
            _id: patientId,
            user: user._id,
        });
        if (!patientData) {
            res
                .status(404)
                .json({ success: false, data: { message: "Patient data not found" } });
            return;
        }
        yield patientData.deleteOne();
        res.status(204).json({ success: true, data: null });
    }
    catch (err) {
        res.status(500).json({ success: false, data: { message: err.message } });
    }
});
exports.deletePatientData = deletePatientData;
//# sourceMappingURL=PatientDataController.js.map