const chai = require('chai');
const chaiHttp = require('chai-http');
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
chai.Should();
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

const validatePassword = () => {};

// const checkField =

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
  it('it should get the first name', (done) => {
    const firstName = functions.checkName('Ibrahim');
    firstName.should.be.a('string');
    done();
  });

  it('it should get the last name', (done) => {
    const lastName = functions.checkName('Adekunle');
    lastName.should.be.a('string');
    done();
  });

  it('it should get the phone number format 1', (done) => {
    const phoneNumber = functions.checkName('+2348131180177');
    phoneNumber.should.be.a('string');
    phoneNumber.should.match(/^\+(?:[0-9] ?){6,14}[0-9]$/);
    done();
  });

  it('it should get the phone number format 2', (done) => {
    const phoneNumber = functions.checkName('08131180177');
    phoneNumber.should.be.a('string');
    phoneNumber.should.match(/^[0]\d{10}$/);
    done();
  });

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
  describe('Test to check if password mactch', () => {
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
 * TEST 3
 */

const request = require('supertest');

let appTest;

const userCredentials = {
  first_name: 'Jane',
  last_name: 'Doe',
  email: 'johndoe@gmail.com',
  phone: '07023455569',
  password: 'garyTheSnail',
  cpassword: 'garyTheSnail',
};

describe('POST /api/v1/registration', function () {
  beforeEach(function (done) {
    appTest = require('../../../server');
    userCredentials;
    done();
  });

  afterEach(async () => {
    await appTest.close();
  });

  it('should verify if all fields are entered correctly', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send(userCredentials)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('message', 'Registration successful');
    done();
  });

  it('verify if it sends an error message if first name field is not filled and entered', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if first name field contains only strings', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: '123Jane',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if last name field is not filled and entered', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        // "last_name": "Doe",
        email: 'johndoe@gmail.com',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if last name field contains only strings', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: '123Jane',
        last_name: 'D3546oe',
        email: 'johndoe@gmail.com',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if email field is not filled and entered', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        // "email": 'johndoe@gmail.com',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if email field is not in the right format', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'johndoe',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if phone field contains a string', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'johndoe',
        phone: 'gary',
        password: 'garyTheSnail',
        cpassword: 'garyTheSnail',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if password field is empty', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'johndoe',
        phone: '07023455569',
        // 'password': 'garyTheSnail',
        // "cpassword": 'garyTheSnail'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if password field does not math confirm password field', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'johndoe',
        phone: '07023455569',
        password: 'garyTheSnail',
        cpassword: 'garyTheSn',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', "Password didn't correspond");
    done();
  });

  it('verify if it sends an error message if password field is weak', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'johndoe',
        phone: '07023455569',
        password: 'ga',
        cpassword: 'ga',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'Password is weak');
    done();
  });

  it('verify if it sends an error message if all fields are empty', function (done) {
    request
      .agent(appTest)
      .post('/register')
      .send({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        cpassword: '',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .expect('msg', 'please include all fields');
    done();
  });
});
