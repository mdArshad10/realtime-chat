import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const validateInputs = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    console.log(errors.length == 0);

    if (errors.length == 0) {
      next();
    }
    console.log(errors);

    const errorMessage = errors.map((error) => error.msg);
    res.status(StatusCodes.NOT_FOUND).json({
      inputError: errorMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
};

export { validateInputs };
