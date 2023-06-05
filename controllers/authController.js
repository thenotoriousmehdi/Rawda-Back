const users = require("../models/userModel");
const parent = require('../models/parentModel');
const proprio = require('../models/proprioModel');
const creches = require('../models/crecheModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const can = require
const { LocalStorage } = require('node-localstorage');

// ERROR HANDLER
const localStorage = new LocalStorage('./localStorage');
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

const maxAge = 60*4*4000 ;
const  createToken = ( email )=>{
    return jwt.sign({email}, 'AMINEWASSIMOULOUDMAHDI', {
        expiresIn: maxAge
    });

}

exports.signup_post = async (req , res)=>{
    console.log('SIGN IN EN COURS');
    const { nom , prenom , email , password , role } = req.body ;
    try{
    const profile = await users.findOne({ email : req.body.email});
    if (profile){res.status(404).json({erreur:"EMAIL EXISTANT"})}
    else{
    const user = await users.create({ nom , prenom , email , password , role });
    key = user.email;
    const  userID  = user._id;
    const token = createToken(user.email);
    localStorage.setItem('token', token);
    localStorage.setItem('key',key);
    localStorage.setItem('role',user.role);
    if (req.body.role == 'parent'){
        const parentSchema = await parent.create({ userID : userID });
        
    };
    if (req.body.role == 'proprio'){
        const proprioSchema = await proprio.create({ userID : userID});
       
    }
    res.cookie('jwt' , token , { httpOnly: true , maxAge: maxAge * 1000});
    res.status(201).json(user)  ;
    }}
    catch (err)
    {

        const error = errorhndler(err);
        console.log("not signed");
        res.status(404).json({error});
    }

}

exports.login_post = async(req , res)=>{
    const { email , password} = req.body;
    console.log(req.body);
    const user = await users.login( email , password );
    if (user){
        res.status(202); 
        const token = createToken(user.email);
        localStorage.setItem('role',user.role);
        res.cookie('jwt' , token , { httpOnly: true , maxAge: maxAge * 1000});   
        key = user.email;
        localStorage.setItem('key', user.email);
        localStorage.setItem('role',role);
        res.json({token : token , 
                  key : key});
        
    }
    else{
        res.json({erreur :"NOT TROUVE"});

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
    if(req.body.nom){ 
        const nom=req.body.nom
        const trimmedSearchString = nom.trim();
        filtre.nom = trimmedSearchString};
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
    console.log("voir profile");
     const userId = localStorage.getItem("key");
     //console.log(userId);
     const key = {};
     key.email = userId;
     const filtre = {};
     try {
       const user = await users.findOne(key);
       console.log(key);
       const delimiteur = " ";
       filtre.nomc = user.nom + delimiteur + user.prenom;
       filtre.email = user.email;
       filtre.role = user.role;
       filtre.phone = user.phone;
       filtre.adress = user.adress;
       filtre.photo = user.photo;
       filtre.daten = user.dateNaissance;
       console.log(filtre);
       res.json(filtre);
      // localStorage.removeItem("key");
     } catch {
       res.status(404);
       console.log(filtre);
       res.json({});
       console.log("probleme")
     }
    // localStorage.removeItem("token");
    // localStorage.removeItem("key");
   };
   

  
    exports.modifInfoProfile = async (req,res)=>{
        const key={};
       if (req.body.phone){key.phone=req.body.phone;};
       if(req.body.adress){key.adress=req.body.adress;};
       if(req.body.dateNaissance){key.dateNaissance=req.body.dateNaissance};
        const updateInfo=Object.keys(key);
        const userMail = localStorage.getItem('key');
        console.log(userMail);
        /** Voir si il est authentifié **/
        if (userMail){
        try{
        const user = await users.findOne({ email: userMail });
        updateInfo.forEach(update => user[update]=key[update]);
        await user.save();
        res.status(200);
        res.json(user);}
        catch(err){res.status(404).json(err)};
        }else res.status(404).json({error: "MODIFICATION NON CONQUISE "});
        }   

exports.modifPassword = async(req, res) => {
    const userMail = localStorage.getItem('key');
    const updates = {};
    console.log(userMail);
    updates.password=req.body.newPassword;
    const updateInfo=Object.keys(updates);
        /** Voir si il est authentifié **/
    if (userMail){
    // Vérifier si l'utilisateur existe dans la base de données
    try{
     const user = await users.findOne({email : userMail});
        // Vérifier si l'ancien mot de passe est correct
        console.log(user);
        console.log(req.body.newPassword);     
        const validation = bcrypt.compareSync( req.body.oldPassword , user.password);
        if (!validation) {
            return res.status(404).json({ message: 'L\'ancien mot de passe est incorrect.' });
        }
        // Mettre à jour le mot de passe de l'utilisateur
        updateInfo.forEach(update => user[update]= updates[update]);
        user.save();
     
        res.status(200); 
        res.send({ message: 'Le mot de passe a été mis à jour avec succès.' });
        }catch(error){res.status(404).json({ error: 'Une erreur est survenue lors de la mise à jour du mot de passe.' });
          console.log(error);
        };
    }else{ res.status(404).json({error:" YOU DONT HAVE THE ACCESS"})};
};
            
