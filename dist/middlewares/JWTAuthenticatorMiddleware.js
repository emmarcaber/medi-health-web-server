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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const config_1 = __importDefault(require("../helpers/config"));
// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res
            .status(401)
            .json({ success: false, data: { message: "Access token is missing" } });
        return;
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_TOKEN_SECRET);
        // Find the user by the decoded _id from the token
        const user = yield UserModel_1.default.findById(decoded._id);
        if (!user) {
            res
                .status(401)
                .json({ success: false, data: { message: "User not found" } });
            return;
        }
        // Attach the authenticated user to the request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: {
                message: "Invalid token",
                anotherMessage: error.message,
            },
        });
    }
});
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=JWTAuthenticatorMiddleware.js.map