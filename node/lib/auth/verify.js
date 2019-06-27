const _ = require('lodash');

const APIKEY_PREFIX = 'ApiKey ';

/**
 * Exports a middleware function to verify an API request is authenticated
 * @param app the express app that is handling the socket connections
 */
module.exports = (app) => {
  return (req, res, next) => {
    const authHeader = req.get('Authorization');

    // Only api key token authorization is supported
    if (_.isString(authHeader) && _.startsWith(authHeader, APIKEY_PREFIX)) {
      const authToken = authHeader.substring(APIKEY_PREFIX.length);
      if (authToken === app.config.apiKey) {
        return next();
      }
    }

    return next(new HttpError(401, 'not authorized to access the server'));
  };
};
