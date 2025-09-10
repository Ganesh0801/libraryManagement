const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../utils/mailer.js');
require('dotenv').config();
const forgetMailContent = require("../mailTemplate/forgotPassword_Mail.js")

const otpStore = new Map(); // temporary OTP store

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

     const existingUser = await User.findOne({
      $or: [{ email: email }, { registrationNumber: username }]
    });

    if (existingUser) {
      console.log("true")
      return res.status(400).json({ error: 'Email or username already in use' });
    }
   
    const user = new User({
      firstName,
      lastName,
      contactNumber,
      email,
      registrationNumber: username,
      password: hashedPassword,
      
      isAdmin: false
    });
     console.log("user",user)
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ registrationNumber: username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message:"user signIn",token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ registrationNumber: username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(username, otp);
    const tempOtp = forgetMailContent(otp)
    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: user.email,
      subject: "Your OTP for forgot password ",
      html:tempOtp
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyOtp = (req, res) => {
  const { username, otp } = req.body;
  if (otpStore.get(username) === otp) {
    otpStore.delete(username);
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { username, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ registrationNumber: username }, { password: hashed });

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports ={signUp,signIn,forgotPassword,verifyOtp,resetPassword}