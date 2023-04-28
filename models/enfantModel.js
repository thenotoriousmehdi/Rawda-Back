const mongoose = require('mongoose');
const { schema } = require('./UserModel');

const Schema = mongoose.Schema ;

const enfantsSchema = new Schema ({
    nom :{
       type: String, 
       required: true,
    },
    prenom :{
        type: String,
        required: true,  
   },
   niveau:{ /* pour connaitre le niveau a lequel on souhaite inscrire l'enfant*/
    type: Number,
    max: 5 ,
    
   },
   date_naissance:{
    type: Date,
    required: true,
   },

   creche :{ type: Schema.Types.ObjectId , ref:'creches'}
   

});

module.exports = mongoose.model("enfants" , enfantsSchema);