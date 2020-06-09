const express = require('express');
const app = express();
const utils = require('./utils/validate-user');
const jwt = require('jsonwebtoken');

app.use(express.json());

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
  const { error } = utils.validateUser.validate(req.body);

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

const port = process.env.PORT || 5000;
module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
