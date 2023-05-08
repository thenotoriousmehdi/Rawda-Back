const Creche = require("../models/crecheModel");
const mongoose = require("mongoose"); //pour ObjectId.isValid
const users = require("../models/userModel");
const proprio = require("../models/proprioModel");
const { LocalStorage } = require("node-localstorage");
// ERROR HANDLER
const localStorage = new LocalStorage("./localStorage");

//Create new creche
const ajouterCreche = async (req, res) => {
  //console.log(req.files);
  const userMail = localStorage.getItem("key");
  const key = {};
  key.email = userMail;
  console.log(key);
  const user = await users.findOne(key);
  if (user) {
    const id = user._id;
    const pro = await proprio.findOne({ userID: id });
    if (pro) {
      const {
        nom,
        localisation,
        typeAccueil,
        joursAccueil,
        typeEtab,
        ageMin,
        ageMax,
        pedagogie,
        langue,
        capacite,
        transport,
        alimentation,
        num,
        mail,
        description,
        prix,
      } = req.body;

      //Ajouter la creche a la BD
      const photosPaths = [];
      if (req.files.photos) {
        let fichiers = req.files.photos;
        for (let i = 0; i < fichiers.length; i++) {
          photosPaths.push(fichiers[i].filename);
        }
      }
      try {
        const tab = JSON.parse(req.body.joursAccueil);
        // Fonction de comparaison des jours
        function comparerJours(a, b) {
          const jours = [
            "Samedi",
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
          ];
          return jours.indexOf(a) - jours.indexOf(b);
        }

        // Trier le tableau des jours d'accueil
        tab.sort(comparerJours);
        const creche = await Creche.create({
          nom,
          localisation,
          typeAccueil,
          joursAccueil: tab,
          typeEtab,
          ageAccueil: {
            ageMin: parseInt(ageMin, 10),
            ageMax: parseInt(ageMax, 10),
          },
          pedagogie,
          langue,
          capacite,
          transport,
          alimentation,
          num,
          mail,
          description,
          prix,
          prop: id,
          photos: photosPaths.map((path) => `uploads/${path}`),
          carteNationale: req.files.carteNationale
            ? `uploads/${req.files.carteNationale[0].filename}`
            : null,
          agrement: req.files.agrement
            ? `uploads/${req.files.agrement[0].filename}`
            : null,
        });
        pro.creche = creche._id;
        pro.save(pro);
        //console.log(photosPaths);
        res.status(200).json(creche);
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
    } else {
      res.json({ error: " NOT ALLOWED" });
    }
  } else {
    res.json({ error: "user not found" });
  }
};

const getCreches = async (req, res) => {
  const creche = await Creche.find({});
  res.status(200).json(creche);
};

const deleteCreche = async (req, res) => {
  const { id } = req.params;
  const userMail = localStorage.getItem("key");
  const key = {};
  key.email = userMail;
  const user = await users.findOne(key);
  if (user) {
    pro = proprio.find({ userID: id }).populate("userID").populate("creche");
    if (pro || user.role == "admin") {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "pas de telle creche" });
      }

      const creche = await Creche.findOneAndDelete({ _id: id });

      if (!creche) {
        return res.status(400).json({ error: "pas de telle creche" });
      }
      res.json(creche);
    } else {
      res.status(404).json({ error: "NOT ALLOWED" });
    }
  } else res.status(404).json({ error: "NOT FOUND" });
};

const modifyCreche = async (req, res) => {
  console.log("cc");
  const { id } = req.params;
  /*
  const userMail = localStorage.getItem("key");
  const key = {};
  key.email = userMail;
  const user = await users.findOne(key);
  if (user) {
    const id = user._id;
    pro = proprio.find({ userID: id }).populate("userID").populate("creche");
    if (pro) {
      console.log("cc pro");
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "pas de telle creche" });
      }

      const creche = await Creche.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );

      if (!creche) {
        return res.status(400).json({ error: "pas de telle creche" });
      }
      res.json(creche);
    } else res.status(404).json({ error: "NOT ALLOWED" });
  } else res.status(404).json({ error: "USER NOT FOUND" });
  */
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "pas de telle creche" });
  }

  const creche = await Creche.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!creche) {
    return res.status(400).json({ error: "pas de telle creche" });
  }
  res.json(creche);
};

const home = (req, res) => {
  // Récupérer les 7 crèches les mieux notées
  Creche.find()
    .sort({ "avis.note": -1 })
    .limit(7)
    .then((creches) => {
      //console.log("7 crèches les mieux notées :", creches);
      // Renvoyer les résultats au front-end
      res.json(creches);
    })
    .catch((err) => {
      console.error(err);
    });
};

const infoCreche = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "pas de telle creche" });
  }

  const creche = await Creche.findOne({ _id: id });

  if (!creche) {
    return res.status(400).json({ error: "pas de telle creche" });
  }
  console.log("creche trouveé !");
  res.json(creche);
};

const evaluerCreche = async (req, res) => {
  const { id } = req.params;
  const userMail = localStorage.getItem("key");
  console.log(userMail);
  const user = await users.findOne({ email: userMail });
  const nom = user.nom + " " + user.prenom;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "pas de telle creche" });
  }
  const creche = await Creche.findOne({ _id: id });

  let newNote = req.body.note;
  console.log("la note:", newNote);
  const coms = creche.avis.evaluations;

  const newEval = {
    noteIndiv: newNote,
    nom: nom,
    commentaires: req.body.commentaires,
  };
  newNote = (creche.avis.note * coms.length + newNote) / (coms.length + 1);
  coms.push(newEval);

  const update = await Creche.findOneAndUpdate(
    { _id: id },
    { "avis.evaluations": coms, "avis.note": newNote }
  );
  if (!update) {
    return res
      .status(400)
      .json({ error: "une erreur s'est produite lors de l'evaluation" });
  }
  console.log("Evaluée avec succes");
};

const getCrechesParProp = async (req, res) => {
  const propId = req.params.propId;
  const creches = await Creche.find({ prop: propId });
  res.status(200).json(creches);
};

module.exports = {
  ajouterCreche,
  getCreches,
  deleteCreche,
  modifyCreche,
  home,
  infoCreche,
  evaluerCreche,
  getCrechesParProp,
};
