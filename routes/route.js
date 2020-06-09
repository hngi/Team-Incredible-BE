const exp = require('express');
const user = require('../controllers/user_controller');

const appRoute = exp.Router();

appRoute.post('/login', user.login);
// register new user route
appRoute.post('/register', user.create);

module.exports = appRoute;
