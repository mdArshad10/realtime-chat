import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../utils/errorHandler.js";
import { ACCESS_TOKEN_SECRET } from "../config/constant.js";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.services.js";

const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(
        new ErrorHandler("token is not found", StatusCodes.UNAUTHORIZED)
      );
    }
    const decode = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (!decode) {
      return next(new ErrorHandler("invalid token", StatusCodes.UNAUTHORIZED));
    }
    const existUser = await findUserById(decode.id);
    if (!existUser) {
      return next(new ErrorHandler("user not found", StatusCodes.NOT_FOUND));
    }

    const { password, ...user } = existUser._doc;

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(error.message);
  }
};

export { authUser };
