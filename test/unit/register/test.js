const request = require("supertest");
var should = require("should");
const expect = require("chai").expect;
var app = require('../../../server');




const userCredentials = {
  first_name: "Jane",
  last_name: "Doe",
  email: 'johndoe@gmail.com',
  phone: '07023455569',
  password: 'garyTheSnail',
  cpassword: 'garyTheSnail'


}


describe('POST /api/v1/registration', function() {
  beforeEach(function(done){
      userCredentials
      done();
  });

  it('should create a new user', function(done) { 
      request.agent(app)
      .post('/register')
      .send(userCredentials)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect('message', 'Registration successful')
        done();
    });


});