/**
 * @swagger
 * tags:
 *   name: Consultations
 *   description: API for managing consultations
 */

import { Router } from "express";
import {
  getConsultations,
  getSingleConsultation,
  getConsultationsByPatient,
  // getConsultationsByDoctor,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from "../../controllers/v1/ConsultationController";

import {
  createConsultationValidation,
  updateConsultationValidation,
} from "../../validators/ConsultationValidator";

import { authenticateToken } from "../../middlewares/JWTAuthenticatorMiddleware";
import { validateRequest } from "../../middlewares/ValidateRequestMiddleware";

const ConsultationRouter = Router();

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
ConsultationRouter.get("/", authenticateToken, getConsultations);

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
ConsultationRouter.get(
  "/:consultationId",
  authenticateToken,
  getSingleConsultation
);

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
ConsultationRouter.get(
  "/patient/:patientId",
  authenticateToken,
  getConsultationsByPatient
);

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
ConsultationRouter.post(
  "/",
  authenticateToken,
  createConsultationValidation,
  validateRequest,
  createConsultation
);

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
ConsultationRouter.put(
  "/:consultationId",
  authenticateToken,
  updateConsultationValidation,
  validateRequest,
  updateConsultation
);

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
ConsultationRouter.delete(
  "/:consultationId",
  authenticateToken,
  deleteConsultation
);

export default ConsultationRouter;
