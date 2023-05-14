const express = require('express');

const express = require('express');
const {
    obtenirNotifsPropParProp,
    ajouterNotifProp,
    supprimerNotifProp
} = require("../controllers/notifController");

const router = express.Router();
router.get('/notifs/get/', obtenirNotifsPropParProp);
router.post('/notifs/post/:propId', ajouterNotifProp);
router.delete('/notifs/delete/:notifId', supprimerNotifProp);
module.exports = router;



