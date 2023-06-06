const express = require("express");
const upload = require("../middleware/upload");
const { isAuthentificated } = require("../middleware/auth");
const ac = require("../middleware/accessControl");

const {
  ajouterCreche,
  getCreches,
  deleteCreche,
  modifyCreche,
  home,
  infoCreche,
  evaluerCreche,
  rawdati,
} = require("../controllers/crecheController");

const router = express.Router();

router.get("/Creche", getCreches);

router.post(
  "/Creche",
  isAuthentificated,
  ac.createCrechePermission,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "carteNationale", maxCount: 1 },
    { name: "agrement", maxCount: 1 },
  ]),
  ajouterCreche
);

router.delete(
  "/Creche/:id",
  isAuthentificated,
  ac.SupprimerCreche,
  deleteCreche
);

router.patch(
  "/Creche/:id",
  isAuthentificated,
  ac.modifierCrechePermission,
  upload.fields([{ name: "photos", maxCount: 10 }]),
  modifyCreche
);

router.get("/Creche/:id", infoCreche);

router.get("/Home", home);

router.patch("/evaluerCreche/:id", isAuthentificated, evaluerCreche);

router.get("/Rawdati", rawdati);

module.exports = router;
