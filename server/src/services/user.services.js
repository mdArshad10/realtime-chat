import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../utils/errorHandler.js";

const findUserByEmail = async (req) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    return existUser;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(error.message);
  }
};

const createUser = async (req) => {
  try {
    const { email, fullName, password } = req.body;
    let newUser = new User({ email, fullName, password });
    await newUser.save();
    const { password: hashPassword, ...user } = newUser._doc;
    return user;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(error.message);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateUserPhotoDetail = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { profilePic: { public_id: data.public_id, url: data.url } },
      },
      { new: true, select: "-password" }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(error.message);
  }
};

const findAllUserExpectMe = async (id) => {
  try {
    const users = await User.find({ id: { $ne: id } }).select("-password");
    return users;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler(error.message);
  }
};

export {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserPhotoDetail,
  findAllUserExpectMe,
};
