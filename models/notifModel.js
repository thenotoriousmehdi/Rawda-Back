const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notifSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, reqiured: true },
    dateRdv: { type: String, required: true },
    heureRdv: { type: String, required: true },
    email: { type: String, required: true },
    numeroTelephone: { type: String, required: true}
    },
    {timestamps : true, });

module.exports = notifModel;
