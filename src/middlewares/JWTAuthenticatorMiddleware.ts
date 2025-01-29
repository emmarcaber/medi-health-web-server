import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import config from "../helpers/config";

// Middleware to authenticate JWT tokens
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ success: false, data: { message: "Access token is missing" } });
    return;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_TOKEN_SECRET!) as {
      _id: string;
    };

    // Find the user by the decoded _id from the token
    const user = await User.findById(decoded._id);
    if (!user) {
      res
        .status(401)
        .json({ success: false, data: { message: "User not found" } });
      return;
    }

    // Attach the authenticated user to the request object
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {
        message: "Invalid token",
        anotherMessage: (error as any).message,
      },
    });
  }
};
