const exp = require('express');
const user = require('../controllers/user_controller');

const appRoute = exp.Router();

<<<<<<< HEAD
module.exports=appRoute;
=======
appRoute.post('/login', user.login);
// register new user route
appRoute.post('/register', user.create);

module.exports = appRoute;
>>>>>>> 30afd96af532f4b707c262fd257a117cf8c44901
