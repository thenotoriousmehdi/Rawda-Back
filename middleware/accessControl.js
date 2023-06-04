const accessControl = require("accesscontrol");
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./localStorage');

const ac = new accessControl();


// Définition des rôles et des permissions pour la collection "users"
ac.grant('user')
  .readOwn('users')
  .updateOwn('users');

ac.grant('parent')
  .extend('user')
  .readOwn('parents')
  .updateOwn('parents')
  .deleteAny('enfants')
  .createAny('enfants')
  .updateOwn('enfants')
  .readAny('creches');

// Définition des rôles et des permissions pour la collection "creches et proprio"
ac.grant('proprio')
  .readOwn('creches')
  .extend('parent')
  .updateOwn('creches')
  .deleteOwn('creches')
  .createOwn('creches')
  .updateOwn('proprios');


// Définition des rôles et des permissions pour la collection "creches et proprio"

ac.grant('admin')
  .extend('user')
  .extend('proprio')
  .deleteAny('parents')
  .deleteAny('creches')
  .deleteAny('proprios')
  .deleteAny('enfants')
  .readAny('users')
  .createAny('users');

module.exports.createPCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.modifierUser = ( req , res , next )=>{
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('users');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de modifier un profile.' });
    }
  };

  module.exports.lireProfile =(req , res , next)=>{
    const role =localStorage.getItem('role');
    const permission = ac.can(role).readOwn('users');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de modifier un profile.' });
    }
  };
  

  module.exports.lireCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).readAny('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

 module.exports.modifierCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.createCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.createEnfantsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('enfants');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  

  module.exports.lireEnfantsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('enfants');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.modifierEnfantPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('enfants');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };
  module.exports.deleteEnfantPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).deleteAny('enfant');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.modifierParentsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.lireParentsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };


 module.exports.getCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).readOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.ModifierPropPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  module.exports.SupprimerCreche =(req , res , next)=>{
    const role =localStorage.getItem('role');
    const permission = ac.can(role).deleteOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

 
