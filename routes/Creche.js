const express = require("express");
const upload = require("../middleware/upload");

const {
  ajouterCreche,
  getCreches,
  deleteCreche,
  modifyCreche,
  home,
  infoCreche,
  evaluerCreche,
} = require("../controllers/crecheController");

const router = express.Router();

router.get("/Creche", getCreches);

router.post(
  "/Creche",
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "carteNationale", maxCount: 1 },
    { name: "agrement", maxCount: 1 },
  ]),
  ajouterCreche
);

router.delete("/Creche/:id", deleteCreche);

router.patch("/Creche/:id", modifyCreche);

router.get("/Creche/:id", infoCreche);

router.get("/Home", home);

router.patch("/evaluerCreche/:id", evaluerCreche);

module.exports = router;
