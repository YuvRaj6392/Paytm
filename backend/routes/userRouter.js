const express = require('express');
const router = express.Router();
const Validation=require('../middlewares/middleware')
const User=require('../controllers/userController')
router.post('/signup',User.signup);
router.post('/signin',User.signin);
router.put('/',Validation,User.update)

module.exports=router