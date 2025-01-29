"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHospitalStayValidation = exports.createHospitalStayValidation = void 0;
const express_validator_1 = require("express-validator");
// Validation for creating hospital stay
exports.createHospitalStayValidation = [
    (0, express_validator_1.body)("admissionDate")
        .isISO8601()
        .withMessage("Admission date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("dischargeDate")
        .isISO8601()
        .withMessage("Discharge date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("notes").isString().withMessage("Notes must be a string"),
];
// Validation for updating hospital stay
exports.updateHospitalStayValidation = [
    (0, express_validator_1.body)("admissionDate")
        .optional()
        .isISO8601()
        .withMessage("Admission date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("dischargeDate")
        .optional()
        .isISO8601()
        .withMessage("Discharge date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("notes").optional().isString().withMessage("Notes must be a string"),
];
//# sourceMappingURL=HospitalStayValidator.js.map