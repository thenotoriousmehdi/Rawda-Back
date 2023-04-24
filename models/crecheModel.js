const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const crecheSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  typeAccueil: {
    type: String,
    required: true,
  },
  joursAccueil: {
    type: String,
    required: true,
  },
  ageAccueil: {
    type: String,
    required: true,
  },
  langue: {
    type: String,
    required: true,
  },
  capacite: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Creche", crecheSchema);
