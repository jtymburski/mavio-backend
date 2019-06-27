const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../lib/server');

chai.use(chaiHttp);

// Wait before starting to allow the test mongo/node to go live
setTimeout(() => {
  // Setup connection
  server.serve(process.env.NODE_ENV)
    .then((app) => {
      logger.info('Test server successfully started');
      run();
    })
    .catch((err) => {
      logger.error(`Test server start error: ${err}`);
      process.exit(1);
    });

  // Config
  const config = require('./config');

  // ** TESTS **

  describe('Sample', () => {
    // Create
    require('./sample/create').test(chai, server.app, config);

    // Get All
    require('./sample/getAll').test(chai, server.app, config);
  });
}, process.env.START_DELAY || 5000);
