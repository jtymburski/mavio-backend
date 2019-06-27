module.exports = (app) => {
  const express = require('express');
  const router = express.Router();

  /**
   * routes
   */
  router.use('/sample', require('./sample/controller')(app));

  /**
   * default root route for api
   */
  app.use('/api/v1', router);

  /**
   * catch all for unset paths
   */
  app.all('*', (req, res) => {
    throw new HttpError(404, 'invalid request');
  });

  /**
   * default error handling
   */
  app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).json({
        "message": err.message
      });
    } else {
      res.status(500).json({
        "message": "request failed to be processed. please contact the system administrator"
      });
    }
    LogRequest.failure(err, req, res, next);
  });
};
