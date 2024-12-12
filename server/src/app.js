import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.js";
import { CORS_ORIGIN,NODE_ENV } from "./config/constant.js";
import path from "node:path";

// const CORS_ORIGIN = "http://localhost:5173";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        mediaSrc: [
          "'self'",
          "http://res.cloudinary.com",
          "https://res.cloudinary.com",
          "https://*.cloudinary.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://res.cloudinary.com",
          "https://*.cloudinary.com",
        ],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
      },
    },
  })
);
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
app.use("/api/*", (req, res, next) => {
  res.status(404).json({
    message: "Not found the EndPoint or wrong Method",
  });
});
if(NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
   app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   });
}


export default app;
