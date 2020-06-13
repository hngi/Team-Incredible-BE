const express = require('express');
const user = require('../controllers/usercontroller');

const appRoute = express.Router();

appRoute.get('/', (req, res) => {
  res.render('index', { variable: 'Hello Guys' });
});


appRoute.get('/about', (req, res) => {
  res.render('Pages/About');
});

appRoute.get('/register', (req, res) => {
  res.render('Pages/Register');
});

appRoute.get('/login', (req, res) => {
  const { successMsg } = req.query;
  res.render('Pages/Login', {
    successMsg,
  });
});

appRoute.get('/forgot-password', (req, res) => {
  const { successMsg } = req.query;
  res.render('Pages/Forgotpassword', {
    successMsg,
  });
});

appRoute.post('/login', user.login);
appRoute.post('/register', user.signup);
appRoute.post('/forgot-password', user.forget);
appRoute.get('/logout', user.isAuthenticated, user.logout);
appRoute.get('/dashboard', user.isAuthenticated, user.dashboard);
appRoute.get('/googleauth', user.googleauth);
appRoute.get('/google/callback', user.googlecallback);


module.exports = appRoute;
