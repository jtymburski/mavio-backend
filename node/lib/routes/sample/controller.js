const DbSample = require(`${__root}db/model/sample`);
const ModelInfo = require('./model/info');

module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  const express = require('express');
  const controller = express.Router();

  controller.route('/data')
    // gets all samples
    .get(getAll)
    // create a sample
    .post(app.auth, ModelInfo.validate, create);

  return controller;
};

/**
 * Creates a single sample
 * @in SampleInfo create model
 * @out SampleInfo result model
 */
function create(req, res, next) {
  DbSample.create(req.body.name, req.body.description, req.body.age)
    .then(sample => HttpHelper.success(req, res, 201, ModelInfo.from(sample)))
    .catch(err => HttpHelper.processError(err, next));
}

/**
 * Fetches all samples
 * @out array of SampleInfo models
 */
function getAll(req, res, next) {
  DbSample.getAll()
    .then(samples => HttpHelper.success(req, res, 200, ModelInfo.fromAll(samples)))
    .catch(err => HttpHelper.processError(err, next));
}
