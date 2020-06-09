const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  firstName: Joi.string().min(5).required(),
  lastName: Joi.string().max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phoneNumber: Joi.string(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirm: Joi.ref('password'),
}).with('password', 'passwordConfirm');

exports.validateUser = userSchema;
