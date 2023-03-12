const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
      name:{type:String,required:true,trim:true},
      phoneNumber:{type:String,required:true,unique:true,trim:true},
      password:{type:String,required:true,trim:true},
      age:{type:Number,required:true,trim:true},
      pincode:{type:Number,required:true,trim:true},
      aadharNo:{type:String,required:true,unique:true,trim:true}
},{timestamps:true})

module.exports = mongoose.model("Admin",adminSchema)