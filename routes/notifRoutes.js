const express = require('express');
const {
    obtenirNotifsAdm,
    ajouterNotifAdm,
    supprimerNotifAdm
} = require("../controllers/notifAdmController");

const router = express.Router();

router.get('/', obtenirNotifsAdm);
router.post('/', ajouterNotifAdm);
router.delete('/:notifId', supprimerNotifAdm);
module.exports = router;
