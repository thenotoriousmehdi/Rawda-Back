const express = require("express");
const Post = require("../models/postModel");
const upload = require("../middleware/upload");

const {
  ajouterCreche,
  getCreches,
  deleteCreche,
  modifyCreche,
  home,
  getCrechersParProprio
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

router.get("/:propId", getCrechesParProp);

router.patch("/Creche/:id", modifyCreche);

router.get("/Home", home);

module.exports = router;

function verifyRole(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
}
