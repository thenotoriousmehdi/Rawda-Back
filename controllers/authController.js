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
    req.session.key = user.email;
    console.log(req.session.id);
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
    req.session = req.session || {};
    try{
    const user = await users.login( email , password );
    if (user){
        res.status(202);    
        req.session.key = user.email;
        res.send("LOGGED");
    }
    else{
        res.log("NOT TROUVE");

    }
    }
    catch(err)
    {
        res.status(400).json({});

    }
}
exports.documents_post =  async (req, res) => {
   try{
    console.log(req.body);
    const filtre = {};
    if(req.body.Wilaya){ 
        const wilaya = req.body.Wilaya;
        if(req.body.commune){
          const commune = req.body.commune;
          filtre.localisation = { $regex: `${commune},${wilaya}`, $options: "i" };
        } else {
          filtre.localisation = { $regex: `,${wilaya}`, $options: "i" };
        }
      }
    if(req.body.nom){ filtre.nom = req.body.nom};
    if(req.body.typeEtab){ filtre.typeEtab = req.body.typeEtab};
    if(req.body.typeAccueil){ filtre.typeAccueil = req.body.typeAccueil};
    if(req.body.ageAccueil){
        const age = parseInt(req.body.ageAccueil);
        filtre["ageAccueil.ageMin"] = { $lte: age };
        filtre["ageAccueil.ageMax"] = { $gte: age };}
    if(req.body.joursAccueil){filtre.joursAccueil =  { $in: [req.body.joursAccueil] }};
    if(req.body.capacite){ filtre.capacite = parseInt(req.body.capacite)};
    if(req.body.pedagogie){ filtre.pedagogie = req.body.pedagogie};
    if(req.body.langue){ filtre.langue = req.body.langue};
    if(req.body.transport){ filtre.transport = req.body.transport};
    if(req.body.alimentation){ filtre.alimentation = req.body.alimentation};
    if(req.body.prix){ filtre.prix = {$lte : parseFloat(req.body.prix)}};
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

exports.get_profile = async (req, res) => {
        console.log('voir profile');
        const userId = req.session.key;
        const key={};
        key.email=userId;
        const filtre={};
        try{
        const user= await users.findOne(key);
        console.log(user)
        const delimiteur=" ";
        filtre.nomc = user.nom+delimiteur+user.prenom;
        filtre.email=user.email;
        filtre.role=user.role;
        filtre.phone=user.phone;
        filtre.adress=user.adress;
        filtre.photo=user.photo;
        filtre.daten=user.dateNaissance;
        res.json(filtre);
        }
        catch{
            res.status(404);
            res.json ({});
        }
    }
