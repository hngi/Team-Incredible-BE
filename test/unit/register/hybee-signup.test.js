const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../signup');

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const port = process.env.PORT || 7000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phoneNumber: Joi.string(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirm: Joi.ref('password'),
}).with('password', 'passwordConfirm');

const users = [
  {
    id: 1,
    firstName: 'Ibrahim',
    lastName: 'Adekunle',
    email: 'adefemi101@gmail.com',
    phoneNumber: '+2348131180177',
    password: '123456abc',
    passwordConfirm: '123456abc',
  },
];

const signToken = (id) => {
  return jwt.sign(
    { id },
    'HZSg5MAlxFZz454jFJSKJBHJsvgdvypd.SqUVOH34IgShjshjfhjahhADGHYUQEFyyGHJBSghv',
    {
      expiresIn: '1d',
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

app.post('/api/v1/users', (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }

  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  users.push(user);

  createSendToken(user, 201, res);
});

// Assertion Style
chai.should();
chai.use(chaiHttp);

describe('User API', () => {
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
        });
      done();
    });

    it('It should NOT create a new user with firstName less than 3 characters in the DB', (done) => {
      const user = {
        firstName: 'Ol',
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
        });
      done();
    });

    it('It should NOT create a new user without a lastName field', (done) => {
      const user = {
        firstName: 'Ola',
        lastName: '',
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
        });
      done();
    });

    it('It should NOT create a new user without an email field', (done) => {
      const user = {
        firstName: 'Ola',
        lastName: 'Hybee',
        email: '',
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
        });
      done();
    });

    it('It should NOT create a new user without a password field', (done) => {
      const user = {
        firstName: 'Ola',
        lastName: 'Hybee',
        email: 'hybee.dev@gmail.com',
        phoneNumber: '09012378814',
        password: '',
        passwordConfirm: 'test1234',
      };

      chai
        .request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          if (err) console.log(err);

          res.should.have.status(400);
        });
      done();
    });

    it('It should NOT create a new user without confirming the password field', (done) => {
      const user = {
        firstName: 'Ola',
        lastName: 'Hybee',
        email: 'hybee.dev@gmail.com',
        phoneNumber: '09012378814',
        password: 'test1234',
        passwordConfirm: 'test12348',
      };

      chai
        .request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          if (err) console.log(err);

          res.should.have.status(400);
        });
      done();
    });
  });
});
