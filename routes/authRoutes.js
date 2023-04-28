const router = require ('express');

const authController = require('../Controllers/authController');

const route = router( ) // instatiation

//route.get('/signup',authController.signup_get);
route.post('/signup',authController.signup_post);
route.get('/logout',authController.logout_get);
route.post('/login',authController.login_post);

module.exports = route ;