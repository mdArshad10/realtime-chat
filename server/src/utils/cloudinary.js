import { v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "node:fs";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
} from "../config/constant.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const uploadImage = async (urlPath) => {
  if (!urlPath) return null;
  try {
    const data = await cloudinary.uploader.upload(urlPath, {
      resource_type: "image",
      folder: "chat-app",
    });
    console.log("file upload in cloudinary successfully");

    unlinkSync(urlPath);
    console.log("file is deleted successfully");
    return {
      public_id: data.public_id,
      url: data.url,
    };
  } catch (error) {
    console.log(error.message);
    unlinkSync(urlPath);
    return null;
  }
};

const updateImage = async (public_id, urlPath) => {
  if (!public_id || !urlPath) return null;
  try {
    await cloudinary.uploader.destroy(public_id);
    const data = await uploadImage(urlPath);
    return data;
  } catch (error) {
    console.log(error.message);
    unlinkSync(urlPath);
    return null;
  }
};

export { uploadImage, updateImage };
