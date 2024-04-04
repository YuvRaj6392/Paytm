const mongoose=require('mongoose');
const db={};
const {DatabaseUrl}=require('../configuration/config');
const {User}=require("../models/userModel")
db.mongoose=mongoose;
db.url=DatabaseUrl;
db.users=User
module.exports=db;
