const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const borrowedBookSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    title: String,
    borrowedDate: Date,
    dueDate: Date,
    isOverdue: Boolean,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    class: String,
    section: String,
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    borrowedBooks: [borrowedBookSchema],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
