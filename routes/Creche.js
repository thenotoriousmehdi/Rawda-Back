const express = require("express");
const Post = require("../models/postModel");
const upload = require("../middleware/upload");

const {
  ajouterCreche,
  getCreches,
  deleteCreche,
  modifyCreche,
} = require("../controllers/crecheController");

const router = express.Router();

router.get("/", getCreches);

router.post("/", upload.array("photos", 10), ajouterCreche);

router.delete("/:id", deleteCreche);

router.patch("/:id", modifyCreche);

module.exports = router;
