require('dotenv').config();
const server = require('./lib/server');
server.serve(process.env.NODE_ENV)
  .then(app => logger.log('info', `Server running on port ${app.port}`))
  .catch(err => {
    logger.log('error', `Server start error: ${err}`);
    process.exit(2);
  });
