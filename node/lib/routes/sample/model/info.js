const isInteger = require('lodash/isInteger');
const isString = require('lodash/isString');

module.exports = {
  from: from,
  fromAll: fromAll,
  validate: validate
};

function from(dbSample) {
  const model = {
    id: dbSample.public_id,
    name: dbSample.name,
    description: dbSample.description
  };
  if (dbSample.age) {
    model.age = dbSample.age;
  }

  return model;
}

function fromAll(dbSamples) {
  let stack = [];
  for (let s of dbSamples) {
    stack.push(from(s));
  }
  return stack;
}

function validate(req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  if (isString(name) && isString(description)) {
    // Name must have a length > 0
    if (name.length == 0) {
      return next(new HttpError(400, 'name must be a valid string'));
    }
    // Description must have a length > 0
    else if (description.length == 0) {
      return next(new HttpError(400, 'description must be a valid string'));
    }

    // Optional age parameter must be a valid integer and > 0
    const age = req.body.age;
    if (age && (!isInteger(age) || age < 0)) {
      return next(new HttpError(400, 'age must be a valid integer > 0'));
    }

    return next();
  }

  return next(new HttpError(400, 'invalid input provided'));
}
