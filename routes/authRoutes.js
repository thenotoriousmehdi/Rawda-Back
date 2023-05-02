const router = require("express");
const authController = require("../controllers/authController");

const route = router();

//route.get('/signup',authController.signup_get);
route.post("/signup", authController.signup_post);
route.get("/logout", authController.logout_get);
route.post("/login", authController.login_post);
route.post("/documents",authController.documents_post);
route.get("/profile",authController.get_profile);

module.exports = route;
