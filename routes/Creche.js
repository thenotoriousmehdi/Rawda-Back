const express = require("express");
const {
  ajouterCreche,
  getCreches,
  deleteCreche,
  modifyCreche,
} = require("../controllers/crecheController");

const router = express.Router();

router.get("/", getCreches);

router.post("/", ajouterCreche);

router.delete("/:id", deleteCreche);

router.patch("/:id", modifyCreche);

module.exports = router;
