const mongoose=require('mongoose');
const User=mongoose.model('user',mongoose.Schema({
 username:{
  type:String,
  require:true,
  unique:true,
  trim:true,
  minLength:3,
  maxLength:30
 },

 password:{
  type:String,
  required:true,
  minLength:6
 },

 firstName:{
  type:String,
  required:true,
  trim:true,
  maxLength:50
 },

 lastName:{
  type:String,
  required:true,
  trim:true,
  maxLength:50
 }
}))
module.exports={
 User
}