module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  const express = require('express');
  const controller = express.Router();

  controller.route('/')
    // create a movie object
    .post(create);

  controller.route('/:id')
    // get a movie by id
    .get(getById);

  return controller;
};

/**
 * Creates a single movie object
 * @in MovieNew create model
 * @out MovieInfo result model
 */
function create(req, res, next) {
  throw new HttpError(501, 'not implemented');
}

/**
 * Fetches a single movie object
 * @out MovieInfo found models
 */
function getById(req, res, next) {
  throw new HttpError(501, 'not implemented');
}
