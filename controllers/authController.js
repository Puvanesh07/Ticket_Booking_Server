const { response } = require("express");
const User = require('../models/user');
const { hashPassword: hashPasswordHelper, comparePassword } = require('../helpers/auth');

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if name was entered
    if (!name) {
      return res.json({
        error: 'Name is required'
      });
    }

    // Check password is good
    if (!password || password.length < 8) {
      return res.json({
        error: 'Password is required and should be at least 8 characters long'
      });
    }

    // Check if email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already exists"
      });
    }

    const hashedPassword = await hashPasswordHelper(password);
    
    // Create a user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No User Found",
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);

    if (match) {
      res.json('Passwords Matched');
    } else {
      res.json({
        error: "Password does not match",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser
};
