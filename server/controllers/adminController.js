const User = require("../models/User.js");
const Book = require("../models/Book.js");
const bcrypt = require("bcrypt");

const getAdminDetail = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select("-password");
    if (!admin || !admin.isAdmin)
      return res.status(403).json({ message: "Access denied" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOverdueBookCount = async (req, res) => {
  try {
    const now = new Date();
    const count = await User.aggregate([
      { $unwind: "$borrowedBooks" },
      {
        $match: {
          "borrowedBooks.dueDate": { $lt: now },
          "borrowedBooks.isOverdue": true,
        },
      },
      { $count: "overdueCount" },
    ]);
    res.json({ overdueCount: count.length ? count[0].overdueCount : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeCredentials = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const admin = await User.findById(req.user.id);
    if (!admin || !admin.isAdmin)
      return res.status(403).json({ message: "Access denied" });

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

const getTotalUserAndBooksCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();
    res.json({ userCount, bookCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalAdminDetails = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true }).select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOverdueBorrowersList = async (req, res) => {
  try {
    const now = new Date();
    const borrowers = await User.aggregate([
      { $unwind: "$borrowedBooks" },
      {
        $match: {
          "borrowedBooks.dueDate": { $lt: now },
          "borrowedBooks.isOverdue": true,
        },
      },
      {
        $project: {
          studentName: "$name",
          class: "$class",
          borrowedBook: "$borrowedBooks",
        },
      },
    ]);
    res.json(borrowers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalBorrowedAndReturnedBooks = async (req, res) => {
  try {
    const borrowedCountArray = await User.aggregate([
      { $unwind: "$borrowedBooks" },
      { $count: "borrowedCount" },
    ]);
    const bookCount = await Book.countDocuments();
    const borrowed = borrowedCountArray.length
      ? borrowedCountArray[0].borrowedCount
      : 0;
    const returned = bookCount - borrowed;
    res.json({ borrowed, returned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAdminDetail,
  getOverdueBookCount,
  changeCredentials,
  getTotalUserAndBooksCount,
  getTotalAdminDetails,
  getOverdueBorrowersList,
  getTotalBorrowedAndReturnedBooks,
};
