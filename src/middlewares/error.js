import response from "../utils/response.js";
import ClientError from "../exceptions/client-error.js";
import multer from "multer";

const ErrorHandler = (err, req, res, next) => {
  // Handle MulterError
  if (err instanceof multer.MulterError) {
    return response(res, 400, err.message, null);
  }

  // Handle ClientError and its subclasses (InvariantError, NotFoundError)
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  // Handle Joi validation errors
  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log("Unhandled Error: ", err);
  return response(res, status, message, null);
};

export default ErrorHandler;
