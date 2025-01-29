import { body, param } from "express-validator";

export const createConsultationValidation = [
  body("date")
    .isISO8601()
    .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
  body("doctor").isString().withMessage("Doctor must be a string"),
  body("notes").isString().withMessage("Notes must be a string"),
];

export const updateConsultationValidation = [
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
  body("doctor").optional().isString().withMessage("Doctor must be a string"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];
