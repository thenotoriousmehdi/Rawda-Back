const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const proprioSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  creche: { type: Schema.Types.ObjectId, ref: "creches" } ,
  notification: [{ type: Schema.Types.ObjectId, ref: "notifications" }]
});

const proprioModel = mongoose.model("Proprio", proprioSchema);


module.exports = proprioModel;
