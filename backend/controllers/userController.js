const {
  signupSchema,
  signinSchema,
  updatePasswordSchema,
} = require("../zod/zodUserSchema");
const db = require("../models/index");
const User = db.users;
const Account=db.accounts;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../configuration/config");
const { hashedPasswordFunc } = require("../functions/saltingAndHashing");
const {generateRandomBalance}=require('../functions/generateRandomBalance')

//controller for signup
exports.signup = async (req, res) => {
  try {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(411).json({
        success: false,
        msg: "Invalid input",
        errors: validation.error.errors,
      });
    }

    const { username, firstName, lastName, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        msg: "User Already exists",
      });
    }

    const hashedPassword = hashedPasswordFunc(password);
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });
   
    const accountBalance = generateRandomBalance();
    try {
      const createBalance = await Account.create({
        userId: newUser._id,
        balance: accountBalance,
      });
      if (createBalance) {
        return res.status(201).json({
          success: true,
          msg: "User created successfully",
        });
      }
    } catch (err) {
      console.log(err.message)
      await User.deleteOne({ _id: newUser._id });
      return res.status(500).json({
        success: false,
        msg: "Error occurred during user creation",
      });
    }



    res.status(500).json({
      success: true,
      msg: "Some error occurred",
    });
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Server Error!",
    });
  }
};

//controller for signin
exports.signin = async (req, res) => {
  try {
    const validation = signinSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(411).json({
        success: false,
        msg: "Invalid input",
        errors: validation.error.errors,
      });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Please use correct credentials",
      });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        msg: "Please use correct credentials",
      });
    }

    const expiresIn = parseInt(JWT_EXPIRY);
    const token = await jwt.sign({ uuid: user.id }, JWT_SECRET, { expiresIn });

    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};

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
          errors: validatePassword.error.errors,
        });
      }

      const hashedPassword = hashedPasswordFunc(password);
      fieldsToUpdate.password = hashedPassword;
    }

    if (!req.headers.userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not provided in headers",
      });
    }

    const updateFields = await User.findByIdAndUpdate(
      req.headers.userId,
      { $set: fieldsToUpdate },
      { new: true }
    );
    if (!updateFields) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details updated successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};

exports.bulk = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    let users;
    if (filter === "") {
      users = await User.find().sort({ createdAt: -1 }).limit(10);
    } else {
      users = await User.find({
        $or: [
          { firstName: { $regex: new RegExp(filter, "i") } },
          { lastName: { $regex: new RegExp(filter, "i") } },
        ],
      });
    }

    const formattedUsers = users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    }));

    res.status(200).json({
      success: true,
      user: formattedUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};
