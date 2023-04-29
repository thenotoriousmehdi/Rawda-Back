const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const parentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  enfant: [{ type: Schema.Types.ObjectId, ref: "enfants" }],
});

const parentmodel = mongoose.model("Parent", parentSchema);

// Creation d'index pour le champ email
parentmodel.collection.createIndex({ userID: 1 }, { unique: true }, (err) => {
  if (err) console.log(err);
});

module.exports = parentmodel;
