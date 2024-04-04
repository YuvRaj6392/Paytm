const {BCRYPT_SALT_ROUNDS} =require('../configuration/config')
const bcrypt=require('bcrypt')

const hashedPasswordFunc=(password)=>{
 const salt= bcrypt.genSaltSync(parseInt(BCRYPT_SALT_ROUNDS));
 const hashedPassword= bcrypt.hashSync(password,salt);
 return hashedPassword
}

module.exports={hashedPasswordFunc}