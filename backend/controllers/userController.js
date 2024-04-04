const {signupSchema,signinSchema,updatePasswordSchema}=require('../zod/zodUserSchema')
const db=require('../models/index');
const User=db.users;
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../configuration/config');
const { hashedPasswordFunc } = require('../functions/saltingAndHashing');


//controller for signup
exports.signup=async(req,res)=>{
 try{
  const validation=signupSchema.safeParse(req.body);
   if(!validation.success){
    return res.status(411).json({
     success:false,
     msg:"Invalid input",
     errors:validation.error.errors
    })
   }

   const {username,firstName,lastName,password}=req.body
   const existingUser=await User.findOne({username});
   if(existingUser){
    return res.status(409).json({
     success:false,
     msg:"User Already exists"
    })
   }

   
   const hashedPassword=hashedPasswordFunc(password)
   const newUser=await User.create({
    username,
    firstName,
    lastName,
    password:hashedPassword
   })

   return res.status(201).json({
    success:true,
    msg:'User created successfully'
   })

 }catch(err){
  console.log(err.message)
  res.status(500).json({
   success:false,
   msg:'Server Error!'
  })
 }
}


//controller for signin
exports.signin=async(req,res)=>{
 try{
  const validation=signinSchema.safeParse(req.body);
  if(!validation.success){
   return res.status(411).json({
    success:false,
    msg:"Invalid input",
    errors:validation.error.errors
   })
  }

  const {username,password}=req.body;
  const user=await User.findOne({username});
  if(!user){
   return res.status(401).json({
    success:false,
    msg:"Please use correct credentials"
   })
  }

  const isPasswordValid=await bcrypt.compareSync(password,user.password);
  if(!isPasswordValid){
   return res.status(401).json({
    success:false,
    msg:"Please use correct credentials"
   })
  }
  
  const token=await jwt.sign({uuid:user.id},JWT_SECRET);

  res.status(200).json({
   success:true,
   token:token
  })

 }catch(err){
  console.log(err.message)
  res.status(500).json({
   success:false,
   message:'Server Error!'
  })
 }
}


//controller to update user details
exports.update = async (req, res) => {
  try {

    const { firstName, lastName, password } = req.body;
    let fieldsToUpdate = {};
    if (firstName) {
      fieldsToUpdate.firstName = firstName;
    }
    if (lastName) {
      fieldsToUpdate.lastName = lastName;
    }
    if (password) {
      const validatePassword = updatePasswordSchema.safeParse(password);
      if (!validatePassword.success) {
        return res.status(411).json({
          success: false,
          msg: "Invalid Password",
          errors: validatePassword.error.errors
        });
      }
      
      const hashedPassword=hashedPasswordFunc(password)
      fieldsToUpdate.password = hashedPassword;
    }

    if (!req.headers.userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID not provided in headers'
      });
    }

    const updateFields = await User.findByIdAndUpdate(req.headers.userId, { $set: fieldsToUpdate }, { new: true });
    if(!updateFields){
      return res.status(500).json({
        success: false,
        message: 'Something went wrong'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User details updated successfully',
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error!'
    });
  }
};