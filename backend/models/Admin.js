const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Admin", adminSchema);
