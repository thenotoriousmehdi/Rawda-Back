const express = require('express');
const {
    obtenirNotifsPropParProp,
    ajouterNotifProp,
    supprimerNotifProp
} = require("../controllers/notifController");

const router = express.Router();

router.get('/notification', obtenirNotifsPropParProp);
router.post('/:propId', ajouterNotifProp);
router.delete('/:notifId', supprimerNotifProp);
module.exports = router;
