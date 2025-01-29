"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientDataValidation = exports.createPatientDataValidation = void 0;
const express_validator_1 = require("express-validator");
// Validation for creating patient data
exports.createPatientDataValidation = [
    (0, express_validator_1.body)("date")
        .isISO8601()
        .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("glassesDrunk")
        .isInt({ min: 0 })
        .withMessage("Glasses drunk must be a positive integer"),
    (0, express_validator_1.body)("stepsTaken")
        .isInt({ min: 0 })
        .withMessage("Steps taken must be a positive integer"),
    (0, express_validator_1.body)("exercisesDone")
        .isArray()
        .withMessage("Exercises done must be an array of strings"),
    (0, express_validator_1.body)("medicationsTaken.morning.items")
        .optional()
        .isArray()
        .withMessage("Morning medications must be an array of strings"),
    (0, express_validator_1.body)("medicationsTaken.afternoon.items")
        .optional()
        .isArray()
        .withMessage("Afternoon medications must be an array of strings"),
    (0, express_validator_1.body)("medicationsTaken.evening.items")
        .optional()
        .isArray()
        .withMessage("Evening medications must be an array of strings"),
    (0, express_validator_1.body)("foodsEaten.morning.items")
        .optional()
        .isArray()
        .withMessage("Morning foods must be an array of strings"),
    (0, express_validator_1.body)("foodsEaten.afternoon.items")
        .optional()
        .isArray()
        .withMessage("Afternoon foods must be an array of strings"),
    (0, express_validator_1.body)("foodsEaten.evening.items")
        .optional()
        .isArray()
        .withMessage("Evening foods must be an array of strings"),
];
// Validation for updating patient data
exports.updatePatientDataValidation = [
    (0, express_validator_1.param)("id").isMongoId().withMessage("Invalid patient data ID"),
    (0, express_validator_1.body)("date")
        .optional()
        .isISO8601()
        .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("glassesDrunk")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Glasses drunk must be a positive integer"),
    (0, express_validator_1.body)("stepsTaken")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Steps taken must be a positive integer"),
    (0, express_validator_1.body)("exercisesDone")
        .optional()
        .isArray()
        .withMessage("Exercises done must be an array of strings"),
    (0, express_validator_1.body)("medicationsTaken.morning.items")
        .optional()
        .isArray()
        .withMessage("Morning medications must be an array of strings"),
    (0, express_validator_1.body)("medicationsTaken.afternoon.items")
        .optional()
        .isArray()
        .withMessage("Afternoon medications must be an array of strings"),
    (0, express_validator_1.body)("medicationsTaken.evening.items")
        .optional()
        .isArray()
        .withMessage("Evening medications must be an array of strings"),
    (0, express_validator_1.body)("foodsEaten.morning.items")
        .optional()
        .isArray()
        .withMessage("Morning foods must be an array of strings"),
    (0, express_validator_1.body)("foodsEaten.afternoon.items")
        .optional()
        .isArray()
        .withMessage("Afternoon foods must be an array of strings"),
    (0, express_validator_1.body)("foodsEaten.evening.items")
        .optional()
        .isArray()
        .withMessage("Evening foods must be an array of strings"),
];
//# sourceMappingURL=PatientDataValidator.js.map