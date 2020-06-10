const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../signup');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('User API', () => {
  // TEST the POST Route
  describe('POST /api/v1/users', () => {
    it('It should create a new user in the DB', (done) => {
      const user = {
        firstName: 'Olawale',
        lastName: 'Hybee',
        email: 'hybee.dev@gmail.com',
        phoneNumber: '09012378814',
        password: 'test1234',
        passwordConfirm: 'test1234',
      };

      chai
        .request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          if (err) console.log(err);

          res.should.have.status(201);
          res.body.data.user.should.be.a('object');
          res.body.should.have.property('token');
          res.body.data.user.should.have.property('id');
          res.body.data.user.should.have.property('firstName');
          res.body.data.user.should.have.property('lastName');
          res.body.data.user.should.have.property('email');
          res.body.data.user.should.have.property('phoneNumber');
          done();
        });
    });

    it('It should NOT create a new user with firstName less than 5 in the DB', (done) => {
      const user = {
        firstName: 'Ola',
        lastName: 'Hybee',
        email: 'hybee.dev@gmail.com',
        phoneNumber: '09012378814',
        password: 'test1234',
        passwordConfirm: 'test1234',
      };

      chai
        .request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          if (err) console.log(err);

          res.should.have.status(400);
          done();
        });
    });
  });
});
