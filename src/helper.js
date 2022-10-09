const Model = require('../models/index')

module.exports={
    success: (res,message,data)=>{
        return res.status(200).json({
            code :200,
            status:true,
            message:message,
            body:data
        })
    },

    error:(res,error)=>{
        return res.status(400).json({
            code :400,
            status:false,
            message:error,
            // data:error
        })
    },

    userData:async(email)=>{
        const data = await Model.Users.findOne({email:email})
        return data
    }


}