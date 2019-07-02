const mongoose = require('mongoose');
const randomString = require('crypto-random-string');

// SCHEMA DEFINITION

const MovieSchema = new mongoose.Schema({
  public_id : { type: String, required: true, index: { unique: true } },
  name      : { type: String, required: true },
  year      : { type: Number, required: true }
});

// MODEL DEFINITION

const MovieModel = mongoose.model('Movie', MovieSchema);

// EXPORTS

module.exports = {
  create: create
};

/**
 * Creates a single movie schema object
 * @param name the name string entry
 * @param year the year integer entry
 * @return promise to execute
 */
function create(name, year) {
  return MovieModel.create({
    public_id: randomString({ length: 12 }),
    name: name,
    year: year
  });
}
