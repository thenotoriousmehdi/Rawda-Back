const express = require('express');
const {
    obtenirNotifsAdm,
    ajouterNotifAdm,
    supprimerNotifAdm
} = require("../controllers/notifAdmController");

const router = express.Router();

router.get("/getcreches/:id", obtenirNotifsPropParProp);
router.post("/prop/:propId", ajouterNotifProp);
router.delete("/:notifId", supprimerNotifProp);
module.exports = router;
