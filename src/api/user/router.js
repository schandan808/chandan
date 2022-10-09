const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
const { authenticateToken } = require("../../token");
const controller = require("./controller");


// router.post("/apistest", controller.apisdata);
router.post('/signUp', controller.siginup)
router.post('/login', controller.login)
router.get('/userdata', authenticateToken, controller.userdata)
router.post('/imageupload',controller.sendimage)
router.post('/video_Upload',controller.file_upload)
router.post('/forgetPassword',controller.forgetPassword)


module.exports = router;

