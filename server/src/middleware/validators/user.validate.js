import { body } from "express-validator";

const userValidate = {
  registerUser: [
    body("fullName").notEmpty().withMessage("username is required"),
    body("email").notEmpty().withMessage("username is required"),
  ],
};

export { userValidate };
