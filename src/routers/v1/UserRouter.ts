import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUserRole,
  registerPatientToMultipleHealthcareProfessionals,
  getAssignedPatients,
  getAssignedHealthcareProfessionals,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  uploadUserProfilePicture,
} from "../../controllers/v1/UserController";
import {
  loginUserValidation,
  registerUserValidation,
  uploadProfilePictureValidation,
} from "../../validators/UserValidator";
import { validateRequest } from "../../middlewares/ValidateRequestMiddleware";
import { authenticateToken } from "../../middlewares/JWTAuthenticatorMiddleware";
import { isAdmin } from "../../middlewares/RoleMiddleware";

const UserRouter = Router();

/**
 * @swagger
 * /v1/api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePassword123"
 *     responses:
 *       201:
 *         description: User has been successfully created
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
 *                     message:
 *                       type: string
 *                       example: "User has been successfully created"
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "605c72f8e0e2d024b4e1b0f7"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         role:
 *                           type: string
 *                           example: "patient"
 *                         profilePicture:
 *                           type: string
 *                           nullable: true
 *                           example: "https://example.com/profile-picture.jpg"
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR..."
 *                     refreshToken:
 *                       type: string
 *                       example: "def50200b62d..."
 *       400:
 *         description: User already exists
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
 *                       example: "User already exists"
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
 *                       example: "Server Error"
 */
UserRouter.post(
  "/register",
  registerUserValidation,
  validateRequest,
  registerUser
);

/**
 * @swagger
 * /v1/api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns access and refresh tokens.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: mysecretpassword
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User successfully logged in
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
 *                     message:
 *                       type: string
 *                       example: User has been successfully logged in
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the user
 *                           example: 60d21b4667d0d8992e610c85
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: user@example.com
 *                         role:
 *                           type: string
 *                           example: patient
 *                         profilePicture:
 *                           type: string
 *                           nullable: true
 *                           example: "https://example.com/profile-picture.jpg"
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid username or password
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
 *                       example: Invalid username or password
 *       500:
 *         description: Server Error
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
 *                       example: Server Error
 */
UserRouter.post("/login", loginUserValidation, validateRequest, loginUser);

/**
 * @swagger
 * /v1/api/logout:
 *   post:
 *     summary: Logout a user
 *     description: Removes the refresh token for the authenticated user to log them out.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User successfully logged out
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
 *                     message:
 *                       type: string
 *                       example: User has been successfully logged out
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
 *         description: User not found
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
 *                       example: User not found
 *       500:
 *         description: Server Error
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
 *                       example: Server Error
 */
UserRouter.post("/logout", authenticateToken, logoutUser);

/**
 * @swagger
 * /v1/api/registerRole:
 *   post:
 *     summary: Register a role for the user
 *     description: Updates the role of the authenticated user in the database.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: The new role to assign to the user.
 *                 example: "patient"
 *             required:
 *               - role
 *     responses:
 *       200:
 *         description: User role successfully updated.
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
 *                     message:
 *                       type: string
 *                       example: User role has been successfully updated.
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 60d0fe4f5311236168a109ca
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
 *                         role:
 *                           type: string
 *                           example: patient
 *       401:
 *         description: Unauthorized - User not authenticated.
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
 *                       example: User is not authenticated.
 *       404:
 *         description: Not Found - User does not exist in the database.
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
 *                       example: User not found.
 *       500:
 *         description: Internal Server Error.
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
 *                       example: Server Error.
 */
UserRouter.post("/registerRole", authenticateToken, registerUserRole);

/**
 * @swagger
 * /v1/api/refresh:
 *   post:
 *     summary: Refresh user access token
 *     description: Uses the refresh token to generate a new access token for the user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your_refresh_token_here"
 *     responses:
 *       200:
 *         description: New access token generated successfully
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
 *                     accessToken:
 *                       type: string
 *                       example: "your_new_access_token_here"
 *       401:
 *         description: No refresh token provided
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
 *                       example: No refresh token provided.
 *       403:
 *         description: Invalid or expired refresh token
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
 *                       example: Invalid or expired refresh token
 */
UserRouter.post("/refresh", refreshUserToken);

/**
 * @swagger
 * /v1/api/register-patient-to-multiple-healthcare-professionals:
 *   post:
 *     summary: Register Patient to Multiple Healthcare Professionals
 *     description: Allows a patient to register with multiple healthcare professionals simultaneously
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - healthcareProfessionalIds
 *             properties:
 *               healthcareProfessionalIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of healthcare professional IDs to register with
 *                 example: ["60d5ecb54b6d8a001f3e1234", "60d5ecb54b6d8a001f3e5678"]
 *     responses:
 *       200:
 *         description: Successfully registered patient to healthcare professionals
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
 *                     message:
 *                       type: string
 *                       example: Patient has been successfully added to the healthcare professionals
 *                     healthcareProfessionals:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                           patients:
 *                             type: array
 *                             items:
 *                               type: string
 *                     patient:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *       404:
 *         description: One or more healthcare professionals not found
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
 *                       example: One or more healthcare professionals not found
 *       500:
 *         description: Server error
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
 *                       example: Server Error
 */
UserRouter.post(
  "/register-patient-to-multiple-healthcare-professionals",
  authenticateToken,
  registerPatientToMultipleHealthcareProfessionals
);

/**
 * @swagger
 * /v1/api/assigned-patients:
 *   get:
 *     summary: Get Assigned Patients
 *     description: Retrieves a list of patients assigned to the currently logged-in healthcare professional
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved assigned patients
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
 *                     message:
 *                       type: string
 *                       example: List of assigned patients retrieved successfully.
 *                     patients:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Patient ID
 *                             example: 60d5ecb54b6d8a001f3e1234
 *                           name:
 *                             type: string
 *                             description: Patient name
 *                             example: John Doe
 *                           email:
 *                             type: string
 *                             description: Patient email
 *                             example: john.doe@example.com
 *       500:
 *         description: Server error
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
 *                       example: Server error. Unable to retrieve patients.
 */
UserRouter.get("/assigned-patients", authenticateToken, getAssignedPatients);

/**
 * @swagger
 * /v1/api/assigned-healthcare-professionals:
 *   get:
 *     summary: Get Assigned Healthcare Professionals
 *     description: Retrieves a list of healthcare professionals assigned to the currently logged-in patient
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved assigned healthcare professionals
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
 *                     message:
 *                       type: string
 *                       example: Assigned healthcare professionals retrieved successfully.
 *                     healthcareProfessionals:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Healthcare professional ID
 *                             example: 60d5ecb54b6d8a001f3e1234
 *                           name:
 *                             type: string
 *                             description: Healthcare professional name
 *                             example: Dr. Jane Smith
 *                           email:
 *                             type: string
 *                             description: Healthcare professional email
 *                             example: jane.smith@hospital.com
 *       404:
 *         description: No healthcare professionals found
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
 *                       example: Healthcare professionals not found
 *       500:
 *         description: Server error
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
 *                       example: Server error. Unable to retrieve healthcare professionals.
 */
UserRouter.get(
  "/assigned-healthcare-professionals",
  authenticateToken,
  getAssignedHealthcareProfessionals
);

/**
 * @swagger
 * /v1/api/users:
 *   get:
 *     summary: Retrieve all users (super admin access only)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of users.
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
 *                     message:
 *                       type: string
 *                       example: "Users retrieved successfully."
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "64f7c7c1b74f4d3e5c9a79b9"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "johndoe@example.com"
 *                           role:
 *                             type: string
 *                             example: "admin"
 *                           profilePicture:
 *                             type: string
 *                             nullable: true
 *                             example: "https://example.com/profile-picture.jpg"
 *                           refreshToken:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           patients:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "64f7c8d1b74f4d3e5c9a79c1"
 *                           deletedAt:
 *                             type: string
 *                             format: date-time
 *                             nullable: true
 *                             example: null
 *       500:
 *         description: Server error. Unable to retrieve users.
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
 *                       example: "Server error. Unable to retrieve users."
 */
UserRouter.get("/users", authenticateToken, isAdmin, getAllUsers);

/**
 * @swagger
 * /v1/api/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *           example: "64f7c7c1b74f4d3e5c9a79b9"
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
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
 *                     message:
 *                       type: string
 *                       example: "User retrieved successfully."
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "64f7c7c1b74f4d3e5c9a79b9"
 *                         name:
 *                           type: string
 *                           example: "Jane Doe"
 *                         email:
 *                           type: string
 *                           example: "janedoe@example.com"
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         profilePicture:
 *                           type: string
 *                           nullable: true
 *                           example: "https://example.com/profile-picture.jpg"
 *                         patients:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "64f7c8d1b74f4d3e5c9a79c1"
 *                         deletedAt:
 *                           type: string
 *                           format: date-time
 *                           nullable: true
 *                           example: null
 *       404:
 *         description: User not found.
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
 *                       example: "User not found"
 *       500:
 *         description: Server error. Unable to retrieve the user.
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
 *                       example: "Server error. Unable to retrieve user."
 */
UserRouter.get("/users/:id", authenticateToken, getUserById);

/**
 * @swagger
 * /v1/api/upload:
 *   post:
 *     summary: Upload a user's profile picture
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_picture:
 *                 type: file
 *                 description: The profile picture to upload.
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully.
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
 *                     message:
 *                       type: string
 *                       example: "Profile picture uploaded successfully."
 *                     profilePicture:
 *                       type: string
 *                       example: "http://example.com/uploads/profile_pictures/filename.jpg"
 *       400:
 *         description: No file uploaded.
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
 *                       example: "No file uploaded"
 *       500:
 *         description: Server error.
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
 *                       example: "Server Error"
 */
UserRouter.post(
  "/upload",
  authenticateToken,
  uploadProfilePictureValidation,
  validateRequest,
  uploadUserProfilePicture
);

/**
 * @swagger
 * /v1/api/users/{id}:
 *   put:
 *     summary: Update user details by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           example: "64f7c7c1b74f4d3e5c9a79b9"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the user.
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: The updated email of the user.
 *                 example: "johndoe@example.com"
 *               role:
 *                 type: string
 *                 description: The updated role of the user.
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Successfully updated the user.
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
 *                     message:
 *                       type: string
 *                       example: "User updated successfully."
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "64f7c7c1b74f4d3e5c9a79b9"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "johndoe@example.com"
 *                         role:
 *                           type: string
 *                           example: "admin"
 *       404:
 *         description: User not found.
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
 *                       example: "User not found"
 *       500:
 *         description: Server error. Unable to update the user.
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
 *                       example: "Server error. Unable to update user."
 */
UserRouter.put("/users/:id", authenticateToken, updateUserById);

/**
 * @swagger
 * /v1/api/users/{id}:
 *   delete:
 *     summary: Soft delete a user by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *           example: "64f7c7c1b74f4d3e5c9a79b9"
 *     responses:
 *       200:
 *         description: Successfully soft-deleted the user.
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
 *                     message:
 *                       type: string
 *                       example: "User deleted successfully."
 *       404:
 *         description: User not found.
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
 *                       example: "User not found"
 *       500:
 *         description: Server error. Unable to delete the user.
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
 *                       example: "Server error. Unable to delete user."
 */
UserRouter.delete("/users/:id", authenticateToken, deleteUserById);

export default UserRouter;
