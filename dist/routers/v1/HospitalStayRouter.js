"use strict";
/**
 * @swagger
 * tags:
 *   name: HospitalStays
 *   description: Hospital stay management
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HospitalStayController_1 = require("../../controllers/v1/HospitalStayController");
const HospitalStayValidator_1 = require("../../validators/HospitalStayValidator");
const JWTAuthenticatorMiddleware_1 = require("../../middlewares/JWTAuthenticatorMiddleware");
const ValidateRequestMiddleware_1 = require("../../middlewares/ValidateRequestMiddleware");
const HospitalStayRouter = (0, express_1.Router)();
/**
 * @swagger
 * /v1/api/hospital-stays:
 *   get:
 *     summary: Get all hospital stays
 *     tags: [HospitalStays]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all hospital stays
 *       401:
 *         description: Unauthorized
 */
HospitalStayRouter.get("/", JWTAuthenticatorMiddleware_1.authenticateToken, HospitalStayController_1.getAllHospitalStays);
/**
 * @swagger
 * /v1/api/hospital-stays/{hospitalStayId}:
 *   get:
 *     summary: Get a single hospital stay by ID
 *     tags: [HospitalStays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital stay ID
 *     responses:
 *       200:
 *         description: Hospital stay data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hospital stay not found
 */
HospitalStayRouter.get("/:hospitalStayId", JWTAuthenticatorMiddleware_1.authenticateToken, HospitalStayController_1.getSingleHospitalStay);
/**
 * @swagger
 * /v1/api/hospital-stays/patient/{patientId}:
 *   get:
 *     summary: Get hospital stays by patient ID
 *     tags: [HospitalStays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient ID
 *     responses:
 *       200:
 *         description: List of hospital stays for the patient
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 */
HospitalStayRouter.get("/patient/:patientId", JWTAuthenticatorMiddleware_1.authenticateToken, HospitalStayController_1.getHospitalStaysByPatient);
/**
 * @swagger
 * /v1/api/hospital-stays:
 *   post:
 *     summary: Create a new hospital stay
 *     tags: [HospitalStays]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               admissionDate:
 *                 type: string
 *                 format: date
 *               dischargeDate:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hospital stay created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
HospitalStayRouter.post("/", HospitalStayValidator_1.createHospitalStayValidation, ValidateRequestMiddleware_1.validateRequest, HospitalStayController_1.createHospitalStay);
/**
 * @swagger
 * /v1/api/hospital-stays/{hospitalStayId}:
 *   put:
 *     summary: Update a hospital stay by ID
 *     tags: [HospitalStays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalStayId
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital stay ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admissionDate:
 *                 type: string
 *                 format: date
 *               dischargeDate:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hospital stay updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hospital stay not found
 */
HospitalStayRouter.put("/:hospitalStayId", HospitalStayValidator_1.updateHospitalStayValidation, ValidateRequestMiddleware_1.validateRequest, HospitalStayController_1.updateHospitalStay);
/**
 * @swagger
 * /v1/api/hospital-stays/{hospitalStayId}:
 *   delete:
 *     summary: Delete a hospital stay by ID
 *     tags: [HospitalStays]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalStayId
 *         schema:
 *           type: string
 *         required: true
 *         description: The hospital stay ID
 *     responses:
 *       200:
 *         description: Hospital stay deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hospital stay not found
 */
HospitalStayRouter.delete("/:hospitalStayId", JWTAuthenticatorMiddleware_1.authenticateToken, HospitalStayController_1.deleteHospitalStay);
exports.default = HospitalStayRouter;
//# sourceMappingURL=HospitalStayRouter.js.map