const mongoose = require("mongoose");
const  {ObjectId} = require("mongodb") ;
const Parent = require('../Models/ParentModel');
const Enfant = require('../models/enfantModel');
const users = require('../Models/UserModel');
const { LocalStorage } = require('node-localstorage');
// ERROR HANDLER
const localStorage = new LocalStorage('./localStorage');

    exports.addEnfantToParent = async(req, res) => {
        const enfants={};
        enfants.nom=req.body.nom;
        enfants.prenom=req.body.prenom;
        enfants.date_naissance=req.body.date_naissance;
        enfants.creche= new ObjectId(req.params.id);;
        const userMail = localStorage.getItem('key');  
        console.log(userMail);
        const user = await users.findOne({email : userMail});
        console.log(user._id);
        if (user){
        try {
            const parentID = user._id;
            console.log(parentID);
            // Find the parent by ID
            parent =  await Parent.findOne({ userID: parentID });
            console.log(parent);
            if (!parent) {
                return res.status(404).json({ msg: 'Parent not found' });
            }
            // Create a new enfants
            const enfant = new Enfant(enfants);
        console.log(enfant);
            // Save the enfant in the database
        
            await enfant.save();
            parent.enfant=[];
            // Add the enfant to the parent's enfant array
            parent.enfant.push(enfant);
        
            // Save the parent with the new enfant
            parent.save();
            res.json(parent);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }else{ res.status(404).json({error:' YOU DONT HAVE THE ACCESS'})};
    }



exports.obtenirTousLesParents = async(req, res) => {
    try {
        const parents = await Parent.find().populate("userID enfant");

        res.status(200).json(parents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des parents" });
    }
};
