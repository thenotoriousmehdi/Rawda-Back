const mongoose = require("mongoose");
const NotifAdm = require("../models/notifAdmModel");
const User = require("../models/userModel");
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage("./localStorage");


// Récupérer les notifications propriétaire pour un propriétaire donné
const obtenirNotifsAdm = async(req, res) => {
    // récupérer l'ID du propriétaire à partir des paramètres de requête
    const notifsAdmin = await NotifAdm.find().sort({ timestamps: -1 });
    res.status(201).json(notifsAdmin);
    // didnt handle errors yet
};
const ajouterNotifAdm = async(req, res) => {
    //didnt handle errors yet
    const { creche } = req.body;
    const userMail = localStorage.getItem("key");
    const key = {};
    key.email = userMail;
    const user = await User.findOne(key);
    const nomProprio = user.nom;
    const prenomProprio = user.prenom;
    const emailProprio = user.email;
    notifAdm = new NotifAdm({
        nomProprio,
        prenomProprio,
        creche: creche,
        emailProprio,
    });
    console.log(notifAdm);

    await notifAdm.save(notifAdm);

    return res.status(201).json(notifAdm);
};


// Supprimer une notification pour un propriétaire
const supprimerNotifAdm = async(req, res) => {
    const notifId = req.params.notifAId; // récupérer l'ID de la notification à partir des paramètres de requête
    await NotifAdm.findByIdAndDelete(notifId)
        /// didnt handle errors yet

    return res.status(200).json({ message: 'Notification supprimée avec succès.' });

};
exports.obtenirNotifsAdm = obtenirNotifsAdm;
exports.ajouterNotifAdm = ajouterNotifAdm;
exports.supprimerNotifAdm = supprimerNotifAdm;
