
const FRONT = "../Rawda-Front/src/App.js";
const users = require('../Models/UserModel');
const parent = require('../Models/ParentModel');
const proprio = require('../Models/proprioModel');
const creches = require('../models/crecheModel');
const jwt = require('jsonwebtoken');

// ERROR HANDLER

const errorhndler = (err) =>
{
    let errors = { email :'' , password:''};
    console.log(err.message , err.code);
  
   

    // validation error
    if ( err.message.includes('USERS validation failed')){ console.log(err)};
    if (err.code === 11000){ errors.email = ' MAIL DEJA EXISTANT' };
    if (err.code === 11000){ errors.password = ' PASSWORD INVALID'  }

    return errors ;
}

const maxAge = 3600*4*3 ;
const  createToken = ( id )=>{
    
    return jwt.sign({id}, ' AMINEWASSIMOULOUDMAHDI', {
        expiresIn: maxAge
    });

}

exports.signup_get = (req , res)=>{
    console.log('signupppp');
}


exports.logout_get = (req , res)=>{
    console.log('lognupppp');
}

exports.signup_post = async (req , res)=>{
    console.log('SIGN IN EN COURS');
    const { nom , prenom , email , password , role } = req.body ;
    try{
    const user = await users.create({ nom , prenom , email , password , role });
    const  { userID } = user._id ;
    const token = createToken(user._id);
    if (req.body.role == 'parent'){
        const parentSchema = await parent.create({ userID });
    };
    if (req.body.role == 'proprio'){
        const proprioSchema = await proprio.create({ userID });
    }
    res.cookie('jwt' , token , { httpOnly: true , maxAge: maxAge * 1000});
    res.status(201).json(user)  ;
    }
    catch (err)
    {

        const error = errorhndler(err);
        console.log("not signed");
        res.status(404).json({error});
    }
}

exports.login_post = async(req , res)=>{
    const { email , password} = req.body;
    try{
    const user = await users.login( email , password );
    if (user){
        res.json("User Existed");
    }
    else{
        res.json("User Not Existed");

    }
    }
    catch(err)
    {
        res.status(400).json({});

    }
}
exports.documents_get =  async (req, res) => {
   try{
    console.log(req.query);
    const filtre = {};
    if(req.query.nom){ filtre.nom = req.query.nom};
    if(req.query.typeEtab){ filtre.typeEtab = req.query.typeEtab};
    if(req.query.typeAcceuil){ filtre.typeAcceuil = req.query.typeAcceuil};
    if(req.query.age){ filtre.ageAcceuil = req.query.age};
    if(req.query.capacite){ filtre.capacite = req.query.capacite};
    if(req.query.pedagogie){ filtre.pedagogie = req.query.pedagogie};
    if(req.query.langue){ filtre.langue = req.query.langue};
    if(req.query.transport){ filtre.transport = req.query.transport};
    if(req.query.alimentation){ filtre.alimentation = req.query.alimentation};
    if(req.query.prix){ filtre.prix = req.query.prix};
    /**** LE FILTRE **** */
    console.log("LE FILTRE ");
    console.log(filtre);
    /****************** */
    const creche = await creches.find(filtre);
    res.status(200).json({
      status:"success",
      results: creche.length,
      data:{
        creche,
      }
    });
   }
   catch(err)
   {
    res.status(404).json({
      status:"failure",
      data:{}
    });
   }

}
