"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const config_1 = __importDefault(require("../helpers/config"));
class FileService {
    static saveProfilePicture(userId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!file) {
                    throw new Error("No file provided");
                }
                yield fs.mkdir(config_1.default.UPLOADS_FOLDER, { recursive: true });
                const fileExtension = path.extname(file.name).toLowerCase();
                const filename = `${userId}_profile_picture${fileExtension}`;
                const fullPath = path.join(config_1.default.UPLOADS_FOLDER, filename);
                yield new Promise((resolve, reject) => {
                    file.mv(fullPath, (err) => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
                return `${config_1.default.APP_URL}/${config_1.default.UPLOADS_FOLDER}/${filename}`;
            }
            catch (error) {
                console.error("Error saving profile picture:", error);
                throw new Error(`Failed to save profile picture: ${error.message}`);
            }
        });
    }
    static updateUserProfilePicture(userId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findById(userId);
                if (!user) {
                    throw new Error("User not found");
                }
                const filename = yield this.saveProfilePicture(user._id.toString(), file);
                user.profilePicture = filename;
                yield user.save();
            }
            catch (error) {
                console.error("Error updating user profile picture:", error);
                throw error;
            }
        });
    }
}
exports.default = FileService;
//# sourceMappingURL=FileService.js.map