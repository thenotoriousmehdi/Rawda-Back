const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const parentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  enfant: [{ type: Schema.Types.ObjectId, ref: "enfants" }],
  notification: [{ type: Schema.Types.ObjectId, ref: "notifications" }]
});

const parentmodel = mongoose.model("Parent", parentSchema);

module.exports = parentmodel;
