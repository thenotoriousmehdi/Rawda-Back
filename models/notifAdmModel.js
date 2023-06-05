const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notifSchema = new Schema({
    nomProprio: {
        type: String,
        required: true,
    },
    prenomProprio: {
        type: String,
        required: true,
    },
    creche: {
        type: String,
        required: true
    },
    emailProprio: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("notifAdm", notifSchema);
