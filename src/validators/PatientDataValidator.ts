import { body, param } from "express-validator";

// Validation for creating patient data
export const createPatientDataValidation = [
  body("date")
    .isISO8601()
    .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
  body("glassesDrunk")
    .isInt({ min: 0 })
    .withMessage("Glasses drunk must be a positive integer"),
  body("stepsTaken")
    .isInt({ min: 0 })
    .withMessage("Steps taken must be a positive integer"),
  body("exercisesDone")
    .isArray()
    .withMessage("Exercises done must be an array of strings"),
  body("medicationsTaken.morning.items")
    .optional()
    .isArray()
    .withMessage("Morning medications must be an array of strings"),
  body("medicationsTaken.afternoon.items")
    .optional()
    .isArray()
    .withMessage("Afternoon medications must be an array of strings"),
  body("medicationsTaken.evening.items")
    .optional()
    .isArray()
    .withMessage("Evening medications must be an array of strings"),
  body("foodsEaten.morning.items")
    .optional()
    .isArray()
    .withMessage("Morning foods must be an array of strings"),
  body("foodsEaten.afternoon.items")
    .optional()
    .isArray()
    .withMessage("Afternoon foods must be an array of strings"),
  body("foodsEaten.evening.items")
    .optional()
    .isArray()
    .withMessage("Evening foods must be an array of strings"),
];

// Validation for updating patient data
export const updatePatientDataValidation = [
  param("id").isMongoId().withMessage("Invalid patient data ID"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
  body("glassesDrunk")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Glasses drunk must be a positive integer"),
  body("stepsTaken")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Steps taken must be a positive integer"),
  body("exercisesDone")
    .optional()
    .isArray()
    .withMessage("Exercises done must be an array of strings"),
  body("medicationsTaken.morning.items")
    .optional()
    .isArray()
    .withMessage("Morning medications must be an array of strings"),
  body("medicationsTaken.afternoon.items")
    .optional()
    .isArray()
    .withMessage("Afternoon medications must be an array of strings"),
  body("medicationsTaken.evening.items")
    .optional()
    .isArray()
    .withMessage("Evening medications must be an array of strings"),
  body("foodsEaten.morning.items")
    .optional()
    .isArray()
    .withMessage("Morning foods must be an array of strings"),
  body("foodsEaten.afternoon.items")
    .optional()
    .isArray()
    .withMessage("Afternoon foods must be an array of strings"),
  body("foodsEaten.evening.items")
    .optional()
    .isArray()
    .withMessage("Evening foods must be an array of strings"),
];
