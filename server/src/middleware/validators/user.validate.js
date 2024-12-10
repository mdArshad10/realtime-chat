import { body } from "express-validator";

const userValidate = {
  registerUser: [
    body("fullName").notEmpty().withMessage("username is required").escape(),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("invalid email address")
      .escape(),
    body("password").notEmpty().withMessage("password is required").escape(),
  ],
  loginUser: [
    body("email")
      .notEmpty()
      .withMessage("username is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("invalid email address")
      .escape(),
    body("password").notEmpty().withMessage("password is required").escape(),
  ],
};

export { userValidate };
