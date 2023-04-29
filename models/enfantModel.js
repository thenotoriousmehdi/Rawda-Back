const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enfantsSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  date_naissance: {
    type: Date,
    required: true,
  },

  creche: { type: Schema.Types.ObjectId, ref: "creches" },
});

module.exports = mongoose.model("enfants", enfantsSchema);
