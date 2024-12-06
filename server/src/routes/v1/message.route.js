import express from "express";
import {
  getMessages,
  getSideUsers,
  sendMessage,
} from "../../controller/message.controller.js";
import { userValidate } from "../../middleware/validators/user.validate.js";
import { validateInputs } from "../../middleware/validator.js";
import { authUser } from "../../middleware/auth.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

router.route("/users").get(authUser, getSideUsers);
router.route("/:receiverId").get(authUser, getMessages);
router
  .route("/send/:receiverId")
  .post(authUser, upload.single("attachment"), sendMessage);

export default router;
