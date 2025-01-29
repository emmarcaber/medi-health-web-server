import { body, param } from "express-validator";

// Validation for creating hospital stay
export const createHospitalStayValidation = [
  body("admissionDate")
    .isISO8601()
    .withMessage(
      "Admission date must be a valid date in the format YYYY-MM-DD"
    ),
  body("dischargeDate")
    .isISO8601()
    .withMessage(
      "Discharge date must be a valid date in the format YYYY-MM-DD"
    ),
  body("notes").isString().withMessage("Notes must be a string"),
];

// Validation for updating hospital stay
export const updateHospitalStayValidation = [
  body("admissionDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Admission date must be a valid date in the format YYYY-MM-DD"
    ),
  body("dischargeDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Discharge date must be a valid date in the format YYYY-MM-DD"
    ),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];
