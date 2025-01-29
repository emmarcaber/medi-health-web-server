import express, { Request, Response } from "express";
import PatientDataRouter from "./routers/v1/PatientDataRouter";
import config from "./helpers/config";
import UserRouter from "./routers/v1/UserRouter";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./helpers/swagger";
import fileUpload from "express-fileupload";
import cors from "cors";
import HospitalStayRouter from "./routers/v1/HospitalStayRouter";
import ConsultationRouter from "./routers/v1/ConsultationRouter";

require("./Database");

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(fileUpload());

app.use("/uploads", express.static("uploads"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100, // Limit each IP to 100 requests per window (15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/patient-data", PatientDataRouter);
app.use("/v1/api/hospital-stays", HospitalStayRouter);
app.use("/v1/api/consultations", ConsultationRouter);
app.use("/v1/api", UserRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api-docs");
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

export default app;
