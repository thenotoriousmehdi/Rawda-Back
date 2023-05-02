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
    ageMin: { type: Number, default: 1 },
    ageMax: { type: Number, max: 8, default: 6 },
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
  avis: {
    note: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    evaluations: {
      type: [
        {
          nom: {
            type: String,
          },
          commentaires: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  carteNationale: {
    type: String,
    required: true,
  },
  agrement: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Creche", crecheSchema);
