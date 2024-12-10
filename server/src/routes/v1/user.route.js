import express from "express";
import {
  userDetail,
  loginUser,
  registerUser,
  logoutUser,
  updateUserDetails,
  test,
} from "../../controller/user.controller.js";
import { userValidate } from "../../middleware/validators/user.validate.js";

import { validateInputs } from "../../middleware/validator.js";
import { authUser } from "../../middleware/auth.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

router.route("/test").post(userValidate.registerUser, validateInputs, test);
router
  .route("/register")
  .post(userValidate.registerUser, validateInputs, registerUser);
router
  .route("/login")
  .post(userValidate.loginUser, validateInputs, loginUser);
router.route("/logout").post(authUser, logoutUser);
router
  .route("/")
  .get(authUser, userDetail)
  .put(authUser, upload.single("avatar"), updateUserDetails);

export default router;
