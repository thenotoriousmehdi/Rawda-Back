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
const proprioModel = mongoose.model('proprioSchema',proprioSchema);
// Creation d'index pour le champ email 
proprioModel.collection.createIndex({ userID: 1 }, { unique: true }, (err) => {
    if (err) console.log(err);
  });
module.exports=proprioModel;
              
/********************************************************************************* */
