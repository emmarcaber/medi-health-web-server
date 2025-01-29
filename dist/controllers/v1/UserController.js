"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserProfilePicture = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.getAssignedHealthcareProfessionals = exports.getAssignedPatients = exports.registerPatientToMultipleHealthcareProfessionals = exports.refreshUserToken = exports.registerUserRole = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const FileService_1 = __importDefault(require("../../service/FileService"));
const config_1 = __importDefault(require("../../helpers/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield UserModel_1.default.findOne({ email });
        if (user) {
            res
                .status(400)
                .json({ success: false, data: { message: "User already exists" } });
            return;
        }
        user = new UserModel_1.default({
            name,
            email,
            password,
        });
        yield user.save();
        const accessToken = yield user.generateAccessToken();
        const refreshToken = yield user.generateRefreshToken();
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, data: { message: "Server Error" } });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                data: { message: "Invalid username or password" },
            });
            return;
        }
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                data: { message: "Invalid username or password" },
            });
            return;
        }
        const accessToken = yield user.generateAccessToken();
        const refreshToken = yield user.generateRefreshToken();
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, data: { message: "Server Error" } });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const dbUser = yield UserModel_1.default.findById(user._id);
        if (!dbUser) {
            res.status(404).json({
                success: false,
                data: { message: "User not found" },
            });
            return;
        }
        yield dbUser.removeRefreshToken();
        res.status(200).json({
            success: true,
            data: {
                message: "User has been successfully logged out",
            },
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, data: { message: "Server Error" } });
    }
});
exports.logoutUser = logoutUser;
const registerUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body;
    try {
        const user = req.user;
        const dbUser = yield UserModel_1.default.findById(user._id);
        if (!dbUser) {
            res.status(404).json({
                success: false,
                data: { message: "User not found" },
            });
            return;
        }
        dbUser.role = role;
        yield dbUser.save();
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
    }
    catch (error) {
        res.status(500).json({ success: false, data: { message: "Server Error" } });
    }
});
exports.registerUserRole = registerUserRole;
const refreshUserToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).json({
            success: false,
            data: { message: "No refresh token provided." },
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.JWT_TOKEN_SECRET);
        // Optionally, find the user in the database and verify their refresh token
        if (typeof decoded !== "object" || !("_id" in decoded)) {
            res.status(403).json({
                success: false,
                data: { message: "Invalid refresh token" },
            });
            return;
        }
        const user = yield UserModel_1.default.findById(decoded._id);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(403).json({
                success: false,
                data: { message: "Invalid or expired refresh token" },
            });
            return;
        }
        const newAccessToken = yield user.generateAccessToken();
        res.json({ success: true, data: { accessToken: newAccessToken } });
    }
    catch (err) {
        res.status(403).json({
            success: false,
            data: { message: "Invalid or expired refresh token" },
        });
    }
});
exports.refreshUserToken = refreshUserToken;
const registerPatientToMultipleHealthcareProfessionals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = req.user;
    const { healthcareProfessionalIds } = req.body;
    try {
        const healthcareProfessionals = yield UserModel_1.default.find({
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
        yield Promise.all(healthcareProfessionals.map((hp) => __awaiter(void 0, void 0, void 0, function* () {
            if (!hp.patients.includes(patient._id)) {
                hp.patients.push(patient._id);
                yield hp.save();
            }
        })));
        res.status(200).json({
            success: true,
            data: {
                message: "Patient has been successfully added to the healthcare professionals",
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
    }
    catch (error) {
        res.status(500).json({ success: false, data: { message: "Server Error" } });
    }
});
exports.registerPatientToMultipleHealthcareProfessionals = registerPatientToMultipleHealthcareProfessionals;
const getAssignedPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthcareProfessional = req.user;
    try {
        // Fetch all patients assigned to the healthcare professional
        const patients = yield UserModel_1.default.find({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: { message: "Server error. Unable to retrieve patients." },
        });
    }
});
exports.getAssignedPatients = getAssignedPatients;
const getAssignedHealthcareProfessionals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = req.user;
    try {
        const healthcareProfessionals = yield UserModel_1.default.find({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: {
                message: "Server error. Unable to retrieve healthcare professionals.",
            },
        });
    }
});
exports.getAssignedHealthcareProfessionals = getAssignedHealthcareProfessionals;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find().select("-password").exec();
        res.status(200).json({
            success: true,
            data: {
                message: "Users retrieved successfully.",
                users,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: { message: "Server error. Unable to retrieve users." },
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield UserModel_1.default.findById(id).select("-password").exec();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: { message: "Server error. Unable to retrieve user." },
        });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const user = yield UserModel_1.default.findById(id).exec();
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
        yield user.save();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: { message: "Server error. Unable to update user." },
        });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield UserModel_1.default.findById(id).exec();
        if (!user) {
            res.status(404).json({
                success: false,
                data: { message: "User not found" },
            });
            return;
        }
        user.deletedAt = new Date();
        yield user.save();
        res.status(200).json({
            success: true,
            data: {
                message: "User deleted successfully.",
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: { message: "Server error. Unable to delete user." },
        });
    }
});
exports.deleteUserById = deleteUserById;
const uploadUserProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const profilePicture = req.files.profile_picture;
        yield FileService_1.default.updateUserProfilePicture(userId, profilePicture);
        res.status(200).json({
            success: true,
            data: {
                message: "Profile picture uploaded successfully.",
                profilePicture: req.user.profilePicture,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: { message: error.message || "Server Error" },
        });
    }
});
exports.uploadUserProfilePicture = uploadUserProfilePicture;
//# sourceMappingURL=UserController.js.map