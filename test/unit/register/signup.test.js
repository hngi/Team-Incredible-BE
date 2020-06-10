// node assert module;
var assert = require('assert');

// mock confirm password function
const confirmPassword = (str1, str2) => str1 === str2;

//mock check string length function
const checkLength = (str) => str.length > 5;

// mock for email validation function
const validateEmail = (email) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

describe('Test the signup page', function () {

  describe('Test to check if password mactch', () => {
    it('should return false if password and confirmpassword don\'t match', () => {
      assert.equal(confirmPassword('Hello', 'Hell'), false);
    });
    it('should return true if password and confirmpassword don\'t match', () => {
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
    it('should return true if email is valid', () => {
      assert.equal(validateEmail('hell@'), false);
    });
    it('should return true if email is valid', () => {
      assert.equal(validateEmail('hell00@test.com'), true);
    });
  });
});
