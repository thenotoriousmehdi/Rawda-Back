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
    type: String,
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
  prop: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Creche", crecheSchema);

/*

{
  "nom":"Crèche berceau des anges",
  "localisation":"Birkhadem,Alger",
  "typeAccueil":"Régulier",
"joursAccueil":"Du dimanche au mardi",
  "typeEtab":"Etatique",
  "ageAccueil":"2-5 ans",
  "pedagogie":"Montessori",
  "langue":"Francais",
  "capacite":2000,
  "placesDispo":20,
  "transport":"Oui",
  "alimentation":"Non",
  "num":"0663212232",
  "mail":"kk-saadaoui@esi.dz",
  "description":"Un endroit magique pour garder vos enfants",
  "prop":"6425bc77816fb7d82167559a"
}   */
