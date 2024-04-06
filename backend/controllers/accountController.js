const db=require('../models/index');
const mongoose=require('mongoose')
const Account=db.accounts;
const {transferSchema}=require('../zod/zodBalanceTransfer')

//controller to fetch the balance of the user
exports.balance=async(req,res)=>{
 try{
  const userId=req.headers.userId;
  const balance=await Account.findOne({userId})

  if(!balance){
   return res.status(404).json({
    success:false,
    message:"Account not found"
   })
  }

  res.status(200).json({
   success:true,
   balance:balance.balance
  })

 }catch (err) {
  console.log(err.message);
  res.status(500).json({
    success: false,
    message: "Server Error!",
  });
}
}


//controller to transfer money 
exports.transfer=async(req,res)=>{
 try{
  const session=await mongoose.startSession();
  session.startTransaction();

  const validation=transferSchema.safeParse(req.body);
  if (!validation.success) {
    await session.abortTransaction();
    return res.status(411).json({
      success: false,
      msg: "Invalid input",
      errors: validation.error.errors,
    });
  }

  const {to,amount}=req.body;
 
   // Fetch the accounts within the transaction
   const account = await Account.findOne({ userId: req.headers.userId }).session(session);
   if (!account) {
       await session.abortTransaction();
       return res.status(400).json({
           message: "Account not found"
       });
   }else if(account.balance<amount){
    await session.abortTransaction();
       return res.status(400).json({
           message: "Insufficient balance"
       });
   }
   
   //check if toAccount exists
    const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "toAccount not found"
       });
    }

    //performing the transfer of funds
  
    await Account.updateOne({ userId: req.headers.userId }, { $inc: { balance: -amount } }).session(session);
    
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    

     // Commit the transaction
     await session.commitTransaction();

     // Fetch the updated account balances
    const updatedAccount = await Account.findOne({ userId: req.headers.userId });
    

    res.status(200).json({
      success: true,
      message: 'Successfully transferred the money',
      senderBalance: updatedAccount.balance,
    });

  

 }catch (err) {
  console.log(err.message);
  res.status(500).json({
    success: false,
    message: "Server Error!",
  });
}
}