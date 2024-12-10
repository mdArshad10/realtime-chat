import { config } from "dotenv";
config({
  path: "./.env",
});
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const CORS_ORIGIN = process.env.ORIGIN_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET_KEY = process.env.CLOUDINARY_API_SECRET_KEY;
const NODE_ENV = process.env.NODE_ENV;

export {
  ACCESS_TOKEN_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  MONGO_URL,
  CORS_ORIGIN,
  PORT,
  NODE_ENV,
};
