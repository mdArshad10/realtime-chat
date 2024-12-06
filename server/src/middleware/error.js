import { StatusCodes } from "http-status-codes";

const NODE_ENV = "development";
const errorMiddleware = async (error, req, res, next) => {
  const statusCode = error.statusCode
    ? error.statusCode
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message ? error.message : "Internal Server Error";

  res.status(statusCode).json({
    message,
    stack: NODE_ENV === "development" ? error.stack : null,
  });
};

export { errorMiddleware };
