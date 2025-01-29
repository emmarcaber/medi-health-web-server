import Document from "mongoose";
import { Model } from "mongoose";

// Define the IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string | null;
  profilePicture: string | null;
  refreshToken: string | null;
  patients: string[];
  deletedAt: Date | null;

  matchPassword(enteredPassword: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  removeRefreshToken(): void;
}

// Define the IUserModel interface (for static methods)
export interface IUserModel extends Model<IUser> {}
