const User = require("../models/User.js");
const Book = require("../models/Book.js");
const Admin = require('../models/Admin.js');

const getOverdueBookCount = async (req, res) => {
  try {
    const now = new Date();
    const countResult = await User.aggregate([
      { $unwind: "$borrowedBooks" },
      { $match: { "borrowedBooks.dueDate": { $lt: now }, "borrowedBooks.isOverdue": true } },
      { $count: "overdueCount" }
    ]);
    res.json({ overdueCount: countResult.length ? countResult[0].overdueCount : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalUserAndBooksCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookCount = await Book.countDocuments();
    console.log("get a book count")
    res.json({ userCount, bookCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalAdminDetails = async (req, res) => {
  try {
    const admins = await Admin.find({ isAdmin: true }).select("-password");
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
      { $match: { "borrowedBooks.dueDate": { $lt: now }, "borrowedBooks.isOverdue": true }},
      { $project: {
          studentName: { $concat: ["$firstName", " ", "$lastName"] },
          class: "$class",
          borrowedBook: "$borrowedBooks"
        }}
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
      { $count: "borrowedCount" }
    ]);
    const bookCount = await Book.countDocuments();
    const borrowed = borrowedCountArray.length ? borrowedCountArray[0].borrowedCount : 0;
    const returned = bookCount - borrowed;
    res.json({ borrowed, returned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    getOverdueBookCount,
    getTotalUserAndBooksCount,
    getTotalAdminDetails,
    getOverdueBorrowersList,
    getTotalBorrowedAndReturnedBooks
}