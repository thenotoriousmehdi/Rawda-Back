const Creche = require("../models/crecheModel");
const mongoose = require("mongoose"); //pour ObjectId.isValid

//Create new creche
const ajouterCreche = async (req, res) => {
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
    placesDispo,
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
      ageAccueil,
      pedagogie,
      langue,
      capacite,
      placesDispo,
      transport,
      alimentation,
      num,
      mail,
      description,
      prop,
      photos: photosPaths.map((path) => `uploads/${path}`),
    });
    res.status(200).json(creche);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getCreches = async (req, res) => {
  const creche = await Creche.find({});
  res.status(200).json(creche);
};

const deleteCreche = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "pas de telle creche" });
  }

  const creche = await Creche.findOneAndDelete({ _id: id });

  if (!creche) {
    return res.status(400).json({ error: "pas de telle creche" });
  }
  res.json(creche);
};

const modifyCreche = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "pas de telle creche" });
  }

  const creche = await Creche.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!creche) {
    return res.status(400).json({ error: "pas de telle creche" });
  }
  res.json(creche);
};

module.exports = { ajouterCreche, getCreches, deleteCreche, modifyCreche };
