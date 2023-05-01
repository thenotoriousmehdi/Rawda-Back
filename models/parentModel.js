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

module.exports = parentmodel;
