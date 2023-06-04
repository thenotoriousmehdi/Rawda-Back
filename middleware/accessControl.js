const accessControl = require("accesscontrol");

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

exports.createPCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.modifierUser = ( req , res , next )=>{
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('users');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de modifier un profile.' });
    }
  };

  exports.lireProfile =(req , res , next)=>{
    const role =localStorage.getItem('role');
    const permission = ac.can(role).readOwn('users');
    if (permission.granted) {s
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de modifier un profile.' });
    }
  };
  

  exports.lireCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).readAny('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.modifierCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.createCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.createEnfantsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('enfants');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  

  exports.lireEnfantsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('enfants');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.modifierEnfantPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('enfants');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };
  exports.deleteEnfantPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).deleteAny('enfant');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.modifierParentsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.lireParentsPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).createOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };


  exports.getCrechePermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).readOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.ModifierPropPermission = (req, res, next) => {
    const role =localStorage.getItem('role');
    const permission = ac.can(role).updateOwn('parents');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };

  exports.SupprimerCreche =(req , res , next)=>{
    const role =localStorage.getItem('role');
    const permission = ac.can(role).deleteOwn('creches');
    if (permission.granted) {
      next();
    } else {
      res.status(401).json({ message: 'Vous n\'avez pas la permission de créer un document.' });
    }
  };