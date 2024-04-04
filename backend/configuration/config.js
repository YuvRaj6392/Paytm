const dotenv=require('dotenv');
dotenv.config();
module.exports={
 PORT:process.env.PORT,
 DatabaseUrl:process.env.DB_URL,
 JWT_SECRET:process.env.JWT_SECRET,
 BCRYPT_SALT_ROUNDS:process.env.BCRYPT_SALT_ROUNDS
}