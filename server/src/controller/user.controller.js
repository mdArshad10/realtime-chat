import { AsyncHandler } from "../middleware/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import {
  findUserByEmail,
  createUser,
  updateUserPhotoDetail,
} from "../services/user.services.js";
import { ACCESS_TOKEN_SECRET } from "../config/constant.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import { uploadImage, updateImage } from "../utils/cloudinary.js";

const NODE_ENV = "development";
// cookie Options
const cookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  sameSite: "strict",
  secure: NODE_ENV === "development" ? false : true,
};

// generate the token
const generateToken = (id) => {
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// @DESC: register the user
// @METHOD: [POST]   /api/v1/users/register
// @ACCESS: public
const registerUser = AsyncHandler(async (req, res, next) => {
  const existUser = await findUserByEmail(req);
  if (existUser) {
    next(new ErrorHandler("user already exist", StatusCodes.BAD_REQUEST));
  }
  const user = await createUser(req);

  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);

  res.status(StatusCodes.OK).json({
    message: "register the user",
    user,
  });
});

// @DESC: login the user
// @METHOD: [POST]
// @ACCESS: public
const loginUser = AsyncHandler(async (req, res, next) => {
  const existUser = await findUserByEmail(req);
  if (!existUser) {
    next(new ErrorHandler("user not found", StatusCodes.NOT_FOUND));
  }
  const isPasswordMatch = await existUser.passwordMatch(req.body.password);
  if (!isPasswordMatch) {
    next(new ErrorHandler("password not match", StatusCodes.UNAUTHORIZED));
  }

  const token = generateToken(existUser._id);

  res.cookie("token", token, cookieOptions);
  const { password, ...user } = existUser._doc;

  res.status(StatusCodes.OK).json({
    message: "register the user",
    user: user,
  });
});

// @DESC: logout the user
// @METHOD: [POST]   /api/v1/users/logout
// @ACCESS: private
const logoutUser = AsyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({
    message: "logout the user",
  });
});

// @DESC: update the user detail
// @METHOD: [PUT]   api/v1/users
// @ACCESS: private
const updateUserDetails = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  const file = req.file;

  if (!file && !req.file?.path) {
    return next(
      new ErrorHandler("please upload the image", StatusCodes.BAD_REQUEST)
    );
  }

  let data;

  if (!user.profilePic?.url || !user.profilePic?.public_id) {
    data = await uploadImage(file.path);
  } else {
    data = await updateImage(user.profilePic.public_id, file.path);
  }

  if (!data || !data.url || !data.public_id) {
    return next(
      new ErrorHandler(
        "something wrong in image uploading",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const updatedUser = await updateUserPhotoDetail(user._id, data);
  await res.status(StatusCodes.OK).json({
    message: "update user details",
    user: updatedUser,
  });
});

// @DESC: get the user
// @METHOD: [GET]    /api/v1/users
// @ACCESS: private
const userDetail = AsyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(StatusCodes.OK).json({
    message: "get user details",
    user,
  });
});

export { registerUser, loginUser, logoutUser, userDetail, updateUserDetails };
