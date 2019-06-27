const isNil = require('lodash/isNil');

module.exports = {
  isInvalid: isInvalid,
  isValid: isValid,
  isValidWithError: isValidWithError,
  processError: processError,
  success: success
};

// EXPORTS

function isInvalid(object, errorCode, errorMessage, success) {
  return new Promise((resolve, reject) => {
    if (isNil(object)) {
      resolve(success);
    } else {
      reject(getError(errorCode, errorMessage));
    }
  });
}

function isValid(object, errorCode, errorMessage, success) {
  return isValidWithError(object, getError(errorCode, errorMessage), success);
}

function isValidWithError(object, error, success) {
  success = success !== undefined ? success : object;
  return new Promise((resolve, reject) => {
    if (isNil(object)) {
      reject(error);
    } else {
      resolve(success);
    }
  });
}

function processError(err, next) {
  if (err.message && err.stack) {
    next(err);
  } else {
    next(new Error(err));
  }
}

function success(req, res, successCode, successJson) {
  res.status(successCode).json(successJson);
  LogRequest.success(req);
}

// INTERNALS

function getError(code, message) {
  return new HttpError(code, message);
}
