const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ImageSchma = new Schema({
    name:String,
    type:Number, // 1= image,  2 = vide0
    
},{
    timestamps:true
})


module.exports = mongoose.model('image', ImageSchma);
