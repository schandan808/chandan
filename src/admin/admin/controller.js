const Models = require("../../../models")
const helper= require("../../helper")

module.exports = {


  signupUser: async (req, res) => {
    try {
      let payload = req.body
      const dat = await Models.Users.create(payload)
      await helper.success(res,"success",dat)
    } catch (error) {
      console.log(error.message)
      await helper.success(res,error.message)
    }
  },  
  test:async(req, res)=>{
    try {
      res.render("index")
    } catch (error) {
      console.log(">>>>>>>>>err",error)
    }
  }

};
