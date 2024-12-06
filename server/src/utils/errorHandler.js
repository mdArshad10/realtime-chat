class ErrorHandler extends Error {
  constructor(message = "something wrong", statusCode = 404) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
