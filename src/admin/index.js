const express = require("express");
const router = express.Router();
const adminroute = require("./admin/router");

router.use("/", adminroute);

module.exports = router;
