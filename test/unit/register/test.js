const request = require('supertest');

let app;


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
    app = require('../../../server');
    userCredentials;
    done();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should verify if all fields are entered correctly', function (done) {
    request.agent(app)
           .post('/register')
           .send(userCredentials)
           .expect(200)
           .expect('Content-Type', /json/)
           .expect('message', 'Registration successful');
    done();
  });


  it('verify if it sends an error message if first name field is not filled and entered', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'last_name': 'Doe',
             'email': 'johndoe@gmail.com',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if first name field contains only strings', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': '123Jane',
             'last_name': 'Doe',
             'email': 'johndoe@gmail.com',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });


  it('verify if it sends an error message if last name field is not filled and entered', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             // "last_name": "Doe",
             'email': 'johndoe@gmail.com',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if last name field contains only strings', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': '123Jane',
             'last_name': 'D3546oe',
             'email': 'johndoe@gmail.com',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });


  it('verify if it sends an error message if email field is not filled and entered', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             'last_name': 'Doe',
             // "email": 'johndoe@gmail.com',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });


  it('verify if it sends an error message if email field is not in the right format', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             'last_name': 'Doe',
             'email': 'johndoe',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if phone field contains a string', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             'last_name': 'Doe',
             'email': 'johndoe',
             'phone': 'gary',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSnail',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });


  it('verify if it sends an error message if password field is empty', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             'last_name': 'Doe',
             'email': 'johndoe',
             'phone': '07023455569',
             // 'password': 'garyTheSnail',
             // "cpassword": 'garyTheSnail'
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });

  it('verify if it sends an error message if password field does not math confirm password field', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             'last_name': 'Doe',
             'email': 'johndoe',
             'phone': '07023455569',
             'password': 'garyTheSnail',
             'cpassword': 'garyTheSn',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'Password didn\'t correspond');
    done();
  });


  it('verify if it sends an error message if password field is weak', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': 'Jane',
             'last_name': 'Doe',
             'email': 'johndoe',
             'phone': '07023455569',
             'password': 'ga',
             'cpassword': 'ga',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'Password is weak');
    done();
  });

  it('verify if it sends an error message if all fields are empty', function (done) {
    request.agent(app)
           .post('/register')
           .send({
             'first_name': '',
             'last_name': '',
             'email': '',
             'phone': '',
             'password': '',
             'cpassword': '',
           })
           .expect(400)
           .expect('Content-Type', /json/)
           .expect('msg', 'please include all fields');
    done();
  });
});
