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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../helpers/config"));
const userSchema = new mongoose_1.default.Schema({
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
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        default: [],
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enteredPassword, this.password);
    });
};
userSchema.methods.generateAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        return jsonwebtoken_1.default.sign({ _id: this._id, name: this.name, email: this.email, role: this.role }, config_1.default.JWT_TOKEN_SECRET, {
            expiresIn: config_1.default.JWT_TOKEN_SECRET_EXPIRE,
        });
    });
};
userSchema.methods.generateRefreshToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const refreshToken = jsonwebtoken_1.default.sign({ _id: this._id, email: this.email }, config_1.default.JWT_TOKEN_SECRET, {
            expiresIn: config_1.default.REFRESH_TOKEN_EXPIRE,
        });
        this.refreshToken = refreshToken;
        this.save();
        return refreshToken;
    });
};
userSchema.methods.removeRefreshToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.refreshToken = null;
        this.save();
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map