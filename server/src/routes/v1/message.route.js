import express from "express";
import {
  getMessages,
  getSideUsers,
  sendMessage,
} from "../../controller/message.controller.js";
import { messageValidate } from "../../middleware/validators/message.validate.js";
import { validateInputs } from "../../middleware/validator.js";
import { authUser } from "../../middleware/auth.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

router.route("/users").get(authUser, getSideUsers);
router
  .route("/:receiverId")
  .get(authUser, messageValidate.getMessages, validateInputs, getMessages);
router
  .route("/send/:receiverId")
  .post(
    authUser,
    upload.single("attachment"),
    messageValidate.sendMessage,
    validateInputs,
    sendMessage
  );

export default router;
