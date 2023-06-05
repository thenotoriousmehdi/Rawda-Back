const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dashSchema = new Schema({
  nbRecherches: {
    type: Number,
    default: 0,
  },
  termesRecherches: [
    {
      mot: {
        type: String,
        required: true,
      },
      occurence: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Dashboard", dashSchema);
