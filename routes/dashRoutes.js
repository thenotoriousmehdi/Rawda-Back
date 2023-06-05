const express = require("express");
const ac = require("../middleware/accessControl");
const { isAuthentificated } = require("../middleware/auth");
const dashController = require("../controllers/dashController");
const { getnombreparent } = require("../controllers/dashController");

const route = express.Router();

route.get("/dash", isAuthentificated,dashController.getinfos);
route.get("/stats",isAuthentificated,dashController.home)


module.exports=route;
