"use strict";
/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: API for managing consultations
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ConsultationController_1 = require("../../controllers/v1/ConsultationController");
const ConsultationValidator_1 = require("../../validators/ConsultationValidator");
const JWTAuthenticatorMiddleware_1 = require("../../middlewares/JWTAuthenticatorMiddleware");
const ValidateRequestMiddleware_1 = require("../../middlewares/ValidateRequestMiddleware");
const ConsultationRouter = (0, express_1.Router)();
/**
 * @swagger
 * /v1/api/consultations:
 *   get:
 *     summary: Retrieve a list of consultations
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of consultations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consultation'
 */
ConsultationRouter.get("/", JWTAuthenticatorMiddleware_1.authenticateToken, ConsultationController_1.getConsultations);
/**
 * @swagger
 * /v1/api/consultations/{consultationId}:
 *   get:
 *     summary: Retrieve a single consultation by ID
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: consultationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The consultation ID
 *     responses:
 *       200:
 *         description: A single consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 */
ConsultationRouter.get("/:consultationId", JWTAuthenticatorMiddleware_1.authenticateToken, ConsultationController_1.getSingleConsultation);
/**
 * @swagger
 * /v1/api/consultations/patient/{patientId}:
 *   get:
 *     summary: Retrieve consultations by patient ID
 *     tags: [Consultations]
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
 *         description: A list of consultations for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consultation'
 */
ConsultationRouter.get("/patient/:patientId", JWTAuthenticatorMiddleware_1.authenticateToken, ConsultationController_1.getConsultationsByPatient);
// /**
//  * @swagger
//  * /v1/api/consultations/doctor:
//  *   get:
//  *     summary: Retrieve consultations by doctor ID
//  *     tags: [Consultations]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: doctorId
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The doctor ID
//  *     responses:
//  *       200:
//  *         description: A list of consultations for the doctor
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Consultation'
//  */
// ConsultationRouter.get(
//   "/doctor/:doctorId",
//   authenticateToken,
//   getConsultationsByDoctor
// );
/**
 * @swagger
 * /v1/api/consultations:
 *   post:
 *     summary: Create a new consultation
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consultation'
 *     responses:
 *       201:
 *         description: The created consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 */
ConsultationRouter.post("/", JWTAuthenticatorMiddleware_1.authenticateToken, ConsultationValidator_1.createConsultationValidation, ValidateRequestMiddleware_1.validateRequest, ConsultationController_1.createConsultation);
/**
 * @swagger
 * /v1/api/consultations/{consultationId}:
 *   put:
 *     summary: Update a consultation by ID
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: consultationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The consultation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consultation'
 *     responses:
 *       200:
 *         description: The updated consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 */
ConsultationRouter.put("/:consultationId", JWTAuthenticatorMiddleware_1.authenticateToken, ConsultationValidator_1.updateConsultationValidation, ValidateRequestMiddleware_1.validateRequest, ConsultationController_1.updateConsultation);
/**
 * @swagger
 * /v1/api/consultations/{consultationId}:
 *   delete:
 *     summary: Delete a consultation by ID
 *     tags: [Consultations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: consultationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The consultation ID
 *     responses:
 *       204:
 *         description: No content
 */
ConsultationRouter.delete("/:consultationId", JWTAuthenticatorMiddleware_1.authenticateToken, ConsultationController_1.deleteConsultation);
exports.default = ConsultationRouter;
//# sourceMappingURL=ConsultationRouter.js.map