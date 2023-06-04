const express = require('express');
const Notif = require('../models/notifModel');
const Creche = require('../models/crecheModel');
const Enfant = require('../models/enfantModel');
const Proprio = require('../models/proprioModel');
const User = require('../Models/UserModel');
const Parent = require("../models/parentModel");
const {isAuthentificated} = require('../middleware/auth');

const { reserverPlace, prendreRendezVous } = require("../controllers/prendreRdvController");


const router = express.Router();

router.post('/crechereserver/:id',isAuthentificated, reserverPlace);
router.post('/crecherdv/:id', isAuthentificated,prendreRendezVous);

module.exports = router;
