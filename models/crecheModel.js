const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const crecheSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  typeAccueil: {
    type: String,
    required: true,
  },
  joursAccueil: {
    type: [String],
    maxlenght: 7,
    required: true,
  },
  typeEtab: {
    type: String,
    required: true,
  },
  ageAccueil: {
    type: String,
    required: true,
  },
  pedagogie: {
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
  placesDispo: {
    type: Number,
    required: true,
  },
  transport: {
    type: String,
    required: true,
  },
  alimentation: {
    type: String,
    required: true,
  },
  num: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  photos: {
    type: [String],
  },
  prop: { type: Schema.Types.ObjectId, ref: "users" },
  prix: { type: Number, default: 0 },
});

module.exports = mongoose.model("Creche", crecheSchema);
