const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const crecheRoutes = require("./routes/Creche.js");

//express app
const app = express();

//middleware
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to RAWDA db & listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

//routes
app.use("/Creche", crecheRoutes);
