/* eslint-disable no-extra-boolean-cast */
const axios = require('axios');

const apiUrl = 'https://hngi7-team-avengers.herokuapp.com/api/v1';

// This will be an external dashborad url to task 9

const dashboardUrl = '/mydashboard';

//  Middleware
exports.isAuthenticated = (req, res, next) => {
  if (!!req.cookies.auth) {
    next();
  }
  return res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (!!req.cookies.auth) {
    res.redirect('/dashboard');
  }
  return next();
};

exports.signup = (req, res) => {
  const data = req.body;
  axios.post(
    `${apiUrl}/register`,
    data,
  ).then(() => {
    const string = encodeURIComponent('You have successfully signup, please login');
    res.redirect(`/login?successMsg=${string}`);
  }).catch((err) => {
    res.render('Pages/Register', {
      error: err.response.data,
      data,
    });
  });
};


exports.login = (req, res) => {
  const data = req.body;
  axios.post(
    `${apiUrl}/login`,
    data,
  ).then((response) => {
    const { token } = response.data;
    res.cookie('auth', token);
    res.redirect(`/dashboard?token=${token}`);
  }).catch((err) => {
    res.render('Pages/Login', {
      error: err.response.data,
      successMsg: null,
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie('auth');
  return res.redirect('/');
};

exports.dashboard = (req, res) => {
  const token = req.cookies.auth;
  res.redirect(`${dashboardUrl}?token=${token}`);
};

exports.googleauth = (req, res) => {
  axios.get(
    `${apiUrl}/google-signin`,
  ).then((resp) => {
    const { response } = resp.data;
    res.redirect(response);
  });
};
