const exp = require('express');
const user = require('../controllers/user_controller');

const appRoute = exp.Router();

<<<<<<< HEAD
<<<<<<< HEAD
module.exports=appRoute;
=======
=======
>>>>>>> 30afd96af532f4b707c262fd257a117cf8c44901
appRoute.post('/login', user.login);
appRoute.post('/register', user.create);

module.exports = appRoute;
<<<<<<< HEAD
>>>>>>> 30afd96af532f4b707c262fd257a117cf8c44901
=======
>>>>>>> 30afd96af532f4b707c262fd257a117cf8c44901
