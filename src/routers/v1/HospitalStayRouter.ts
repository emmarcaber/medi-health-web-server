/**
 * @swagger
 * tags:
 *   name: HospitalStays
 *   description: Hospital stay management
 */

import { Router } from "express";
import {
  getSingleHospitalStay,
  getHospitalStaysByPatient,
  getAllHospitalStays,
  createHospitalStay,
  updateHospitalStay,
  deleteHospitalStay,
} from "../../controllers/v1/HospitalStayController";

import {
  createHospitalStayValidation,
  updateHospitalStayValidation,
} from "../../validators/HospitalStayValidator";

import { authenticateToken } from "../../middlewares/JWTAuthenticatorMiddleware";
import { validateRequest } from "../../middlewares/ValidateRequestMiddleware";

const HospitalStayRouter = Router();

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
HospitalStayRouter.get("/", authenticateToken, getAllHospitalStays);

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
HospitalStayRouter.get(
  "/:hospitalStayId",
  authenticateToken,
  getSingleHospitalStay
);

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

HospitalStayRouter.get(
  "/patient/:patientId",
  authenticateToken,
  getHospitalStaysByPatient
);

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
HospitalStayRouter.post(
  "/",
  createHospitalStayValidation,
  validateRequest,
  createHospitalStay
);

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
HospitalStayRouter.put(
  "/:hospitalStayId",
  updateHospitalStayValidation,
  validateRequest,
  updateHospitalStay
);

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
HospitalStayRouter.delete(
  "/:hospitalStayId",
  authenticateToken,
  deleteHospitalStay
);

export default HospitalStayRouter;
