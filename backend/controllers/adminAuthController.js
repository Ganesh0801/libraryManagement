const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/mailer.js");
const forgetMailContent = require("../mailTemplate/forgotPassword_Mail.js");
require("dotenv").config();

const otpStore = new Map();

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, email, username, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !email ||
      !username ||
      !password
    ) {
      return res.status(400).json({ message: error.message });
    }
    const existCheck = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existCheck)
      return res
        .status(400)
        .json({ message: "Email or username already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
      firstName,
      lastName,
      contactNumber,
    });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, isAdmin: true });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(username, otp);

    await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: admin.email,
      subject: "Your OTP for password reset",
      html: forgetMailContent(otp),
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyOtp = (req, res) => {
  const { username, otp } = req.body;
  if(!username || !otp){
    return res.status(400).json({message:"Invalid Details"})
  }
  if (otpStore.get(username) === otp) {
    otpStore.delete(username);
    res.json({ message: "OTP verified" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { username, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isSamePassword = await bcrypt.compare(newPassword, admin.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password must be different from old password" });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.findOneAndUpdate({ username }, { password: hashed });

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAdminDetail = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeCredentials = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid)
      return res.status(400).json({ message: "Current password incorrect" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getAdminDetail,
  changeCredentials,
};
