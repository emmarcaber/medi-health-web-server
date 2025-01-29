import { JwtPayload } from "jsonwebtoken";
import User from "../../models/UserModel";

// Extend Express's Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload | typeof User; // Adjust based on how you're handling user data
  }
}
