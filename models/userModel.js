const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

let user = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "champs obligatoire"],
    validate: [isEmail, " EmailNonValide"],
  },

  password: {
    type: String,
    required: [true, "champs obligatoire"],
    minlength: [6, "PASSWORD TOO SHORT"],
    unique: true,
  },

  role: {
    type: String,
    enum: ["parent", "proprio"],
    required: [true, "champs oblogatoire"],
  },
});

user.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    console.log("EMAIL TROUVE");
    const dec = bcrypt.compareSync(password, user.password);
    if (dec) {
      return user;
    }
    throw Error("ERROR PASSWORD");
  }
  throw Error(" USER NOT EXISITNG IN RAWDAs DB");
};

user.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const USERS = mongoose.model("USERS", user);
// Creation d'index pour le champ email
USERS.collection.createIndex({ email: 1 }, { unique: true }, (err) => {
  if (err) console.log(err);
});

module.exports = USERS;