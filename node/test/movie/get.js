const SampleCreate = require('./create');

module.exports = {
  request: request,
  test: test
};

// EXPORTS

function request(chai, app, config, id) {
  return chai.request(app)
      .get(`${config.BASE_PATH}/movie/${id}`);
}

function test(chai, app, config) {
  describe('/GET movie/{id}', () => {
    // Fail on bad query parameter
    it('it should fail on bad query parameter', (done) => {
      request(chai, app, config, 'bad-id-form')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // Fail on ID not found
    it('it should fail on ID not found', (done) => {
      request(chai, app, config, 'a1a1a1a1a1')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // Succeed on fetch after a create
    it('it should succeed on fetch of single that exists', (done) => {
      SampleCreate.execute(chai, app, config, (createdInfo) => {
        execute(chai, app, config, createdInfo.id, (fetchedInfo) => {
          fetchedInfo.id.should.equal(createdInfo.id);
          fetchedInfo.name.should.equal(createdInfo.name);
          fetchedInfo.year.should.equal(createdInfo.year);
        });
      });
    });
  });
}

// INTERNALS

function execute(chai, app, config, id, done) {
  request(chai, app, config, id)
    .end((err, res) => {
      res.should.have.status(200);

      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('name');
      res.body.should.have.property('year');

      // The body should only contain the checked keys above
      res.body.should.eql({
        id  : res.body.id,
        name: res.body.name,
        year: res.body.year
      });

      done(res.body);
    });
}
