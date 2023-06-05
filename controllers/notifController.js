const mongoose = require("mongoose");
const Notif = require("../models/notifModel");
const Proprio = require("../models/proprioModel");
const { ObjectId } = require("mongodb");
const User = require("../models/userModel");
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage("./localStorage");
// Récupérer les notifications propriétaire pour un propriétaire donné
const obtenirNotifsPropParProp = async(req, res) => {
    const userMail = localStorage.getItem("key");
    const key = {};
    key.email = userMail;
    const user = await User.findOne(key);
    if (!user) {
        console.log("User not found");
        return;
    } else {
        console.log("User found");
        console.log(user.email);
    }
    const proprietaire = await Proprio.findOne({ userID: user._id });
    if (!proprietaire) {
        console.log("proprio not found");
        return;
    } else {
        console.log("proprio found");
    }
    const notifs = await proprietaire.notification;
    if (!notifs) {
        console.log("notifs not found");
        return;
    } else {
        console.log("notifs found");
        console.log(notifs);
    }
    const mesNotifs = await Notif.find({ _id: { $in: notifs } });
    return res.status(201).json(mesNotifs);


};
//ramener l'id de la creche courante, ensuite ramener l'id du proprietaire
//l 'email de parent aussi 
//si accepte ou refuse on envoie un email au parent en utilisant le champ email dans notif
const ajouterNotifProp = async(req, res) => {
    const { nomParent, prenomParent, emailParent, nomEnfant, prenomEnfant, dateNaissance, dateEntree, heure, dateRdv } = req.body;
    const proprietaire = new ObjectId(req.params.propId); // récupérer l'ID du propriétaire à partir des paramètres de requête

    const notif = await new Notif({
        nomParent,
        prenomParent,
        emailParent,
        nomEnfant,
        prenomEnfant,
        dateNaissance,
        dateEntree,
        heure,
        dateRdv,
        proprietaire
    });
    const prop = await Proprio.findById(proprietaire);

    notif.save(notif);
    prop.notification.push(notif);
    console.log(prop.notification);
    prop.save(prop);

    return res.status(201).json(notif);
};

//11061966
// Supprimer une notification pour un propriétaire
const supprimerNotifProp = async(req, res) => {
    const { nomParent, prenomParent, emailParent, nomEnfant, prenomEnfant, dateNaissance, dateEntree, heure, dateRdv } = req.body; // récupérer la notification à partir des paramètres de body
    await Notif.findOneAndDelete({ nomParent: nomParent , prenomParent: prenomParent,
         emailParent : emailParent, nomEnfant : nomEnfant
        , prenomEnfant : prenomEnfant, dateNaissance : dateNaissance,
         dateEntree : dateEntree, heure : heure, dateRdv : dateRdv }); // try and catch 


    return res.status(200).json({ message: 'Notification supprimée avec succès.' });

};
exports.obtenirNotifsPropParProp = obtenirNotifsPropParProp;
exports.ajouterNotifProp = ajouterNotifProp;
exports.supprimerNotifProp = supprimerNotifProp;
