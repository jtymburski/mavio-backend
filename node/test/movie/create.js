const randomInt = require('random-int');
const randomWords = require('random-words');

module.exports = {
  execute: execute,
  request: request,
  test: test
};

// EXPORTS

function execute(chai, app, config, done) {
  executeWithInput(chai, app, config, generateInput(), (info) => {
    done(info);
  });
}

function request(chai, app, config) {
  return chai.request(app)
      .post(`${config.BASE_PATH}/movie`);
}

function test(chai, app, config) {
  describe('/POST movie', () => {
    const goodInput = generateInput();

    // No input provided
    it('it should fail on no post input', (done) => {
      request(chai, app, config)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // No name provided
    it('it should fail on no name text provided', (done) => {
      request(chai, app, config)
        .send({
          year: goodInput.year
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // No year provided
    it('it should fail on no year value provided', (done) => {
      request(chai, app, config)
        .send({
          name: goodInput.name
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // It should succeed
    it('it should successfully create', (done) => {
      executeWithInput(chai, app, config, goodInput, resBody => done());
    });
  });
}

// INTERNALS

function executeWithInput(chai, app, config, input, done) {
  request(chai, app, config)
    .send(input)
    .end((err, res) => {
      res.should.have.status(201);

      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.should.have.property('year');

      res.body.name.should.equal(input.name);
      res.body.year.should.equal(input.year);

      // The body should only contain the checked keys above
      res.body.should.eql({
        id  : res.body.id,
        name: res.body.name,
        year: res.body.year
      });

      done(res.body);
    });
}

function generateInput() {
  return {
    name: randomWords({ min: 2, max: 6, join: ' ' }),
    year: randomInt(1990, 2019)
  };
}
