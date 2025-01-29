"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
// Middleware to validate request
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            data: {
                message: "Validation Error",
                errors: errors.formatWith((error) => error.msg).mapped(),
            },
        });
        return;
    }
    next();
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=ValidateRequestMiddleware.js.map