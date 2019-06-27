const _ = require('lodash/lang');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

// SCHEMA DEFINITION

const SampleSchema = new mongoose.Schema({
  public_id: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  description: { type: String, required: true },
  age: Number
});

// MODEL DEFINITION

const SampleModel = mongoose.model('Sample', SampleSchema);

// EXPORTS

module.exports = {
  create: create,
  getAll: getAll
};

/**
 * Creates a single sample schema object
 * @param name the name string entry
 * @param description the description string entry
 * @param age the age intege entry
 * @return promise to execute
 */
function create(name, description, age) {
  const document = {
    public_id: uuidv4(),
    name: name,
    description: description
  };
  if (_.isInteger(age) && age > 0) {
    document.age = age;
  }
  return SampleModel.create(document);
}

/**
 * Fetches all entries in the model
 * @return promise to fetch array of sample schema objects
 */
function getAll() {
  return SampleModel.find();
}
