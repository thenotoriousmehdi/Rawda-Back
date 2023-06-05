const express = require('express');
const Notif = require('../models/notifModel');
const Creche = require('../models/crecheModel');
const Enfant = require('../models/enfantModel');
const Proprio = require('../models/proprioModel');
const User = require('../models/userModel');
const Parent = require("../models/parentModel");

const { reserverPlace, prendreRendezVous } = require("../controllers/prendreRdvController");


const router = express.Router();

router.post('/crechereserver/:crecheId', reserverPlace);
router.post('/crecherdv/:crecheId', prendreRendezVous);
module.exports = router;
