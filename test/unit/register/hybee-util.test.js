const chai = require('chai');

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

// Assertion Style
chai.should();

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
 *
 * BELOW ARE JEST TEST CODES
 */
// test('should get the first name', () => {
//   const firstName = functions.checkName('Ibrahim');
//   expect(firstName).not.toBeUndefined();
// });

// test('should get the last name', () => {
//   const lastName = functions.checkName('Adekunle');
//   expect(lastName).not.toBeUndefined();
// });

// test('should get the email', () => {
//   const email = functions.checkEmail('adefemi101@gmail.com');
//   expect(email).toMatch(
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   );
// });

// const password = functions.checkPassword('olaWale_17#');
// test('password should be 8 chars or more and must contain at least 1 lowercase, uppercase, numeric and special characters', () => {
//   expect(password).toMatch(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,})/
//   );
// });

// test('confirm password', () => {
//   const confirmPassword = functions.confirmPassword('olaWale_17#');
//   expect(password).toEqual(confirmPassword);
// });
