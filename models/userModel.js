const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
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
    enum: ["parent", "proprio", "admin"],
    required: [true, "champs oblogatoire"],
  },
  phone: {
    type: String,
    default: "00-00000000",
  },
  adress: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  dateNaissance: {
    type: String,
    default: "0000-00-00",
  },
});

userSchema.statics.login = async function (email, password) {
 try{
  const user = await this.findOne({ email });
  console.log(user);
   // const dec = bcrypt.compareSync(password, user.password);
   // if (dec) {
           console.log(" LOGGED YESS") ;
            return user;
    //}
  }
    catch(e){ console.log(" NOT TROUVE")};
 
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model("users", userSchema);
