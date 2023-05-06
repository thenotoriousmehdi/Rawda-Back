const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const crecheRoutes = require("./routes/Creche.js");
const session = require('express-session');
//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: 'Profile',
  resave: false,
  saveUninitialized: true
}));
//app.use(express.static("public"));
app.use("/uploads",express.static("uploads"))

//Connecting to the DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to app db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(crecheRoutes);

app.use(authRoutes);
