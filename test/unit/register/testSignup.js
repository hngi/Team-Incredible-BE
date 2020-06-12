const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirm: Joi.ref('password'),
}).with('password', 'passwordConfirm');

const users = [
  {
    id: 1,
    email: 'adefemi101@gmail.com',
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
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  users.push(user);

  createSendToken(user, 201, res);
});

// Assertion Style
chai.Should();
chai.use(chaiHttp);

describe('User API', () => {
  describe('POST /api/v1/users', () => {
    it('It should create a new user in the DB', (done) => {
      const user = {
        email: 'hybee.dev@gmail.com',
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
          res.body.data.user.should.have.property('email');
        });
      done();
    });

    it('It should NOT create a new user without an email field', (done) => {
      const user = {
        email: '',
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
        email: 'hybee.dev@gmail.com',
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
        email: 'hybee.dev@gmail.com',
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

const validateInput = (text, notEmpty, isNumber) => {
  // Validate user input with two pre-defined rules
  if (!text) {
    return false;
  }
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
};

const validateEmail = (email, notEmpty) => {
  if (!email) {
    return false;
  }
  if (notEmpty && email.trim().length === 0) {
    return false;
  }
  return true;
};

const getField = (name) => {
  // Returns output text
  return `${name}`;
};

const functions = {
  checkName: (name) => {
    if (!validateInput(name, true, false)) {
      return false;
    }

    return `${getField(name)}`;
  },

  checkEmail: (email) => {
    if (!validateEmail(email, true)) {
      return false;
    }

    return `${getField(email)}`;
  },

  checkPassword: (password) => {
    if (!validateInput(password, true, false)) {
      return false;
    }

    return `${getField(password)}`;
  },

  confirmPassword: (passwordConfirm) => {
    if (!validateInput(passwordConfirm, true, false)) {
      return false;
    }

    return `${getField(passwordConfirm)}`;
  },
};

describe('Signup Fields Tests', () => {
  it('it should get a valid email', (done) => {
    const email = functions.checkEmail('adefemi101@gmail.com');
    email.should.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    done();
  });

  const password = functions.checkPassword('olaWale_17#');
  it('password should be 8 chars or more and must contain at least 1 lowercase, uppercase, numeric and special characters', (done) => {
    password.should.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,})/
    );

    done();
  });

  it('it should confirm password', (done) => {
    const confirmPassword = functions.confirmPassword('olaWale_17#');
    password.should.be.eq(confirmPassword);

    done();
  });
});

/**
 *TEST 2
 */

// node assert module;
var assert = require('assert');

// mock confirm password function
const confirmPassword = (str1, str2) => str1 === str2;

//mock check string length function
const checkLength = (str) => str.length > 5;

// mock for email validation function
const validateEmailField = (email) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

describe('Test the signup page', function () {
  describe('Test to check if password match', () => {
    it("should return false if password and confirmpassword don't match", () => {
      assert.equal(confirmPassword('Hello', 'Hell'), false);
    });
    it("should return true if password and confirmpassword don't match", () => {
      assert.equal(confirmPassword('Hello', 'Hello'), true);
    });
  });

  describe('Test to check the length of string', () => {
    it('should return false if length of string less than 5', () => {
      assert.equal(checkLength('hell'), false);
    });
    it('should return true if length of string greater than 5', () => {
      assert.equal(checkLength('Hellooo'), true);
    });
  });

  describe('email should be a valid email', () => {
    it('should return false if email is invalid', () => {
      assert.equal(validateEmailField('hell@'), false);
    });
    it('should return true if email is valid', () => {
      assert.equal(validateEmailField('hell00@test.com'), true);
    });
  });
});

/**
 *
 * TEST 3 AUTHOR- bolarin
 */


const request = require('supertest');
const expect = require("chai").expect;
const api = 'https://hngi7-team-avengers.herokuapp.com/api/v1';


const userCredentials = {
  email: 'odutusinmoes@gmail.com',
  password: 'test1234',
  confirm_password: 'test123',
};


describe('POST /api/v1/registration', function () {
  beforeEach(function (done) {
    api;
    userCredentials;
    done();
  });

  // afterEach(async () => {
  //   await api.close();
  // });
  
  it('should verify if all fields are entered correctly', function (done) {
    request

    .agent(api)
           .post('/register')
           .send(userCredentials)
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(201); 
            res.body.data.user.should.be.a('object');
            res.body.should.not.to.empty;
          });
        done();

      .agent(appTest)
      .post('/register')
      .send(userCredentials)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('message', 'Registration successful');
    done();


  it('verify if it sends an error message if email field is not filled and entered', function (done) {
    request.agent(api)
           .post('/register')
           .send({
             'password': 'garyTheSnail',
             'confirm_password': 'garyTheSnail',
           })
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(400); 
          });
        done();
      });


  it('verify if it sends an error message if email field is not in the right format', function (done) {
    request.agent(api)
           .post('/register')
           .send({
             'email': 'johndoe',
             'password': 'garyTheSnail',
             'confirm_password': 'garyTheSnail',
           })
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(400); 
           
          });
        done();
      });



  it('verify if it sends an error message if password field is empty', function (done) {
    request.agent(api)
           .post('/register')
           .send({
             'email': 'johndoe@gmail.com',
           })
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(400); 
          });
        done();
      });

  it('verify if it sends an error message if password field does not math confirm password field', function (done) {
    request.agent(api)
           .post('/register')
           .send({
             'email': 'johndoe@gmail.com',
             'password': 'garyTheSnail',
             'confirm_password': 'garyTheSn',
           })
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(201); 
            res.body.data.user.should.be.a('object');
          });
        done();
      });


  it('verify if it sends an error message if password field is weak', function (done) {
    request.agent(api)
           .post('/register')
           .send({
             'email': 'johndoe@gmail.com',
             'password': 'ga',
             'confirm_password': 'ga',
           })
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(400); 
            res.body.data.user.should.be.a('object');
          });
        done();
      });

  it('verify if it sends an error message if all fields are empty', function (done) {
    request.agent(api)
           .post('/register')
           .send({
             'email': '',
             'password': '',
             'confirm_password': '',
           })
           .expect('Content-Type', "text/html; charset=utf-8")
           .end((err, res) => {
            if (err) console.log(err);
            res.should.have.status(400); 
          });
        done();
      });
});