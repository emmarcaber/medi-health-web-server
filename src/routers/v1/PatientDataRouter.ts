import { Router } from "express";
import {
  createPatientData,
  updatePatientData,
  deletePatientData,
  getAllPatientData,
  getPatientDataByPatient,
  getSinglePatientData,
} from "../../controllers/v1/PatientDataController";
import { authenticateToken } from "../../middlewares/JWTAuthenticatorMiddleware";
import {
  createPatientDataValidation,
  updatePatientDataValidation,
} from "../../validators/PatientDataValidator";
import { validateRequest } from "../../middlewares/ValidateRequestMiddleware";

const PatientDataRouter = Router();

/**
 * @swagger
 * /v1/api/patient-data:
 *   get:
 *     summary: Get all patient data with optional filters and pagination
 *     tags: [PatientData]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: A list of patient data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/PatientData'
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User is not authenticated
 *       500:
 *          description: Internal Server Error
 */
PatientDataRouter.get("/", authenticateToken, getAllPatientData);

/**
 * @swagger
 * /v1/api/patient-data/{patientId}:
 *   get:
 *     summary: Get all patient data for a specific patient with optional filters and pagination
 *     tags: [PatientData]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient whose data is being fetched
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter for the data
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter for the data
 *     responses:
 *       200:
 *         description: A list of patient data for the specified patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalRecords:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     next:
 *                       type: string
 *                       nullable: true
 *                       example: "http://localhost:5000/api/patient-data/1?page=2&limit=10"
 *                     previous:
 *                       type: string
 *                       nullable: true
 *                       example: "http://localhost:5000/api/patient-data/1?page=1&limit=10"
 *                     items:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PatientData'
 *       400:
 *         description: Invalid patient ID or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid patientID"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User is not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "An error occurred while fetching patient data."
 */
PatientDataRouter.get(
  "/:patientId",
  authenticateToken,
  getPatientDataByPatient
);

/**
 * @swagger
 * /v1/api/patient-data/{patientId}/{dataId}:
 *   get:
 *     summary: Get a specific patient data entry for a specific patient
 *     tags: [PatientData]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the specific patient data entry
 *     responses:
 *       200:
 *         description: Patient data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PatientData'
 *       400:
 *         description: Invalid patient ID or data ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid patientId or dataID"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User is not authenticated
 *       404:
 *         description: Patient data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Patient data not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "An error occurred while fetching patient data."
 */
PatientDataRouter.get(
  "/:patientId/:dataId",
  authenticateToken,
  getSinglePatientData
);

/**
 * @swagger
 * /v1/api/patient-data:
 *   post:
 *     summary: Create a new patient data entry
 *     tags: [PatientData]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of entry
 *               glassesDrunk:
 *                 type: number
 *                 description: Glasses of water drunk
 *               stepsTaken:
 *                 type: number
 *                 description: Steps taken
 *               exercisesDone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of exercises done
 *               medicationsTaken:
 *                 type: object
 *                 properties:
 *                   morning:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   afternoon:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   evening:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                 description: Details of medications taken
 *               foodsEaten:
 *                 type: object
 *                 properties:
 *                   morning:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   afternoon:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   evening:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                 description: Details of foods eaten
 *     responses:
 *       201:
 *         description: Patient data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PatientData'
 *       400:
 *         description: Bad request (validation errors)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation failed"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User is not authenticated
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "An error occurred while creating patient data."
 */
PatientDataRouter.post(
  "/",
  authenticateToken,
  createPatientDataValidation,
  validateRequest,
  createPatientData
);

/**
 * @swagger
 * /v1/api/patient-data/{patientId}:
 *   put:
 *     summary: Update a specific patient data entry
 *     tags: [PatientData]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: ID of the patient data entry to update
 *         schema:
 *           type: string
 *           example: "605c72f8e0e2d024b4e1b0f7"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of entry
 *               glassesDrunk:
 *                 type: number
 *                 description: Glasses of water drunk
 *               stepsTaken:
 *                 type: number
 *                 description: Steps taken
 *               exercisesDone:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of exercises done
 *               medicationsTaken:
 *                 type: object
 *                 properties:
 *                   morning:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   afternoon:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   evening:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                 description: Details of medications taken
 *               foodsEaten:
 *                 type: object
 *                 properties:
 *                   morning:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   afternoon:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                   evening:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                 description: Details of foods eaten
 *     responses:
 *       200:
 *         description: Patient data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PatientData'
 *       400:
 *         description: Bad request (invalid patient ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid patientID"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User is not authenticated
 *       404:
 *         description: Patient data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Patient data not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "An error occurred while updating patient data."
 */
PatientDataRouter.put(
  "/:patientId",
  authenticateToken,
  updatePatientDataValidation,
  validateRequest,
  updatePatientData
);

/**
 * @swagger
 * /v1/api/patient-data/{patientId}:
 *   delete:
 *     summary: Delete a specific patient data entry
 *     tags: [PatientData]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: ID of the patient data entry to delete
 *         schema:
 *           type: string
 *           example: "605c72f8e0e2d024b4e1b0f7"
 *     responses:
 *       204:
 *         description: Patient data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: null
 *       400:
 *         description: Bad request (invalid patient ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid patientID"
 *       401:
 *         description: User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User is not authenticated
 *       404:
 *         description: Patient data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Patient data not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "An error occurred while deleting patient data."
 */
PatientDataRouter.delete("/:patientId", authenticateToken, deletePatientData);

export default PatientDataRouter;
