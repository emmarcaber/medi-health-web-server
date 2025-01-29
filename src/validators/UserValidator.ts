import { body } from "express-validator";
import path from "path";
import config from "../helpers/config";

// Validation rules for user registration
export const registerUserValidation = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// Validation rules for user login
export const loginUserValidation = [
  body("email").isEmail().withMessage("Please include a valid email"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

export const uploadProfilePictureValidation = [
  body("profile_picture").custom((value, { req }) => {
    if (!req.files || !req.files.profile_picture) {
      throw new Error("Profile picture is required");
    }

    const file = req.files.profile_picture;
    const fileSize = file.size;
    const fileExtension = path.extname(file.name).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error(
        "Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed"
      );
    }
    if (fileSize > config.FILE_SIZE_LIMIT) {
      throw new Error(
        `File size should not exceed ${
          (config.FILE_SIZE_LIMIT as number) / (1024 * 1024)
        }MB`
      );
    }

    return true;
  }),
];
