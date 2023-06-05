const express = require('express');
const {
    obtenirNotifsAdm,
    ajouterNotifAdm,
    supprimerNotifAdm
} = require("../controllers/notifAdmController");

const router = express.Router();

router.get('/notifAdm/get', obtenirNotifsAdm);
router.post('/notifAdm/add', ajouterNotifAdm);
router.delete('/:notifId', supprimerNotifAdm);
module.exports = router;
