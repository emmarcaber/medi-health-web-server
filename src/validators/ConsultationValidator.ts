import { body, param } from "express-validator";

export const createConsultationValidation = [
  body("date")
    .isISO8601()
    .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
  body("doctor").isMongoId().withMessage("Doctor must be a valid MongoDB ID"),
  body("notes").isString().withMessage("Notes must be a string"),
];

export const updateConsultationValidation = [
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
  body("doctor")
    .optional()
    .isMongoId()
    .withMessage("Doctor must be a valid MongoDB ID"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];
