const Creche = require("../models/crecheModel");
const mongoose = require("mongoose"); 
const users = require("../models/userModel");
const parent = require("../models/parentModel");
const prop = require("../models/proprioModel")
const enfant = require("../models/enfantModel")
const Dashboard = require("../models/dashModel")

exports.getinfos = async (req , res)=>  {
        try {
            const filtre ={};
          const nbparent = await parent.countDocuments();
          const nbprop = await prop.countDocuments();
          const nbenfant = await enfant.countDocuments();
          const nbcreche = await Creche.countDocuments();
          const dash = await Dashboard.findOne({ });
          filtre.nbrecherche = dash.nbRecherches;
          const tab = dash.termesRecherches.slice(0 , 5 ).map(term => term.mot);
         
          console.log(tab);
          filtre.nbparent = nbparent ;
          filtre.nbprop = nbprop ;
          filtre.nbenfant = nbenfant ;
          filtre.nbcreche = nbcreche;
          res.json({ infos :filtre,
                    termes : tab });
                    
        
        } catch (error) {
          console.error('Erreur lors de la récupération du nombre de documents :', error);
        }
      };

exports.home = (req, res) => {
   
        // Récupérer les 7 crèches les mieux notées
        Creche.find()
          .sort({ "avis.note": -1 })
          .limit(5)
          .then((creches) => {
            //console.log("7 crèches les mieux notées :", creches);
            // Renvoyer les résultats au front-end
            res.json(creches);
          })
          .catch((err) => {
            console.error(err);
          });
      };
     



