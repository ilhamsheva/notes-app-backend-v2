import response from "../utils/response.js";
import ClientError from "../exceptions/client-error.js";

const ErrorHandler = (err, req, res, next) => {
    // Handle ClientError and its subclasses (InvariantError, NotFoundError)
    if (err instanceof ClientError) {
        return response(res, err.statusCode, err.message, null);
    }

    const status = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.log("Unhandled Error: ", err);
    return response(res, status, message, null);
}

export default ErrorHandler;