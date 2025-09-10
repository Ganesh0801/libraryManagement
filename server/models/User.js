const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
    registrationNumber: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    contactNumber: String,
    email: { type: String, unique: true, required: true },
    password: String,
    username: String,
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

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' });

module.exports = mongoose.model("User", userSchema);
