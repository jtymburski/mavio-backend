const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = (app) => {
  return mongoose.connect(app.config.dbUri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
};
