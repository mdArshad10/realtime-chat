import {config} from 'dotenv'
config({
  path:"./.env"
})
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ORIGIN_URL = process.env.ORIGIN_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET_KEY = process.env.CLOUDINARY_API_SECRET_KEY;

export {
  ACCESS_TOKEN_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  MONGO_URL,
  ORIGIN_URL,
  PORT,
};
