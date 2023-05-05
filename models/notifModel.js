onst mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notifSchema = new Schema({
    nomParent: {
        type: String,
        required: false,
    },
    prenomParent: {
        type: String,
        required: false,
    },
    nomEnfant: {
        type: String,
        required: false,
    },
    prenomEnfant: {
        type: String,
        required: false,
    },
    dateNaissance: {
        type: String,
        required: false,
    },
    dateEntree: {
        type: String,
        required: false
    },
    heure: {
        type: String,
        required: false
    },
    dateRdv: {
        type: String,
        required: false
    },
    proprietaire: {
        type: Schema.Types.ObjectId,
        ref: "proprios",
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("notif", notifSchema);
