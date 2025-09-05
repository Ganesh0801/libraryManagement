const mongoose = require("mongoose");

const borrowedBookSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    title: String,
    borrowedDate: Date,
    dueDate: Date,
    isOverdue: Boolean,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, unique: true },
    firstName: String,
    lastName: String,
    contactNumber: String,
    email: String,
    password: String,
    name: String, 
    class: String,
    section: String,
    gender: String,
    borrowedBooks: [borrowedBookSchema],
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
