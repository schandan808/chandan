const mongoose = require("mongoose")
const Schema = mongoose.Schema

let UserSchma = new Schema({
    name:String,
    role:Number, // 1= Student,  2 = teacher
    email:String,
    password:String,
    accessToken:String,
    otp:Number
},{
    timestamps:true
})


module.exports = mongoose.model('Users', UserSchma);
