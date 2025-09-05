const User = require('../models/User.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { registrationNumber, name, class: cls, section, gender } = req.body;
    const user = new User({ registrationNumber, name, class: cls, section, gender });
    await user.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    await User.findOneAndDelete({ registrationNumber });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const updateData = req.body;
    await User.findOneAndUpdate({ registrationNumber }, updateData, { new: true });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports={getAllUsers,addUser,deleteUser,updateUser}