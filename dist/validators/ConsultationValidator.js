"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConsultationValidation = exports.createConsultationValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createConsultationValidation = [
    (0, express_validator_1.body)("date")
        .isISO8601()
        .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("doctor").isString().withMessage("Doctor must be a string"),
    (0, express_validator_1.body)("notes").isString().withMessage("Notes must be a string"),
];
exports.updateConsultationValidation = [
    (0, express_validator_1.body)("date")
        .optional()
        .isISO8601()
        .withMessage("Date must be a valid date in the format YYYY-MM-DD"),
    (0, express_validator_1.body)("doctor").optional().isString().withMessage("Doctor must be a string"),
    (0, express_validator_1.body)("notes").optional().isString().withMessage("Notes must be a string"),
];
//# sourceMappingURL=ConsultationValidator.js.map