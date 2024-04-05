const mongoose=require('mongoose');
const Account=mongoose.model('account',mongoose.Schema({
 userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'user',
  required:true
 },
 balance:{
  type:Number,
  required:true
 }
}))

module.exports={Account}