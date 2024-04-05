const dotenv=require('dotenv');
dotenv.config();
module.exports={
 PORT:process.env.PORT,
 DB_URL:process.env.DB_URL,
 JWT_SECRET:process.env.JWT_SECRET,
 BCRYPT_SALT_ROUNDS:process.env.BCRYPT_SALT_ROUNDS,
 JWT_EXPIRY:process.env.JWT_EXPIRY
}