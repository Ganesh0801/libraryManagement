const User = require("../models/User.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ registrationNumber: req.params.registrationNumber }, req.body, { new: true });
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ registrationNumber: req.params.registrationNumber });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}