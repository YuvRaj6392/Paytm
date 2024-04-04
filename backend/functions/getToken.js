const getToken=(authorization)=>{
 const token=authorization.split(' ')[1];
 return token
}
module.exports={getToken}