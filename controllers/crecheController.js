const Creche = require("../models/crecheModel");
const mongoose = require("mongoose"); //pour ObjectId.isValid
const users = require('../Models/UserModel');
const proprio = require('../Models/proprioModel');
const { LocalStorage } = require('node-localstorage');
// ERROR HANDLER
const localStorage = new LocalStorage('./localStorage');


//Create new creche
const ajouterCreche = async (req, res) => {
  const userMail = localStorage.getItem('key');
  const key={};
  key.email = userMail;
  const user= await users.findOne(key);
  if (user){
    const id=user._id ;
    pro = proprio.find({ userID: id })
    .populate('userID')
    .populate('creche');
    console.log(pro)
    if (pro || user.role=='admin'){
          console.log(req.body);
          const {
            nom,
            localisation,
            typeAccueil,
            joursAccueil,
            typeEtab,
            ageAccueil,
            pedagogie,
            langue,
            capacite,
            transport,
            alimentation,
            num,
            mail,
            description,
            prop,
          } = req.body;
        

          //Ajouter la creche a la BD
          const photosPaths = [];
          if (req.files) {
            let files = req.files;
            for (let i = 0; i < files.length; i++) {
              photosPaths.push(files[i].filename);
            }
          }
          try {
            const creche = await Creche.create({
              nom,
              localisation,
              typeAccueil,
              joursAccueil,
              typeEtab,
              ageAccueil:{
                ageMin: ageAccueil,
                ageMax: undefined
              },
              pedagogie,
              langue,
              capacite,
              transport,
              alimentation,
              num,
              mail,
              description,
              prop,
              photos: photosPaths.map((path) => `uploads/${path}`),
            });
            console.log('creche');
            res.status(200).json(creche);
          } catch (error) {
            console.log(error);
            res.status(400).json(error);
          }}else{res.json({error:' NOT ALLOWED'})};
}else { res.json({ error: 'user not found'})}};

const getCreches = async (req, res) => {
  const creche = await Creche.find({});
  res.status(200).json(creche);
};

const deleteCreche = async (req, res) => {
  const { id } = req.params;
  const userMail = localStorage.getItem('key');
  const key={};
  key.email = userMail;
  const user= await users.findOne(key);
  if(user){
    pro = proprio.find({ userID: id })
    .populate('userID')
    .populate('creche');
    if (pro || user.role=='admin'){
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ error: "pas de telle creche" });
        }

        const creche = await Creche.findOneAndDelete({ _id: id });

        if (!creche) {
          return res.status(400).json({ error: "pas de telle creche" });
        }
  res.json(creche);}
  else {res.status(404).json({error:'NOT ALLOWED'})}}
  else res.status(404).json({error:'NOT FOUND'});
};

const modifyCreche = async (req, res) => {
  const { id } = req.params;
  const userMail = localStorage.getItem('key');
  const key={};
  key.email = userMail;
  const user= await users.findOne(key);
  if (user){
    const id=user._id ;
    pro = proprio.find({ userID: id })
    .populate('userID')
    .populate('creche');
    if (pro){
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "pas de telle creche" });
  }

  const creche = await Creche.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!creche) {
    return res.status(400).json({ error: "pas de telle creche" });
  }
  res.json(creche);
}else res.status(404).json({error: "NOT ALLOWED"});
  }else res.status(404).json({error: "USER NOT FOUND"});
}
module.exports = { ajouterCreche, getCreches, deleteCreche, modifyCreche };
