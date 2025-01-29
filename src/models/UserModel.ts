import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../helpers/config";
import { IUser, IUserModel } from "../types/IUser";

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: "patient",
      trim: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    patients: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email, role: this.role },
    config.JWT_TOKEN_SECRET!,
    {
      expiresIn: config.JWT_TOKEN_SECRET_EXPIRE,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = jwt.sign(
    { _id: this._id, email: this.email },
    config.JWT_TOKEN_SECRET!,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRE,
    }
  );

  this.refreshToken = refreshToken;
  this.save();
  return refreshToken;
};

userSchema.methods.removeRefreshToken = async function () {
  this.refreshToken = null;
  this.save();
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
