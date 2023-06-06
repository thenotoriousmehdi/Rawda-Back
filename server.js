const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const accessControl = require("./middleware/accessControl");
const auth = require("./middleware/auth");
const crecheRoutes = require("./routes/Creche.js");
const session = require("express-session");
const rdvRoutes = require("./routes/prendreRdvRoutes");
const dash = require("./routes/dashRoutes");
const notifRoutes = require("./routes/notifRoutes");
const emailRoute = require("./routes/emailRoute");
const notifAdmRoute = require("./routes/notifAdmRoutes");
//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: "Profile",
    resave: false,
    saveUninitialized: true,
  })
);
//app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

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

app.use(rdvRoutes);
app.use(notifRoutes);
app.use(emailRoute);
app.use(notifAdmRoute);
app.use(dash);
