module.exports = HttpError;
function HttpError(status, message, details) {
  if (arguments.length < 2) throw new Error('HttpError must take two parameters.');

  this.status = status;
  this.message = message;

  this.log = `HttpError ${status}: ${message}`;
  this.logDetails = details;
}
HttpError.prototype = new Error();
