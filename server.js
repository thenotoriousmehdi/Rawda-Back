const express = require('express');
const authRouter = require('./Routes/authRoutes');
const mongoose = require('mongoose');
const rawda = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
rawda.use(express.json());
rawda.use(cookieParser());
rawda.use(cors());
rawda.use(express.static('public'));

/***************************************** MANGO DB CONNECTION ********************************************* */
const dbUrl =
"mongodb+srv://Amine:projet2cp@cluster0.sghbpjn.mongodb.net/?retryWrites=true&w=majority" // string of connection ATLAS
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.log("CONNECTED TO  RAWDA's DATA BASE ");
  })
  .catch((error) => {
    console.log("ERROR WHILE CONNECTING");
  });
 
/*****************************************************************************************************************************/



/******************************* SERVER SIDE ****************************/
const host = 8000;
rawda.listen( host , ()=>{
console.log(`Server running on port ${host}`);
})
/************************************************************************/

rawda.use(authRouter);


