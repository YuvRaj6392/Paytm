const express=require('express');
const router=express.Router();
const Validation=require('../middlewares/middleware')
const Account=require('../controllers/accountController')

router.get('/balance',Validation,Account.balance);
router.post('/transfer',Validation,Account.transfer)

module.exports=router