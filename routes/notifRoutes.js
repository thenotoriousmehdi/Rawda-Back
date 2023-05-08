const express = require('express');
const {
    obtenirNotifsPropParProp,
    ajouterNotifProp,
    supprimerNotifProp
} = require("../controllers/notifAdmController");

const router = express.Router();

router.get("/getcreches/:id", obtenirNotifsPropParProp);
router.post("/prop/:propId", ajouterNotifProp);
router.delete("/:notifId", supprimerNotifProp);
module.exports = router;
