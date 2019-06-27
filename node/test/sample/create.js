const randomInt = require('random-int');
const randomWords = require('random-words');

module.exports = {
  execute: execute,
  generateInput: generateInput,
  request: request,
  test: test
};

// EXPORTS

function execute(chai, app, config, done) {
  executeWithInput(chai, app, config, generateInput(), (info) => {
    done(info);
  });
}

function generateInput(age) {
  let input = {
    name: randomWords({ min: 2, max: 2, join: ' ' }),
    description: randomWords({ min: 4, max: 12, join: ' ' })
  };
  if (age) {
    input.age = randomInt(1, 100);
  }
  return input;
}

function request(chai, app, config, authKey) {
  let chaiRequest = chai.request(app)
      .post(`${config.BASE_PATH}/sample/data`);
  if (authKey) {
    chaiRequest = chaiRequest.set(config.AUTH_FIELD, `${config.AUTH_KEY_PREFIX}${authKey}`);
  }
  return chaiRequest;
}

function test(chai, app, config) {
  describe('/POST sample/data', () => {
    const goodInput = generateInput();

    // Fail on lack of an auth key
    it('it should fail without any auth key', (done) => {
      request(chai, app, config)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    // Fail on invalid auth key
    it('it should fail with an invalid auth key', (done) => {
      request(chai, app, config, 'InvalidAndIncorrectKey')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    // No input provided
    it('it should fail on no post input', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // No name provided
    it('it should fail on no name text provided', (done) => {
      request(chai, app, config, config.AUTH_KEY)
        .send({
          description: goodInput.description
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // No description provided
    it('it should fail on no description text provided', (done) => {
      request(chai, app, config, config.AUTH_KEY)
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

    // It should succeed with the optional age parameter
    it('it should successfully create with age', (done) => {
      const ageInput = generateInput(true);
      executeWithInput(chai, app, config, ageInput, resBody => done());
    });
  });
}

// INTERNALS

function executeWithInput(chai, app, config, input, done) {
  request(chai, app, config, config.AUTH_KEY)
    .send(input)
    .end((err, res) => {
      res.should.have.status(201);

      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.should.have.property('description');

      res.body.name.should.equal(input.name);
      res.body.description.should.equal(input.description);
      const checkedObj = {
        id: res.body.id,
        name: res.body.name,
        description: res.body.description
      };

      if (input.age) {
        res.body.should.have.property('age');
        res.body.age.should.equal(input.age);
        checkedObj.age = res.body.age;
      }

      // The body should only contain the checked keys above
      res.body.should.eql(checkedObj);

      done(res.body);
    });
}
