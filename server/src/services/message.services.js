import { Message } from "../models/message.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";

const createMessage = async (data) => {
  try {
    const message = new Message({
      ...data,
    });
    await message.save();
    return message;
  } catch (error) {
    console.log(error.message);
    throw new ErrorHandler(error.message);
  }
};

const findMessage = async (senderId, receiverId) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return messages;
  } catch (error) {
    console.log(error.message);
    throw new ErrorHandler(error.message);
  }
};

export { createMessage, findMessage };
