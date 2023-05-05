const mongoose = require("mongoose");
const Notif = require("../models/notifModel");

// Récupérer les notifications propriétaire pour un propriétaire donné
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


// Supprimer une notification pour un propriétaire
const supprimerNotifProp = async(req, res) => {
    const notifId = req.params.notifId; // récupérer l'ID de la notification à partir des paramètres de requête
    await Notif.findByIdAndDelete(notifId, (err, notifSupprimee) => {
        if (err) { // rehandle the error using try catch cuz this won't work 
            console.error(err);
            return res.status(500).json({ message: 'Erreur serveur lors de la suppression de la notification.' });
        }

        if (!notifSupprimee) {
            return res.status(404).json({ message: 'Notification non trouvée.' });
        }

        return res.status(200).json({ message: 'Notification supprimée avec succès.' });
    });
};
exports.obtenirNotifsPropParProp = obtenirNotifsPropParProp;
exports.ajouterNotifProp = ajouterNotifProp;
exports.supprimerNotifProp = supprimerNotifProp;
