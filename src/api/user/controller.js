const Model = require('../../../models/index')
const helper = require("../../helper");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
module.exports = {


  siginup: async (req, res) => {
    try {
      let payload = req.body
      const passdata = await bcrypt.hash(payload.password, 10);
      payload.password = passdata
      // payload.role = 1

      const userData = await Model.Users.findOne({ email: payload.email })

      if (userData) throw "Email Allready exist"
      const data = await Model.Users.create(payload)
      console.log('---dataa', data)
      await helper.success(res, "User Signup Seccessfully", data);
    } catch (error) {
      console.log(error)
      await helper.error(res, error);


    }
  },

  login: async (req, res) => {
    try {
      console.log("hereeeeeeeeeeeee")
      let payload = req.body
      const findata = await helper.userData(payload.email)
      if (!findata) throw "Please Enter Crrect Email"
      const passdata = bcrypt.compare(payload.password, findata.password)
      if (passdata == false) throw "Increct password"

      let authdata = {
        id: findata._id,
        email: findata.email
      }
      const Token = jwt.sign({ authdata }, "shhhhhhared-secret");

      // data.token = accessToken
      let data = await Model.Users.updateOne({ _id: findata._id }, { accessToken: Token })
      const userdata = await helper.userData(payload.email)
      if (userdata.role == 1) {
        console.log('student')
        await helper.success(res, "student login Seccessfully", userdata);
      } else {
        // console.log('>>>>>>>>>>>>>>>teacher')
        await helper.success(res, "teacher login Seccessfully", userdata);
      }

    } catch (error) {
      console.log('--data', error)
      await helper.error(res, error)
    }
  },

  userdata: async (req, res) => {
    try {
      console.log(req.user.authdata)
      const data = await Model.Users.findById(req.user.authdata.id)
      await helper.success(res, "User Data get Seccessfully", data);
    } catch (error) {
      await helper.error(res, error)
    }

  },

  sendimage: async (req, res) => {
    try {
      let imageName = uuidv4()+req.files.image.name;
      let img = req.files.image
      console.log(imageName);
      img.mv(`public/images/${imageName}`, err => {
        if (err) {
          return res.status(500).send(err);
        }
      })
      // console.log(">>>>>>>>>>>>>>>>>>>",uuidv4()+imageName)
      // return
      let payload = {
        name:`images/`+imageName,
        type:1
      }
      let data = await Model.Image.create(payload)
      await helper.success(res, "Image Upload Successfully", data);
    } catch (error) {
      console.log('----errr', error)
      await helper.error(res, error)
    }
  },


  file_upload: async (req, res) => {
    try {
      let imageName = uuidv4()+req.files.video.name;
      let img = req.files.video
      console.log(imageName);
      img.mv(`public/images/${imageName}`, err => {
        if (err) {
          return res.status(500).send(err);
        }
      })
      let payload = {
        name:`images/`+imageName,
        type:2
      }
      let data = await Model.Image.create(payload)
      await helper.success(res, "video Upload Successfully", data);
    } catch (error) {
      await helper.error(res, error)
    }
  },

  forgetPassword: async (req, res) => {
    try {
      let payload = req.body
      const userdata = await helper.userData(payload.email)
      if (!userdata) throw "Please Enter Currect Email"
      var val = Math.floor(1000 + Math.random() * 9000);
      let otpupdate = await Model.Users.updateOne({ _id: userdata._id }, { otp: val })
      const data = await helper.userData(payload.email)
      await helper.success(res, "otp send successfully", data);
    } catch (error) {
      // console.log(">>>>>>>>>>>>")
      await helper.error(res, error)

    }
  }



};
