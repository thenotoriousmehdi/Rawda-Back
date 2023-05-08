const mongoose = require("mongoose");
const Notif = require("../models/notifModel");
const Proprio = require("../models/proprioModel");
const { ObjectId } = require("mongodb");
const User = require("../models/userModel");

// Récupérer les notifications propriétaire pour un propriétaire donné
const obtenirNotifsPropParProp = async(req, res) => {
    //const userMail = localStorage.getItem('key');
    const userId = new ObjectId(req.params.id);
    const user = await User.findById(userId);
    if (!user) {
        res.send("User not found");
        return;
    } else {
        res.send("User found");
    }


    const proprietaire = await Proprio.findOne({ userID: user._id });
    if (!proprietaire) {
        res.send("proprio not found");
        return;
    } else {
        res.send("proprio found");
    }
    // récupérer l'ID du propriétaire à partir des paramètres de requête
    const notifs = proprietaire.notification;
    if (!notifs) {
        res.send("notifs not found");
        return;
    } else {
        res.send("notifs found");
    }
    res.status(201).json(notifs);
};
//ramener l'id de la creche courante, ensuite ramener l'id du proprietaire
//l 'email de parent aussi 
//si accepte ou refuse on envoie un email au parent en utilisant le champ email dans notif
const ajouterNotifProp = async(req, res) => {
    const { nomParent, prenomParent, emailParent, nomEnfant, prenomEnfant, dateNaissance, dateEntree, heure, dateRdv } = req.body;
    const proprietaire = req.params.propId; // récupérer l'ID du propriétaire à partir des paramètres de requête

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

    notif.save(notif);

    return res.status(201).json(notif);
};

//11061966
// Supprimer une notification pour un propriétaire
const supprimerNotifProp = async(req, res) => {
    const notifId = req.params.notifId; // récupérer l'ID de la notification à partir des paramètres de requête
    await Notif.findByIdAndDelete(notifId) // try and catch 



    return res.status(200).json({ message: 'Notification supprimée avec succès.' });

};
exports.obtenirNotifsPropParProp = obtenirNotifsPropParProp;
exports.ajouterNotifProp = ajouterNotifProp;
exports.supprimerNotifProp = supprimerNotifProp;
