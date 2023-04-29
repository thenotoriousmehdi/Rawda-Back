const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

// ERROR HANDLER

const errorhndler = (err) => {
  let errors = { email: "", password: "" };
  console.log(err.message, err.code);

  // validation error
  if (err.message.includes("USERS validation failed")) {
    console.log(err);
  }
  if (err.code === 11000) {
    errors.email = " MAIL DEJA EXISTANT";
  }
  if (err.code === 11000) {
    errors.password = " PASSWORD INVALID";
  }

  return errors;
};

const maxAge = 3600 * 4 * 3;
const createToken = (id) => {
  return jwt.sign({ id }, " AMINEWASSIMOULOUDMAHDI", {
    expiresIn: maxAge,
  });
};

exports.signup_get = (req, res) => {
  console.log("signupppp");
};

exports.logout_get = (req, res) => {
  console.log("logout");
  res.json("logout");
};

exports.signup_post = async (req, res) => {
  console.log("SIGN IN EN COURS");
  const { nom, prenom, email, password, role } = req.body;
  try {
    const user = await users.create({ nom, prenom, email, password, role });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err) {
    const error = errorhndler(err);
    console.log("not signed");
    res.status(404).json({ error });
  }
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.login(email, password);
    if (user) {
      res.json("User Existed");
    } else {
      res.json("User Not Existed");
    }
  } catch (err) {
    res.status(400).json({});
  }
};
