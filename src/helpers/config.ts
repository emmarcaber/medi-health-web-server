import dotenv from "dotenv";

dotenv.config();

const config = {
  // Database Configuration
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  APP_URL: process.env.APP_URL || "http://localhost:5000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",

  // Access Token Configuration
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_SECRET_EXPIRE: process.env.JWT_TOKEN_SECRET_EXPIRE || "3d",
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE || "7d",

  // Profile Picture Configuration
  UPLOADS_FOLDER: process.env.UPLOADS_FOLDER || "uploads/profile_pictures",
  UPLOADS_URL: process.env.UPLOADS_URL || "uploads",
  FILE_SIZE_LIMIT: process.env.FILE_SIZE_LIMIT || 10000000,

  // Super Admin Configuration
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
};

export default config;
