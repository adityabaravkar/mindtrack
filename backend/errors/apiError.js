const httpStatus = require("http-status");

class APIError extends Error {
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    extra = null
  ) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || "Something went wrong. Please try again.";
    this.status = status || 500;
    this.extra = extra;
  }
}
module.exports = APIError;
