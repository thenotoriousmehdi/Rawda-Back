const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const proprioSchema = new Schema ({
    userID :{
       type: Schema.Types.ObjectId, 
       ref:'users'
    },
    creche:[{ type: Schema.Types.ObjectId , ref:'creches'}]
   
});

/***************************************************************************** */
                const creche = mongoose.model('proprioSchema',creche);
                // Creation d'index pour le champ email 
                USERS.collection.createIndex({ userID: 1 }, { unique: true }, (err) => {
                    if (err) console.log(err);
                });
                module.exports=creche;
/********************************************************************************* */