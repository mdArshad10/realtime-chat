import { param } from "express-validator";

const messageValidate = {
  getMessages: [
    param("receiverId")
      .notEmpty()
      .withMessage("Receiver ID is required")
      .isMongoId()
      .withMessage("Invalid receiver ID"),
  ],
  sendMessage: [
    param("receiverId")
      .notEmpty()
      .withMessage("Receiver ID is required")
      .isMongoId()
      .withMessage("Invalid receiver ID"),
  ],
};

export { messageValidate };
