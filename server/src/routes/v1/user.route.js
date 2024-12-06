import express from "express";
import {
  userDetail,
  loginUser,
  registerUser,
  logoutUser,
  updateUserDetails,
} from "../../controller/user.controller.js";
import { userValidate } from "../../middleware/validators/user.validate.js";
import { validateInputs } from "../../middleware/validator.js";
import { authUser } from "../../middleware/auth.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authUser, logoutUser);
router
  .route("/")
  .get(authUser, userDetail)
  .put(authUser, upload.single("avatar"), updateUserDetails);

export default router;
