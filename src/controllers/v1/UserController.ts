import { Request, Response } from "express";
import User from "../../models/UserModel";
import FileService from "../../service/FileService";
import config from "../../helpers/config";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res
        .status(400)
        .json({ success: false, data: { message: "User already exists" } });
      return;
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    res.status(201).json({
      success: true,
      data: {
        message: "User has been successfully created",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, data: { message: "Server Error" } });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        data: { message: "Invalid username or password" },
      });
      return;
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        data: { message: "Invalid username or password" },
      });
      return;
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    res.status(200).json({
      success: true,
      data: {
        message: "User has been successfully logged in",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, data: { message: "Server Error" } });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      res.status(404).json({
        success: false,
        data: { message: "User not found" },
      });

      return;
    }

    await dbUser.removeRefreshToken();

    res.status(200).json({
      success: true,
      data: {
        message: "User has been successfully logged out",
      },
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ success: false, data: { message: "Server Error" } });
  }
};

export const registerUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;

  try {
    const user = (req as any).user;

    const dbUser = await User.findById(user._id);

    if (!dbUser) {
      res.status(404).json({
        success: false,
        data: { message: "User not found" },
      });

      return;
    }

    dbUser.role = role;
    await dbUser.save();

    res.status(200).json({
      success: true,
      data: {
        message: "User role has been successfully updated.",
        user: {
          id: dbUser._id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, data: { message: "Server Error" } });
  }
};

export const refreshUserToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      data: { message: "No refresh token provided." },
    });

    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, config.JWT_TOKEN_SECRET!);

    // Optionally, find the user in the database and verify their refresh token
    if (typeof decoded !== "object" || !("_id" in decoded)) {
      res.status(403).json({
        success: false,
        data: { message: "Invalid refresh token" },
      });

      return;
    }

    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(403).json({
        success: false,
        data: { message: "Invalid or expired refresh token" },
      });

      return;
    }

    const newAccessToken = await user.generateAccessToken();
    res.json({ success: true, data: { accessToken: newAccessToken } });
  } catch (err) {
    res.status(403).json({
      success: false,
      data: { message: "Invalid or expired refresh token" },
    });
  }
};

export const registerPatientToMultipleHealthcareProfessionals = async (
  req: Request,
  res: Response
) => {
  const patient = (req as any).user;
  const { healthcareProfessionalIds } = req.body;

  try {
    const healthcareProfessionals = await User.find({
      _id: { $in: healthcareProfessionalIds },
      role: "healthcare_professional",
    });

    if (healthcareProfessionals.length !== healthcareProfessionalIds.length) {
      res.status(404).json({
        success: false,
        data: { message: "One or more healthcare professionals not found" },
      });
      return;
    }

    await Promise.all(
      healthcareProfessionals.map(async (hp) => {
        if (!hp.patients.includes(patient._id)) {
          hp.patients.push(patient._id);
          await hp.save();
        }
      })
    );

    res.status(200).json({
      success: true,
      data: {
        message:
          "Patient has been successfully added to the healthcare professionals",
        healthcareProfessionals: healthcareProfessionals.map((hp) => ({
          id: hp._id,
          name: hp.name,
          email: hp.email,
          patients: hp.patients,
        })),
        patient: {
          id: patient._id,
          name: patient.name,
          email: patient.email,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, data: { message: "Server Error" } });
  }
};

export const getAssignedPatients = async (req: Request, res: Response) => {
  const healthcareProfessional = (req as any).user;

  try {
    // Fetch all patients assigned to the healthcare professional
    const patients = await User.find({
      _id: { $in: healthcareProfessional.patients },
    })
      .select("_id name email")
      .exec();

    res.status(200).json({
      success: true,
      data: {
        message: "List of assigned patients retrieved successfully.",
        patients,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: { message: "Server error. Unable to retrieve patients." },
    });
  }
};

export const getAssignedHealthcareProfessionals = async (
  req: Request,
  res: Response
) => {
  const patient = (req as any).user;

  try {
    const healthcareProfessionals = await User.find({
      patients: patient._id,
      role: "healthcare_professional",
    })
      .select("_id name email")
      .exec();

    if (!healthcareProfessionals || healthcareProfessionals.length === 0) {
      res.status(404).json({
        success: false,
        data: { message: "Healthcare professionals not found" },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        message: "Assigned healthcare professionals retrieved successfully.",
        healthcareProfessionals,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: {
        message: "Server error. Unable to retrieve healthcare professionals.",
      },
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").exec();
    res.status(200).json({
      success: true,
      data: {
        message: "Users retrieved successfully.",
        users,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: { message: "Server error. Unable to retrieve users." },
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password").exec();

    if (!user) {
      res.status(404).json({
        success: false,
        data: { message: "User not found" },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        message: "User retrieved successfully.",
        user,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: { message: "Server error. Unable to retrieve user." },
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      res.status(404).json({
        success: false,
        data: { message: "User not found" },
      });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        message: "User updated successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: { message: "Server error. Unable to update user." },
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();

    if (!user) {
      res.status(404).json({
        success: false,
        data: { message: "User not found" },
      });
      return;
    }

    user.deletedAt = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        message: "User deleted successfully.",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: { message: "Server error. Unable to delete user." },
    });
  }
};

export const uploadUserProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const profilePicture = (req.files as any).profile_picture;

    await FileService.updateUserProfilePicture(userId, profilePicture);

    res.status(200).json({
      success: true,
      data: {
        message: "Profile picture uploaded successfully.",
        profilePicture: (req as any).user.profilePicture,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      data: { message: error.message || "Server Error" },
    });
  }
};
