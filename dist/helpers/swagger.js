"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Medical Health Application API",
            version: "1.0.0",
            description: "API documentation for the Medical Health Application.",
            contact: {
                name: "Logisix Technologies",
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                PatientData: {
                    type: "object",
                    properties: {
                        user: { type: "string", description: "ID of the user" },
                        date: {
                            type: "string",
                            format: "date",
                            description: "Date of entry",
                        },
                        glassesDrunk: {
                            type: "number",
                            description: "Glasses of water drunk",
                        },
                        stepsTaken: { type: "number", description: "Steps taken" },
                        exercisesDone: {
                            type: "array",
                            items: { type: "string" },
                            description: "List of exercises done",
                        },
                        medicationsTaken: {
                            type: "object",
                            properties: {
                                morning: {
                                    type: "object",
                                    properties: {
                                        time: { type: "string" },
                                        items: { type: "array", items: { type: "string" } },
                                    },
                                },
                                afternoon: {
                                    type: "object",
                                    properties: {
                                        time: { type: "string" },
                                        items: { type: "array", items: { type: "string" } },
                                    },
                                },
                                evening: {
                                    type: "object",
                                    properties: {
                                        time: { type: "string" },
                                        items: { type: "array", items: { type: "string" } },
                                    },
                                },
                            },
                            description: "Details of medications taken",
                        },
                        foodsEaten: {
                            type: "object",
                            properties: {
                                morning: {
                                    type: "object",
                                    properties: {
                                        time: { type: "string" },
                                        items: { type: "array", items: { type: "string" } },
                                    },
                                },
                                afternoon: {
                                    type: "object",
                                    properties: {
                                        time: { type: "string" },
                                        items: { type: "array", items: { type: "string" } },
                                    },
                                },
                                evening: {
                                    type: "object",
                                    properties: {
                                        time: { type: "string" },
                                        items: { type: "array", items: { type: "string" } },
                                    },
                                },
                            },
                            description: "Details of foods eaten",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            description: "Date the patient data was deleted, if applicable",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the patient data was created",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the patient data was last updated",
                        },
                    },
                    required: ["user", "date"],
                },
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "Unique identifier for the user",
                        },
                        name: {
                            type: "string",
                            description: "Name of the user",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email address of the user",
                        },
                        password: {
                            type: "string",
                            description: "Password of the user",
                        },
                        role: {
                            type: "string",
                            default: null,
                            description: "Role of the user",
                        },
                        profilePicture: {
                            type: "string",
                            default: null,
                            description: "URL of the user's profile picture",
                        },
                        patients: {
                            type: "array",
                            items: { type: "string" },
                            default: [],
                            description: "List of patients assigned to the a healthcare professional, if applicable",
                        },
                        refreshToken: {
                            type: "string",
                            default: null,
                            description: "Refresh token for the user",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            description: "Date the user was deleted, if applicable",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the user was created",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the user was last updated",
                        },
                    },
                    required: ["name", "email", "password"],
                },
                HospitalStay: {
                    type: "object",
                    properties: {
                        patient: {
                            type: "string",
                            description: "ID of the patient",
                        },
                        admissionDate: {
                            type: "string",
                            format: "date",
                            description: "Date of admission",
                        },
                        dischargeDate: {
                            type: "string",
                            format: "date",
                            description: "Date of discharge",
                        },
                        notes: {
                            type: "string",
                            description: "Notes about the hospital stay",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            description: "Date the hospital stay was deleted, if applicable",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the hospital stay was created",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the hospital stay was last updated",
                        },
                    },
                    required: ["patient", "admissionDate", "dischargeDate"],
                },
                Consultation: {
                    type: "object",
                    properties: {
                        patient: {
                            type: "string",
                            description: "ID of the patient",
                        },
                        doctor: {
                            type: "string",
                            description: "ID of the doctor",
                        },
                        date: {
                            type: "string",
                            format: "date",
                            description: "Date of the consultation",
                        },
                        notes: {
                            type: "string",
                            description: "Notes about the consultation",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            description: "Date the consultation was deleted, if applicable",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the consultation was created",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the consultation was last updated",
                        },
                    },
                    required: ["patient", "doctor", "date"],
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/routers/v1/*.ts"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
//# sourceMappingURL=swagger.js.map