import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../utils/errorHandler.js";
import { AsyncHandler } from "../middleware/asyncHandler.js";
import { findAllUserExpectMe } from "../services/user.services.js";
import { uploadImage } from "../utils/cloudinary.js";
import { createMessage, findMessage } from "../services/message.services.js";

// @DESC: register the user
// @METHOD: [GET]   /api/v1/messages/users
// @ACCESS: private
const getSideUsers = AsyncHandler(async (req, res, next) => {
  const users = await findAllUserExpectMe(req.user._id);
  res.status(StatusCodes.OK).json({
    message: "get all user",
    users,
  });
});

// @DESC: get messages
// @METHOD: [GET]   /api/v1/messages/:receiverId
// @ACCESS: private
const getMessages = AsyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const { receiverId } = req.params;
  const messages = await findMessage(senderId, receiverId);
  res.status(StatusCodes.OK).json({
    message: "get messages",
    messages,
  });
});

// @DESC: send the message
// @METHOD: [GET]   /api/v1/messages/:messageId(receiverId)
// @ACCESS: private
const sendMessage = AsyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const file = req.file;
  const senderId = req.user._id;
  const { receiverId } = req.params;
  let image;
  if (file) {
    image = await uploadImage(file.path);
  }
  const message = await createMessage({ senderId, text, receiverId, image });

  res.status(StatusCodes.OK).json({
    message,
  });
});

export { getSideUsers, sendMessage, getMessages };
