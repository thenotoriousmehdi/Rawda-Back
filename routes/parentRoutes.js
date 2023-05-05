const express = require('express');
const Parent = require('../models/parentModel');
const Enfant = require('../models/enfantModel');


const {
    addEnfantToParent,
    ajouterParent,
    obtenirTousLesParents
} = require("../controllers/parentController");

const router = express.Router();

router.post('/', addEnfantToParent);
router.post('/', ajouterParent);
router.delete('/', obtenirTousLesParents);
module.exports = router;
