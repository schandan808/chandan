const express = require("express");
const router = express.Router();
const controller = require("./controller");





router.post("/signup",controller.signupUser)
router.get("/test",controller.test)

module.exports = router;
