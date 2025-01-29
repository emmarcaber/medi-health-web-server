"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePictureValidation = exports.loginUserValidation = exports.registerUserValidation = void 0;
const express_validator_1 = require("express-validator");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../helpers/config"));
// Validation rules for user registration
exports.registerUserValidation = [
    (0, express_validator_1.body)("name").not().isEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Please include a valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
];
// Validation rules for user login
exports.loginUserValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please include a valid email"),
    (0, express_validator_1.body)("password").not().isEmpty().withMessage("Password is required"),
];
exports.uploadProfilePictureValidation = [
    (0, express_validator_1.body)("profile_picture").custom((value, { req }) => {
        if (!req.files || !req.files.profile_picture) {
            throw new Error("Profile picture is required");
        }
        const file = req.files.profile_picture;
        const fileSize = file.size;
        const fileExtension = path_1.default.extname(file.name).toLowerCase();
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed");
        }
        if (fileSize > config_1.default.FILE_SIZE_LIMIT) {
            throw new Error(`File size should not exceed ${config_1.default.FILE_SIZE_LIMIT / (1024 * 1024)}MB`);
        }
        return true;
    }),
];
//# sourceMappingURL=UserValidator.js.map