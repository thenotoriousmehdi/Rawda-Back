const mongoose = require("mongoose");
const Parent = require('../models/parentModel');
const Enfant = require('../models/enfantModel');

exports.addEnfantToParent = async(req, res) => {
    const { parentID, nom, prenom, date_naissance, creche } = req.body;

    try {
        // Find the parent by ID
        const parent = await Parent.findById(parentID);

        if (!parent) {
            return res.status(404).json({ msg: 'Parent not found' });
        }

        // Create a new enfant
        const enfant = new Enfant({
            nom,
            prenom,
            date_naissance,
            creche
        });

        // Save the enfant in the database
        await enfant.save();

        // Add the enfant to the parent's enfant array
        parent.enfant.push(enfant);

        // Save the parent with the new enfant
        await parent.save();

        res.json(parent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.ajouterParent = async(req, res) => {
    try {
        const { userID, enfant } = req.body;

        const parent = new Parent({
            userID,
            enfant
        });

        await parent.save();

        res.status(201).json({ message: "Le parent a été ajouté avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout du parent" });
    }
};


exports.obtenirTousLesParents = async(req, res) => {
    try {
        const parents = await Parent.find().populate("userID enfant");

        res.status(200).json(parents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des parents" });
    }
};
