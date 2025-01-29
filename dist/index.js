"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PatientDataRouter_1 = __importDefault(require("./routers/v1/PatientDataRouter"));
const config_1 = __importDefault(require("./helpers/config"));
const UserRouter_1 = __importDefault(require("./routers/v1/UserRouter"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./helpers/swagger"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const HospitalStayRouter_1 = __importDefault(require("./routers/v1/HospitalStayRouter"));
const ConsultationRouter_1 = __importDefault(require("./routers/v1/ConsultationRouter"));
require("./Database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.FRONTEND_URL,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, express_fileupload_1.default)());
app.use("/uploads", express_1.default.static("uploads"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    max: 100, // Limit each IP to 100 requests per window (15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/v1/api/patient-data", PatientDataRouter_1.default);
app.use("/v1/api/hospital-stays", HospitalStayRouter_1.default);
app.use("/v1/api/consultations", ConsultationRouter_1.default);
app.use("/v1/api", UserRouter_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map