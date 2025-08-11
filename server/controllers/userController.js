import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
export const getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ accountVerified: true });
  res.status(200).json({
    success: true,
    users,
  });
});

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  if (!req.file || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Admin Avator Is Required", 400));
  }

  const { name, email, password } = req.body;
  if ((!name, !email, !password)) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }
  const isRegister = await User.findOne({ email, accountVerified: true });
  if (isRegister) {
    return next(new ErrorHandler("User Already Register", 400));
  }
  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 to 16 character", 400)
    );
  }
  const { avator } = req.file;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(avator.minetype)) {
    return next(new ErrorHandler("File Format not supported", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avator.tempFilePath,
    {
      folder: "LIBRARY_MANAGEMENT_SYSTEM",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(
      new ErrorHandler("Failed to Upload avator image to cloudinary", 500)
    );
  }

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "Admin",
    accountVerified: true,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Admin register successfully",
    admin,
  });
});
