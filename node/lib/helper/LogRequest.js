const randomString = require('crypto-random-string');

module.exports = {
  failure: failure,
  middle: middle,
  start: start,
  success: success
};

// EXPORTS

function failure(err, req, res, next) {
  if (err.status) {
    if (err.logDetails) {
      middle(req, err.logDetails);
    }
    logger.info(`[${req.logId}] FAILURE ${err.status} with response ${req.logResponse}`);
  } else {
    logger.error(`[${req.logId}] FATAL - ${err.stack}`);
  }
}

function middle(req, info) {
  if (req && info) {
    logger.info(`[${req.logId}] ${info}`);
  }
}

function start(req, res, next) {
  const redactedBody = redactSensitive(req.body);

  req.logId = randomString({ length: 12 });
  logger.info(`[${req.logId}] ${req.method} ${req.originalUrl} with request ${JSON.stringify(redactedBody)}`);

  cacheResponse(req, res, next);

  next();
}

function success(req, res, next) {
  logger.info(`[${req.logId}] SUCCESS with response ${req.logResponse}`);
}

// INTERNALS

function cacheResponse(req, res, next) {
  const oldWrite = res.write,
        oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    req.logResponse = Buffer.concat(chunks).toString('utf8');

    oldEnd.apply(res, arguments);
  };
}

function redactSensitive(body) {
  let editedBody = { ... body };
  if (editedBody.password) {
    editedBody.password = 'REDACTED';
  }
  return editedBody;
}
