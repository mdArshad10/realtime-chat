import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.js";

const CORS_ORIGIN = "http://localhost:5173";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", apiRoutes);
app.use(errorMiddleware);
app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Not found the EndPoint or wrong Method",
  });
});

export default app;
