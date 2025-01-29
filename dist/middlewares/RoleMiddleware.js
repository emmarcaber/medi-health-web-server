"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPatient = exports.isAdmin = exports.isHealthcareProfessional = void 0;
const checkUserRole = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.role === role) {
            next();
            return;
        }
        res.status(403).json({
            success: false,
            data: {
                message: `Access denied. Only ${role.replace("_", " ")} users can access this resource.`,
            },
        });
    };
};
exports.isHealthcareProfessional = checkUserRole("healthcare_professional");
exports.isAdmin = checkUserRole("admin");
exports.isPatient = checkUserRole("patient");
//# sourceMappingURL=RoleMiddleware.js.map