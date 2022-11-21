const httpStatus = require("http-status");
const validate = require("express-validation");

// hanlde not found error
exports.handleNotFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  res.json({
    message: "Requested resource not found",
  });
  res.end();
};

// handle errors
exports.handleError = (err, req, res, next) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    message: getErrorMessage(err),
    extra: err.extra,
    errors: err,
  });
  res.end();
};

const getErrorMessage = (error) => {
  if (error instanceof validate.ValidationError) {
    let message = "";
    const validateErrors = error.errors;
    for (let i = 0; i < validateErrors.length; i++) {
      message += validateErrors[i].messages[0] + "\n";
    }
    return message;
  }
  return error.message;
};
