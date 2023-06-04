
const { LocalStorage } = require('node-localstorage');
const jwt = require('jsonwebtoken');
const localStorage = new LocalStorage('./localStorage');

module.exports.isAuthentificated = async (req , res , next)=>{
     const token= localStorage.getItem('token');
     console.log(token);
    
    if(!token){
        
        return res.status(401).json({ error:" LOG FIRST"});
    }
     try {
        // verify the user 
        const encoded = jwt.verify(token,'AMINEWASSIMOULOUDMAHDI');
       ;
        next();

     }
     catch(e){ res.status(404).json({ error : "YOU DON'T HAVE THE AUTHORISATION"});
               console.log(e);};



}
