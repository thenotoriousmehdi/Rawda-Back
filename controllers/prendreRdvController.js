//local storage parent
//la creche est dans l'id
//les autres infos dans le body 
const mongoose = require('mongoose')
const { ObjectId } = require("mongodb");
const Notif = require("../models/notifModel");
const User = require("../models/userModel");
const Enfant = require("../models/enfantModel")
const Proprio = require("../models/proprioModel");
const Parent = require("../models/parentModel");
const Creche = require("../models/crecheModel");
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./localStorage');
const nodemailer = require('nodemailer');

const prendreRendezVous = async(req, res) => {
    const { heure, dateRdv } = req.body;
    const creche = new ObjectId(req.params.id);
    const proprietaire = await Proprio.findOne({ creche: creche });
    const userMail = localStorage.getItem('key');
    const user = await User.findOne({ email: userMail });
    nomParent = user.nom;
    prenomParent = user.prenom;
    emailParent = user.email;
    const notif = await new Notif({
        nomParent,
        prenomParent,
        emailParent,
        heure,
        dateRdv,
        proprietaire
    });
    notif.save(notif);
    await proprietaire.notification.push(notif);
    proprietaire.save(proprietaire);
    res.status(201).send('Prise de rdv succesfully');
    // const {nomEnfant, prenomEnfant, dateNaissance, dateEntree, heure, dateRdv} = req.body;

    /* const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         auth: {
             user: 'km_serir@esi.dz',
             pass: 'tezteztez'
         }
     });

     // Set up email options with the dynamic variables
     const mailOptions = {
         from: 'km_serir@esi.dz',
         to: emailParent, //parent de la creche email,
         subject: `Reponse Rawda`,
         text: `Bonjour Mr ${nomParent},\nVotre demande a ete accepte pour la date voulue.\nCordialement.\nEquipe Rawda`
     };
     try { // Send the email
         await transporter.sendMail(mailOptions);
         res.send('Email sent successfully!');
     } catch (error) {
         console.error(error);
         res.status(500).send('Error sending email');
     }*/


}
const reserverPlace = async(req, res) => {
    const { nomEnfant, prenomEnfant, dateNaissance, dateEntree, heure, dateRdv } = req.body;
    const creche = new ObjectId(req.params.id);
    const proprietaire = await Proprio.findOne({ creche: creche });
    const userMail = localStorage.getItem('key');
    const user = await User.findOne({ email: userMail });
    nomParent = user.nom;
    prenomParent = user.prenom;
    emailParent = user.email;
    const parent = await Parent.findOne({ userID: user._id });
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
    await proprietaire.notification.push(notif);
    proprietaire.save(proprietaire);
    const enfant = await new Enfant({
        nomEnfant,
        prenomEnfant,
        dateNaissance,
        creche
    })



    // Save the enfant in the database

    await enfant.save();
    // Add the enfant to the parent's enfant array
    parent.enfant.push(enfant);

    // Save the parent with the new enfant
    await parent.save();


    res.status(201).send('Prise de rdv succesfully');

    /*const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'km_serir@esi.dz',
            pass: 'tezteztez'
        }
    });
    //crechereserver/644d134a3b1dfd9da5d05a23
    // Set up email options with the dynamic variables
    const mailOptions = {
        from: 'km_serir@esi.dz',
        to: emailParent, //parent de la creche email,
        subject: `Reponse Rawda`,
        text: `Bonjour Mr ${nomParent},\nVotre demande a ete accepte pour la date voulue.\nCordialement.\nEquipe Rawda`
    };
    try { // Send the email
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }*/
}
module.exports = { reserverPlace, prendreRendezVous };
   



   
