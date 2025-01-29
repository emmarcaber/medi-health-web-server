import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware to validate request
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

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
