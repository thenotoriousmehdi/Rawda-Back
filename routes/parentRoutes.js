const express = require('express');
const Parent = require('../models/parentModel');
const Enfant = require('../models/enfantModel');
const ac = require("../middleware/accessControl");
const { isAuthentificated } = require("../middleware/auth");



const {
    addEnfantToParent,
    ajouterParent,
    obtenirTousLesParents
} = require("../controllers/parentController");

const router = express.Router();

router.post('/',isAuthentificated,ac.createEnfantsPermission,addEnfantToParent);
router.get('/',isAuthentificated,obtenirTousLesParents);
module.exports = router;
