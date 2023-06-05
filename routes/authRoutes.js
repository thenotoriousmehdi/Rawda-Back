const express = require("express");
const ac = require("../middleware/accessControl");
const { isAuthentificated } = require("../middleware/auth");
const authController = require("../controllers/authController")
const upload = require("../middleware/upload");
const route = express.Router();

route.post("/signup", authController.signup_post );
route.post("/login", authController.login_post);
route.post("/documents", authController.documents_post);
route.get("/profile", ac.lireProfile , isAuthentificated, authController.get_profile);
route.patch(
    "/modifierProfile",
    isAuthentificated,
    ac.modifierUser,
    upload.fields([{ name: "photo", maxCount: 1 }]),
    authController.modifInfoProfile
  );
route.post("/logout",authController.logout);

module.exports = route;
