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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const config_1 = __importDefault(require("../helpers/config"));
const Database_1 = __importDefault(require("../Database"));
const createSuperAdminAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSuperAdmin = yield UserModel_1.default.findOne({
            email: config_1.default.SUPER_ADMIN_EMAIL,
        });
        if (existingSuperAdmin) {
            console.log("Super admin account already exists.");
            return;
        }
        // Create super admin
        const superAdmin = new UserModel_1.default({
            name: "Super Admin",
            email: process.env.SUPER_ADMIN_EMAIL,
            password: process.env.SUPER_ADMIN_PASSWORD,
            role: "admin",
        });
        // Save the user with hashed password
        yield superAdmin.save();
        console.log("Super admin account created successfully.");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield Database_1.default.disconnect();
        process.exit(0);
    }
});
createSuperAdminAccount();
//# sourceMappingURL=SuperAdminSeeder.js.map