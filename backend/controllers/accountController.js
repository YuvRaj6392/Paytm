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
exports.transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const validation = transferSchema.safeParse(req.body);
      if (!validation.success) {
          throw new Error("Invalid input");
      }

      const { to, amount } = req.body;

      // Fetch the sender's account
      const senderAccount = await Account.findOne({ userId: req.headers.userId }).session(session);
      if (!senderAccount) {
          throw new Error("Sender account not found");
      } else if (senderAccount.balance < amount) {
          throw new Error("Insufficient balance");
      }

      // Fetch the recipient's account
      const recipientAccount = await Account.findOne({ userId: to }).session(session);
      if (!recipientAccount) {
          throw new Error("Recipient account not found");
      }

      // Perform the transfer of funds
      senderAccount.balance -= amount;
      recipientAccount.balance += amount;

      // Save both accounts in the same transaction
      await senderAccount.save({ session });
      await recipientAccount.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      res.status(200).json({
          success: true,
          message: 'Successfully transferred the money',
          senderBalance: senderAccount.balance,
      });

  } catch (err) {
      await session.abortTransaction();
      console.error(err.message);
      res.status(500).json({
          success: false,
          message: err.message || "Server Error!",
      });
  } finally {
      session.endSession();
  }
}
